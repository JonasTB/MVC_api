const router = require('express').Router();
const controller = require('../controller/user');

router.post('/create', controller.create);
router.get('/', controller.getMany);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;