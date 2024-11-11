const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controllerUsers.js');

router.post('/', UserController.createUser);
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);


router.delete('/:id', UserController.deleteUser);
router.get('/userpubli/:id', UserController.getUserPubli);

module.exports = router;
