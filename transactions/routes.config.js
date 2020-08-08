const TransactionsController = require('./controllers/transactions.controller');

exports.routesConfig = function (app) {

    app.post('/api/v1/account', [
        TransactionsController.newAccount
    ]);

    app.post('/api/v1/fund', [
        TransactionsController.fundAccount
    ]);

    app.post('/api/v1/transfer', [
        TransactionsController.sendToken
    ]);

    app.get('/api/v1/balance', [
        TransactionsController.getBalance
    ]);

};