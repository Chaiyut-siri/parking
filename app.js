const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());

app.route('').get( (req, res) => {
  res.send('Hello World');
});


const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log('server is running on port: ', port);
});