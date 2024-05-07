const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = 5602;
const routes = require('./routes/routes');

app.use(express.static(__dirname + '/views/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.set("view engine", "ejs");
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/', routes);

app.listen(PORT, () => {
  console.log("Listening on port 5602");
});  

