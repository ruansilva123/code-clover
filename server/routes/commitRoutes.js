const { Router } = require('express');
const CommitController = require('../controllers/CommitController');

const router = Router();

router.get('/', CommitController.index);
router.get('/:id', CommitController.show);
router.post('/', CommitController.store);
router.put('/:id', CommitController.update);
router.delete('/:id', CommitController.destroy);

module.exports = router;
