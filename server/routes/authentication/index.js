`use strict`

const router = require("express").Router();

require("./sign_in")(router);
require("./sign_up")(router);

module.exports = router;