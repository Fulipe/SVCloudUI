const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();

router.get('/createdir', fileController.mkdir);
router.post('/createdir', fileController.mkdirPost);

module.exports = router;
