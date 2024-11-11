const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerAmistad.js');

router.get('/', Controller.getSolicitudesAmistad);
router.post('/', Controller.createSolicitudAmistad);
router.put('/:id', Controller.updateSolicitudAmistad);
router.delete('/:id', Controller.deleteSolicitudAmistad);

module.exports = router;