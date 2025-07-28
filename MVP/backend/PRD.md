# Klear Karma Mobile App - Backend PRD

## Project Overview
**Product**: Klear Karma Backend API (MVP)
**Platform**: Cloudflare Workers + KV Storage
**Architecture**: Monolithic API with mock data simulation
**Purpose**: Realistic API responses for frontend demo and investor validation

## Technical Architecture

### Cloudflare Workers Setup
- **Runtime**: Cloudflare Workers (V8 JavaScript)
- **Storage**: Cloudflare KV for mock data persistence
- **Secrets**: Cloudflare Secrets for API keys and configuration
- **Routing**: RESTful API endpoints with proper HTTP methods
- **CORS**: Configured for React Native mobile app access

### Data Storage Strategy
**KV Namespace Structure**:
- `USERS_KV`: User profiles and authentication data
- `PRACTITIONERS_KV`: Healer profiles and professional information
- `APPOINTMENTS_KV`: Booking and scheduling data
- `MESSAGES_KV`: Chat conversations and communication
- `SERVICES_KV`: Service offerings and pricing
- `REVIEWS_KV`: Ratings and review data
- `ANALYTICS_KV`: Usage metrics and performance data

## API Endpoint Specifications

### Authentication Endpoints

#### POST /api/auth/register
**Purpose**: User registration for both customers and healers
**Request Body**:
```json
{
  "userType": "customer" | "healer",
  "email": "string",
  "password": "string",
  "fullName": "string",
  "phone": "string",
  "professionalInfo": {
    "title": "string",
    "specializations": ["string"],
    "experience": "number",
    "bio": "string",
    "certifications": ["string"]
  }
}
```
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "string",
    "userType": "string",
    "profile": {}
  },
  "token": "jwt_token",
  "message": "Registration successful"
}
```

#### POST /api/auth/login
**Purpose**: User authentication
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "string",
    "userType": "customer" | "healer",
    "profile": {}
  },
  "token": "jwt_token"
}
```

#### POST /api/auth/forgot-password
**Purpose**: Password reset initiation
**Request Body**:
```json
{
  "email": "string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### User Profile Endpoints

#### GET /api/users/profile
**Purpose**: Get current user profile
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "profile": {
    "id": "uuid",
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "userType": "string",
    "profilePhoto": "url",
    "preferences": {},
    "createdAt": "timestamp"
  }
}
```

