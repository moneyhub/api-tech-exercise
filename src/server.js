const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/**
 * *. implement GET/uers/{userId}/transactions endpoint
 - 1. get an access token from the bank
 - 2. retrieve all the transactions from the bank for a given user
 - 3. format the transaction according to schema laid out in the swagger documentation 
  ( check sweggar documentation)
 - update docs for the route implemented (swagger)
 - make effective use of git
 */



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use('/users/:userId/transactions', (req, res) => res.sendStatus(200));

module.exports = app;
