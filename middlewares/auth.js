const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config/config.js');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send('Error al autenticar el token');
    }
    req.userId = decoded.id;
    next();
  });
};

// Función para generar un token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, secretKey, { expiresIn: '24h' });
};

module.exports = {
  verifyToken,
  generateToken,
};