const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
  
  router.get("/", (req, res) => {
    console.log('GET/root');
    res.render('index', {folders: folders});
  });
  
  router.get("/FOTOS", (req,res)=>{
      console.log('GET/FOTOS');
      res.render('fotos');
  });


module.exports = router; 