# Railway Environment Variables Configuration

Set these in your Railway project dashboard under Variables:

## Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `5000` | Port Railway will assign (Railway sets this automatically) |
| `JWT_SECRET` | `boniq_super_secure_jwt_secret_key_2024_production_ready_x7k9m2p4q8` | Strong secret for JWT tokens (use a secure random string in production) |
| `CORS_ORIGIN` | `https://boniq-labs.vercel.app` | Frontend URL for CORS |
| `ADMIN_EMAIL` | `admin@system` | Admin login email |
| `ADMIN_NAME` | `goxriddle` | Admin username |
| `ADMIN_PASSWORD` | `gutuza.24@` | Admin password (change this in production!) |

## Database Variables (Auto-configured by Railway)

These are automatically provided by Railway when you add a MySQL database:

| Variable | Description |
|----------|-------------|
| `MYSQL_DATABASE` | Database name (e.g., `railway`) |
| `MYSQL_PUBLIC_URL` | Public connection URL |
| `MYSQL_URL` | Internal connection URL |
| `MYSQLHOST` | Database host |
| `MYSQLPORT` | Database port |
| `MYSQLUSER` | Database user |
| `MYSQLPASSWORD` | Database password |
| `MYSQL_ROOT_PASSWORD` | Root password |

## Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `MYSQLDATABASE` | Same as MYSQL_DATABASE | Alternative database name variable |

---

## Vercel Environment Variables Configuration

Set these in your Vercel project dashboard under Settings > Environment Variables:

## Required Variables

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-railway-backend.up.railway.app` | Production |

> **Note:** Replace `your-railway-backend.up.railway.app` with your actual Railway backend URL after deployment.

---

## Deployment Steps

### 1. Deploy Backend to Railway

1. Connect your GitHub repository to Railway
2. Add a MySQL database service in Railway
3. Configure the environment variables listed above
4. Set the build command: `npm install`
5. Set the start command: `npm start`
6. Deploy

### 2. Deploy Frontend to Vercel

1. Connect your GitHub repository to Vercel
2. Set the Root Directory to `frontend`
3. Configure the environment variable `VITE_API_URL` with your Railway backend URL
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

### 3. Update CORS Origin

After Vercel deployment, update the `CORS_ORIGIN` in Railway to match your Vercel production URL (e.g., `https://boniq-labs.vercel.app`).

### 4. Verify Admin Access

1. Go to `https://boniq-labs.vercel.app/admin`
2. Login with:
   - Username: `goxriddle` or Email: `admin@system`
   - Password: `gutuza.24@`
3. Change the password immediately in Settings > Change Password

---

## Post-Deployment Verification

- [ ] Frontend loads at `https://boniq-labs.vercel.app`
- [ ] Backend API responds at `https://your-railway-backend.up.railway.app/api/projects`
- [ ] Admin login works at `https://boniq-labs.vercel.app/admin`
- [ ] Dashboard loads with real data from database
- [ ] Projects page shows projects from database
- [ ] Skills page shows skills from database
- [ ] Contact form submits to database
- [ ] Admin can create/update/delete projects, skills, profile
- [ ] File uploads work (avatar, project images, etc.)