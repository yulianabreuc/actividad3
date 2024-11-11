const Amistad = require('../models/Amistad.js');

class AmistadController {
    async getSolicitudesAmistad(req, res){
        const solicitudes = await Amistad.find();
        res.status(200).json(solicitudes);
    }
    async createSolicitudAmistad(req, res){
        const { userSend, userReq } = req.body;
        if (!userSend || !userReq) {
            return res.status(400).json({ error: 'Se requieren tanto userSend como userReq' });
        } else if (userSend === userReq) {
            return res.status(400).json({ error: 'userSend y userReq no pueden ser el mismo usuario' });
        } else {
            const relacion = await Amistad.findOne({ userSend, userReq });
            if (relacion) {
                if (relacion.estado === 'pendiente' || relacion.estado === 'aceptado') {
                    return res.status(400).json({ error: 'Ya existe una solicitud de amistad pendiente entre estos usuarios' });
                } else if (relacion.estado === 'agregado') {
                    return res.status(400).json({ error: 'Estos usuarios ya son amigos' });
                } else if (relacion.estado === 'rechazado') {
                    req.body.estado = 'pendiente';
                    const SolActu = await Amistad.findByIdAndUpdate(relacion._id, req.body, { new: true });
                    res.status(201).json({ message: 'solicitud Modificada', SolActu });
                }else{
                    res.status(201).json({ message: 'No entra en niguna condi' });
                }
            } else {
                req.body.estado = 'pendiente';
                const solCreada = await Amistad.create(req.body);
                res.status(201).json({ message: 'solicitud Guardada', solCreada });
            }
        }
    }
    async updateSolicitudAmistad(req, res){
        const { id } = req.params;
        const { estado } = req.body;
        if (!estado) {
            return res.status(400).json({ error: 'Se requiere el estado de la solicitud' });
        } else {
            const sol = await Amistad.findById(id);
            if (!sol) {
                return res.status(404).json({ error: 'Solicitud no encontrada' });
            } else {
                const SolActu = await Amistad.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json({ message: 'Solicitud Modificada', SolActu });
            }
        }
    }
    async deleteSolicitudAmistad(req, res){
        const { id } = req.params;
        const sol = await Amistad.findById(id);
        if (!sol) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        } else {
            await Amistad.findByIdAndDelete(id);
            res.status(200).json({ message: 'Solicitud Eliminada' });
        }
    }
}

module.exports = new AmistadController();