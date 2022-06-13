const router = require('express').Router();
const directoryController = require('../controllers/directory.controller');
const directoryModel = require('../models/directory.models');
const fileModel = require('../models//file.models');


router.get('/', directoryController.readAllDirectories);
//router.get('/:id', directoryController.readDirectory);
router.post('/', directoryController.createDirectory);
router.put('/:id', directoryController.updateDirectory);
router.delete('/:id', directoryController.deleteDirectory);


router.get("/:idOfParent", async (req, res) => {
    try {
        const childreen = await directoryModel.find({
            idOfParent: req.params.idOfParent,
        });
        const child = await fileModel.find({
            idOfParent: req.params.idOfParent,
        });
        child.forEach((c) => {
            childreen.push(c)
        });
        res.status(200).json(childreen);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/current/:id", async (req, res) => {
    try {
        const current = await directoryModel.find({
            _id: req.params.id,
        });
        const currentInFile = await fileModel.find({
            _id: req.params.id,
        });
        currentInFile.forEach((c) => {
            current.push(c)
        });
        res.status(200).json(current);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;