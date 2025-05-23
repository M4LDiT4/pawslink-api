`use strict`;

const router = require('express').Router();

require('./sign_in')(router);
require('./sign_up')(router);
require('./refresh')(router);

module.exports = router;
