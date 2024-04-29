const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 5602;

app.use(express.static(__dirname + '/views/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.set("view engine", "ejs");


// Diretório scaneado
const directoryPath = path.resolve('/home/filipe'); //diretorio que root
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
  
  app.get("/", (req, res) => {
    console.log('GET/');
    res.render('index', {folders: folders});
  });

});

app.listen(PORT, () => {
  console.log("Listening on port 5602");
});  

