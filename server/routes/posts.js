const router = require('express').Router();
const postsController = require('../controllers/posts');

router.post('/create-post', postsController.createPost);
router.put('/eidt-post/:id', postsController.editPost);
router.delete('/remove-post/:id', postsController.removePost);
router.get('/my-posts', postsController.getProfilePosts);
router.get('/posts-by-profile-id', postsController.getPostsByProfileId);
router.get('/:id', postsController.getPostById);
router.get('/', postsController.getAllPosts);

module.exports = router;