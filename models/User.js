const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  permission: { type: String, required: true }
});

UserSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('User', UserSchema);