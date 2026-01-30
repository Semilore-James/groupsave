# GroupSave - Group Savings Tracker

A simple, trust-based group savings tracking application that helps 2-5 people save together toward shared goals.

## Features

- 🎯 Create shared savings plans with custom names and durations
- 👥 Track contributions from 2-5 participants
- 📊 Real-time progress tracking and visualization
- 🔗 Shareable plan codes and links for easy access
- 💰 Detailed contribution history with payment methods
- 📱 Responsive design for mobile and desktop
- ✅ Automatic plan completion tracking

## Tech Stack

### Frontend
- **React.js** - UI framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Hook Form** - Form handling
- **Axios** - API requests
- **Lucide React** - Icons

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **nanoid** - Unique plan code generation

## Color Scheme

- **Ice**: `#EAEFEF` - Primary background
- **Slate**: `#BFC9D1` - Secondary elements
- **Navy**: `#25343F` - Text and dark accents
- **Coral**: `#FF9B51` - Primary action color

## Project Structure

```
groupsave/
├── backend/
│   ├── models/
│   │   └── SavingsPlan.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── AddContributionModal.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreatePlan.jsx
│   │   │   └── PlanDetail.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/groupsave?retryWrites=true&w=majority
PORT=5000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (create a user)
4. Set up network access (add your IP or 0.0.0.0/0 for development)
5. Get your connection string and update the `MONGODB_URI` in `.env`

## API Endpoints

### Plans

- `POST /api/plans` - Create a new savings plan
- `GET /api/plans/:planCode` - Get plan details
- `POST /api/plans/:planCode/contributions` - Add a contribution
- `GET /api/plans/:planCode/contributions` - Get all contributions

### Request Examples

**Create Plan:**
```json
POST /api/plans
{
  "planName": "Plot of Land - Phase 1",
  "participants": ["Alice", "Bob", "Charlie"],
  "durationMonths": 12
}
```

**Add Contribution:**
```json
POST /api/plans/SAVE-A3B9/contributions
{
  "participantName": "Alice",
  "amount": 50000,
  "paymentMethod": "Bank Transfer",
  "date": "2024-01-15",
  "month": 1
}
```

## Deployment

### Backend (Railway/Render)

1. **Railway:**
   - Connect your GitHub repository
   - Add environment variables (MONGODB_URI, PORT)
   - Deploy automatically

2. **Render:**
   - Create new Web Service
   - Connect repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables

### Frontend (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel
```

3. Set environment variables in Vercel dashboard:
   - `REACT_APP_API_URL` = your backend URL

### MongoDB Atlas

- Already configured for production
- No additional setup needed
- Update connection string with production credentials

## Usage Guide

### Creating a Savings Plan

1. Click "Start New Plan" on the home page
2. Enter a plan name (e.g., "Summer Vacation Fund")
3. Add 2-5 participant names
4. Set the duration in months
5. Click "Create Savings Plan"
6. Share the plan code or link with participants

### Accessing a Plan

1. Enter the plan code on the home page, or
2. Use the shareable link directly

### Adding Contributions

1. Open the savings plan
2. Click "Add Contribution"
3. Select the participant
4. Enter amount, payment method, and date
5. Select the month
6. Click "Add Contribution"

### Tracking Progress

- View total savings in the main card
- See timeline progress bar
- Review all contributions with details
- Check participant list and plan details

## Security Notes

- No authentication required (trust-based)
- Plan codes are unique and hard to guess
- Plans are accessible by anyone with the code
- No payment processing (manual tracking only)

## Future Enhancements

- [ ] Payment integrations
- [ ] Contribution reminders via email/SMS
- [ ] Member approval for contributions
- [ ] Export savings reports (PDF/CSV)
- [ ] Larger group sizes (6-10 people)
- [ ] Multi-currency support
- [ ] Goal amount tracking
- [ ] Mobile apps (iOS/Android)

## Support

For issues or questions:
1. Check existing documentation
2. Review API responses for error messages
3. Check browser console for frontend errors
4. Verify MongoDB connection

## License

MIT License - Feel free to use and modify for your needs.

## Credits

Built with love for transparent group savings tracking.
