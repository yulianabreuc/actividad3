const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerPublicaciones.js');
const { verifyTokenForEdit } = require('../middlewares/auth.js');

router.post('/', Controller.createPublicacion);
router.get('/', Controller.getPublicaciones);
router.post('/comment', Controller.createComentarioPubli);
router.get('/comment/:publicationId', Controller.getComentariosByPubliId);
router.put('/:id', verifyTokenForEdit, Controller.updatePublicacion);
router.delete('/:id', verifyTokenForEdit, Controller.deletePubli);
router.get('/:id', Controller.getPublicacionById);


module.exports = router;