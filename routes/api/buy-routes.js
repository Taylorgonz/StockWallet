const router = require('express').Router();
const { Buy } = require("../../models");
const { restore } = require('../../models/Buy');

router.get('/', (req,res) => {
    Buy.findAll({
        attributes: [
            'id',
            'name',
            'symbol',
            'price',
            'amount',
            'created_at'
        ]
    })
    .then(boughtData => res.json(boughtData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
})



router.post('/', (req, res) => {
   Buy.create({
        name: req.body.name,
        symbol: req.body.symbol,
        price: req.body.price,
        amount: req.body.amount
    })
    .then(boughtData => res.json(boughtData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;
