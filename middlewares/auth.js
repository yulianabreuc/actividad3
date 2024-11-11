const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config/config.js');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado, No tiene persmisos' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
        return res.status(500).json({ error: 'Error al autenticar el token' });
        }
        req.userId = decoded.id;
        next();
    });
};

const verifyTokenForEdit = (req, res, next) => {
  const token = req.headers['authorization'];
  const role = req.headers['permission'];
  if (!token) {
      return res.status(403).json({ error: 'Token no proporcionado, No tiene persmisos' });
  }
  if (role=='normal') {
    return res.status(403).json({ error: 'Usuario No tiene permisos de edicion' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
      return res.status(500).json({ error: 'Error al autenticar el token' });
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
  verifyTokenForEdit
};