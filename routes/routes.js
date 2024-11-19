const express = require('express');
// const session = require('express-session');
// const multer = require('multer')
const fileController = require('../controllers/fileController');
const router = express.Router();

// request post para lidar com refresh na página

router.post('/navInfo', (req, res) => {
    console.log("req reload: " + req.body.isReload)
    req.session.isReload = req.body.isReload;
    console.log("req reload: " + req.session.isReload)
    res.sendStatus(200)
});

router.get('/', fileController.listroot)

router.get('/forward', fileController.goforward);

router.get('/back', fileController.goback);

router.get('/createdir', fileController.mkdir);
router.post('/createdir', fileController.mkdirPost);

router.post('/delete', fileController.rmdir)

router.get('/folders/:directory?', fileController.listfolders);
// router.get('/:directory?', fileController.listfiles);

module.exports = router;
