const router = require('express').Router();
const controller = require('../controller/user');

router.post('/create', controller.create);

module.exports = router;