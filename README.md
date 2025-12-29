# SEO Meta Genius 🚀

A Premium Micro SaaS application for generating optimized SEO Meta Tags. Built with the MERN Stack.

## Features
- **Smart Generation**: Heuristic-based generation of Titles, Descriptions, OG Tags, and JSON-LD.
- **History Tracking**: Save and view past generations.
- **Premium UI**: Glassmorphism aesthetic using React + Tailwind CSS.
- **Secure Auth**: JWT-based authentication.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, MongoDB
- **Database**: MongoDB (Local or Atlas)

## Prerequisites
- Node.js (v14+)
- MongoDB running locally or a connection string

## Setup & Installation

1. **Install Dependencies** (Root, Server, and Client)
   ```bash
   # From the project root
   cd saas/seo-meta-genius
   npm install && npm run install-all
   ```
   *Note: If `npm run install-all` fails, install in each folder manually.*

2. **Configuration**
   - Ensure MongoDB is running on `mongodb://localhost:27017/seo-meta-genius` (default).
   - Create a `.env` file in `/server` if you want to customize `PORT` or `MONGO_URI`.

3. **Running the App**
   Run both client and server concurrently:
   ```bash
   npm start
   ```
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## API Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `POST /api/generate-meta` - Generate tags (Auth Required)
- `GET /api/history` - Get user history
- `POST /api/history` - Save to history

## Build
To build the frontend for production:
```bash
cd client
npm run build
```
