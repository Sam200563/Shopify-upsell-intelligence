const mongoose = require('mongoose');

const upsellInsightSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        productName: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        upsellIdeas: [String],
        crossSellIdeas: [String],
        offerCopies: [String],
        estimatedAOVIncrease: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('UpsellInsight', upsellInsightSchema);
