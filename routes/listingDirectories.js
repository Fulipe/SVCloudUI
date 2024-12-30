const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();


router.get('/', fileController.listfolders);

router.get('/*', fileController.listfolders);

router.post('/delete', fileController.delete);

router.post('/edit', fileController.edit);


module.exports = router;
