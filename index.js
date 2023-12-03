const express = require('express')
const morgan = require('morgan');

const dotenv = require('dotenv').config();

const port = process.env.port || 3000;
const environment = process.env.NODE_ENV || 'development';

const app = express()


app.get('/', (req, res) => {
  res.status(200).send({
    message: 'server running'
  });
});

app.listen(port, () => {
  console.log(`Server is running in at http://localhost:${port} in ${environment}`);
});