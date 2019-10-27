const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true
  }
});
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
