const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users'); // we will create this temporarily or just inline
const User = require('./models/User');
const UpsellInsight = require('./models/UpsellInsight');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await UpsellInsight.deleteMany();

        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123', // Will be hashed by pre-save middleware
                role: 'admin',
            },
            {
                name: 'John Doe',
                email: 'user@example.com',
                password: 'password123',
                role: 'user',
            },
        ]);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await UpsellInsight.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
