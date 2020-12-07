const { Schema, model } = require('mongoose');

const ProfileSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, default: "user" },
})

const Profile = model("Profile", ProfileSchema);
module.exports = Profile;
