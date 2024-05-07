const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const root= './data';
const urlsHistory = [];

router.get('/', (req, res) =>{
  var directoryPath = path.resolve(root); 

  urlsHistory.push(directoryPath);
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }

    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});

    console.log('Pastas existentes:', folders);
    console.log(directoryPath);
    console.log(urlsHistory);
    console.log(req.originalUrl)

    res.render('index', {folders: folders, dir:req.url});
  });
});

router.get('/anterior', (req, res) =>{

  const dir = directoryPath;
  
  var lastUrl = urlsHistory.slice(-1).toString();
  urlsHistory.pop(lastUrl)

  var directoryPath = path.dirname(lastUrl);

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }
    
    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});
    
    console.log('Pastas existentes:', folders);
    console.log(directoryPath)
    console.log(urlsHistory);

    res.render('index', {folders: folders, dir:dir});
    });
});

router.get('/:diretorio?/', (req, res) =>{
  
  const dir = req.params.diretorio || '';
  var lastUrl = urlsHistory.slice(-1).toString();

  var directoryPath = path.join(lastUrl, dir); 
  urlsHistory.push(directoryPath)


  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }

    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});

    console.log('Pastas existentes:', folders);
    console.log(directoryPath)
    console.log(urlsHistory);
    console.log(req.originalUrl)

    res.render('index', {folders: folders, dir:dir});
    });
});


module.exports = router; 