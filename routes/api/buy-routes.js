const router = require('express').Router();
const { Buy } = require("../../models");
const { restore } = require('../../models/Buy');

router.get('/', (req, res) => {
    Buy.findAll({
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
        exchange: req.body.exchange,
        amount: req.body.amount,
        total: req.body.total

    })
        .then(boughtData => res.json(boughtData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        })
})
router.put('/:id', (req, res) => {
    Buy.findOne({
        where: {
            id: req.params.id
        }
    }).then(boughtData => {
        
        Buy.update(req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        )
            .then(boughtData => {
                if (!boughtData) {
                    res.status(404).json({ message: "None found" });
                    return;
                }
                res.json(boughtData[1]);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });


});

router.delete('/:id', (req, res) => {
    Buy.findOne({
        where: {
            id: req.params.id
        }
    }).then(boughtData => {

        Buy.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(boughtData => {
                if (!boughtData) {
                    res.status(404).json({ message: "No bought found" });
                    return;
                }
                res.json(boughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});
module.exports = router;
