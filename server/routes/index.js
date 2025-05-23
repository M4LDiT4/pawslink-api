const router = require('express').Router();

router.use('/', require('./api'));
router.use('/auth', require('./authentication'));

module.exports = router;
