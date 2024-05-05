const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
  
  router.get("/", (req, res) => {
    console.log('GET/root');
    res.render('index', {folders: folders});
  });
  

module.exports = router; 