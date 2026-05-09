const { Router } = require('express');
const ModifiesController = require('../controllers/ModifiesController');

const router = Router();

router.get('/', ModifiesController.index);
router.get('/:id', ModifiesController.show);
router.post('/', ModifiesController.store);
router.put('/:id', ModifiesController.update);
router.delete('/:id', ModifiesController.destroy);

module.exports = router;
