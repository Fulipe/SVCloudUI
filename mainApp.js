const express = require('express');
const app = express();
const fs = require('fs');
const { url } = require('inspector');
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
  var directoryPath = path.resolve(root); //diretorio que root
  // Diretório scaneado
  urlsHistory.push(directoryPath);
  // const directoryPath = path.resolve(__dirname + '/data') //diretorio usado pela maquina

  // Lista os arquivos e pastas no diretório
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }
    // Filtra e mostra apenas as pastas e ficheiros que não tenham '.' no inicio. 
    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});//filter(file => fs.statSync(path.join(directoryPath, file)).isDirectory());
    // Mostra as pastas encontradas
    console.log('Pastas existentes:', folders);
    console.log(directoryPath);
    console.log(urlsHistory);
    console.log(req.originalUrl)

    res.render('index', {folders: folders, dir:req.url});
  });
});

app.get('/anterior', (req, res) =>{
  // Diretório scaneado

  const dir = req.params.diretorio || '';//valor de <%=file%> no index
   
  var lastUrl = urlsHistory.slice(-1).toString();
  urlsHistory.pop(lastUrl)
  // var lastUrl = urlsHistory[-1].toString();
  
  // const directoryPath = path.resolve(__dirname + '/data') //diretorio usado pela maquina

  var directoryPath = path.dirname(lastUrl); //diretorio que root

  // Lista os arquivos e pastas no diretório
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }
    
    // Filtra e mostra apenas as pastas e ficheiros que não tenham '.' no inicio. 
    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});//filter(file => fs.statSync(path.join(directoryPath, file)).isDirectory());
    
    // Mostra as pastas encontradas
    console.log('Pastas existentes:', folders);
    console.log(directoryPath)
    console.log(urlsHistory);

    res.render('index', {folders: folders, dir:dir});
    });
});

app.get('/:diretorio?/', (req, res) =>{
  
  // Diretório scaneado

  const dir = req.params.diretorio || '';//valor de <%=file%> no index
  var lastUrl = urlsHistory.slice(-1).toString();
  // const directoryPath = path.resolve(__dirname + '/data') //diretorio usado pela maquina

  var directoryPath = path.join(lastUrl, dir); //diretorio que root
  urlsHistory.push(directoryPath)


  // Lista os arquivos e pastas no diretório
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Erro ao ler diretório:', err);
      return;
    }
    // Filtra e mostra apenas as pastas e ficheiros que não tenham '.' no inicio. 
    var pattern = '.';
    const folders = files.filter((str) => {return !str.startsWith(pattern)});//filter(file => fs.statSync(path.join(directoryPath, file)).isDirectory());
    // Mostra as pastas encontradas
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

