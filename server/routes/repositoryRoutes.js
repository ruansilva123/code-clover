const { Router } = require('express');
const RepositoryController = require('../controllers/RepositoryController');

const router = Router();

router.get('/', RepositoryController.index);
router.get('/:id', RepositoryController.show);
router.post('/', RepositoryController.store);
router.put('/:id', RepositoryController.update);
router.delete('/:id', RepositoryController.destroy);

module.exports = router;
