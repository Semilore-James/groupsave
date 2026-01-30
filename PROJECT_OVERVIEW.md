# GroupSave - Project Overview

## 🎯 What is GroupSave?

GroupSave is a trust-based group savings tracking application designed for 2-5 people who want to save together toward shared goals. It provides a simple, transparent way to track contributions without the complexity of payment processing or bank integrations.

## 🎨 Design Philosophy

### Visual Identity
- **Trustworthy & Clear**: Clean interface with ample whitespace
- **Warm & Approachable**: Coral accent color conveys energy and optimism
- **Professional**: Sophisticated typography with Fraunces display font
- **Calm**: Ice blue backgrounds create a stress-free environment

### Color Psychology
- **Ice (#EAEFEF)**: Trust, clarity, calm foundation
- **Slate (#BFC9D1)**: Neutral, reliable, stable
- **Navy (#25343F)**: Professional, confident, authoritative
- **Coral (#FF9B51)**: Energetic, optimistic, achievement

## 📋 Core Features

### 1. Plan Creation
- Custom plan names for any savings goal
- 2-5 participants (optimal for trust-based groups)
- Flexible duration (1-120 months)
- Instant plan code generation (e.g., SAVE-A3B9)

### 2. Access & Sharing
- **Plan Code**: Simple 9-character codes
- **Shareable Links**: Direct URL access
- **No Authentication**: Trust-based model
- **Anyone Can Log**: All participants have equal access

### 3. Contribution Tracking
- Log amount, payment method, date
- Month-by-month organization
- Real-time total calculation
- Detailed contribution history

### 4. Progress Visualization
- Timeline progress bar
- Current month indicator
- Total savings display
- Automatic completion detection

## 🏗 Technical Architecture

### Frontend Stack
```
React 18.2
├── React Router 6.20     (Navigation)
├── React Hook Form 7.49  (Forms)
├── Tailwind CSS 3.4      (Styling)
├── Axios 1.6             (API calls)
└── Lucide React 0.294    (Icons)
```

### Backend Stack
```
Node.js + Express 4.18
├── MongoDB + Mongoose 8.0  (Database)
├── nanoid 3.3              (Code generation)
└── CORS 2.8                (Cross-origin)
```

### Data Model
```javascript
SavingsPlan {
  planName: String
  planCode: String (unique, indexed)
  participants: [{ name: String }]
  durationMonths: Number
  contributions: [{
    participantName: String
    amount: Number
    paymentMethod: String
    date: Date
    month: Number
  }]
  totalSaved: Number
  status: 'active' | 'completed'
  startDate: Date
  timestamps: true
}
```

## 🔄 User Flow

### Creating a Plan
```
Home Page
  ↓
Click "Start New Plan"
  ↓
Enter Plan Details
  ├── Name
  ├── Participants (2-5)
  └── Duration (months)
  ↓
Plan Created
  ├── Generate unique code
  ├── Create shareable link
  └── Display success message
  ↓
Plan Detail Page
```

### Accessing a Plan
```
Home Page
  ↓
Enter Plan Code OR Use Shared Link
  ↓
Fetch Plan from Database
  ↓
Display Plan Details
  ├── Progress indicator
  ├── Total savings
  ├── Contribution history
  ├── Participant list
  └── Share options
```

### Adding a Contribution
```
Plan Detail Page
  ↓
Click "Add Contribution"
  ↓
Modal Opens
  ├── Select participant
  ├── Enter amount
  ├── Choose payment method
  ├── Pick date
  └── Select month
  ↓
Submit Contribution
  ↓
Update Plan
  ├── Add to contributions array
  ├── Recalculate total
  ├── Check completion status
  └── Save to database
  ↓
Refresh Display
```

## 📁 File Structure

```
groupsave/
│
├── backend/
│   ├── models/
│   │   └── SavingsPlan.js       # Mongoose schema & methods
│   ├── server.js                # Express app & routes
│   ├── package.json             # Dependencies
│   └── .env.example             # Environment template
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   └── AddContributionModal.jsx  # Contribution form
│   │   ├── pages/
│   │   │   ├── Home.jsx                  # Landing page
│   │   │   ├── CreatePlan.jsx            # Plan creation
│   │   │   └── PlanDetail.jsx            # Plan view
│   │   ├── services/
│   │   │   └── api.js                    # API client
│   │   ├── App.js               # Router setup
│   │   ├── index.js             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Dependencies
│   ├── tailwind.config.js       # Tailwind config
│   └── .env.example             # Environment template
│
├── README.md                    # Full documentation
├── QUICKSTART.md                # 5-minute setup
├── DEPLOYMENT.md                # Production guide
└── .gitignore                   # Git exclusions
```

## 🚀 Deployment Options

### Free Tier Setup
- **Database**: MongoDB Atlas (512 MB free)
- **Backend**: Railway ($5/month credit) or Render (750 hrs/month)
- **Frontend**: Vercel (100 GB bandwidth/month)
- **Cost**: $0/month

### Production Recommendations
- **Small Teams** (1-10 plans): Free tier sufficient
- **Growing** (11-100 plans): Upgrade MongoDB to M2 ($9/month)
- **Active** (100+ plans): Upgrade all services (~$40/month)

## 🔐 Security Model

### Trust-Based Approach
- No user authentication
- Plan codes are semi-secret (hard to guess)
- Anyone with code can view and contribute
- Designed for small groups with existing trust

### Why No Auth?
- Reduces friction for casual users
- Matches paper-based savings groups
- Keeps MVP simple and focused
- Easy onboarding for all participants

### Security Measures
- Unique plan codes (4.7 billion combinations)
- HTTPS in production (automatic)
- Environment variables for secrets
- MongoDB Atlas security features
- No sensitive data stored

## 📊 Success Metrics

### MVP Goals
- ✅ Users can create plan in < 2 minutes
- ✅ Contributions logged without confusion
- ✅ Progress clearly visible
- ✅ Plan completion obvious
- ✅ Sharing is effortless

### Growth Indicators
- Plans created per week
- Contributions per plan
- Active plans (had activity in last 7 days)
- Average plan duration
- Completion rate

## 🎯 Use Cases

### Real-World Examples

**1. Land Purchase**
- 4 friends saving for plot
- 12-month timeline
- Monthly contributions vary
- Track progress toward deposit

**2. Group Vacation**
- 3 colleagues planning trip
- 6-month savings
- Equal monthly contributions
- Build travel fund together

**3. Business Equipment**
- 5 partners buying tools
- 18-month plan
- Flexible contributions
- Shared investment tracking

**4. Emergency Fund**
- 2 family members
- Ongoing (24+ months)
- Variable contributions
- Safety net building

## 🔮 Future Enhancements

### Phase 2 (Post-MVP)
- Email/SMS reminders
- Goal amount setting
- Member approval flow
- Contribution notifications
- Export to PDF/CSV

### Phase 3 (Growth)
- Payment integrations (Stripe, Paystack)
- Larger groups (6-10 people)
- Multiple plans per group
- Analytics dashboard
- Mobile apps

### Phase 4 (Scale)
- User accounts & dashboards
- Plan templates
- Interest calculations
- Automated contributions
- Community features

## 🤝 Contributing

### Development Setup
1. Clone repository
2. Install dependencies (both frontend/backend)
3. Configure MongoDB Atlas
4. Set environment variables
5. Run development servers
6. Make changes
7. Test thoroughly
8. Submit pull request

### Code Standards
- ESLint for linting
- Prettier for formatting
- Semantic commits
- Component documentation
- API documentation

## 📞 Support

### Getting Help
- Check README.md for setup issues
- Review DEPLOYMENT.md for production problems
- Check browser console for frontend errors
- Review backend logs for API issues
- Verify MongoDB connection

### Common Issues
1. **MongoDB Connection**: Check URI and IP whitelist
2. **CORS Errors**: Verify API URL in frontend
3. **Plan Not Found**: Check plan code format
4. **Can't Add Contribution**: Verify plan status

## 🎓 Learning Resources

Built with:
- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Docs](https://vercel.com/docs)

## 📄 License

MIT License - Free to use, modify, and distribute

---

**Built with clarity, trust, and purpose.**
**Helping friends save together, one contribution at a time.** 🎯
