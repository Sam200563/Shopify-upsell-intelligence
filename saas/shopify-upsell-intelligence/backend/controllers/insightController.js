const asyncHandler = require('express-async-handler');
const UpsellInsight = require('../models/UpsellInsight');
const User = require('../models/User');

// Helper for Mock Logic
const generateMockIdeas = (category, productPrice) => {
    const upsells = [];
    const crossSells = [];
    const copies = [];
    let aovIncrease = '0%';

    const catLower = category.toLowerCase();

    if (catLower.includes('clothing') || catLower.includes('fashion')) {
        upsells.push('Premium Fabric Version', 'Bundle: Buy 2 Get 10% Off');
        crossSells.push('Matching Socks', 'Style Guide E-book');
        copies.push('Complete the look with these essentials!');
        aovIncrease = '15-20%';
    } else if (catLower.includes('tech') || catLower.includes('electronics')) {
        upsells.push('Extended Warranty + Priority Support', 'Pro Version with More Storage');
        crossSells.push('Protective Case', 'Screen Cleaning Kit');
        copies.push('Protect your investment perfectly.');
        aovIncrease = '10-25%';
    } else if (catLower.includes('home') || catLower.includes('kitchen')) {
        upsells.push('Set of 4 (Family Pack)', 'Deluxe Material Upgrade');
        crossSells.push('Cleaning Brush', 'Storage Container');
        copies.push('Upgrade your home experience today.');
        aovIncrease = '12-18%';
    } else {
        upsells.push('Gift Wrap Service', 'Express Shipping Upgrade');
        crossSells.push('Mystery Bonus Item', 'Gift Card');
        copies.push('Don\'t miss out on these limited time offers.');
        aovIncrease = '5-15%';
    }

    return { upsells, crossSells, copies, aovIncrease };
};

// @desc    Generate Upsell Insight
// @route   POST /insights/generate
// @access  Private
const generateInsight = asyncHandler(async (req, res) => {
    const { productName, category, price } = req.body;

    if (!productName || !category || !price) {
        res.status(400);
        throw new Error('Please provide product details');
    }

    const user = await User.findById(req.user.id);
    const today = new Date().toISOString().split('T')[0];

    // Reset count if new day
    if (user.usage.date !== today) {
        user.usage.date = today;
        user.usage.count = 0;
    }

    // Check limit for free plan
    if (user.plan === 'free' && user.usage.count >= 5) {
        // Save date reset even if blocked
        await user.save();
        res.status(403);
        throw new Error('Daily limit reached. Upgrade to continue.');
    }

    const { upsells, crossSells, copies, aovIncrease } = generateMockIdeas(category, price);

    // Increment usage
    user.usage.count += 1;
    await user.save();

    const insight = await UpsellInsight.create({
        userId: req.user.id,
        productName,
        category,
        price,
        upsellIdeas: upsells,
        crossSellIdeas: crossSells,
        offerCopies: copies,
        estimatedAOVIncrease: aovIncrease,
    });

    res.status(201).json(insight);
});

// @desc    Get User History
// @route   GET /insights/history
// @access  Private
const getHistory = asyncHandler(async (req, res) => {
    const insights = await UpsellInsight.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(insights);
});

module.exports = {
    generateInsight,
    getHistory,
};
