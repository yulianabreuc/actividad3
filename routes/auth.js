const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../middlewares/auth.js');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  const token = generateToken(newUser);
  res.status(201).send({ token });
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send('Usuario no encontrado');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Contraseña incorrecta');
  }
  const token = generateToken(user);
  res.send({ token });
});

module.exports = router;