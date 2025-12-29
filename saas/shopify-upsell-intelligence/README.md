# Shopify Upsell Intelligence

A MERN stack Micro SaaS application for generating upsell and cross-sell ideas.

## Features
- **User Intelligence:** Generate creative upsell ideas based on product info.
- **Admin Panel:** Manage users and view stats.
- **Dual UI:** Unique Creative Dark Mode for Users, Professional Light Mode for Admins.

## Setup

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Environment Variables**
   - Create `.env` in `backend/` with:
     ```
     PORT=5000
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_secret
     ```

3. **Run Development**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
