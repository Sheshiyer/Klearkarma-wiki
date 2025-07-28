# API Endpoints Documentation - MVP Stage

## Overview
This document defines all API endpoints for the Klear Karma MVP, including request/response formats, error handling, and authentication patterns.

## Base Configuration

### Base URL
```
Production: https://api.klearkarma.com/v1
Staging: https://staging-api.klearkarma.com/v1
Development: http://localhost:3001/api/v1
```

### Authentication
```
Headers:
  Authorization: Bearer <jwt_token>
  Content-Type: application/json
  X-API-Version: 1.0
```

### Standard Response Format

#### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123456789"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {},
    "field": "fieldName" // for validation errors
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123456789"
}
```

## Error Codes & HTTP Status Mapping

| HTTP Status | Error Code | Description |
|-------------|------------|-------------|
| 400 | VALIDATION_ERROR | Invalid request data |
| 401 | UNAUTHORIZED | Invalid or missing authentication |
| 403 | FORBIDDEN | Insufficient permissions |
| 404 | NOT_FOUND | Resource not found |
| 409 | CONFLICT | Resource already exists |
| 422 | UNPROCESSABLE_ENTITY | Business logic validation failed |
| 429 | RATE_LIMIT_EXCEEDED | Too many requests |
| 500 | INTERNAL_ERROR | Server error |
| 503 | SERVICE_UNAVAILABLE | Service temporarily unavailable |

---

## Authentication Endpoints

### POST /auth/register
Register a new user account

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "userType": "customer", // "customer" | "healer"
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "userType": "customer",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": false,
      "createdAt": "2024-01-15T10:30:00Z"
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token",
      "expiresIn": 3600
    }
  },
  "message": "Account created successfully"
}
```

**Error Responses:**
- 409: Email already exists
- 400: Invalid email format or weak password

### POST /auth/login
Authenticate user and get tokens

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "userType": "customer",
      "firstName": "John",
      "lastName": "Doe",
      "isVerified": true
    },
    "tokens": {
      "accessToken": "jwt_access_token",
      "refreshToken": "jwt_refresh_token",
      "expiresIn": 3600
    }
  },
  "message": "Login successful"
}
```

**Error Responses:**
- 401: Invalid credentials
- 422: Account not verified

### POST /auth/refresh
Refresh access token

**Request:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_access_token",
    "expiresIn": 3600
  },
  "message": "Token refreshed successfully"
}
```

---

## User Profile Endpoints

### GET /users/profile
Get current user profile

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "userType": "customer",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "profileImage": "https://cdn.klearkarma.com/profiles/user_123.jpg",
    "isVerified": true,
    "preferences": {
      "notifications": true,
      "language": "en",
      "timezone": "America/New_York"
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Profile retrieved successfully"
}
```

### PUT /users/profile
Update user profile

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "+1234567890",
  "preferences": {
    "notifications": true,
    "language": "en",
    "timezone": "America/New_York"
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Profile updated successfully"
}
```

---

## Healer Endpoints

### GET /healers
Get list of available healers with filters

