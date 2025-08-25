`use strict`;

const router = require('express').Router();

require('./add_animal')(router);
require('./get_animal')(router);
require('./update_animal')(router);

module.exports = router;
