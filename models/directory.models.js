const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 20,
        },
        contenus: {
            type: [String],
            default: []
        },
        idOfUser: {
            type: String,
            required: true
        },
        idOfParent: {
            type: String,
        },
        picture: {
            type: String,
            default: "./img/directory.png"
        },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('directory', directorySchema);