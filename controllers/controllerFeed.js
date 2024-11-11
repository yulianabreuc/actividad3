const Publicacion = require('../models/modelPublicaciones.js');
const Usuario = require('../models/User.js');
const Amistad = require('../models/Amistad.js');
const Comentario = require('../models/Comment.js');

class FeedController {
    async getFeed(req, res) {
        const solicitudesAmistad = await Amistad.find({
            estado: 'aceptado'
        });
        let latestPublications;

        if (req.body.id) {
            const { id } = req.body;
            const friends = solicitudesAmistad
                .filter(solicitud => (solicitud.userSend.toString() === id || solicitud.userReq.toString() === id))
                .map(solicitud => solicitud.userSend.toString() === id ? solicitud.userReq : solicitud.userSend);

            latestPublications = await Promise.all(friends.map(async friendId => {
                const friendPublications = await Publicacion.find({
                    idUser: friendId
                }).sort({ createdAt: -1 }).limit(1);
                return friendPublications.length > 0 ? friendPublications[0] : null;
            }));
        } else {
            const users = await Usuario.find();
            latestPublications = await Promise.all(users.map(async user => {
                const userPublications = await Publicacion.find({
                    idUser: user._id
                }).sort({ createdAt: -1 }).limit(1);
                return userPublications.length > 0 ? userPublications[0] : null;
            }));
        }

        const result = await Promise.all(latestPublications.filter(publi => publi !== null).map(async publi => {
            const publiComentarios = await Comentario.find({
                idPubli: publi._id
            });
            const user = await Usuario.findById(publi.idUser);
            return {
                ...publi.toJSON(),
                comentarios: publiComentarios,
                user: user ? { id: user._id, name: user.name, lastName: user.lastName, userName: user.userName } : null
            };
        }));

        res.json(result);
    }
    async getFeedId(req, res) {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'ID tiene que ser enviado' });
        }

        try {
            const solicitudesAmistad = await Amistad.find({
                $or: [
                    { userSend: id },
                    { userReq: id }
                ],
                estado: 'aceptado'
            });
            const friends = solicitudesAmistad.map(solicitud => 
                solicitud.userSend.toString() === id ? solicitud.userReq : solicitud.userSend
            );

            const latestPublications = await Promise.all(friends.map(async friendId => {
                const friendPublications = await Publicacion.find({
                    idUser: friendId
                }).sort({ createdAt: -1 }).limit(1);
                return friendPublications.length > 0 ? friendPublications[0] : null;
            }));

            res.json(latestPublications.filter(publi => publi !== null));
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el feed' });
        }
    }
}

module.exports = new FeedController();