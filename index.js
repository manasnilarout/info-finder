require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');

const package = require('./package.json');
const { getDataFromAthena } = require('./app');
const { getQueryString } = require('./helpers/athenaQueries');

const ROUTES = {
    ROOT: '/',
    CUSTOMER_INFO: '/loan-account-info',
    APP: '/app',
};

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(ROUTES.APP, express.static('./html'));

app.listen(Number(process.env.PORT) || 3000, () => {
    console.log(`Listening on port: ${Number(process.env.PORT)}`);
});

app.get(ROUTES.ROOT, (req, res) => {
    res.send({
        name: package.name,
        version: package.version,
        description: package.description
    });
});

app.get(ROUTES.CUSTOMER_INFO, async (req, res) => {
    const qs = getQueryString('CUSTOMER_LOAN_ACCOUNT_ADDRESS', req.query.loanId);
    console.log('Query => ', qs);
    const result = await getDataFromAthena(qs);
    res.send(result);
});
