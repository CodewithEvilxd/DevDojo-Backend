# DevDojo Backend - Setup Guide

## 🎯 Project by Codewithevilxd

**Author:** Codewithevilxd  
**Email:** codewithevilxd@gmail.com  
**GitHub:** https://github.com/codewithevilxd

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.sample` to `.env`:
```bash
cp .env.sample .env
```

Then fill in all required values in `.env` file.

---

## 📋 Environment Variables Guide

### **Database (CRITICAL - Must Replace)**

Get a free PostgreSQL database from [Neon.tech](https://neon.tech):

1. Sign up at https://neon.tech
2. Create a new project
3. Copy the connection string
4. Update `DATABASE_URL` in `.env`

```env
DATABASE_URL='postgresql://your_username:your_password@your-host.neon.tech/devdojo?sslmode=require'
```

---

### **JWT Secrets (Required)**

Generate secure random secrets:

```bash
# For JWT_ACCESS_TOKEN_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# For JWT_REFERSH_TOKEN_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# For SESSION_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Add to `.env`:
```env
JWT_ACCESS_TOKEN_SECRET=your_generated_secret_here
JWT_REFERSH_TOKEN_SECRET=your_generated_secret_here
SESSION_SECRET=your_generated_secret_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
```

---

### **Mailtrap (Email Testing - Already Configured)**

✅ Already set up with your credentials in `.env.sample`

Test emails will appear in your Mailtrap inbox at: https://mailtrap.io

---

### **Google OAuth (Required for Social Login)**

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Go to "APIs & Services" → "Credentials"
4. Create "OAuth 2.0 Client ID"
5. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/v1/auth/google/callback`
   - Production: `https://yourdomain.com/api/v1/auth/google/callback`

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/api/v1/auth/google/callback
```

---

### **Cloudinary (Image Storage - Required)**

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Dashboard
3. Copy your credentials

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### **Judge0 API (Code Execution - Required)**

**Option 1: Self-Host (Recommended for Production)**
- Follow guide: https://github.com/judge0/judge0

**Option 2: Use RapidAPI (Quick Start)**
- Sign up: https://rapidapi.com/judge0-official/api/judge0-ce
- Subscribe to free plan
- Get API endpoint

```env
JUDGE0_API_URL=your_judge0_api_url
```

---

## 🗄️ Database Setup

After setting up your database URL:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

---

## 🏃 Run the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server will start at: http://localhost:3000

Test endpoint: `GET http://localhost:3000`  
Response: "Hi, Welcome to DevDojo 🥋 - Master Your Code!"

---

## 📁 Project Structure

```
BACKEND/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Auth & validation
│   ├── routes/                # API routes
│   ├── utils/                 # Helper functions
│   ├── libs/                  # Database & external services
│   └── index.js              # Main entry point
├── .env.sample               # Environment template
├── package.json              # Dependencies
└── SETUP_GUIDE.md           # This file
```

---

## 🔐 Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use strong secrets** - Don't use weak or test secrets in production
3. **Update database credentials** - The sample DB URL is from the previous owner
4. **Enable CORS properly** - Update `FONTEND_URL` to your actual frontend URL

---

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/google` - Google OAuth
- `POST /api/v1/auth/logout` - Logout

### Problems
- `GET /api/v1/problems` - List all problems
- `GET /api/v1/problems/:id` - Get problem details
- `POST /api/v1/problems` - Create problem (Admin)

### Code Execution
- `POST /api/v1/execute-code` - Run code

### Submissions
- `POST /api/v1/submission` - Submit solution
- `GET /api/v1/submission/:userId` - Get user submissions

### Playlists
- `GET /api/v1/playlist` - List playlists
- `POST /api/v1/playlist` - Create playlist

---

## 🐛 Troubleshooting

### Database Connection Issues
- Check if `DATABASE_URL` is correct
- Ensure database exists and is accessible
- Run `npx prisma migrate dev` to create tables

### Prisma Generate Errors
```bash
# Clean and regenerate
rm -rf node_modules
npm install
npx prisma generate
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

---

## 📝 TODO After Setup

- [ ] Replace `DATABASE_URL` with your own
- [ ] Generate and set all JWT secrets
- [ ] Setup Google OAuth credentials
- [ ] Setup Cloudinary account
- [ ] Setup Judge0 API
- [ ] Update `FONTEND_URL` to your frontend URL
- [ ] Test email sending with Mailtrap
- [ ] Test Google login flow
- [ ] Test code execution
- [ ] Deploy to production

---

## 📞 Support

If you face any issues:
1. Check this guide thoroughly
2. Verify all environment variables are set
3. Check console logs for specific errors

---

**Made with ❤️ by Codewithevilxd**
