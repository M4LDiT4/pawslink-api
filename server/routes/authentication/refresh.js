`use strict`;

const controller = require('../../controllers/authentication').refresh;

module.exports = (router) => {
   router.post('/refresh', controller);
};
