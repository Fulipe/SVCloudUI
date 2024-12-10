const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();

// router.get('/forward', fileController.goforward);
// router.get('/back', fileController.goback);

router.get('/createdir', fileController.mkdir);
router.post('/createdir', fileController.mkdirPost);

module.exports = router;
