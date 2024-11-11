const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { mongoURI } = require('./config/config.js');

// Conectar a MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));


const routesUsers = require('./routes/routesuser.js');
const routesPublicaciones = require('./routes/routespublicaciones.js');
const routesAmi = require('./routes/routesamistad.js');
const routesfeed = require('./routes/routesfeed.js');

app.set('view engine', 'pug');
app.set('views', './views'); 

app.use(express.json());

app.use('/api/users', routesUsers);
app.use('/api/publi', routesPublicaciones);
app.use('/api/amistad', routesAmi);
app.use('/api/feed', routesfeed);

const { getUsers, getFeed } = require('./models/models.js');
const Publicacion = require('./models/modelPublicaciones.js');
const path = require('path');

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});
app.get('/feed', (req, res) => {
    const feed = getFeed();
    res.render('feed', { welcomeMessage: 'Bienvenido a feed de user', feed: feed });
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));});
app.use((req, res, next) => {
    res.status(404).send('Ruta no encontrada');
});
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});