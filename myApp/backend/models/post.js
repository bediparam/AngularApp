const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  firstName : { type: String, required: true},
  lastName : { type: String, required: true},
  address : { type: String, required: true},
  city : { type: String, required: true},
  state : { type: String, required: true},
  postCode :{ type: Number, required: true}
});

module.exports = mongoose.model('Post', postSchema);
