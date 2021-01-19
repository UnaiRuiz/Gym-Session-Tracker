const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

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

UserSchema.methods.encryptPassword = async (Password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(Password, salt);
};

UserSchema.methods.matchPassword = async function (Password) {
    return await bcrypt.compare(Password, this.Password);
};

module.exports = model("User", UserSchema);