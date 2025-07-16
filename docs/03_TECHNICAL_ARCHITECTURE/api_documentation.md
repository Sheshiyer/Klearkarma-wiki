# Klear Karma API Documentation

## Overview

The Klear Karma API is a RESTful service built with Node.js, Express, and TypeScript. It provides comprehensive endpoints for managing users, practitioners, bookings, payments, and wellness data.

**Base URL:** `https://api.klearkarma.com/v1`

**Authentication:** Bearer Token (JWT)

**Content-Type:** `application/json`

---

## Authentication

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "userType": "client", // "client" | "practitioner"
  "phoneNumber": "+1234567890",
  "dateOfBirth": "1990-01-01"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "userType": "client",
      "isVerified": false,
      "createdAt": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### POST /auth/login
Authenticate user and receive access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "userType": "client",
      "isVerified": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

### POST /auth/forgot-password
Initiate password reset process.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### POST /auth/reset-password
Reset password using reset token.

**Request Body:**
```json
{
  "token": "reset_token_here",
  "newPassword": "newSecurePassword123"
}
```

---

## User Management

### GET /users/profile
Get current user's profile.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "userType": "client",
    "phoneNumber": "+1234567890",
    "dateOfBirth": "1990-01-01",
    "profileImage": "https://cdn.klearkarma.com/profiles/user_123.jpg",
    "preferences": {
      "notifications": {
        "email": true,
        "push": true,
        "sms": false
      },
      "privacy": {
        "shareHealthData": true,
        "publicProfile": false
      }
    },
    "healthProfile": {
      "conditions": ["anxiety", "chronic_pain"],
      "goals": ["stress_reduction", "better_sleep"],
      "allergies": ["peanuts"],
      "medications": ["ibuprofen"]
    },
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### PUT /users/profile
Update user profile.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phoneNumber": "+1234567890",
  "preferences": {
    "notifications": {
      "email": true,
      "push": false,
      "sms": true
    }
  }
}
```

### POST /users/upload-avatar
Upload user profile image.

**Content-Type:** `multipart/form-data`

**Form Data:**
- `avatar`: Image file (max 5MB, jpg/png)

### GET /users/health-data
Get user's health and wellness data.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "vitals": {
      "heartRate": {
        "current": 72,
        "average": 68,
        "trend": "stable",
        "lastUpdated": "2024-01-15T08:00:00Z"
      },
      "steps": {
        "today": 8500,
        "goal": 10000,
        "weeklyAverage": 7800
      },
      "sleep": {
        "lastNight": {
          "duration": 7.5,
          "quality": "good",
          "deepSleep": 2.1,
          "remSleep": 1.8
        }
      }
    },
    "mood": {
      "current": 7,
      "trend": "improving",
      "weeklyAverage": 6.5
    },
    "stress": {
      "current": 4,
      "trend": "decreasing",
      "weeklyAverage": 5.2
    }
  }
}
```

---

## Practitioner Management

### GET /practitioners
Search and filter practitioners.

