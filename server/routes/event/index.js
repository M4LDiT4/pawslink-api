`use strict`

const router = require("express").Router();

require('./add_event')(router);
require('./get_event')(router);
require('./get_event_update')(router);

module.exports = router;