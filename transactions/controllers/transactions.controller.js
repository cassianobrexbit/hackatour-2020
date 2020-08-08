const {hackatonContract, web3} = require("../../services/web3.service");

let userAccounts = [];

exports.newAccount = async (req, res) => {

    await web3.eth.getAccounts().then(function(acc){
        accounts=acc;
        userAccounts.push({userId:req.body.userId, account:accounts[userAccounts.length]})
        return (accounts[req.body.userId]);
    });
    
    res.status(201).send({"success": true, data: userAccounts[userAccounts.length-1]});

};

exports.fundAccount = async (req, res) => {

    let tx = await web3.eth.getAccounts().then(function(acc){
        accounts=acc;

        console.log(accounts)

        return hackatonContract.methods.transfer(accounts[req.body.userId], req.body.value).send({from:accounts[0]});
    });

    return res.status(201).send({"success": true, data: {value:tx.events.Transfer.returnValues.tokens, address:tx.events.Transfer.returnValues.to}});

};

exports.sendToken = async (req, res) => {

    let tx = await web3.eth.getAccounts().then(function(acc){
        accounts=acc;

        return hackatonContract.methods.transfer(accounts[req.body.receiverId], req.body.value).send({from:accounts[req.body.userId]});
    });

    return res.status(201).send({"success": true, data: {"success": true, data: {value:tx.events.Transfer.returnValues.tokens, from:tx.events.Transfer.returnValues.from, to:tx.events.Transfer.returnValues.to}}});
};

exports.getBalance = async (req, res) => {

    let balance = await web3.eth.getAccounts().then(async function(acc){
        accounts=acc;
        return await hackatonContract.methods.balanceOf(accounts[req.body.userId]).call();
    });
    
    return res.status(201).send({"success": true, data: balance});
};

