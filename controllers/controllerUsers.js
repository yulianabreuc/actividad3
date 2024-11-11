const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../middlewares/auth');
class UserController {
    async createUser(req, res) {
        try {
            if (req.body.password !== req.body.repassword) {
                return res.status(400).json({ message: 'Contraseñas no Coinciden' });
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                name: req.body.name,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                password: hashedPassword,
                permission: 'normal'
            });
            const newUser = await user.save();
            const token = generateToken(newUser);
            res.status(201).send({ datauser: newUser, token: token });
            //res.status(201).json(newUser);
            console.log("guardado Exitosamente")
        } catch (error) {
            res.status(400).json({ message: 'Error al crear el usuario', error: error.message });
        }
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
    
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(500).json({ message: 'Usuario no encontrado' });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                return res.status(500).json({ message: 'Contraseña incorrecta' });
            }
    
            const token = generateToken(user);
            res.status(200).send({ token });
        } catch (error) {
            console.error('Error logging in:', error);
            res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getUser(req, res) {
        const { id } = req.params;
        const user = await User.findOne({ id: id });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    }

    async updateUser(req, res) {
        const { email, name, lastName, userName, password } = req.body;
        const { id } = req.params;
        try {
            const user = await User.findOne({ id: id });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
            if (email) user.email = email;
            if (name) user.name = name;
            if (lastName) user.lastName = lastName;
            if (userName) user.userName = userName;
            if (password) user.password = await bcrypt.hash(password, 10);
            const updatedUser = await user.save();
            res.status(200).json({ message: 'Usuario Actualizado', data: updatedUser });
        } catch (error) {
            res.status(400).json({ message: 'Error al actualizar el usuario', error: error.message });
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params;
        const user = await User.findOne({ id: id });
        if (!user) {
            return res.status(404).json({ message: 'No Existe un User con el Id Enviado' });
        } else {
            /*const publicaciones = Model.getUserPublicacionesById(id);
            if (publicaciones && publicaciones.length > 0) {
                return res.status(400).json({ message: 'El usuario tiene publicaciones y no puede ser eliminado' });
            }*/
            await User.deleteOne({ id: id });
            res.status(200).json({ message: 'Usuario Eliminado' });
        }
    }

    getUserPubli(req, res) {
        const { id } = req.params;
        //const userPublicaciones = Model.getUserPublicacionesById(id);
        if (!userPublicaciones) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json(userPublicaciones);
        }
    }
}

module.exports = new UserController();
