# Setup Guide

## Prerequisites

- **Node.js** v16+
- **MySQL** 8.0+ (running on port 3306)
- **npm** or **yarn**

## Environment Configuration

### Backend (`backend/.env`)

```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=boniq_portfolio
DB_PORT=3306
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

The database is auto-created on first run if it doesn't exist.

## Installation

### 1. Backend

```bash
cd backend
npm install
```

Start development with auto-reload:
```bash
npm run dev
```

The server starts on `http://localhost:5000`.

### 2. Frontend

```bash
cd frontend
npm install
```

Start development:
```bash
npm run dev
```

The dev server starts on `http://localhost:5173` and proxies API calls to the backend.

### 3. Production Build

```bash
cd frontend
npm run build
```

Output is in the `frontend/dist/` directory. Serve it with any static file server.

## Default Admin Credentials

After starting the backend for the first time, a default admin is auto-created:

- **Username:** `goxriddle`
- **Email:** `admin@system`
- **Password:** `gutuza.24@`

Change these in `backend/utils/initAdmin.js` before production use.

## Changing the Admin Password

1. Login to the admin dashboard
2. Go to **Settings** tab
3. Click on **Change password**
4. Enter current password and new password
5. A new JWT token will be issued automatically
