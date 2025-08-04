const router = require('express').Router();

router.use('/', require('./api'));
router.use('/auth', require('./authentication'));
router.use('/animal-database', require('./animal_database'));
router.use('/event-repository', require('./event'));

router.use((req, res) => {
   res.status(404).json({
      error: `${req.path} not found`
   });
});


module.exports = router;
