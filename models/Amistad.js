const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmistadSchema = new Schema({
    userSend: { type: Schema.Types.ObjectId, ref: 'User', unique: false },
    userReq: { type: Schema.Types.ObjectId, ref: 'User', unique: false },
    estado: { type: String, required: true, default: 'pendiente' }
});

module.exports = mongoose.model('Amistad', AmistadSchema);