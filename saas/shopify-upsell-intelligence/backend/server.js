const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/insights', require('./routes/insightRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
    res.send('Shopify Upsell Intelligence API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
