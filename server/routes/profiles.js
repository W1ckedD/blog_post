const router = require('express').Router();
const profilesController = require('../controllers/profiles');

router.post('/create-profile/:user_id', profilesController.createProfile);
router.put('/edit-profile', profilesController.editProfile);
router.get('/my-friends', profilesController.getAllMyFriends);
router.post('/add-friend', profilesController.sendFriendRequrest);
router.post('/accept-request', profilesController.acceptRequest);
router.post('/deny-request', profilesController.denyRequest);
router.get('/pending-sent-requests', profilesController.getPendingSentRequests);
router.get('/pending-received-requests', profilesController.getPendingReceivedRequests);
router.get('/:profile_id', profilesController.getProfileById);
router.get('/', profilesController.getAllProfiles);

module.exports = router;
