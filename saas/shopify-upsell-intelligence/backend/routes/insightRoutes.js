const express = require('express');
const router = express.Router();
const { generateInsight, getHistory } = require('../controllers/insightController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, generateInsight);
router.get('/history', protect, getHistory);

module.exports = router;