**Query Parameters:**
- `search`: Search term
- `specialties`: Comma-separated specialties
- `location`: Location filter
- `availability`: Date filter (YYYY-MM-DD)
- `rating`: Minimum rating (1-5)
- `priceRange`: Price range (e.g., "50-100")
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Example:** `/practitioners?search=yoga&specialties=hatha,vinyasa&location=san-francisco&rating=4&page=1&limit=10`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "practitioners": [
      {
        "id": "prac_456",
        "firstName": "Sarah",
        "lastName": "Johnson",
        "title": "Certified Yoga Instructor",
        "specialties": ["hatha_yoga", "meditation", "breathwork"],
        "bio": "Experienced yoga instructor with 10+ years...",
        "profileImage": "https://cdn.klearkarma.com/practitioners/prac_456.jpg",
        "rating": 4.8,
        "reviewCount": 127,
        "location": {
          "city": "San Francisco",
          "state": "CA",
          "country": "US"
        },
        "pricing": {
          "sessionRate": 85,
          "packageRates": {
            "3_sessions": 240,
            "5_sessions": 375,
            "10_sessions": 700
          }
        },
        "availability": {
          "nextAvailable": "2024-01-16T10:00:00Z",
          "timezone": "America/Los_Angeles"
        },
        "certifications": [
          {
            "name": "RYT-500",
            "issuer": "Yoga Alliance",
            "year": 2018
          }
        ],
        "languages": ["English", "Spanish"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 45,
      "pages": 5
    },
    "filters": {
      "specialties": [
        {"id": "hatha_yoga", "name": "Hatha Yoga", "count": 23},
        {"id": "meditation", "name": "Meditation", "count": 18}
      ],
      "priceRanges": [
        {"range": "50-75", "count": 12},
        {"range": "75-100", "count": 20}
      ]
    }
  }
}
```

### GET /practitioners/{id}
Get detailed practitioner profile.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "prac_456",
    "firstName": "Sarah",
    "lastName": "Johnson",
    "title": "Certified Yoga Instructor",
    "bio": "Experienced yoga instructor with 10+ years of practice...",
    "specialties": ["hatha_yoga", "meditation", "breathwork"],
    "profileImage": "https://cdn.klearkarma.com/practitioners/prac_456.jpg",
    "gallery": [
      "https://cdn.klearkarma.com/practitioners/prac_456_1.jpg",
      "https://cdn.klearkarma.com/practitioners/prac_456_2.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 127,
    "location": {
      "address": "123 Wellness St",
      "city": "San Francisco",
      "state": "CA",
      "zipCode": "94102",
      "country": "US",
      "coordinates": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    },
    "contact": {
      "phone": "+1234567890",
      "email": "sarah@example.com",
      "website": "https://sarahjohnsonyoga.com"
    },
    "pricing": {
      "sessionRate": 85,
      "packageRates": {
        "3_sessions": 240,
        "5_sessions": 375,
        "10_sessions": 700
      },
      "currency": "USD"
    },
    "services": [
      {
        "id": "service_1",
        "name": "Private Yoga Session",
        "description": "One-on-one personalized yoga practice",
        "duration": 60,
        "price": 85,
        "category": "yoga"
      },
      {
        "id": "service_2",
        "name": "Meditation Guidance",
        "description": "Guided meditation for stress relief",
        "duration": 30,
        "price": 45,
        "category": "meditation"
      }
    ],
    "availability": {
      "timezone": "America/Los_Angeles",
      "schedule": {
        "monday": [{"start": "09:00", "end": "17:00"}],
        "tuesday": [{"start": "09:00", "end": "17:00"}],
        "wednesday": [{"start": "09:00", "end": "17:00"}],
        "thursday": [{"start": "09:00", "end": "17:00"}],
        "friday": [{"start": "09:00", "end": "15:00"}],
        "saturday": [{"start": "10:00", "end": "14:00"}],
        "sunday": []
      },
      "blackoutDates": ["2024-01-20", "2024-01-21"]
    },
    "certifications": [
      {
        "name": "RYT-500",
        "issuer": "Yoga Alliance",
        "year": 2018,
        "description": "500-hour Registered Yoga Teacher"
      }
    ],
    "education": [
      {
        "institution": "California Institute of Integral Studies",
        "degree": "Master of Arts in Somatic Psychology",
        "year": 2015
      }
    ],
    "languages": ["English", "Spanish"],
    "experience": 10,
    "totalSessions": 1250,
    "joinedAt": "2020-03-15T00:00:00Z"
  }
}
```

### GET /practitioners/{id}/availability
Get practitioner's available time slots.

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD)
- `serviceId`: Specific service ID

**Response (200):**
```json
{
  "success": true,
  "data": {
    "availability": [
      {
        "date": "2024-01-16",
        "slots": [
          {
            "startTime": "09:00",
            "endTime": "10:00",
            "available": true,
            "serviceId": "service_1"
          },
          {
            "startTime": "10:30",
            "endTime": "11:30",
            "available": true,
            "serviceId": "service_1"
          },
          {
            "startTime": "14:00",
            "endTime": "15:00",
            "available": false,
            "serviceId": "service_1",
            "reason": "booked"
          }
        ]
      }
    ],
    "timezone": "America/Los_Angeles"
  }
}
```

