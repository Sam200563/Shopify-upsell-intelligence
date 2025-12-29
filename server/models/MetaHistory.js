const mongoose = require('mongoose');

const MetaHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pageTitle: { type: String, required: true },
    targetKeyword: { type: String, required: true },
    description: { type: String },
    generatedMeta: {
        title: String,
        description: String,
        keywords: String,
        ogTitle: String,
        ogDescription: String,
        jsonLd: String
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MetaHistory', MetaHistorySchema);
