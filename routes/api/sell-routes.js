const router = require('express').Router();
const { Sell } = require("../../models");

router.get('/', (req,res) => {
    Sell.findAll({
        attributes: [
            'id',
            'name',
            'symbol',
            'price',
            'exchange',
            'amount',
            'total',
            'created_at'
        ]
    })
    .then(sellData => res.json(sellData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
})


router.post('/', (req, res) => {
    Sell.create({
        name: req.body.name,
        symbol: req.body.symbol,
       price: req.body.price,
        exchange: req.body.exchange,
        amount: req.body.amount,
        total: req.body.total
    })
    .then(sellData => res.json(sellData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;