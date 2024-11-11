const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerPublicaciones.js');

router.post('/', Controller.createPublicacion);
router.get('/', Controller.getPublicaciones);
router.post('/comment', Controller.createComentarioPubli);
router.get('/comment/:publicationId', Controller.getComentariosByPubliId);
router.put('/:id', Controller.updatePublicacion);
router.delete('/:id', Controller.deletePubli);
router.get('/:id', Controller.getPublicacionById);


module.exports = router;