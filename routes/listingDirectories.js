const express = require('express');
// const session = require('express-session');
// const multer = require('multer')
const fileController = require('../controllers/fileController');
const router = express.Router();

// request post para lidar com refresh na página

router.get('/', fileController.listfolders)

router.get('/forward', fileController.goforward);

router.get('/back', fileController.goback);

router.post('/delete', fileController.rmdir)

// router.post('/folders', fileController.listfolders);
router.get('/*', fileController.listfolders);
// router.get('/:directory?', fileController.listfiles);

module.exports = router;
