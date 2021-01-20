const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: false,
    },
});

module.exports = model("User", UserSchema);