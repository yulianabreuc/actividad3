const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controllerUsers.js');
const { verifyTokenForEdit } = require('../middlewares/auth.js');

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', verifyTokenForEdit, UserController.updateUser);


router.delete('/:id', verifyTokenForEdit, UserController.deleteUser);
router.get('/userpubli/:id', UserController.getUserPubli);

module.exports = router;
