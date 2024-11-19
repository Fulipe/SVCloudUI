const session = require('express-session');
const express = require('express');
const routes = require('./routes/routes');

const app = express()
const PORT = 5602;

app.use(session({
  secret: 'mysecret', 
  resave: false,
  saveUninitialized: true,
}));

app.set("view engine", "ejs"); 
app.use(express.static(__dirname + '/views/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.get('/favicon.ico', (req, res) => res.status(204));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

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

