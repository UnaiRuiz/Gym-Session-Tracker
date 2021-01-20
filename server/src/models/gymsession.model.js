const {Schema, model} = require("mongoose");

const GymSessionSchema = new Schema({
    Date: {
        type: Date,
        required: true,
    },
    Duration: {
        type: Number,
        required: false,
    },
    Description: {
        type: String,
        required: false,
    },
    Sup: {
        type: Boolean,
        required: false,
    },
    UserId: {
        type: String,
        required: false,
    }
});

module.exports = model("Gymsession", GymSessionSchema);