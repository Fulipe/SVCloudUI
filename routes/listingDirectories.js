const express = require('express');
// const multer = require('multer')
const fileController = require('../controllers/fileController');
const router = express.Router();


router.get('/', fileController.listfolders);

router.get('/*', fileController.listfolders);

router.post('/delete', fileController.rmdir);

router.post('/edit', fileController.editdir);


module.exports = router;
