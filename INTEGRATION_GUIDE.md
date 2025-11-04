# Backend & Frontend Integration Guide

## ✅ Completed Backend Features

### 1. Database Schema
- Complete PostgreSQL schema in `backend/migrations/005_create_complete_schema.sql`
- Tables: users, products, categories, bids, orders, notifications, admin_activity_log, otp_store
- Seeding script in `backend/migrations/006_seed_dummy_data.sql`

### 2. Backend APIs

#### Authentication (`/api/auth`)
- `POST /api/auth/send-otp` - Send OTP (Twilio or mock)
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token

#### Admin APIs (`/api/admin`)
- **Users**: `GET /users`, `DELETE /users/:id`, `PATCH /users/approve/:id`, `PATCH /users/block/:id`
- **Dashboard**: `GET /dashboard`, `GET /dashboard/charts`, `GET /dashboard/categories`
- **Products**: `GET /products`, `GET /products/pending`, `GET /products/live`, `GET /products/:id`, `PATCH /products/approve/:id`, `PATCH /products/reject/:id`
- **Orders**: `GET /orders`, `GET /orders/stats`, `PATCH /orders/:id/status`
- **Analytics**: `GET /analytics/weekly`, `GET /analytics/monthly`, `GET /analytics/categories`, `GET /analytics/top-products`

### 3. Twilio Integration
- Configurable via `.env`:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_PHONE_NUMBER`
  - `USE_MOCK_OTP=true` for development (uses "123456")

### 4. Frontend API Service
- Created `frontend/src/services/api.js` with all API methods
- Automatic token injection
- Error handling for 401 (auto-logout)

## 📋 Setup Instructions

### Backend Setup
1. Create `.env` file in `backend/`:
```env
PORT=5000
DATABASE_URL=your_neon_postgresql_url
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
USE_MOCK_OTP=true
# Optional Twilio:
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```

2. Run migrations:
```bash
cd backend
node src/scripts/runMigrations.js
```

3. Start server:
```bash
npm run dev
```

### Frontend Setup
1. Create `.env` file in `frontend/`:
```env
VITE_BASE_URL=http://localhost:5000
```

2. Start dev server:
```bash
cd frontend
npm run dev
```

## 🔄 Integration Status

- ✅ DashboardPage - Integrated with live APIs
- ⏳ UserManagementPage - Needs API integration
- ⏳ ProductManagementPage - Needs API integration
- ⏳ OrderManagementPage - Needs API integration
- ⏳ AnalyticsPage - Needs API integration

## 📝 Notes

- All UI styling, CSS, and layout remain **100% unchanged**
- Mock data is replaced with live API calls
- Error handling via toast notifications
- Responsive design maintained

