const express = require('express');
const listingDirectories = require('./routes/listingDirectories');
const navigation = require('./routes/navigation');

const app = express()
const PORT = 5602;

app.set("view engine", "ejs"); 
app.use(express.static(__dirname + '/views/'));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/css', express.static(__dirname + '/views/styles'));
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sempre que se abre a app dá redirect para o middleware das routes
app.get('/', (req, res)=>{
  res.redirect('/data')
})

//Middleware para ir buscar routes
app.use('/data', listingDirectories);
app.use('/navigation', navigation);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
