const {hackatonContract, web3} = require("../../services/web3.service");

let addresses = [{address:"0xc1106644aA31270ce24B219aD2D388ec5Fa287FF", balance:0},
                 {address:"0xDDba074Def7E88C02BE192Ab66Dc37B95A894E80", balance:0},
                 {address:"0x0c6BFf59cE1483E892baF89174350Db0689E64B3", balance:0},
                 {address:"0x1B472766E90ce1155b1818ae1F41Ad71428A14BF", balance:0},
                 {address:"0x290F495aAb632b7Dab7938A84672037dE0C64Dcb", balance:0},
                 {address:"0x26202ba0d1fE2603F6Ccd7e280dD24bb7d672D20", balance:0},
                 {address:"0x22789DbC64086217643E351990218a1A8F2Ae602", balance:0},
                 {address:"0x421768eb70C687321eAbEf18Fa5c0d673097eF54", balance:0},
                 {address:"0xE6533E1f4404a0F3310E7d4f6888766663f5Af09", balance:0},
                 {address:"0xAAa2424e4b12CE8ae6f2a787C93E245316Ae1b8F", balance:0}];

let userAccounts = [];

exports.newAccount = async (req, res) => {

    userAccounts.push({userId:req.body.userId, account:addresses[userAccounts.length]})

    res.status(201).send({"success": true, data: userAccounts[userAccounts.length-1]});

};

exports.fundAccount = async (req, res) => {

    userAccount = userAccounts.find(o => o.userId === req.body.userId);

    userAccount.account.balance += req.body.value;

    return res.status(201).send({"success": true, data: {"balance":userAccount.account.balance}});

};

exports.sendToken = async (req, res) => {

    userAccount = userAccounts.find(o => o.userId === req.body.userId);
    receiverAccount = userAccounts.find(o => o.userId === req.body.receiverId);

    userAccount.account.balance -= req.body.value;
    receiverAccount.account.balance += req.body.value;

    return res.status(201).send({"success": true, data: {"senderBalance":userAccount.account.balance,"receiverBalance":receiverAccount.account.balance}});
};

exports.getBalance = async (req, res) => {

    userAccount = userAccounts.find(o => o.userId === req.body.userId);
    
    return res.status(201).send({"success": true, data: userAccount.account.balance});
};

