# 🥋 DevDojo API Documentation

Complete API reference for DevDojo Backend v1.0.0

**Base URL**: `http://localhost:3000/api/v1`  
**Production URL**: `https://your-domain.com/api/v1`

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Problems](#problems)
- [Code Execution](#code-execution)
- [Submissions](#submissions)
- [Playlists](#playlists)
- [Models](#models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

---

## 🔐 Authentication

### Register User

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "bio": "Passionate developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully. Please verify your email.",
  "data": {
    "user": {
      "id": "cm1x2y3z4",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": false,
      "role": "USER",
      "createdAt": "2026-02-13T10:00:00.000Z"
    }
  }
}
```

**Cookies Set**:
- `accessToken` - JWT (15 minutes expiry)
- `refreshToken` - JWT (7 days expiry)

---

### Login User

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "cm1x2y3z4",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": true,
      "role": "USER",
      "bio": "Passionate developer",
      "avatar": "https://cloudinary.com/...",
      "streak": 5,
      "longestStreak": 10
    }
  }
}
```

**Cookies Set**:
- `accessToken` - JWT (15 minutes expiry)
- `refreshToken` - JWT (7 days expiry)

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Verify Email

**Endpoint**: `GET /auth/verify/:token`

**URL Parameters**:
- `token` - Email verification token sent to user's email

**Response** (200):
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

### Google OAuth Login

**Endpoint**: `GET /auth/google`

Redirects to Google OAuth consent screen.

**Callback**: `GET /auth/google/callback`

After successful authentication, redirects to frontend with cookies set.

---

### Refresh Access Token

**Endpoint**: `POST /auth/refresh`

**Cookies Required**:
- `refreshToken`

**Response** (200):
```json
{
  "success": true,
  "message": "Token refreshed successfully"
}
```

**New Cookies Set**:
- `accessToken` - New JWT (15 minutes expiry)

---

### Logout

**Endpoint**: `POST /auth/logout`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Cookies Cleared**:
- `accessToken`
- `refreshToken`

---

## 💻 Problems

### List All Problems

**Endpoint**: `GET /problems`

**Query Parameters**:
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20)
- `difficulty` (optional) - `EASY`, `MEDIUM`, `HARD`
- `search` (optional) - Search by title or tags

**Response** (200):
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "id": "prob1",
        "title": "Two Sum",
        "description": "Find two numbers that add up to target",
        "difficulty": "EASY",
        "tags": ["array", "hash-table"],
        "constraints": "1 <= nums.length <= 10^4",
        "inputFormat": "Array and target",
        "outputFormat": "Indices of two numbers",
        "sampleInput": "[2,7,11,15]\n9",
        "sampleOutput": "[0,1]",
        "testCases": [
          {
            "input": "[2,7,11,15]\n9",
            "expectedOutput": "[0,1]"
          }
        ],
        "createdAt": "2026-02-13T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

---

### Get Problem by ID

**Endpoint**: `GET /problems/:id`

**URL Parameters**:
- `id` - Problem ID

**Response** (200):
```json
{
  "success": true,
  "data": {
    "problem": {
      "id": "prob1",
      "title": "Two Sum",
      "description": "Find two numbers that add up to target...",
      "difficulty": "EASY",
      "tags": ["array", "hash-table"],
      "constraints": "1 <= nums.length <= 10^4",
      "inputFormat": "Array and target",
      "outputFormat": "Indices of two numbers",
      "sampleInput": "[2,7,11,15]\n9",
      "sampleOutput": "[0,1]",
      "testCases": [
        {
          "id": "test1",
          "input": "[2,7,11,15]\n9",
          "expectedOutput": "[0,1]"
        },
        {
          "id": "test2",
          "input": "[3,2,4]\n6",
          "expectedOutput": "[1,2]"
        }
      ],
      "submissions": 1543,
      "acceptedSubmissions": 892
    }
  }
}
```

---

### Create Problem (Admin Only)

**Endpoint**: `POST /problems`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**:
```json
{
  "title": "Two Sum",
  "description": "Given an array of integers...",
  "difficulty": "EASY",
  "tags": ["array", "hash-table"],
  "constraints": "1 <= nums.length <= 10^4",
  "inputFormat": "Array and target number",
  "outputFormat": "Indices array",
  "sampleInput": "[2,7,11,15]\n9",
  "sampleOutput": "[0,1]",
  "testCases": [
    {
      "input": "[2,7,11,15]\n9",
      "expectedOutput": "[0,1]"
    },
    {
      "input": "[3,2,4]\n6",
      "expectedOutput": "[1,2]"
    }
  ]
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Problem created successfully",
  "data": {
    "problem": {
      "id": "prob1",
      "title": "Two Sum",
      // ... full problem object
    }
  }
}
```

---

### Update Problem (Admin Only)

**Endpoint**: `PUT /problems/:id`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**: (Same as Create Problem)

**Response** (200):
```json
{
  "success": true,
  "message": "Problem updated successfully",
  "data": {
    "problem": {
      // ... updated problem object
    }
  }
}
```

---

### Delete Problem (Admin Only)

**Endpoint**: `DELETE /problems/:id`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Problem deleted successfully"
}
```

---

## ⚡ Code Execution

### Execute Code

**Endpoint**: `POST /execute-code`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**:
```json
{
  "code": "def two_sum(nums, target):\n    # code here",
  "language": "python",
  "input": "[2,7,11,15]\n9"
}
```

**Supported Languages**:
- `python` - Python 3
- `java` - Java 11
- `javascript` - Node.js

**Response** (200):
```json
{
  "success": true,
  "data": {
    "output": "[0, 1]",
    "executionTime": "0.045s",
    "memory": "12.5 MB",
    "status": "Accepted"
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Compilation Error",
  "data": {
    "error": "SyntaxError: invalid syntax",
    "line": 3
  }
}
```

---

## 📝 Submissions

### Submit Solution

**Endpoint**: `POST /submission`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**:
```json
{
  "problemId": "prob1",
  "code": "def two_sum(nums, target):\n    # solution",
  "language": "python"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Solution submitted successfully",
  "data": {
    "submission": {
      "id": "sub1",
      "problemId": "prob1",
      "userId": "user1",
      "code": "def two_sum...",
      "language": "python",
      "status": "ACCEPTED",
      "executionTime": "45ms",
      "memory": "12.5MB",
      "testCaseResults": [
        {
          "testCaseId": "test1",
          "passed": true,
          "output": "[0,1]",
          "expectedOutput": "[0,1]",
          "executionTime": "20ms"
        },
        {
          "testCaseId": "test2",
          "passed": true,
          "output": "[1,2]",
          "expectedOutput": "[1,2]",
          "executionTime": "25ms"
        }
      ],
      "createdAt": "2026-02-13T10:00:00.000Z"
    }
  }
}
```

**Status Values**:
- `ACCEPTED` - All test cases passed
- `WRONG_ANSWER` - Some test cases failed
- `TIME_LIMIT_EXCEEDED` - Execution time exceeded
- `MEMORY_LIMIT_EXCEEDED` - Memory limit exceeded
- `RUNTIME_ERROR` - Code crashed during execution
- `COMPILATION_ERROR` - Code failed to compile

---

### Get User Submissions

**Endpoint**: `GET /submission/:userId`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**URL Parameters**:
- `userId` - User ID

**Query Parameters**:
- `problemId` (optional) - Filter by problem
- `status` (optional) - Filter by status
- `limit` (optional) - Items per page (default: 50)
- `offset` (optional) - Skip items (default: 0)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "submissions": [
      {
        "id": "sub1",
        "problemId": "prob1",
        "problemTitle": "Two Sum",
        "language": "python",
        "status": "ACCEPTED",
        "executionTime": "45ms",
        "memory": "12.5MB",
        "createdAt": "2026-02-13T10:00:00.000Z"
      }
    ],
    "stats": {
      "total": 25,
      "accepted": 18,
      "wrongAnswer": 5,
      "timeLimit": 2
    }
  }
}
```

---

## 📚 Playlists

### List Playlists

**Endpoint**: `GET /playlist`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "playlists": [
      {
        "id": "list1",
        "name": "Array Fundamentals",
        "description": "Master array operations",
        "creatorId": "user1",
        "creatorName": "John Doe",
        "problemCount": 15,
        "isPublic": true,
        "createdAt": "2026-02-13T10:00:00.000Z"
      }
    ]
  }
}
```

---

### Create Playlist

**Endpoint**: `POST /playlist`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**:
```json
{
  "name": "Array Fundamentals",
  "description": "Master array operations",
  "isPublic": true,
  "problemIds": ["prob1", "prob2", "prob3"]
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Playlist created successfully",
  "data": {
    "playlist": {
      "id": "list1",
      "name": "Array Fundamentals",
      "description": "Master array operations",
      "creatorId": "user1",
      "isPublic": true,
      "problems": [
        {
          "problemId": "prob1",
          "order": 1,
          "problem": {
            "title": "Two Sum",
            "difficulty": "EASY"
          }
        }
      ]
    }
  }
}
```

---

### Update Playlist

**Endpoint**: `PUT /playlist/:id`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Request Body**: (Same as Create Playlist)

**Response** (200):
```json
{
  "success": true,
  "message": "Playlist updated successfully"
}
```

---

### Delete Playlist

**Endpoint**: `DELETE /playlist/:id`

**Headers**:
```
Authorization: Bearer <accessToken>
```

**Response** (200):
```json
{
  "success": true,
  "message": "Playlist deleted successfully"
}
```

---

## 📊 Models

### User Model

```typescript
{
  id: string;
  name: string;
  email: string;
  password: string | null; // null for OAuth users
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  role: "USER" | "ADMIN";
  bio: string | null;
  avatar: string | null;
  streak: number;
  longestStreak: number;
  lastLoginDate: Date | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

### Problem Model

```typescript
{
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  sampleInput: string;
  sampleOutput: string;
  testCases: TestCase[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Submission Model

```typescript
{
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: "ACCEPTED" | "WRONG_ANSWER" | "TIME_LIMIT_EXCEEDED" | 
          "MEMORY_LIMIT_EXCEEDED" | "RUNTIME_ERROR" | "COMPILATION_ERROR";
  executionTime: string | null;
  memory: string | null;
  createdAt: Date;
}
```

---

## ❌ Error Handling

All errors follow this structure:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error

---

## ⏱️ Rate Limiting

**Current Limits**:
- Authentication endpoints: 5 requests/minute
- Code execution: 10 requests/minute
- Problem creation: 20 requests/hour (Admin only)
- General API: 100 requests/minute

**Rate Limit Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1707825600
```

---

## 🔒 Security

### Authentication

All protected endpoints require JWT token in `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### CORS

Allowed origins:
- `http://localhost:5173` (Development)
- Your production domain

### Cookie Security

Cookies are set with:
- `httpOnly: true` - Prevents XSS attacks
- `secure: true` - HTTPS only (production)
- `sameSite: 'strict'` - CSRF protection
- `domain: '.devdojo.com'` - Domain scoped

---

## 📞 Support

For API issues or questions:

- **Email**: codewithevilxd@gmail.com
- **GitHub Issues**: https://github.com/CodewithEvilxd/DevDojo-Backend/issues
- **Discord**: raj.dev_

---

*API Documentation v1.0.0 | Last Updated: February 13, 2026*
