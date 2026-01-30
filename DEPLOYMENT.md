# GroupSave Deployment Guide

## Overview

This guide covers deploying GroupSave to production using free tiers:
- **Backend**: Railway or Render
- **Frontend**: Vercel
- **Database**: MongoDB Atlas

Total cost: **$0/month** with free tiers

## Prerequisites

- GitHub account
- MongoDB Atlas account
- Railway/Render account
- Vercel account

## Step 1: Prepare Your Code

### 1.1 Create GitHub Repository

```bash
cd groupsave
git init
git add .
git commit -m "Initial commit - GroupSave app"
git branch -M main
git remote add origin https://github.com/yourusername/groupsave.git
git push -u origin main
```

### 1.2 Verify .gitignore

Ensure `.gitignore` includes:
```
node_modules/
.env
.env.local
build/
dist/
```

## Step 2: Database Setup (MongoDB Atlas)

### 2.1 Create Cluster

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create Organization → Create Project
4. Build Database → Free Shared Cluster
5. Choose cloud provider and region (closest to you)
6. Cluster Name: `groupsave-cluster`
7. Create Cluster (takes 3-5 minutes)

### 2.2 Configure Security

**Database Access:**
1. Security → Database Access → Add New Database User
2. Username: `groupsave_user`
3. Password: Generate secure password (save it!)
4. Database User Privileges: "Read and write to any database"
5. Add User

**Network Access:**
1. Security → Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Confirm

### 2.3 Get Connection String

1. Database → Connect → Connect your application
2. Driver: Node.js
3. Copy connection string:
   ```
   mongodb+srv://groupsave_user:<password>@groupsave-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `mongodb+srv://...mongodb.net/groupsave?retryWrites...`

## Step 3: Backend Deployment

### Option A: Railway (Recommended)

#### 3.1 Setup Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Select `groupsave` repository
5. Add service → Select repository

#### 3.2 Configure Service

1. Settings → Root Directory: `backend`
2. Settings → Build Command:
   ```bash
   npm install
   ```
3. Settings → Start Command:
   ```bash
   npm start
   ```

#### 3.3 Add Environment Variables

1. Variables tab → Add Variables:
   ```
   MONGODB_URI=mongodb+srv://groupsave_user:password@cluster.mongodb.net/groupsave?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=production
   ```

#### 3.4 Deploy

1. Settings → Generate Domain
2. Copy your domain: `https://groupsave-backend.railway.app`
3. Save this URL for frontend deployment

### Option B: Render

#### 3.1 Setup Render

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Dashboard → New → Web Service
4. Connect repository: `groupsave`

#### 3.2 Configure Service

- Name: `groupsave-backend`
- Root Directory: `backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Free plan

#### 3.3 Add Environment Variables

Add in Render dashboard:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=production
```

#### 3.4 Deploy

1. Create Web Service
2. Wait for deployment (5-10 minutes)
3. Copy your URL: `https://groupsave-backend.onrender.com`

## Step 4: Frontend Deployment (Vercel)

### 4.1 Setup Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Add New Project → Import Git Repository
4. Select `groupsave` repository

### 4.2 Configure Project

- Framework Preset: Create React App
- Root Directory: `frontend`
- Build Command: (leave default)
- Output Directory: (leave default)

### 4.3 Add Environment Variables

Add in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

**Important:** Use your actual backend URL from Railway/Render

### 4.4 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Your app will be live at: `https://groupsave.vercel.app`

## Step 5: Testing Production

### 5.1 Test Backend

Visit: `https://your-backend-url/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "GroupSave API is running"
}
```

### 5.2 Test Frontend

1. Visit your Vercel URL
2. Create a test savings plan
3. Verify plan code generates
4. Add a test contribution
5. Check data persists (refresh page)

### 5.3 Test Complete Flow

1. Create plan on device A
2. Copy plan code
3. Access plan on device B using code
4. Add contribution from device B
5. Verify it appears on device A (refresh)

## Step 6: Custom Domain (Optional)

