const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 20,
        },
        idOfUser: {
            type: String,
            required: true
        },
        contenu: {
            type: String,
        },
        idOfParent: {
            type: String,
        },
        picture: {
            type: String,
            default: "./img/file.png"
        },
    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('file', fileSchema);