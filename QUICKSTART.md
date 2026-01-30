# GroupSave - Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Step 1: Clone and Setup

```bash
# Navigate to the project
cd groupsave

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev

# Setup Frontend (new terminal)
cd ../frontend
npm install
cp .env.example .env
npm start
```

### Step 2: MongoDB Atlas (2 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account → New Cluster
3. Database Access → Add User (save username/password)
4. Network Access → Add IP (use 0.0.0.0/0 for testing)
5. Connect → Get connection string
6. Paste in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/groupsave
   ```

### Step 3: Test the App

1. Open `http://localhost:3000`
2. Click "Start New Plan"
3. Create a test plan:
   - Name: "Test Savings"
   - Participants: Add 2-3 names
   - Duration: 3 months
4. Share the plan code with yourself
5. Add a test contribution

## 📱 Using the App

### Create a Plan
1. Home → "Start New Plan"
2. Fill in details → "Create Savings Plan"
3. Copy plan code or share link

### Join a Plan
1. Home → Enter plan code → "Access Plan"
2. Or use shared link directly

### Add Contributions
1. Open plan → "Add Contribution"
2. Select participant, amount, method, date
3. Choose month → "Add Contribution"

## 🔧 Common Issues

### Backend won't start
- Check MongoDB URI is correct
- Verify port 5000 is available
- Run `npm install` again

### Frontend errors
- Check API URL in `.env`
- Verify backend is running
- Clear browser cache

### Can't connect to MongoDB
- Whitelist IP address (0.0.0.0/0)
- Check username/password
- Verify cluster is active

## 🌐 Deploy to Production

### Backend (Railway - Free)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
cd backend
railway init
railway up
```

Add environment variable in Railway dashboard:
- `MONGODB_URI`: Your MongoDB Atlas connection string

### Frontend (Vercel - Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

Add environment variable in Vercel dashboard:
- `REACT_APP_API_URL`: Your Railway backend URL + `/api`

Example: `https://your-app.railway.app/api`

## 🎯 Next Steps

✅ Test with real friends
✅ Share plan codes
✅ Track contributions
✅ Monitor progress

Need help? Check the main README.md for detailed documentation.