### Frontend (Vercel)

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `groupsave.com`)
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Backend (Railway)

1. Railway Dashboard → Settings → Networking
2. Custom Domain → Add your API subdomain
3. Example: `api.groupsave.com`
4. Update frontend environment variable

## Monitoring & Maintenance

### Check Backend Logs

**Railway:**
- Dashboard → Deployments → View logs

**Render:**
- Dashboard → Service → Logs tab

### Monitor Database

**MongoDB Atlas:**
- Cluster → Metrics
- Check connections, operations, storage

### Update Environment Variables

**If you need to change variables:**

1. Railway/Render: Dashboard → Variables → Edit
2. Vercel: Dashboard → Settings → Environment Variables → Edit
3. Redeploy if needed

## Troubleshooting

### Backend Issues

**503 Service Unavailable:**
- Check Railway/Render logs
- Verify MongoDB connection string
- Check if service is sleeping (Render free tier)

**Database Connection Failed:**
- Verify MongoDB Atlas is running
- Check IP whitelist (should include 0.0.0.0/0)
- Verify connection string format

### Frontend Issues

**API Requests Failing:**
- Check REACT_APP_API_URL is correct
- Verify backend is running
- Check browser console for CORS errors

**Environment Variable Not Working:**
- Verify variable name starts with `REACT_APP_`
- Redeploy frontend after adding variable
- Clear browser cache

### CORS Errors

Backend already has CORS enabled. If issues persist:

1. Check backend logs
2. Verify frontend URL is making requests to correct backend
3. Ensure no trailing slashes in API URL

## Scaling Considerations

### Free Tier Limits

**MongoDB Atlas:**
- 512 MB storage
- Shared RAM
- ~100 concurrent connections

**Railway:**
- $5 free credit/month
- ~500 hours runtime

**Render:**
- Sleeps after 15 min inactivity
- 750 hours/month free

**Vercel:**
- 100 GB bandwidth/month
- Unlimited projects

### When to Upgrade

Consider paid plans when:
- Storage exceeds 512 MB (upgrade MongoDB)
- Backend needs 24/7 availability (upgrade Render)
- Multiple projects or high traffic (upgrade Vercel)

## Backup Strategy

### Database Backups

**Manual (Free):**
1. MongoDB Atlas → Cluster → Browse Collections
2. Export collections to JSON
3. Store locally or in cloud storage

**Automated (Paid):**
- Upgrade to M2+ cluster ($9/month)
- Automatic continuous backups
- Point-in-time recovery

### Code Backups

- GitHub repository (automatic)
- Local copies
- Tag releases: `git tag v1.0.0`

## Support & Updates

### Updating the App

```bash
# Pull latest changes
git pull origin main

# Backend redeploys automatically (Railway/Render)
# Frontend redeploys automatically (Vercel)
```

### Rolling Back

**Railway/Render:**
- Dashboard → Deployments → Select previous deployment → Rollback

**Vercel:**
- Deployments → Previous deployment → Promote to Production

## Security Checklist

✅ Environment variables set (not in code)
✅ MongoDB IP whitelist configured
✅ Strong database password
✅ HTTPS enabled (automatic with Railway/Vercel)
✅ .env files in .gitignore
✅ No API keys in frontend code

## Cost Summary

| Service | Free Tier | Paid Upgrade |
|---------|-----------|--------------|
| MongoDB Atlas | 512 MB | $9/month (2GB) |
| Railway | $5 credit | $5/month |
| Render | 750 hrs | $7/month (always-on) |
| Vercel | 100 GB | $20/month (Pro) |

**Total Free**: $0/month
**If upgrading all**: ~$41/month

## Next Steps

1. ✅ Deploy to production
2. ✅ Test thoroughly
3. ✅ Share with first users
4. ✅ Monitor usage and logs
5. ✅ Collect feedback
6. ✅ Plan features for v2

---

**Congratulations!** 🎉 Your GroupSave app is now live and ready to help people save together!
