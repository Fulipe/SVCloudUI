const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();

router.get('/uploadFile', fileController.uploadFile);
router.post('/uploadFile', fileController.multerUpload, fileController.uploadFilePost);

router.get('/*', fileController.getfile);

module.exports = router;