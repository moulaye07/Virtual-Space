const { send } = require('express/lib/response');
const userModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req,res) => {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userData = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)

    userModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('Identifiant inconnu : ' + err);

    }).select('-password');
}


//attention verifier si user n'est pas encore supprimmé et cripté le mot de passe
module.exports.updateUserData = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)
    try {
        await userModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    username: req.body.username,
                    role: req.body.role
                }
            },
            { 
                new: true,
                upsert: true,
                setDefaultsOnInsert: true 
            },
            (err, docs) => {
                if(!err) return res.send(docs);
                if(err) return res.status(500);send({message : err});
            }
        )
    } catch (err) {
        return res.status(500);send({message : err});
    }
}

// attention verification si user n'est pas deja supprimé sinon le serveur va planter
module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('Identifiant inconnu : ' + req.params.id)
    
    try {
        await userModel.remove({_id: req.params.id}).exec();
    } catch (err) {
        return res.status(500).json({message : err});  
    }

}