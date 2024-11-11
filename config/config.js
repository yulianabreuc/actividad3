require('dotenv').config();

module.exports = {
    secretKey: process.env.SECRET_KEY,
    mongoURI: process.env.MONGO_URI
};

//mongoURI pasa dentro datos de las variables de entorno que deben crearse en el archivo .env