const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.store);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.destroy);

module.exports = router;
