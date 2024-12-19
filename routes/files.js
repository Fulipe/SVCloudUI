const express = require('express');
const fileController = require('../controllers/fileController');
const router = express.Router();

router.get('/*', fileController.getfile);

module.exports = router;