### GET /practitioners/{id}/reviews
Get practitioner reviews and ratings.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `rating`: Filter by rating (1-5)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "review_789",
        "user": {
          "firstName": "Emily",
          "lastName": "R.",
          "profileImage": "https://cdn.klearkarma.com/profiles/user_789.jpg"
        },
        "rating": 5,
        "title": "Amazing session!",
        "comment": "Sarah provided an incredible yoga session. Her guidance was perfect for my level...",
        "serviceId": "service_1",
        "serviceName": "Private Yoga Session",
        "sessionDate": "2024-01-10T10:00:00Z",
        "createdAt": "2024-01-11T15:30:00Z",
        "helpful": 12,
        "verified": true
      }
    ],
    "summary": {
      "averageRating": 4.8,
      "totalReviews": 127,
      "ratingDistribution": {
        "5": 89,
        "4": 28,
        "3": 7,
        "2": 2,
        "1": 1
      }
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 127,
      "pages": 13
    }
  }
}
```

---

## Booking Management

### POST /bookings
Create a new booking.

**Request Body:**
```json
{
  "practitionerId": "prac_456",
  "serviceId": "service_1",
  "startTime": "2024-01-16T10:00:00Z",
  "endTime": "2024-01-16T11:00:00Z",
  "notes": "First time booking, looking forward to the session",
  "location": {
    "type": "in_person", // "in_person" | "virtual" | "practitioner_location"
    "address": "123 My Street, City, State 12345"
  },
  "paymentMethodId": "pm_1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "booking_123",
      "practitioner": {
        "id": "prac_456",
        "firstName": "Sarah",
        "lastName": "Johnson",
        "profileImage": "https://cdn.klearkarma.com/practitioners/prac_456.jpg"
      },
      "service": {
        "id": "service_1",
        "name": "Private Yoga Session",
        "duration": 60,
        "price": 85
      },
      "startTime": "2024-01-16T10:00:00Z",
      "endTime": "2024-01-16T11:00:00Z",
      "status": "confirmed",
      "location": {
        "type": "in_person",
        "address": "123 My Street, City, State 12345"
      },
      "payment": {
        "amount": 85,
        "currency": "USD",
        "status": "paid",
        "transactionId": "txn_987654321"
      },
      "notes": "First time booking, looking forward to the session",
      "createdAt": "2024-01-15T12:00:00Z",
      "updatedAt": "2024-01-15T12:00:00Z"
    }
  }
}
```

### GET /bookings
Get user's bookings.

**Query Parameters:**
- `status`: Filter by status ("upcoming", "completed", "cancelled")
- `startDate`: Filter from date (YYYY-MM-DD)
- `endDate`: Filter to date (YYYY-MM-DD)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "booking_123",
        "practitioner": {
          "id": "prac_456",
          "firstName": "Sarah",
          "lastName": "Johnson",
          "profileImage": "https://cdn.klearkarma.com/practitioners/prac_456.jpg",
          "rating": 4.8
        },
        "service": {
          "id": "service_1",
          "name": "Private Yoga Session",
          "duration": 60,
          "category": "yoga"
        },
        "startTime": "2024-01-16T10:00:00Z",
        "endTime": "2024-01-16T11:00:00Z",
        "status": "upcoming",
        "location": {
          "type": "in_person",
          "address": "123 My Street, City, State 12345"
        },
        "payment": {
          "amount": 85,
          "currency": "USD",
          "status": "paid"
        },
        "canCancel": true,
        "canReschedule": true,
        "createdAt": "2024-01-15T12:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 15,
      "pages": 1
    }
  }
}
```

### GET /bookings/{id}
Get specific booking details.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "booking_123",
    "practitioner": {
      "id": "prac_456",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "profileImage": "https://cdn.klearkarma.com/practitioners/prac_456.jpg",
      "phone": "+1234567890",
      "email": "sarah@example.com"
    },
    "service": {
      "id": "service_1",
      "name": "Private Yoga Session",
      "description": "One-on-one personalized yoga practice",
      "duration": 60,
      "price": 85,
      "category": "yoga"
    },
    "startTime": "2024-01-16T10:00:00Z",
    "endTime": "2024-01-16T11:00:00Z",
    "status": "upcoming",
    "location": {
      "type": "in_person",
      "address": "123 My Street, City, State 12345",
      "coordinates": {
        "lat": 37.7749,
        "lng": -122.4194
      }
    },
    "payment": {
      "amount": 85,
      "currency": "USD",
      "status": "paid",
      "transactionId": "txn_987654321",
      "paymentMethod": {
        "type": "card",
        "last4": "4242",
        "brand": "visa"
      }
    },
    "notes": "First time booking, looking forward to the session",
    "preparation": {
      "instructions": "Please bring a yoga mat and water bottle. Wear comfortable clothing.",
      "materials": ["yoga_mat", "water_bottle"],
      "arrivalTime": "5 minutes early"
    },
    "virtualMeeting": null,
    "cancellationPolicy": {
      "deadline": "2024-01-15T10:00:00Z",
      "refundPercentage": 100
    },
    "canCancel": true,
    "canReschedule": true,
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

### PUT /bookings/{id}/cancel
Cancel a booking.

**Request Body:**
```json
{
  "reason": "schedule_conflict", // "schedule_conflict" | "emergency" | "other"
  "notes": "Had to cancel due to work emergency"
}
```

### PUT /bookings/{id}/reschedule
Reschedule a booking.

