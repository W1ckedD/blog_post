const router = require('express').Router();
const profilesController = require('../controllers/profiles');
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

router.post('/create-profile/:user_id', upload.single('image'), profilesController.createProfile);
router.put('/edit-profile', profilesController.editProfile);
router.get('/my-friends', profilesController.getAllMyFriends);
router.post('/add-friend', profilesController.sendFriendRequrest);
router.post('/accept-request', profilesController.acceptRequest);
router.post('/deny-request', profilesController.denyRequest);
router.get('/pending-sent-requests', profilesController.getPendingSentRequests);
router.get(
    '/pending-received-requests',
    profilesController.getPendingReceivedRequests
);
router.get('/my-profile', profilesController.getMyProfile);
router.get('/:profile_id', profilesController.getProfileById);
router.get('/', profilesController.getAllProfiles);

module.exports = router;