#### PUT /api/users/profile
**Purpose**: Update user profile
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "fullName": "string",
  "phone": "string",
  "profilePhoto": "url",
  "preferences": {}
}
```

### Practitioner Endpoints

#### GET /api/practitioners/search
**Purpose**: Search and filter practitioners
**Query Parameters**:
- `lat`: latitude
- `lng`: longitude
- `radius`: search radius in km
- `specialization`: filter by specialty
- `minRating`: minimum rating filter
- `maxPrice`: maximum price filter
- `availability`: available today/this week
- `page`: pagination
- `limit`: results per page

**Response**:
```json
{
  "success": true,
  "practitioners": [
    {
      "id": "uuid",
      "fullName": "string",
      "title": "string",
      "profilePhoto": "url",
      "specializations": ["string"],
      "rating": "number",
      "reviewCount": "number",
      "distance": "number",
      "startingPrice": "number",
      "availability": "string",
      "isVerified": "boolean"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "hasMore": "boolean"
  }
}
```

#### GET /api/practitioners/{id}
**Purpose**: Get detailed practitioner profile
**Response**:
```json
{
  "success": true,
  "practitioner": {
    "id": "uuid",
    "fullName": "string",
    "title": "string",
    "profilePhoto": "url",
    "bio": "string",
    "specializations": ["string"],
    "experience": "number",
    "certifications": ["string"],
    "rating": "number",
    "reviewCount": "number",
    "location": {
      "city": "string",
      "state": "string",
      "country": "string"
    },
    "services": [
      {
        "id": "uuid",
        "name": "string",
        "description": "string",
        "duration": "number",
        "price": "number",
        "category": "string"
      }
    ],
    "availability": {},
    "isVerified": "boolean"
  }
}
```

#### GET /api/practitioners/{id}/availability
**Purpose**: Get practitioner's available time slots
**Query Parameters**:
- `startDate`: start date for availability check
- `endDate`: end date for availability check

**Response**:
```json
{
  "success": true,
  "availability": {
    "2024-01-15": [
      {
        "startTime": "09:00",
        "endTime": "10:00",
        "available": true
      }
    ]
  }
}
```

### Booking Endpoints

#### POST /api/bookings
**Purpose**: Create new appointment booking
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "practitionerId": "uuid",
  "serviceId": "uuid",
  "date": "YYYY-MM-DD",
  "startTime": "HH:MM",
  "notes": "string",
  "paymentMethodId": "string"
}
```
**Response**:
```json
{
  "success": true,
  "booking": {
    "id": "uuid",
    "practitionerId": "uuid",
    "customerId": "uuid",
    "serviceId": "uuid",
    "date": "string",
    "startTime": "string",
    "endTime": "string",
    "status": "confirmed",
    "totalAmount": "number",
    "notes": "string",
    "createdAt": "timestamp"
  }
}
```

#### GET /api/bookings
**Purpose**: Get user's bookings (customer or healer view)
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `status`: upcoming/past/cancelled
- `page`: pagination
- `limit`: results per page

**Response**:
```json
{
  "success": true,
  "bookings": [
    {
      "id": "uuid",
      "practitioner": {
        "id": "uuid",
        "fullName": "string",
        "profilePhoto": "url"
      },
      "customer": {
        "id": "uuid",
        "fullName": "string",
        "profilePhoto": "url"
      },
      "service": {
        "name": "string",
        "duration": "number"
      },
      "date": "string",
      "startTime": "string",
      "status": "string",
      "totalAmount": "number"
    }
  ]
}
```

#### PUT /api/bookings/{id}
**Purpose**: Update booking (reschedule/cancel)
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "action": "reschedule" | "cancel",
  "newDate": "YYYY-MM-DD",
  "newStartTime": "HH:MM",
  "reason": "string"
}
```

### Messaging Endpoints

#### GET /api/conversations
**Purpose**: Get user's conversation list
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "conversations": [
    {
      "id": "uuid",
      "participant": {
        "id": "uuid",
        "fullName": "string",
        "profilePhoto": "url",
        "userType": "string"
      },
      "lastMessage": {
        "content": "string",
        "timestamp": "string",
        "senderId": "uuid"
      },
      "unreadCount": "number"
    }
  ]
}
```

#### GET /api/conversations/{id}/messages
**Purpose**: Get messages in a conversation
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `page`: pagination
- `limit`: messages per page

**Response**:
```json
{
  "success": true,
  "messages": [
    {
      "id": "uuid",
      "senderId": "uuid",
      "content": "string",
      "timestamp": "string",
      "messageType": "text" | "image" | "booking",
      "metadata": {}
    }
  ]
}
```

#### POST /api/conversations/{id}/messages
**Purpose**: Send new message
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "content": "string",
  "messageType": "text" | "image",
  "metadata": {}
}
```

### Review Endpoints

#### GET /api/practitioners/{id}/reviews
**Purpose**: Get practitioner reviews
**Query Parameters**:
- `page`: pagination
- `limit`: reviews per page

**Response**:
```json
{
  "success": true,
  "reviews": [
    {
      "id": "uuid",
      "customer": {
        "fullName": "string",
        "profilePhoto": "url"
      },
      "rating": "number",
      "comment": "string",
      "service": "string",
      "createdAt": "timestamp"
    }
  ],
  "summary": {
    "averageRating": "number",
    "totalReviews": "number",
    "ratingDistribution": {
      "5": "number",
      "4": "number",
      "3": "number",
      "2": "number",
      "1": "number"
    }
  }
}
```

#### POST /api/reviews
**Purpose**: Submit review for completed booking
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "bookingId": "uuid",
  "practitionerId": "uuid",
  "rating": "number",
  "comment": "string"
}
```

### Service Management Endpoints (Healer)

