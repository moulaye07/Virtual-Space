const userModel = require('../models/user.model');
const fileModel = require('../models/file.models');
const { findById } = require('../models/file.models');
const directoryModels = require('../models/directory.models');

const ObjectId = require('mongoose').Types.ObjectId; 


module.exports.readAllFiles = (req, res) => {
    fileModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('erreur : '+ err );
    }).sort({ createdAt: -1});

}

module.exports.readFile = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)

    fileModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);
 
    })
}


module.exports.createFile = async (req, res) => {
    const newFile = new fileModel({
        name: req.body.name,
        contenu: req.body.contenu,
        idOfUser: req.body.idOfUser,
        idOfParent: req.body.idOfParent
    });
    const parent = await directoryModels.findById(req.body.idOfParent);

    try {
        const file = await newFile.save();
        await parent.updateOne({$push: {contenus : file._id}});
        return res.status(201).json(file);
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.updateFile = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    const newFile = {
        contenu: req.body.contenu,
        name: req.body.name
    }
    
    fileModel.findByIdAndUpdate(
        req.params.id,
        {$set: newFile},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("erreur de mise à jour "+err);
        }
    )
}

module.exports.deleteFile = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    fileModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs);
        else console.log("erreur de suppression "+ err);
    })
    
}



