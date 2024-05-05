const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 5602;
// const routes = require('./routes/routes');

// app.use('/', routes);
app.use(express.static(__dirname + '/views/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.set("view engine", "ejs");
app.get('/favicon.ico', (req, res) => res.status(204));

const root= './data';
const urlsHistory = [];

app.get('/data', (req, res) =>{
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

app.get('/anterior', (req, res) =>{

  const dir = req.params.diretorio || '';
  
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

app.get('/:diretorio?/', (req, res) =>{
  
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


app.listen(PORT, () => {
  console.log("Listening on port 5602");
});  

