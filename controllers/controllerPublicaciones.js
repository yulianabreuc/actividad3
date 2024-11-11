const Publicacion = require('../models/modelPublicaciones');
const User = require('../models/User');
const Comment = require('../models/Comment');

class PubliController {
    async createPublicacion(req, res) {
        const { title, description, urlMedia, idUser } = req.body;
        if (!title || !description || !urlMedia) {
            res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
        } else {
            
            const user = await User.findById(idUser);
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            } else {
                try {
                    const publicacion = new Publicacion({
                        title: title,
                        description: description,
                        urlMedia: urlMedia,
                        User: user._id,
                    });
                    const newPubli = await publicacion.save();
                    res.status(201).json({ message: 'Publicacion Guardada', data: newPubli });
                } catch (error) {
                    res.status(400).json({ message: 'Error al crear la publicacion', error: error.message });
                }
            }
        }
    }
    async getPublicaciones(req, res) {
        try {
          const publicaciones = await Publicacion.find()
            .populate('User')
            .populate({
                path: 'comentarios',
                match: { idPublicacion: { $exists: true } }
            });
      
          if (!publicaciones || publicaciones.length === 0) {
            return res.status(404).json({ message: 'No hay publicaciones' });
          }
      
          res.json(publicaciones);
        } catch (error) {
          res.status(400).json({ message: 'Error al obtener publicaciones', error: error.message });
        }
      }    
    async createComentarioPubli(req, res) {
        const { idPublicacion, comment, user } = req.body;
        if (!comment || !user || !idPublicacion) {
            return res.status(400).json({ message: 'Faltan datos requeridos: comment, user' });
        }
        try {
            const publi = await Publicacion.findById(idPublicacion);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            const newComment = new Comment({
                text: comment,
                idUser: user,
                idPublicacion: idPublicacion
            });
            await newComment.save();
            res.status(201).json({ message: 'Comentario Guardado', data: newComment });
        } catch (error) {
            res.status(400).json({ message: 'Error al crear el comentario', error: error.message });
        }
    }
    async updatePublicacion(req, res) {
        const { id } = req.params;
        const { title, description, urlMedia } = req.body;
        if (!title || !description || !urlMedia) {
            return res.status(400).json({ message: 'Faltan datos requeridos: title, description, urlMedia' });
        }
        try {
            const publi = await Publicacion.findById(id);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            publi.title = title;
            publi.description = description;
            publi.urlMedia = urlMedia;
            await publi.save();
            res.status(200).json({ message: 'Publicacion Actualizada', data: publi });
        } catch (error) {
            res.status(400).json({ message: 'Error al actualizar la publicacion', error: error.message });
        }
    }
    async deletePubli(req, res) {
        const { id } = req.params;
        try {
            const publi = await Publicacion.findById(id);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            await Publicacion.findByIdAndDelete(id);
            res.status(200).json({ message: 'Publicacion Eliminada Correctamente' });
        } catch (error) {
            res.status(400).json({ message: 'Error al eliminar la publicacion', error: error.message });
        }        
    };

    async getPublicacionById(req, res) {
        const { id } = req.params;
        try {
            const publi = await Publicacion.findById(id);
            if (!publi) {
                return res.status(404).json({ message: 'Publicacion no encontrada' });
            }
            res.json(publi);
        } catch (error) {
            res.status(400).json({ message: 'Error al consultar la publicacion', error: error.message });
        }
    }

    async getComentariosByPubliId(req, res) {
        const { publicationId } = req.params;
        try {
            const comentarios = await Comment.find({ idPublicacion: publicationId }).populate('idUser')
            if (!comentarios || comentarios.length === 0) {
                return res.status(404).json({ message: 'No hay comentarios' });
            }
            res.json(comentarios);
        } catch (error) {
            res.status(400).json({ message: 'Error al obtener comentarios', error: error.message });
        }
    }
}
module.exports = new PubliController();