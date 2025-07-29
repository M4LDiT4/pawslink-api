const router = require('express').Router();

router.use('/', require('./api'));
router.use('/auth', require('./authentication'));
router.use('/animal-database', require('./animal_database'));
router.use('/event-repository', require('./event'));

module.exports = router;
