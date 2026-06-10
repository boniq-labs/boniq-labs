# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### POST /auth/login
Authenticate and get JWT token.

**Body:** `{ "email": "admin@system", "password": "gutuza.24@" }`
**Response (200):**
```json
{
  "_id": 1,
  "name": "goxriddle",
  "email": "admin@system",
  "token": "eyJhbG..."
}
```

### POST /auth/register
Register a new user.

**Body:** `{ "name": "user", "email": "user@example.com", "password": "pass123" }`

### PUT /auth/password (Protected)
Change password.

**Body:** `{ "currentPassword": "old", "newPassword": "new" }`
**Headers:** `Authorization: Bearer <token>`

## Profile

### GET /profile (Public)
Get the public profile.

### PUT /profile (Protected)
Update profile fields (name, greeting, role, bio, avatarUrl, cvUrl, whatsapp, linkedin, instagram, logoUrl, siteUrl).

## Projects

### GET /projects (Public)
List all projects.

### POST /projects (Protected)
Create project.

**Body:** `{ "title": "...", "description": "...", "imageUrl": "...", "technologies": ["Vue", "Node"] }`

### PUT /projects/:id (Protected)
Update project.

### DELETE /projects/:id (Protected)
Delete project.

## Skills

### GET /skills (Public)
List all skills.

### POST /skills (Protected)
Create skill.

**Body:** `{ "name": "Vue.js", "category": "Frontend", "level": 90, "icon": "..." }`

### PUT /skills/:id (Protected)
Update skill.

### DELETE /skills/:id (Protected)
Delete skill.

## Messages (Inbox)

### POST /messages (Public)
Submit a contact message.

**Body:** `{ "name": "...", "email": "...", "subject": "...", "content": "..." }`

### GET /messages (Protected)
Get all messages.

### PUT /messages/:id (Protected)
Mark message read/unread.

**Body:** `{ "isRead": true }`

### DELETE /messages/:id (Protected)
Delete a message.

## Stats

### GET /stats (Public)
Get site statistics.

### POST /stats/visit (Public)
Increment visit counter.

### PUT /stats (Protected)
Set view count manually.

**Body:** `{ "views": 1000 }`

## Uploads

### POST /upload (Protected)
Upload an image or document.

**Body:** FormData with field `image`
**Response:** URL string like `/uploads/filename.jpg`

## Notes

- Protected routes require `Authorization: Bearer <token>` header
- The admin JWT token expires in 30 days
- Database models auto-sync on server start (`sequelize.sync({ alter: true })`)
- Uploaded files go to `backend/uploads/` and are served at `/uploads/`
