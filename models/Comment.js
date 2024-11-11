const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  idUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  idPublicacion: { type: Schema.Types.ObjectId, ref: 'Publicacion', required: true, index: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);