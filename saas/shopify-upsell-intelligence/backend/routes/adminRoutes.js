const express = require('express');
const router = express.Router();
const { getUsers, blockUser, getStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users', protect, admin, getUsers);
router.put('/block/:id', protect, admin, blockUser);
router.get('/stats', protect, admin, getStats);

module.exports = router;
