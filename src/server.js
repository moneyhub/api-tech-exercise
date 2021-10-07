const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { getToken } = require('./get-client-credentials-grant-token');

//probably this details will be in integartions db in real world ?
const clientId = 'ba1bdcc0-60f5-4939-afc4-1b13a98dc490';
const clientSecret = '6f1afff8-eb81-4945-8b91-a05e3d095ce3';

/**
 * *. implement GET/uers/{userId}/transactions endpoint
 - 1. get an access token from the bank v
 - 2. retrieve all the transactions from the bank for a given user
 - 3. format the transaction according to schema laid out in the swagger documentation 
  ( check sweggar documentation)
 - update docs for the route implemented (swagger)
 - make effective use of git
 */



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use('/users/:userId/transactions', async(req, res) => {

    const { access_token } = await fetchToken();
    console.log(access_token)
    return  res.status(200).send({data: {test: 'yoyo' }});
})

function fetchToken() {
    const details = {
        clientId,
        clientSecret,
        scope:'transactions',
        tokenEndpoint: 'https://obmockaspsp.moneyhub.co.uk/api/token'
    }

    try {
        return getToken(details).then(res => JSON.parse(res.body))
    } catch (e) {
        console.log(e,' show me error')
    }
}

module.exports = app;
