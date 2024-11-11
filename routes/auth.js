const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../middlewares/auth.js');
const router = express.Router();
const UserController = require('../controllers/controllerUsers.js')

// Registro de usuario
router.post('/register', UserController.createUser);

// Inicio de sesión de usuario
router.post('/login', UserController.loginUser);

module.exports = router;