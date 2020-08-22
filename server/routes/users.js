const router = require('express').Router();
const usersController = require('../controllers/users');

const requireUser = require('../middlewares/requireUser');

router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;