**Request Body:**
```json
{
  "newStartTime": "2024-01-17T14:00:00Z",
  "newEndTime": "2024-01-17T15:00:00Z",
  "reason": "Schedule conflict with original time"
}
```

### POST /bookings/{id}/complete
Mark booking as completed (practitioner only).

**Request Body:**
```json
{
  "notes": "Great session, client showed good progress",
  "recommendations": "Continue with weekly sessions, focus on breathing techniques"
}
```

---

## Payment Management

### GET /payments/methods
Get user's saved payment methods.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "paymentMethods": [
      {
        "id": "pm_1234567890",
        "type": "card",
        "card": {
          "brand": "visa",
          "last4": "4242",
          "expMonth": 12,
          "expYear": 2025
        },
        "isDefault": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### POST /payments/methods
Add new payment method.

**Request Body:**
```json
{
  "paymentMethodId": "pm_stripe_token",
  "setAsDefault": true
}
```

### DELETE /payments/methods/{id}
Remove payment method.

### GET /payments/history
Get payment history.

**Query Parameters:**
- `startDate`: Filter from date (YYYY-MM-DD)
- `endDate`: Filter to date (YYYY-MM-DD)
- `status`: Filter by status ("succeeded", "failed", "refunded")
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "payment_123",
        "bookingId": "booking_123",
        "amount": 85,
        "currency": "USD",
        "status": "succeeded",
        "practitioner": {
          "firstName": "Sarah",
          "lastName": "Johnson"
        },
        "service": {
          "name": "Private Yoga Session"
        },
        "paymentMethod": {
          "type": "card",
          "last4": "4242"
        },
        "transactionId": "txn_987654321",
        "createdAt": "2024-01-15T12:00:00Z"
      }
    ],
    "summary": {
      "totalSpent": 425,
      "totalSessions": 5,
      "averageSessionCost": 85
    },
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "pages": 1
    }
  }
}
```

### POST /payments/refund
Request refund for a payment.

**Request Body:**
```json
{
  "paymentId": "payment_123",
  "reason": "service_not_provided",
  "amount": 85, // Optional: partial refund amount
  "notes": "Practitioner cancelled last minute"
}
```

---

## Reviews and Ratings

### POST /reviews
Create a review for a completed booking.

**Request Body:**
```json
{
  "bookingId": "booking_123",
  "practitionerId": "prac_456",
  "rating": 5,
  "title": "Amazing session!",
  "comment": "Sarah provided an incredible yoga session. Her guidance was perfect for my level and I felt so relaxed afterwards. Highly recommend!",
  "categories": {
    "professionalism": 5,
    "communication": 5,
    "effectiveness": 5,
    "environment": 4
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "review": {
      "id": "review_789",
      "bookingId": "booking_123",
      "practitionerId": "prac_456",
      "rating": 5,
      "title": "Amazing session!",
      "comment": "Sarah provided an incredible yoga session...",
      "categories": {
        "professionalism": 5,
        "communication": 5,
        "effectiveness": 5,
        "environment": 4
      },
      "verified": true,
      "helpful": 0,
      "createdAt": "2024-01-17T10:00:00Z"
    }
  }
}
```

### GET /reviews/my-reviews
Get user's submitted reviews.

### PUT /reviews/{id}
Update a review (within 24 hours of creation).

### DELETE /reviews/{id}
Delete a review (within 24 hours of creation).

### POST /reviews/{id}/helpful
Mark a review as helpful.

---

## Notifications

### GET /notifications
Get user notifications.

**Query Parameters:**
- `unread`: Filter unread notifications (true/false)
- `type`: Filter by type ("booking", "payment", "review", "system")
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "notif_123",
        "type": "booking",
        "title": "Booking Confirmed",
        "message": "Your yoga session with Sarah Johnson has been confirmed for Jan 16, 2024 at 10:00 AM",
        "data": {
          "bookingId": "booking_123",
          "practitionerId": "prac_456"
        },
        "read": false,
        "createdAt": "2024-01-15T12:00:00Z"
      }
    ],
    "unreadCount": 3,
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 25,
      "pages": 2
    }
  }
}
```

### PUT /notifications/{id}/read
Mark notification as read.

### PUT /notifications/mark-all-read
Mark all notifications as read.

### DELETE /notifications/{id}
Delete a notification.

---

## Search and Discovery

### GET /search
Global search across practitioners, services, and content.

