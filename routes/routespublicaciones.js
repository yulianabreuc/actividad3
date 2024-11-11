const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerPublicaciones.js');
const { verifyTokenForEdit, verifyToken } = require('../middlewares/auth.js');

router.post('/', verifyToken, Controller.createPublicacion);
router.get('/', verifyToken, Controller.getPublicaciones);
router.post('/comment', verifyToken, Controller.createComentarioPubli);
router.get('/comment/:publicationId', verifyToken, Controller.getComentariosByPubliId);
router.put('/:id', verifyTokenForEdit, Controller.updatePublicacion);
router.delete('/:id', verifyTokenForEdit, Controller.deletePubli);
router.get('/:id', verifyToken, Controller.getPublicacionById);


module.exports = router;