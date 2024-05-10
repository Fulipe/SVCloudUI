const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const root= 'data';
var urlsHistory = [ ];

router.get('/', (req, res) =>{

  var directoryPath = path.resolve(root); 

  urlsHistory.push(directoryPath);

  //tem de ser "/" porque em Linux os diretórios são separados por "/" ao contrario de Windows que é "\\"
  var urlSplit = directoryPath.split("/");
  var dir = urlSplit.slice(-1).toString();

  console.log("url split: ", dir)
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }

    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});

    var emptyDirMsg = "Diretorio vazio!";

    console.log('Pastas existentes:', folders);
    console.log(directoryPath);
    console.log(urlsHistory);
    console.log(req.originalUrl)

    res.render('index', {folders: folders, dir:dir, emptyDirMsg});
  });
});

router.get('/anterior', (req, res) =>{

  //Get last url
  var lastUrl = urlsHistory.slice(-1).toString();
  urlsHistory.pop(lastUrl)
  
  //sets last url to be shown
  var directoryPath = path.dirname(lastUrl);
  
  //tem de ser "/" porque em Linux os diretórios são separados por "/" ao contrario de Windows que é "\\"
  const urlSplit = directoryPath.split("/");
  var dir = urlSplit.slice(-1).toString();

  console.log("url split: ", urlSplit)
  console.log("typeof directorypath: ", urlSplit[-1], typeof(dir))
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }
    
    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});

    var emptyDirMsg = "Diretorio vazio!";
    
    console.log('Pastas existentes:', folders);
    console.log(directoryPath)
    console.log(urlsHistory);

    res.render('index', {folders: folders, dir:dir, emptyDirMsg});
    });
});

router.get('/:diretorio?/', (req, res) =>{
  const newDir = req.params.diretorio || ''

  var lastUrl = urlsHistory.slice(-1).toString();
  var directoryPath = path.join(lastUrl, newDir); 
  urlsHistory.push(directoryPath)


  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }

    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});

    var emptyDirMsg = "Diretorio vazio!";
    
    console.log('Pastas existentes:', folders);
    console.log(directoryPath)
    console.log(urlsHistory);
    console.log(req.originalUrl)

    res.render('index', {folders: folders, dir:newDir, emptyDirMsg});
  });
});


module.exports = router; 