**Query Parameters:**
- `specialties[]`: Array of specialty IDs
- `location`: Location string
- `availability`: "available" | "all"
- `rating`: Minimum rating (1-5)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 50)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "healers": [
      {
        "id": "healer_123",
        "firstName": "Jane",
        "lastName": "Smith",
        "profileImage": "https://cdn.klearkarma.com/profiles/healer_123.jpg",
        "specialties": [
          {
            "id": "spec_1",
            "name": "Reiki Healing",
            "category": "Energy Healing"
          }
        ],
        "rating": 4.8,
        "reviewCount": 127,
        "hourlyRate": 75,
        "currency": "USD",
        "location": "New York, NY",
        "isAvailable": true,
        "nextAvailableSlot": "2024-01-16T14:00:00Z",
        "bio": "Certified Reiki Master with 10+ years experience..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  },
  "message": "Healers retrieved successfully"
}
```

### GET /healers/:healerId
Get detailed healer profile

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "healer_123",
    "firstName": "Jane",
    "lastName": "Smith",
    "profileImage": "https://cdn.klearkarma.com/profiles/healer_123.jpg",
    "bio": "Certified Reiki Master with 10+ years experience...",
    "specialties": [
      {
        "id": "spec_1",
        "name": "Reiki Healing",
        "category": "Energy Healing",
        "description": "Traditional Japanese energy healing technique"
      }
    ],
    "certifications": [
      {
        "name": "Certified Reiki Master",
        "issuer": "International Reiki Association",
        "year": 2020
      }
    ],
    "rating": 4.8,
    "reviewCount": 127,
    "hourlyRate": 75,
    "currency": "USD",
    "location": "New York, NY",
    "languages": ["English", "Spanish"],
    "availability": {
      "timezone": "America/New_York",
      "schedule": {
        "monday": [{"start": "09:00", "end": "17:00"}],
        "tuesday": [{"start": "09:00", "end": "17:00"}]
      }
    },
    "reviews": [
      {
        "id": "review_123",
        "rating": 5,
        "comment": "Amazing session, felt so much better!",
        "customerName": "Sarah M.",
        "createdAt": "2024-01-10T15:30:00Z"
      }
    ]
  },
  "message": "Healer profile retrieved successfully"
}
```

---

## Booking Endpoints

### POST /bookings
Create a new booking

**Request:**
```json
{
  "healerId": "healer_123",
  "serviceId": "service_456",
  "startTime": "2024-01-16T14:00:00Z",
  "duration": 60,
  "notes": "First time booking, looking forward to the session",
  "paymentMethodId": "pm_123456789"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "booking_789",
    "status": "confirmed",
    "healer": {
      "id": "healer_123",
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "service": {
      "id": "service_456",
      "name": "Reiki Healing Session",
      "duration": 60,
      "price": 75
    },
    "startTime": "2024-01-16T14:00:00Z",
    "endTime": "2024-01-16T15:00:00Z",
    "totalAmount": 75,
    "currency": "USD",
    "meetingLink": "https://meet.klearkarma.com/session/booking_789",
    "notes": "First time booking, looking forward to the session",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Booking created successfully"
}
```

**Error Responses:**
- 409: Time slot not available
- 422: Invalid healer or service
- 400: Payment processing failed

### GET /bookings
Get user's bookings

**Query Parameters:**
- `status`: "upcoming" | "completed" | "cancelled" | "all"
- `page`: Page number
- `limit`: Items per page

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "booking_789",
        "status": "upcoming",
        "healer": {
          "id": "healer_123",
          "firstName": "Jane",
          "lastName": "Smith",
          "profileImage": "https://cdn.klearkarma.com/profiles/healer_123.jpg"
        },
        "service": {
          "name": "Reiki Healing Session",
          "duration": 60
        },
        "startTime": "2024-01-16T14:00:00Z",
        "endTime": "2024-01-16T15:00:00Z",
        "totalAmount": 75,
        "currency": "USD",
        "meetingLink": "https://meet.klearkarma.com/session/booking_789"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  },
  "message": "Bookings retrieved successfully"
}
```

### GET /bookings/:bookingId
Get specific booking details

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "booking_789",
    "status": "upcoming",
    "customer": {
      "id": "user_123",
      "firstName": "John",
      "lastName": "Doe"
    },
    "healer": {
      "id": "healer_123",
      "firstName": "Jane",
      "lastName": "Smith",
      "profileImage": "https://cdn.klearkarma.com/profiles/healer_123.jpg"
    },
    "service": {
      "id": "service_456",
      "name": "Reiki Healing Session",
      "description": "60-minute energy healing session",
      "duration": 60,
      "price": 75
    },
    "startTime": "2024-01-16T14:00:00Z",
    "endTime": "2024-01-16T15:00:00Z",
    "totalAmount": 75,
    "currency": "USD",
    "meetingLink": "https://meet.klearkarma.com/session/booking_789",
    "notes": "First time booking, looking forward to the session",
    "paymentStatus": "paid",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "message": "Booking details retrieved successfully"
}
```

### PUT /bookings/:bookingId/cancel
Cancel a booking

**Request:**
```json
{
  "reason": "Schedule conflict"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "booking_789",
    "status": "cancelled",
    "refundAmount": 75,
    "refundStatus": "processing",
    "cancellationReason": "Schedule conflict",
    "cancelledAt": "2024-01-15T12:00:00Z"
  },
  "message": "Booking cancelled successfully"
}
```

---

## Payment Endpoints

### POST /payments/methods
Add payment method

**Request:**
```json
{
  "type": "card",
  "cardToken": "stripe_card_token_123",
  "isDefault": true
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "pm_123456789",
    "type": "card",
    "card": {
      "last4": "4242",
      "brand": "visa",
      "expiryMonth": 12,
      "expiryYear": 2025
    },
    "isDefault": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Payment method added successfully"
}
```

