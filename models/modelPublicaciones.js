const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicacionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  urlMedia: { type: String, required: true, unique: false },
  User: { type: Schema.Types.ObjectId, ref: 'User', unique: false },
  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Publicacion', PublicacionSchema);