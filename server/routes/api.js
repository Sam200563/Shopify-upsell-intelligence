const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const MetaHistory = require('../models/MetaHistory');

// Generate Meta Tags (Heuristic Logic)
router.post('/generate-meta', protect, async (req, res) => {
    const { pageTitle, targetKeyword, description } = req.body;

    if (!pageTitle || !targetKeyword) {
        return res.status(400).json({ message: 'Page Title and Target Keyword are required' });
    }

    // Logic for optimization
    const optimizedTitle = `${pageTitle} | ${targetKeyword} - Ultimate Guide`;
    const metaDescription = description
        ? `${description.substring(0, 150)}... Learn more about ${targetKeyword}.`
        : `Discover everything about ${targetKeyword} in this comprehensive guide on ${pageTitle}.`;

    const keywords = `${targetKeyword}, ${pageTitle.split(' ').join(', ')}, SEO, Guide`;

    const generated = {
        title: optimizedTitle,
        description: metaDescription,
        keywords: keywords,
        ogTitle: optimizedTitle,
        ogDescription: metaDescription,
        jsonLd: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": optimizedTitle,
            "description": metaDescription
        }, null, 2)
    };

    res.json(generated);
});

// Save to History
router.post('/history', protect, async (req, res) => {
    const { pageTitle, targetKeyword, description, generatedMeta } = req.body;
    try {
        const history = await MetaHistory.create({
            user: req.user.id,
            pageTitle,
            targetKeyword,
            description,
            generatedMeta
        });
        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error saving history' });
    }
});

// Get History
router.get('/history', protect, async (req, res) => {
    try {
        const history = await MetaHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

module.exports = router;