### GET /payments/methods
Get user's payment methods

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": "pm_123456789",
        "type": "card",
        "card": {
          "last4": "4242",
          "brand": "visa",
          "expiryMonth": 12,
          "expiryYear": 2025
        },
        "isDefault": true,
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ]
  },
  "message": "Payment methods retrieved successfully"
}
```

---

## Review Endpoints

### POST /reviews
Create a review for a completed session

**Request:**
```json
{
  "bookingId": "booking_789",
  "healerId": "healer_123",
  "rating": 5,
  "comment": "Amazing session, felt so much better!",
  "isAnonymous": false
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "review_123",
    "rating": 5,
    "comment": "Amazing session, felt so much better!",
    "isAnonymous": false,
    "customer": {
      "firstName": "John",
      "lastName": "D."
    },
    "healer": {
      "id": "healer_123",
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "message": "Review submitted successfully"
}
```

---

## Notification Endpoints

### GET /notifications
Get user notifications

**Query Parameters:**
- `unreadOnly`: boolean
- `page`: Page number
- `limit`: Items per page

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "booking_confirmed",
        "title": "Booking Confirmed",
        "message": "Your session with Jane Smith is confirmed for Jan 16, 2:00 PM",
        "isRead": false,
        "data": {
          "bookingId": "booking_789"
        },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "unreadCount": 3,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "totalPages": 1
    }
  },
  "message": "Notifications retrieved successfully"
}
```

### PUT /notifications/:notificationId/read
Mark notification as read

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "notif_123",
    "isRead": true,
    "readAt": "2024-01-15T10:30:00Z"
  },
  "message": "Notification marked as read"
}
```

---

## System Endpoints

### GET /health
Health check endpoint

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "environment": "production",
    "uptime": 86400,
    "services": {
      "database": "healthy",
      "redis": "healthy",
      "stripe": "healthy"
    }
  },
  "message": "Service is healthy"
}
```

### GET /specialties
Get available healing specialties

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "specialties": [
      {
        "id": "spec_1",
        "name": "Reiki Healing",
        "category": "Energy Healing",
        "description": "Traditional Japanese energy healing technique",
        "isActive": true
      },
      {
        "id": "spec_2",
        "name": "Crystal Therapy",
        "category": "Crystal Healing",
        "description": "Healing using crystal energies",
        "isActive": true
      }
    ]
  },
  "message": "Specialties retrieved successfully"
}
```

---

## Rate Limiting

### Rate Limits by Endpoint Type
- Authentication: 5 requests per minute
- Profile updates: 10 requests per minute
- Search/Browse: 100 requests per minute
- Booking operations: 20 requests per minute
- General API: 60 requests per minute

### Rate Limit Headers
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1642248000
```

### Rate Limit Error Response (429)
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "limit": 60,
      "remaining": 0,
      "resetTime": "2024-01-15T11:00:00Z"
    }
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123456789"
}
```

---

## Webhook Endpoints (for external integrations)

### POST /webhooks/stripe
Stripe payment webhook

### POST /webhooks/calendar
Calendar integration webhook

---

## Development Notes

### MVP Limitations
1. **Simplified Authentication**: Basic JWT without refresh token rotation
2. **Limited Search**: Basic filtering without advanced search algorithms
3. **Basic Notifications**: In-app only, no push notifications
4. **Simple Payment Flow**: Single payment method per user
5. **Basic Reviews**: No review moderation or reporting

### Future Enhancements
1. Advanced search with AI recommendations
2. Real-time chat during sessions
3. Video calling integration
4. Advanced analytics and reporting
5. Multi-language support
6. Advanced notification preferences
7. Subscription-based pricing models

### Error Logging Format
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "error",
  "requestId": "req_123456789",
  "userId": "user_123",
  "endpoint": "/api/v1/bookings",
  "method": "POST",
  "statusCode": 500,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Database connection failed",
    "stack": "Error stack trace..."
  },
  "request": {
    "headers": {},
    "body": {},
    "query": {},
    "params": {}
  },
  "response": {
    "body": {},
    "headers": {}
  },
  "duration": 1250,
  "userAgent": "KlearKarma-Mobile/1.0.0",
  "ip": "192.168.1.1"
}
```