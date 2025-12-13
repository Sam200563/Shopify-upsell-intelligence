const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const UpsellInsight = require('../models/UpsellInsight');

// @desc    Get all users
// @route   GET /admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password');
    res.json(users);
});

// @desc    Block/Unblock user
// @route   PUT /admin/block/:id
// @access  Private/Admin
const blockUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isBlocked = !user.isBlocked;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isBlocked: updatedUser.isBlocked,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get Admin Stats
// @route   GET /admin/stats
// @access  Private/Admin
const getStats = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments();
    const insightCount = await UpsellInsight.countDocuments();

    // Mock recent activity or aggregation if needed
    // For now just counts
    res.json({
        users: userCount,
        insights: insightCount,
    });
});

module.exports = {
    getUsers,
    blockUser,
    getStats,
};
