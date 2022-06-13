const router = require('express').Router();
const fileController = require('../controllers/file.controller');

router.get('/', fileController.readAllFiles);
router.get('/:id', fileController.readFile);
router.post('/', fileController.createFile);
router.put('/:id', fileController.updateFile);
router.delete('/:id', fileController.deleteFile);


module.exports = router;