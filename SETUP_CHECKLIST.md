# GroupSave Setup Checklist

Use this checklist to get your GroupSave app up and running!

## ☐ Prerequisites

- [ ] Node.js installed (v16+) - [Download](https://nodejs.org)
- [ ] npm or yarn installed
- [ ] Code editor installed (VS Code recommended)
- [ ] Git installed
- [ ] Modern web browser

## ☐ Database Setup (MongoDB Atlas)

- [ ] Create MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- [ ] Create new free cluster
- [ ] Create database user
  - Username: `groupsave_user` (or your choice)
  - Password: (save securely!)
- [ ] Configure network access
  - Add IP: `0.0.0.0/0` (allows all - for development)
- [ ] Get connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/groupsave?retryWrites=true&w=majority`
- [ ] Save connection string for later

## ☐ Backend Setup

- [ ] Navigate to `backend/` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Edit `.env` file:
  - [ ] Add `MONGODB_URI` (your connection string)
  - [ ] Set `PORT=5000`
- [ ] Test: Run `npm run dev`
- [ ] Verify: Backend should start without errors
- [ ] Test: Visit `http://localhost:5000/api/health` in browser
- [ ] Should see: `{"status":"ok","message":"GroupSave API is running"}`

## ☐ Frontend Setup

- [ ] Open new terminal
- [ ] Navigate to `frontend/` folder
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Edit `.env` file:
  - [ ] Set `REACT_APP_API_URL=http://localhost:5000/api`
- [ ] Test: Run `npm start`
- [ ] Verify: Browser opens to `http://localhost:3000`
- [ ] Should see: GroupSave home page

## ☐ Test the App

### Create Your First Plan
- [ ] Click "Start New Plan"
- [ ] Enter plan name: "Test Plan"
- [ ] Add participants (at least 2):
  - [ ] Participant 1: Your name
  - [ ] Participant 2: Friend's name
- [ ] Set duration: 3 months
- [ ] Click "Create Savings Plan"
- [ ] Plan created successfully? ✓
- [ ] Plan code displayed? (e.g., SAVE-XXXX) ✓

### Test Plan Access
- [ ] Copy plan code
- [ ] Return to home page
- [ ] Enter plan code
- [ ] Click "Access Plan"
- [ ] Plan loads correctly? ✓

### Add a Contribution
- [ ] Click "Add Contribution" button
- [ ] Fill in form:
  - [ ] Select participant
  - [ ] Amount: 5000
  - [ ] Payment method: Bank Transfer
  - [ ] Date: Today
  - [ ] Month: 1
- [ ] Click "Add Contribution"
- [ ] Contribution appears in list? ✓
- [ ] Total savings updated? ✓

### Test Sharing
- [ ] Copy plan code
- [ ] Copy share link
- [ ] Open in incognito/private window
- [ ] Paste share link
- [ ] Plan loads? ✓
- [ ] Try entering plan code
- [ ] Works? ✓

## ☐ Production Deployment (Optional)

### MongoDB Atlas
- [ ] Already set up? ✓
- [ ] Get production connection string
- [ ] Save for deployment

### Backend (Choose one)

**Option A: Railway**
- [ ] Sign up at [railway.app](https://railway.app)
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Set root directory: `backend`
- [ ] Add environment variables:
  - [ ] `MONGODB_URI`
  - [ ] `PORT=5000`
- [ ] Deploy
- [ ] Copy backend URL
- [ ] Test: Visit `https://your-app.railway.app/api/health`

**Option B: Render**
- [ ] Sign up at [render.com](https://render.com)
- [ ] New Web Service
- [ ] Connect repository
- [ ] Configure:
  - [ ] Root directory: `backend`
  - [ ] Build: `npm install`
  - [ ] Start: `npm start`
- [ ] Add environment variables
- [ ] Deploy
- [ ] Copy backend URL

### Frontend (Vercel)
- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Import project
- [ ] Connect repository
- [ ] Set root directory: `frontend`
- [ ] Add environment variable:
  - [ ] `REACT_APP_API_URL=https://your-backend-url/api`
- [ ] Deploy
- [ ] Visit your app URL
- [ ] Test complete flow

## ☐ Final Verification

- [ ] App loads in production ✓
- [ ] Can create new plan ✓
- [ ] Can access plan with code ✓
- [ ] Can add contributions ✓
- [ ] Data persists after refresh ✓
- [ ] Share link works ✓
- [ ] Works on mobile ✓

## 🎉 You're Done!

### What's Next?

1. **Share with friends**: Send them your app URL
2. **Create real plans**: Start saving together
3. **Gather feedback**: See what users like/need
4. **Plan improvements**: Add features based on usage

### Quick Reference

**Local Development:**
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- MongoDB: Atlas cloud

**Production:**
- Frontend: Your Vercel URL
- Backend: Your Railway/Render URL
- Database: MongoDB Atlas

### Need Help?

- 📖 **README.md** - Complete documentation
- ⚡ **QUICKSTART.md** - Fast setup guide
- 🚀 **DEPLOYMENT.md** - Detailed deployment instructions
- 🎯 **PROJECT_OVERVIEW.md** - Technical details

### Common Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server

# Frontend
cd frontend
npm install          # Install dependencies
npm start            # Start development server
npm run build        # Build for production
```

### Useful Links

- MongoDB Atlas: https://cloud.mongodb.com
- Railway: https://railway.app
- Render: https://render.com
- Vercel: https://vercel.com

---

**Congratulations!** Your GroupSave app is ready to help people save together! 🎊
