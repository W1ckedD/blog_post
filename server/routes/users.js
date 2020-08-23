const router = require('express').Router();
const usersController = require('../controllers/users');

const requireUser = require('../middlewares/requireUser');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({ storage, fileFilter });

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.put(
    '/edit-user',
    upload.single('image'),
    requireUser,
    usersController.edituser
);
router.post('/add-friend', requireUser, usersController.sendFriendRequrest);
router.post('/accept-request', requireUser, usersController.acceptRequest);
router.post('/deny-request', requireUser, usersController.denyRequest);
router.delete('/remove-friend', requireUser, usersController.removeFriend);
router.get(
    'pending-sent-requests',
    requireUser,
    usersController.getPendingSentRequests
);
router.get(
    'pending-received-requests',
    requireUser,
    usersController.getPendingReceivedRequests
);
router.get('/friends/:id', requireUser, usersController.getUserFriendsById);
router.get('/my-friends', requireUser, usersController.getAllMyFriends);
router.get('/users/:id', requireUser, usersController.getUserById);
router.get('/users', requireUser, usersController.getAllUsers);
module.exports = router;
