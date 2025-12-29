const express = require('express');
const router = express.Router();
const { getUsers, blockUser, getStats, seedDatabase } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/users', protect, admin, getUsers);
router.put('/block/:id', protect, admin, blockUser);
router.get('/stats', protect, admin, getStats);
router.get('/seed', seedDatabase); // Public route for easy setup

module.exports = router;
