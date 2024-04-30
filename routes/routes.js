const express = require('express')
const router = express.Router()

router.get("/FOTOS", (req,res)=>{
    console.log('GET/FOTOS');
    res.render('fotos');
});

module.exports = router; 