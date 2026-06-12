# Full Stack Authentication System

A modern and secure authentication system built using React, Vite, Tailwind CSS, Node.js, Express.js, MongoDB, JWT Authentication, Email OTP Verification, Password Reset Flow, and Google OAuth Login.

## Features

### Authentication

* User Registration
* User Login
* JWT-Based Authentication
* Secure Logout
* Protected Routes
* Profile Management

### Email Verification

* OTP Generation
* Email OTP Verification
* OTP Resend Functionality
* OTP Expiration Handling
* Limited OTP Attempts Protection

### Password Management

* Forgot Password
* Reset Password via OTP
* Change Password
* Secure Password Hashing using bcrypt

### OAuth Authentication

* Google OAuth Login
* Session-Free Authentication Flow

### Security Features

* Password Hashing with bcrypt
* JWT Authentication
* HTTP-Only Cookies
* Rate Limiting
* Input Validation
* Protected API Routes
* Secure Authentication Middleware

---

## Tech Stack

### Frontend

* React 19
* React Router DOM
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Passport.js
* Google OAuth 2.0
* Nodemailer
* bcryptjs

---

## Project Structure

```bash
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── routes
│   │   └── api
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── utils
│   └── server.js
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project-folder
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start Backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Authentication Flow

### Registration

1. User creates an account.
2. OTP is sent to email.
3. User verifies OTP.
4. Account becomes active.

### Login

1. User enters credentials.
2. JWT token is generated.
3. Token is stored in HTTP-only cookies.
4. Protected routes become accessible.

### Password Reset

1. User requests password reset.
2. OTP is sent to registered email.
3. User verifies OTP.
4. New password is created.

### Google OAuth

1. User clicks Google Login.
2. Google authenticates user.
3. JWT token is generated.
4. User is redirected to dashboard.

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/profile
```

### Email Verification

```http
POST /api/auth/verify-otp
POST /api/auth/resend-otp
```

### Password Reset

```http
POST /api/auth/forgot-password
POST /api/auth/verify-reset-otp
POST /api/auth/reset-password
POST /api/auth/change-password
```

### OAuth

```http
GET /api/auth/google
GET /api/auth/google/callback
```

---

## Security Measures

* JWT Authentication
* bcrypt Password Hashing
* HTTP-Only Cookies
* Rate Limiting
* OTP Expiration
* Limited OTP Attempts
* Input Validation
* Protected Routes

---

## Future Improvements

* GitHub OAuth Login
* Refresh Tokens
* Two-Factor Authentication (2FA)
* User Roles & Permissions
* Account Activity Logs
* Email Templates
* Admin Dashboard

---

## Author

Ram

B.Tech CSE-AI Student | Full Stack Developer
