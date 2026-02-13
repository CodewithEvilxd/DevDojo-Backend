# 🚀 Deployment Guide

Complete deployment guide for DevDojo Backend to popular cloud platforms.

---

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Railway Deployment](#railway-deployment)
- [Heroku Deployment](#heroku-deployment)
- [Vercel Deployment](#vercel-deployment)
- [VPS Deployment](#vps-deployment)
- [Docker Deployment](#docker-deployment)
- [Post-Deployment](#post-deployment)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Production database (Neon, Supabase, or other PostgreSQL provider)
- [ ] All environment variables configured
- [ ] .env.sample created (no sensitive data)
- [ ] .env in .gitignore
- [ ] Production API keys (Judge0, Cloudinary, Google OAuth, Mailtrap)
- [ ] Frontend CORS origin configured
- [ ] Database migrations tested locally
- [ ] All tests passing
- [ ] README.md complete
- [ ] LICENSE file added

---

## 🚂 Railway Deployment

Railway offers simple deployment with PostgreSQL database included.

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

### Step 2: Login

```bash
railway login
```

### Step 3: Initialize Project

```bash
railway init
```

### Step 4: Link Database

```bash
# Create PostgreSQL database
railway add postgres

# Get database URL
railway variables
```

### Step 5: Set Environment Variables

```bash
# Set all environment variables
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set DATABASE_URL="your-neon-database-url"
railway variables set CLIENT_URL="https://your-frontend.com"
railway variables set CORS_ORIGIN="https://your-frontend.com"
railway variables set ACCESS_TOKEN_SECRET="your-secret"
railway variables set REFRESH_TOKEN_SECRET="your-secret"
railway variables set SESSION_SECRET="your-secret"
railway variables set COOKIE_DOMAIN=".your-domain.com"

# Judge0 API
railway variables set JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
railway variables set RAPIDAPI_KEY="your-key"
railway variables set RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"

# Google OAuth
railway variables set GOOGLE_CLIENT_ID="your-id"
railway variables set GOOGLE_CLIENT_SECRET="your-secret"
railway variables set GOOGLE_CALLBACK_URL="https://your-backend.railway.app/api/v1/auth/google/callback"

# Email (Mailtrap for staging, SendGrid/AWS SES for production)
railway variables set MAILTRAP_SMTP_HOST="sandbox.smtp.mailtrap.io"
railway variables set MAILTRAP_SMTP_PORT="2525"
railway variables set MAILTRAP_SMTP_USERNAME="your-username"
railway variables set MAILTRAP_SMTP_PASSWORD="your-password"
railway variables set MAILTRAP_AUTHOR_EMAIL="no-reply@devdojo.com"

# Cloudinary
railway variables set CLOUDINARY_CLOUD_NAME="your-cloud"
railway variables set CLOUDINARY_API_KEY="your-key"
railway variables set CLOUDINARY_API_SECRET="your-secret"
```

### Step 6: Create Nixpacks Config

Create `nixpacks.toml`:

```toml
[phases.setup]
nixPkgs = ['nodejs-18_x']

[phases.install]
cmds = ['npm ci']

[phases.build]
cmds = ['npx prisma generate', 'npx prisma migrate deploy']

[start]
cmd = 'npm start'
```

### Step 7: Deploy

```bash
# Deploy to Railway
railway up

# Check deployment status
railway status

# View logs
railway logs
```

### Step 8: Set Custom Domain (Optional)

1. Go to Railway dashboard
2. Click your project
3. Settings → Domains
4. Add custom domain
5. Update DNS records

---

## 🟣 Heroku Deployment

### Step 1: Install Heroku CLI

```bash
npm install -g heroku
```

### Step 2: Login

```bash
heroku login
```

### Step 3: Create App

```bash
# Create Heroku app
heroku create devdojo-backend

# Add PostgreSQL addon
heroku addons:create heroku-postgresql:mini
```

### Step 4: Configure Environment

```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL="your-neon-database-url"
heroku config:set CLIENT_URL="https://your-frontend.com"
heroku config:set CORS_ORIGIN="https://your-frontend.com"
heroku config:set ACCESS_TOKEN_SECRET="your-secret"
heroku config:set REFRESH_TOKEN_SECRET="your-secret"
heroku config:set SESSION_SECRET="your-secret"
heroku config:set COOKIE_DOMAIN=".your-domain.com"
heroku config:set JUDGE0_API_URL="https://judge0-ce.p.rapidapi.com"
heroku config:set RAPIDAPI_KEY="your-key"
heroku config:set RAPIDAPI_HOST="judge0-ce.p.rapidapi.com"
heroku config:set GOOGLE_CLIENT_ID="your-id"
heroku config:set GOOGLE_CLIENT_SECRET="your-secret"
heroku config:set GOOGLE_CALLBACK_URL="https://devdojo-backend.herokuapp.com/api/v1/auth/google/callback"
heroku config:set MAILTRAP_SMTP_HOST="sandbox.smtp.mailtrap.io"
heroku config:set MAILTRAP_SMTP_PORT="2525"
heroku config:set MAILTRAP_SMTP_USERNAME="your-username"
heroku config:set MAILTRAP_SMTP_PASSWORD="your-password"
heroku config:set MAILTRAP_AUTHOR_EMAIL="no-reply@devdojo.com"
heroku config:set CLOUDINARY_CLOUD_NAME="your-cloud"
heroku config:set CLOUDINARY_API_KEY="your-key"
heroku config:set CLOUDINARY_API_SECRET="your-secret"
```

### Step 5: Create Procfile

Create `Procfile` in root:

```
web: npm start
release: npx prisma migrate deploy
```

### Step 6: Deploy

```bash
# Add git remote
heroku git:remote -a devdojo-backend

# Push to Heroku
git push heroku main

# View logs
heroku logs --tail

# Open in browser
heroku open
```

---

## ▲ Vercel Deployment

Vercel is better suited for serverless functions, but can work for this API.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Create vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Step 3: Deploy

```bash
# Login
vercel login

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Dashboard → Settings → Environment Variables
```

**⚠️ Note**: Vercel has serverless function timeout limits (10s for free tier). Consider Railway or Heroku for long-running code execution.

---

## 🖥️ VPS Deployment (Ubuntu)

Deploy to any VPS (DigitalOcean, AWS EC2, Linode, etc.)

### Step 1: Connect to Server

```bash
ssh root@your-server-ip
```

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### Step 3: Clone Repository

```bash
# Create app directory
mkdir -p /var/www/devdojo
cd /var/www/devdojo

# Clone repo
git clone https://github.com/CodewithEvilxd/DevDojo-Backend.git .
```

### Step 4: Configure Environment

```bash
# Create .env file
nano .env

# Paste all environment variables (see .env.sample)
# Save: Ctrl + X, Y, Enter
```

### Step 5: Install & Build

```bash
# Install dependencies
npm ci

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

### Step 6: Setup PM2

```bash
# Start with PM2
pm2 start src/index.js --name devdojo-backend

# Save PM2 config
pm2 save

# Setup PM2 startup
pm2 startup
# Run the command it outputs
```

### Step 7: Configure Nginx

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/devdojo
```

Paste this configuration:

```nginx
server {
    listen 80;
    server_name api.devdojo.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
# Create symlink
sudo ln -s /etc/nginx/sites-available/devdojo /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 8: Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d api.devdojo.com

# Auto-renewal is setup automatically
```

### Step 9: Setup Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

---

## 🐳 Docker Deployment

### Step 1: Create Dockerfile

```dockerfile
# Use official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### Step 2: Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3000
    env_file:
      - .env
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

volumes:
  postgres_data:
```

### Step 3: Create .dockerignore

```
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
.vscode
.DS_Store
```

### Step 4: Build and Run

```bash
# Build image
docker-compose build

# Start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## ✅ Post-Deployment

### 1. Run Database Migrations

```bash
npx prisma migrate deploy
```

### 2. Verify Deployment

```bash
# Test health endpoint
curl https://your-backend.com/

# Expected: "Hi, Welcome to DevDojo 🥋 - Master Your Code!"
```

### 3. Update Frontend

Update frontend `.env` with production backend URL:

```env
VITE_API_URL=https://your-backend.com/api/v1
```

### 4. Configure CORS

Ensure `CORS_ORIGIN` environment variable matches your frontend domain.

### 5. Setup Domain

1. Point your domain DNS to server IP or platform URL
2. Update `COOKIE_DOMAIN` environment variable
3. Update `GOOGLE_CALLBACK_URL`

---

## 📊 Monitoring

### Application Monitoring

**PM2 Monitoring** (VPS):
```bash
pm2 monit
pm2 logs devdojo-backend
```

**Railway Monitoring**:
- Built-in logs and metrics in dashboard

**Heroku Monitoring**:
```bash
heroku logs --tail -a devdojo-backend
heroku ps -a devdojo-backend
```

### Database Monitoring

**Prisma Studio**:
```bash
npx prisma studio
```

### Error Tracking

Consider integrating:
- **Sentry**: Error tracking and monitoring
- **LogRocket**: Session replay and logging
- **Datadog**: Full-stack observability

---

## 🔧 Troubleshooting

### Issue: Database Connection Failed

**Solution**:
```bash
# Check DATABASE_URL format
# Should be: postgresql://user:password@host:5432/database?schema=public

# Test connection
npx prisma db pull
```

### Issue: Prisma Client Not Found

**Solution**:
```bash
# Regenerate Prisma Client
npx prisma generate

# Ensure build step includes this
```

### Issue: CORS Errors

**Solution**:
```bash
# Verify CORS_ORIGIN matches your frontend domain
# Update environment variable
railway variables set CORS_ORIGIN="https://your-frontend.com"

# Restart deployment
```

### Issue: Judge0 Timeout

**Solution**:
- Check RapidAPI key is valid
- Verify RapidAPI host is correct
- Check Judge0 API status
- Increase timeout in code if needed

### Issue: Email Not Sending

**Solution**:
- Verify Mailtrap credentials
- Check SMTP settings
- For production, use SendGrid or AWS SES
- Check email logs

### Issue: Google OAuth Failed

**Solution**:
- Verify Google Client ID and Secret
- Check callback URL matches Google Console
- Ensure redirect URIs are whitelisted
- Verify cookie domain settings

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Heroku Node.js Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt Certbot](https://certbot.eff.org/)

---

## 🆘 Support

Need help with deployment?

- **Email**: codewithevilxd@gmail.com
- **GitHub Issues**: https://github.com/CodewithEvilxd/DevDojo-Backend/issues
- **Discord**: raj.dev_

---

*Deployment Guide v1.0.0 | Last Updated: February 13, 2026*
