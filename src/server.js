const express = require('express');

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { getToken, getTransactionsByAccountId } = require('./get-client-credentials-grant-token');
const { mapTransactionData } = require('./utils/utils');

//probably this details will be in integartions db in real world ?
const clientId = 'ba1bdcc0-60f5-4939-afc4-1b13a98dc490';
const clientSecret = '6f1afff8-eb81-4945-8b91-a05e3d095ce3';

/**
 * *. implement GET/uers/{userId}/transactions endpoint
 - update docs for the route implemented (swagger)
 */



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req, res) => res.status(200).send('healthy'))
app.use('/users/:userId/transactions', async(req, res) => {

    const { access_token } = await fetchToken();
    const { userId } = req.params;

    const transactions = await fetchTransaction(access_token, userId);
    console.log(transactions.Data.Transactions)

    const mappedTransactions = mapTransactionData((transactions.Data.Transactions));

    return  res.status(200).send({data: mappedTransactions});
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
