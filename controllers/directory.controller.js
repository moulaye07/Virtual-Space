const userModel = require('../models/user.model');
const directoryModel = require('../models/directory.models');
const { findById } = require('../models/directory.models');

const ObjectId = require('mongoose').Types.ObjectId; 

module.exports.readAllDirectories = (req, res) => {
    directoryModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('erreur : '+ err );
    }).sort({ createdAt: -1});

}

module.exports.readDirectory = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)

    directoryModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);

    })
}


module.exports.createDirectory = async (req, res) => {
    const newDirectory = new directoryModel({
        name:req.body.name,
        idOfUser: req.body.idOfUser,
        idOfParent: req.body.idOfParent
    });
    const parent = await directoryModel.findById(req.body.idOfParent);

    try {
        const directory = await newDirectory.save();
        await parent.updateOne({$push: {contenus : directory._id}});
        return res.status(201).json(directory);
    } catch (err) {
        return res.status(400).send(err);
    }
}

//pareil que pour la mise a jour de user voir le message
module.exports.updateDirectory = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    const newName = {
        name: req.body.name
    }
    
    directoryModel.findByIdAndUpdate(
        req.params.id,
        {$set: newName},
        {new: true},
        (err, docs) => {
            if(!err) res.send(docs);
            else console.log("erreur de mise à jour "+err);
        }
    )
}

// prendre le soin de supprimer tous les sous document et fichier de dossier
module.exports.deleteDirectory = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id);
    
    directoryModel.findByIdAndRemove(req.params.id, (err, docs)=>{
        if(!err) res.send(docs);
        else console.log("erreur de suppression "+ err);
    })
    
}