#### GET /api/healer/services
**Purpose**: Get healer's services
**Headers**: `Authorization: Bearer {token}`
**Response**:
```json
{
  "success": true,
  "services": [
    {
      "id": "uuid",
      "name": "string",
      "description": "string",
      "duration": "number",
      "price": "number",
      "category": "string",
      "isActive": "boolean",
      "bookingCount": "number"
    }
  ]
}
```

#### POST /api/healer/services
**Purpose**: Create new service
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "duration": "number",
  "price": "number",
  "category": "string"
}
```

#### PUT /api/healer/services/{id}
**Purpose**: Update service
**Headers**: `Authorization: Bearer {token}`
**Request Body**:
```json
{
  "name": "string",
  "description": "string",
  "duration": "number",
  "price": "number",
  "isActive": "boolean"
}
```

### Analytics Endpoints (Healer)

#### GET /api/healer/analytics/overview
**Purpose**: Get healer dashboard analytics
**Headers**: `Authorization: Bearer {token}`
**Query Parameters**:
- `period`: week/month/quarter/year

**Response**:
```json
{
  "success": true,
  "analytics": {
    "totalEarnings": "number",
    "totalBookings": "number",
    "averageRating": "number",
    "newClients": "number",
    "repeatClients": "number",
    "popularServices": [
      {
        "serviceName": "string",
        "bookingCount": "number",
        "revenue": "number"
      }
    ],
    "earningsChart": [
      {
        "date": "string",
        "amount": "number"
      }
    ]
  }
}
```

## Mock Data Specifications

### User Profiles (Customers)
**Sample Data Structure**:
```json
{
  "id": "customer_001",
  "email": "sarah.johnson@email.com",
  "fullName": "Sarah Johnson",
  "phone": "+1-555-0123",
  "userType": "customer",
  "profilePhoto": "https://images.unsplash.com/photo-1494790108755-2616b612b47c",
  "location": {
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "lat": 37.7749,
    "lng": -122.4194
  },
  "preferences": {
    "specializations": ["Acupuncture", "Massage Therapy"],
    "maxDistance": 25,
    "priceRange": [50, 200],
    "notifications": {
      "bookingReminders": true,
      "promotions": false
    }
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Practitioner Profiles (Healers)
**Sample Data Structure**:
```json
{
  "id": "healer_001",
  "email": "dr.chen@healingcenter.com",
  "fullName": "Dr. Lisa Chen",
  "title": "Licensed Acupuncturist",
  "phone": "+1-555-0456",
  "userType": "healer",
  "profilePhoto": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  "bio": "With over 15 years of experience in Traditional Chinese Medicine, I specialize in pain management and stress relief through acupuncture and herbal treatments.",
  "specializations": ["Acupuncture", "Herbal Medicine", "Pain Management"],
  "experience": 15,
  "certifications": [
    "Licensed Acupuncturist (CA)",
    "Diplomate in Acupuncture (NCCAOM)",
    "Herbal Medicine Certification"
  ],
  "location": {
    "address": "123 Wellness St, San Francisco, CA 94102",
    "city": "San Francisco",
    "state": "CA",
    "country": "USA",
    "lat": 37.7849,
    "lng": -122.4094
  },
  "rating": 4.8,
  "reviewCount": 127,
  "isVerified": true,
  "verificationDate": "2024-01-15T00:00:00Z",
  "availability": {
    "timezone": "America/Los_Angeles",
    "workingHours": {
      "monday": {"start": "09:00", "end": "17:00"},
      "tuesday": {"start": "09:00", "end": "17:00"},
      "wednesday": {"start": "09:00", "end": "17:00"},
      "thursday": {"start": "09:00", "end": "17:00"},
      "friday": {"start": "09:00", "end": "15:00"},
      "saturday": {"closed": true},
      "sunday": {"closed": true}
    }
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Services Data
**Sample Data Structure**:
```json
{
  "id": "service_001",
  "practitionerId": "healer_001",
  "name": "Initial Acupuncture Consultation",
  "description": "Comprehensive 90-minute session including consultation, diagnosis, and first treatment",
  "duration": 90,
  "price": 150,
  "category": "Acupuncture",
  "isActive": true,
  "bookingCount": 45,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Booking Data
**Sample Data Structure**:
```json
{
  "id": "booking_001",
  "customerId": "customer_001",
  "practitionerId": "healer_001",
  "serviceId": "service_001",
  "date": "2024-02-15",
  "startTime": "10:00",
  "endTime": "11:30",
  "status": "confirmed",
  "totalAmount": 150,
  "notes": "First time client, interested in stress relief",
  "paymentStatus": "paid",
  "createdAt": "2024-02-01T00:00:00Z",
  "updatedAt": "2024-02-01T00:00:00Z"
}
```

### Review Data
**Sample Data Structure**:
```json
{
  "id": "review_001",
  "bookingId": "booking_001",
  "customerId": "customer_001",
  "practitionerId": "healer_001",
  "rating": 5,
  "comment": "Dr. Chen was amazing! Very knowledgeable and made me feel comfortable throughout the session. I felt immediate relief from my back pain.",
  "service": "Initial Acupuncture Consultation",
  "createdAt": "2024-02-16T00:00:00Z"
}
```

### Message Data
**Sample Data Structure**:
```json
{
  "id": "message_001",
  "conversationId": "conv_001",
  "senderId": "customer_001",
  "receiverId": "healer_001",
  "content": "Hi Dr. Chen, I wanted to follow up on our session yesterday. I'm feeling much better!",
  "messageType": "text",
  "timestamp": "2024-02-16T14:30:00Z",
  "isRead": false
}
```

## Data Population Strategy

### Customer Profiles (50 mock users)
- Diverse demographics (age, location, preferences)
- Realistic names and profile photos
- Varied health interests and specialization preferences
- Different location clusters (SF, LA, NYC, Austin, Seattle)

### Practitioner Profiles (25 mock healers)
- Various specializations: Acupuncture, Massage, Reiki, Yoga, Nutrition, etc.
- Different experience levels (2-30 years)
- Realistic certifications and credentials
- Varied pricing structures ($50-$300 per session)
- Geographic distribution across major cities

### Services (100+ mock services)
- Comprehensive service offerings per practitioner
- Realistic descriptions and pricing
- Various durations (30min to 2 hours)
- Popular categories well-represented

### Bookings (200+ mock appointments)
- Mix of upcoming, past, and cancelled bookings
- Realistic scheduling patterns
- Various booking statuses and scenarios
- Customer-healer relationship history

### Reviews (300+ mock reviews)
- Realistic rating distribution (mostly 4-5 stars)
- Authentic-sounding comments
- Varied review lengths and detail levels
- Balanced feedback across all practitioners

### Messages (500+ mock conversations)
- Professional communication examples
- Booking-related discussions
- Follow-up conversations
- Various conversation stages and lengths

## Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

### Common Error Codes
- `UNAUTHORIZED`: Invalid or missing authentication
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `BOOKING_CONFLICT`: Time slot unavailable
- `PAYMENT_FAILED`: Payment processing error
- `RATE_LIMITED`: Too many requests

## Security Considerations

### Authentication
- JWT token-based authentication
- Token expiration and refresh mechanism
- Secure password hashing (bcrypt)
- Rate limiting on auth endpoints

### Data Protection
- Input validation and sanitization
- SQL injection prevention (though using KV)
- XSS protection
- CORS configuration
- Sensitive data encryption in KV storage

### Privacy
- User data anonymization in logs
- GDPR compliance considerations
- Data retention policies
- User consent management

## Performance Optimization

### Caching Strategy
- Practitioner search results caching
- User profile caching
- Service listings caching
- Review summaries caching

### Database Optimization
- Efficient KV key naming conventions
- Data denormalization for faster reads
- Pagination implementation
- Lazy loading strategies

### Response Optimization
- Gzip compression
- Minimal response payloads
- Image URL optimization
- CDN integration for static assets

This backend PRD provides the complete specification for implementing a robust Cloudflare Workers API that will serve realistic mock data to the React Native frontend, creating a seamless and convincing MVP experience for stakeholders and early adopters.