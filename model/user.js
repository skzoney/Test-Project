const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true},
  firstname: {type: String, require: true},
  lastname: String,
  image: {
    data: Buffer,
    contentType: String
  }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
