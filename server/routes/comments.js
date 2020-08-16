const router = require('express').Router();
const commentController = require('../controllers/comments');

router.post('/create-comment', commentController.createComment);
router.put('/edit-comment/:id', commentController.editComment);
router.delete('/remove-comment/:id', commentController.removeComment);
router.get('/:id', commentController.getCommentById);
router.get('/', commentController.getCommentsByPost);

module.exports = router;