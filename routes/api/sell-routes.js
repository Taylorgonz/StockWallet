const router = require('express').Router();
const { Sell } = require("../../models");

router.get('/', (req,res) => {
    Sell.findAll({
        attributes: [
            'id',
            'name',
            'symbol',
            'bough_price',
            'sold_price',
            'amount',
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
        bought_price: req.body.bought_price,
        sold_price: req.body.sold_price,
        amount: req.body.amount
    })
    .then(sellData => res.json(sellData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;