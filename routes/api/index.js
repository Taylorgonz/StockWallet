const router = require('express').Router();

const buyRoutes = require('./buy-routes');
const sellRoutes =require('./sell-routes');

router.use('/buy', buyRoutes);
router.use('/sell', sellRoutes);

module.exports = router;