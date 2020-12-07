const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    profilePicture: { type: String },
    profile: { type: Schema.ObjectId, ref: 'Profile' }
})

const Account = model("Account", AccountSchema);
module.exports = Account;