**Query Parameters:**
- `q`: Search query
- `type`: Search type ("practitioners", "services", "articles")
- `location`: Location filter
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "results": {
      "practitioners": [
        {
          "id": "prac_456",
          "firstName": "Sarah",
          "lastName": "Johnson",
          "title": "Certified Yoga Instructor",
          "specialties": ["hatha_yoga", "meditation"],
          "rating": 4.8,
          "location": "San Francisco, CA",
          "profileImage": "https://cdn.klearkarma.com/practitioners/prac_456.jpg"
        }
      ],
      "services": [
        {
          "id": "service_1",
          "name": "Private Yoga Session",
          "practitioner": "Sarah Johnson",
          "price": 85,
          "duration": 60
        }
      ],
      "articles": [
        {
          "id": "article_1",
          "title": "Benefits of Daily Yoga Practice",
          "excerpt": "Discover how incorporating yoga into your daily routine...",
          "author": "Dr. Jane Smith",
          "publishedAt": "2024-01-10T00:00:00Z"
        }
      ]
    },
    "totalResults": 15,
    "searchTime": 0.045
  }
}
```

### GET /search/suggestions
Get search suggestions and autocomplete.

**Query Parameters:**
- `q`: Partial search query
- `type`: Suggestion type ("practitioners", "specialties", "locations")

---

## Content and Education

### GET /articles
Get wellness articles and educational content.

**Query Parameters:**
- `category`: Filter by category
- `author`: Filter by author
- `featured`: Show featured articles (true/false)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### GET /articles/{id}
Get specific article content.

### GET /categories
Get available service categories and specialties.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "yoga",
        "name": "Yoga",
        "description": "Ancient practice combining physical postures, breathing, and meditation",
        "icon": "🧘‍♀️",
        "practitionerCount": 245,
        "subcategories": [
          {
            "id": "hatha_yoga",
            "name": "Hatha Yoga",
            "practitionerCount": 89
          },
          {
            "id": "vinyasa_yoga",
            "name": "Vinyasa Yoga",
            "practitionerCount": 67
          }
        ]
      },
      {
        "id": "meditation",
        "name": "Meditation",
        "description": "Mindfulness and meditation practices for mental clarity",
        "icon": "🧠",
        "practitionerCount": 156,
        "subcategories": [
          {
            "id": "mindfulness",
            "name": "Mindfulness Meditation",
            "practitionerCount": 78
          }
        ]
      }
    ]
  }
}
```

---

## Analytics and Insights

### GET /analytics/dashboard
Get user's wellness dashboard and insights.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalSessions": 15,
      "totalSpent": 1275,
      "favoriteCategory": "yoga",
      "streakDays": 7,
      "memberSince": "2024-01-01T00:00:00Z"
    },
    "wellness": {
      "moodTrend": {
        "current": 7.2,
        "change": "+0.8",
        "period": "last_30_days"
      },
      "stressTrend": {
        "current": 4.1,
        "change": "-1.2",
        "period": "last_30_days"
      },
      "sleepQuality": {
        "average": 7.8,
        "change": "+0.5",
        "period": "last_7_days"
      }
    },
    "activity": {
      "sessionsThisMonth": 4,
      "favoriteTime": "morning",
      "topPractitioners": [
        {
          "id": "prac_456",
          "name": "Sarah Johnson",
          "sessions": 8
        }
      ]
    },
    "goals": {
      "monthly": {
        "target": 8,
        "completed": 4,
        "progress": 50
      },
      "streakGoal": {
        "target": 30,
        "current": 7,
        "progress": 23
      }
    }
  }
}
```

---

## Error Responses

All API endpoints follow consistent error response format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` (400): Invalid request data
- `UNAUTHORIZED` (401): Invalid or missing authentication
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `CONFLICT` (409): Resource conflict (e.g., booking time unavailable)
- `RATE_LIMITED` (429): Too many requests
- `INTERNAL_ERROR` (500): Server error

---

## Rate Limiting

- **General API**: 1000 requests per hour per user
- **Search API**: 100 requests per minute per user
- **Authentication**: 10 requests per minute per IP

---

## Webhooks

Klear Karma supports webhooks for real-time event notifications:

### Supported Events

- `booking.created`
- `booking.updated`
- `booking.cancelled`
- `payment.succeeded`
- `payment.failed`
- `review.created`

### Webhook Payload Example

```json
{
  "event": "booking.created",
  "data": {
    "bookingId": "booking_123",
    "practitionerId": "prac_456",
    "userId": "user_123",
    "startTime": "2024-01-16T10:00:00Z",
    "amount": 85
  },
  "timestamp": "2024-01-15T12:00:00Z"
}
```

---

*This API documentation provides comprehensive coverage of all Klear Karma platform endpoints, enabling seamless integration and development of client applications.*