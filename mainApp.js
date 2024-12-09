const express = require('express');
const listingDirectories = require('./routes/listingDirectories');
const navigation = require('./routes/navigation');

const app = express()
const PORT = 5602;

app.set("view engine", "ejs"); 
app.use(express.static(__dirname + '/views/'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
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

//////////////////////////////////////////////////////////////////////////////////////////////

// const express = require('express');
// const app = express();
// const PORT = 5602;
// const routes = require('./routes/routes');

// app.set("view engine", "ejs"); 
// app.use(express.static(__dirname + '/views/'));
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.get('/favicon.ico', (req, res) => res.status(204));
// app.use('/api', routes);

// app.listen(PORT, () => {
//   console.log("Listening on port " + PORT);
// });  

