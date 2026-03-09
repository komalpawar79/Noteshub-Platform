const express = require('express');
const { getUsers, updateUserRole, blockUser, deleteUser, getStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/block', blockUser);
router.delete('/users/:id', deleteUser);
router.get('/stats', getStats);

module.exports = router;
