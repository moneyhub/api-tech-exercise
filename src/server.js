const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { getToken, getTransactionsByAccountId } = require('./get-client-credentials-grant-token');

//probably this details will be in integartions db in real world ?
const clientId = 'ba1bdcc0-60f5-4939-afc4-1b13a98dc490';
const clientSecret = '6f1afff8-eb81-4945-8b91-a05e3d095ce3';

/**
 * *. implement GET/uers/{userId}/transactions endpoint


 - 3. format the transaction according to schema laid out in the swagger documentation 

  * {
  "data": [
    {
      "id": "c83f307c-7c67-44b1-a277-1bb533cdaf5c",
      "accountId": "8066de10-79c6-495a-9f6b-3b1a5eb0b023",
      "amount": 799,
      "date": "2021-09-04T23:00:00.000Z",
      "description": "Netflix subscription",
      "status": "posted"
    }
  ]
}

  ( check sweggar documentation)
 - update docs for the route implemented (swagger)
 - make effective use of git
 */



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => res.status(200).send('healthy'))
app.use('/users/:userId/transactions', async(req, res) => {

    const { access_token } = await fetchToken();
    const { userId } = req.params;

    const transactions = await fetchTransaction(access_token, userId);
    console.log(transactions.Data.Transactions)

    return  res.status(200).send({data: {test: 'yoyo' }});
})

function fetchToken() {
    const secrets = {
        clientId,
        clientSecret,
        scope:'transactions',
        tokenEndpoint: 'https://obmockaspsp.moneyhub.co.uk/api/token'
    }

    try {
        return getToken(secrets).then(res => JSON.parse(res.body))
    } catch (e) {
        console.log(e,' show me error')
    }
}

function fetchTransaction(access_token, accountId) {
    const secrets = {
        clientId,
        clientSecret,
        access_token,
        tokenEndpoint: `https://obmockaspsp.moneyhub.co.uk/api/users/${accountId}/transactions`
    }

    try {
        return getTransactionsByAccountId(secrets).then(res => JSON.parse(res.body))
    } catch(e) {
        console.log(e)
    }
}

module.exports = app;
