# Klear Karma API Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [API Overview](#api-overview)
4. [GraphQL API](#graphql-api)
5. [REST API Endpoints](#rest-api-endpoints)
6. [WebSocket API](#websocket-api)
7. [Webhooks](#webhooks)
8. [Error Handling](#error-handling)
9. [Rate Limiting](#rate-limiting)
10. [SDK and Libraries](#sdk-and-libraries)
11. [Testing and Development](#testing-and-development)
12. [Changelog](#changelog)

---

## Introduction

The Klear Karma API provides comprehensive access to our digital wellness platform, enabling developers to build applications that connect users with holistic health practitioners. Our API follows RESTful principles and GraphQL standards, ensuring consistency, reliability, and ease of integration.

### API Principles

- **RESTful Design:** Consistent resource-based URLs and HTTP methods
- **GraphQL Support:** Flexible data fetching with a single endpoint
- **Security First:** OAuth 2.0, JWT tokens, and comprehensive security measures
- **Developer Experience:** Comprehensive documentation, SDKs, and testing tools
- **Reliability:** 99.9% uptime with robust error handling and monitoring

### Base URLs

```
Production:  https://api.klearkarma.com/v1
Staging:     https://api-staging.klearkarma.com/v1
Development: https://api-dev.klearkarma.com/v1

GraphQL Endpoint: https://api.klearkarma.com/graphql
WebSocket:        wss://ws.klearkarma.com
```

### API Versioning

We use URL-based versioning to ensure backward compatibility:

- **Current Version:** v1
- **Deprecation Policy:** 12 months notice before version deprecation
- **Migration Support:** Comprehensive migration guides and tools

---

## Authentication

### OAuth 2.0 Flow

Klear Karma uses OAuth 2.0 with PKCE (Proof Key for Code Exchange) for secure authentication.

#### Authorization Code Flow

**Step 1: Authorization Request**
```http
GET https://auth.klearkarma.com/oauth/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=YOUR_REDIRECT_URI&
  scope=read:profile write:bookings&
  state=RANDOM_STATE&
  code_challenge=CODE_CHALLENGE&
  code_challenge_method=S256
```

**Step 2: Token Exchange**
```http
POST https://auth.klearkarma.com/oauth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "client_id": "YOUR_CLIENT_ID",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": "YOUR_REDIRECT_URI",
  "code_verifier": "CODE_VERIFIER"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read:profile write:bookings"
}
```

### JWT Token Structure

**Header:**
```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-id"
}
```

**Payload:**
```json
{
  "sub": "user-id",
  "iss": "https://auth.klearkarma.com",
  "aud": "https://api.klearkarma.com",
  "exp": 1640995200,
  "iat": 1640991600,
  "scope": "read:profile write:bookings",
  "user_type": "patient",
  "verified": true
}
```

### API Key Authentication

For server-to-server communication, use API keys:

```http
Authorization: Bearer YOUR_API_KEY
```

### Scopes and Permissions

| Scope | Description |
|-------|-------------|
| `read:profile` | Read user profile information |
| `write:profile` | Update user profile information |
| `read:bookings` | Read user's booking information |
| `write:bookings` | Create and modify bookings |
| `read:practitioners` | Access practitioner directory |
| `write:practitioners` | Update practitioner information (practitioners only) |
| `read:messages` | Read messages and communications |
| `write:messages` | Send messages and communications |
| `read:health_records` | Access health records (with consent) |
| `write:health_records` | Update health records |
| `admin:users` | Administrative access to user management |
| `admin:platform` | Full platform administrative access |

---

## API Overview

### Request Format

**Headers:**
```http
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
Accept: application/json
User-Agent: YourApp/1.0.0
X-Request-ID: unique-request-id
```

**Request Body (JSON):**
```json
{
  "data": {
    "attribute1": "value1",
    "attribute2": "value2"
  },
  "meta": {
    "client_version": "1.0.0",
    "platform": "web"
  }
}
```

### Response Format

**Success Response:**
```json
{
  "data": {
    "id": "resource-id",
    "type": "resource-type",
    "attributes": {
      "name": "Resource Name",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "relationships": {
      "related_resource": {
        "data": {
          "id": "related-id",
          "type": "related-type"
        }
      }
    }
  },
  "meta": {
    "request_id": "req-123",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0"
  }
}
```

**Error Response:**
```json
{
  "errors": [
    {
      "id": "error-id",
      "status": "400",
      "code": "VALIDATION_ERROR",
      "title": "Validation Error",
      "detail": "The email field is required",
      "source": {
        "pointer": "/data/attributes/email"
      }
    }
  ],
  "meta": {
    "request_id": "req-123",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

---

## GraphQL API

### Endpoint

```
POST https://api.klearkarma.com/graphql
```

### Schema Overview

#### Core Types

**User Type**
```graphql
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  dateOfBirth: Date
  phoneNumber: String
  address: Address
  preferences: UserPreferences!
  healthProfile: HealthProfile
  bookings(first: Int, after: String): BookingConnection!
  messages(first: Int, after: String): MessageConnection!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserPreferences {
  language: String!
  timezone: String!
  notifications: NotificationSettings!
  privacy: PrivacySettings!
}

type HealthProfile {
  conditions: [String!]!
  allergies: [String!]!
  medications: [String!]!
  goals: [String!]!
  emergencyContact: EmergencyContact
}
```

**Practitioner Type**
```graphql
type Practitioner {
  id: ID!
  user: User!
  specializations: [Specialization!]!
  credentials: [Credential!]!
  bio: String!
  experience: Int!
  languages: [String!]!
  availability: Availability!
  pricing: PricingInfo!
  reviews(first: Int, after: String): ReviewConnection!
  rating: Float!
  totalSessions: Int!
  responseTime: Int!
  verified: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Specialization {
  id: ID!
  name: String!
  category: String!
  description: String
}

type Credential {
  id: ID!
  type: String!
  institution: String!
  year: Int!
  verified: Boolean!
}
```

**Booking Type**
```graphql
type Booking {
  id: ID!
  user: User!
  practitioner: Practitioner!
  service: Service!
  scheduledAt: DateTime!
  duration: Int!
  status: BookingStatus!
  type: SessionType!
  location: Location
  notes: String
  price: Money!
  paymentStatus: PaymentStatus!
  cancellationPolicy: CancellationPolicy!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum BookingStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

enum SessionType {
  VIDEO_CALL
  PHONE_CALL
  IN_PERSON
  CHAT
}
```

#### Query Examples

**Get User Profile**
```graphql
query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    firstName
    lastName
    email
    healthProfile {
      conditions
      goals
    }
    preferences {
      language
      timezone
    }
  }
}
```

**Search Practitioners**
```graphql
query SearchPractitioners(
  $specialization: String
  $location: LocationInput
  $availability: AvailabilityInput
  $first: Int
  $after: String
) {
  practitioners(
    filter: {
      specialization: $specialization
      location: $location
      availability: $availability
    }
    first: $first
    after: $after
  ) {
    edges {
      node {
        id
        user {
          firstName
          lastName
        }
        specializations {
          name
          category
        }
        rating
        pricing {
          basePrice
          currency
        }
        availability {
          nextAvailable
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

**Create Booking**
```graphql
mutation CreateBooking($input: CreateBookingInput!) {
  createBooking(input: $input) {
    booking {
      id
      scheduledAt
      practitioner {
        user {
          firstName
          lastName
        }
      }
      service {
        name
        duration
      }
      price {
        amount
        currency
      }
      status
    }
    errors {
      field
      message
    }
  }
}
```

#### Subscription Examples

**Real-time Booking Updates**
```graphql
subscription BookingUpdates($userId: ID!) {
  bookingUpdates(userId: $userId) {
    id
    status
    scheduledAt
    practitioner {
      user {
        firstName
        lastName
      }
    }
  }
}
```

**Live Chat Messages**
```graphql
subscription ChatMessages($conversationId: ID!) {
  messageAdded(conversationId: $conversationId) {
    id
    content
    sender {
      id
      firstName
    }
    timestamp
    type
  }
}
```

---

## REST API Endpoints

### User Management

#### Get User Profile
```http
GET /users/{user_id}
```

**Response:**
```json
{
  "data": {
    "id": "user_123",
    "type": "user",
    "attributes": {
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "date_of_birth": "1990-01-01",
      "phone_number": "+1234567890",
      "verified": true,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    },
    "relationships": {
      "health_profile": {
        "data": {
          "id": "health_123",
          "type": "health_profile"
        }
      }
    }
  }
}
```

#### Update User Profile
```http
PUT /users/{user_id}
Content-Type: application/json

{
  "data": {
    "type": "user",
    "attributes": {
      "first_name": "John",
      "last_name": "Smith",
      "phone_number": "+1234567890"
    }
  }
}
```

#### Get User Preferences
```http
GET /users/{user_id}/preferences
```

**Response:**
```json
{
  "data": {
    "id": "pref_123",
    "type": "user_preferences",
    "attributes": {
      "language": "en",
      "timezone": "America/New_York",
      "notifications": {
        "email": true,
        "sms": false,
        "push": true
      },
      "privacy": {
        "profile_visibility": "public",
        "show_online_status": true
      }
    }
  }
}
```

### Practitioner Directory

#### Search Practitioners
```http
GET /practitioners?specialization=yoga&location=New+York&available_from=2024-01-01T09:00:00Z&limit=20&offset=0
```

**Query Parameters:**
- `specialization` (string): Filter by specialization
- `location` (string): Geographic location
- `available_from` (datetime): Earliest availability
- `available_to` (datetime): Latest availability
- `rating_min` (float): Minimum rating
- `price_max` (integer): Maximum price per session
- `language` (string): Practitioner language
- `session_type` (string): video_call, phone_call, in_person, chat
- `limit` (integer): Number of results (max 100)
- `offset` (integer): Pagination offset

**Response:**
```json
{
  "data": [
    {
      "id": "prac_123",
      "type": "practitioner",
      "attributes": {
        "first_name": "Jane",
        "last_name": "Smith",
        "bio": "Certified yoga instructor with 10 years of experience",
        "specializations": ["Hatha Yoga", "Meditation"],
        "rating": 4.8,
        "total_sessions": 1250,
        "response_time": 120,
        "languages": ["English", "Spanish"],
        "verified": true
      },
      "relationships": {
        "availability": {
          "data": {
            "id": "avail_123",
            "type": "availability"
          }
        }
      }
    }
  ],
  "meta": {
    "total_count": 150,
    "page": 1,
    "per_page": 20,
    "total_pages": 8
  }
}
```

#### Get Practitioner Details
```http
GET /practitioners/{practitioner_id}
```

#### Get Practitioner Availability
```http
GET /practitioners/{practitioner_id}/availability?from=2024-01-01&to=2024-01-07
```

**Response:**
```json
{
  "data": {
    "id": "avail_123",
    "type": "availability",
    "attributes": {
      "timezone": "America/New_York",
      "slots": [
        {
          "start_time": "2024-01-01T09:00:00Z",
          "end_time": "2024-01-01T10:00:00Z",
          "available": true,
          "price": {
            "amount": 75,
            "currency": "USD"
          }
        }
      ]
    }
  }
}
```

### Booking Management

#### Create Booking
```http
POST /bookings
Content-Type: application/json

{
  "data": {
    "type": "booking",
    "attributes": {
      "practitioner_id": "prac_123",
      "service_id": "service_123",
      "scheduled_at": "2024-01-01T10:00:00Z",
      "duration": 60,
      "session_type": "video_call",
      "notes": "First session, interested in stress management"
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "id": "booking_123",
    "type": "booking",
    "attributes": {
      "scheduled_at": "2024-01-01T10:00:00Z",
      "duration": 60,
      "status": "pending",
      "session_type": "video_call",
      "price": {
        "amount": 75,
        "currency": "USD"
      },
      "payment_status": "pending",
      "created_at": "2024-01-01T00:00:00Z"
    },
    "relationships": {
      "practitioner": {
        "data": {
          "id": "prac_123",
          "type": "practitioner"
        }
      }
    }
  }
}
```

#### Get User Bookings
```http
GET /users/{user_id}/bookings?status=confirmed&from=2024-01-01&to=2024-12-31
```

#### Update Booking
```http
PUT /bookings/{booking_id}
```

#### Cancel Booking
```http
DELETE /bookings/{booking_id}
```

### Payment Processing

#### Create Payment Intent
```http
POST /payments/intents
Content-Type: application/json

{
  "data": {
    "type": "payment_intent",
    "attributes": {
      "booking_id": "booking_123",
      "amount": 7500,
      "currency": "USD",
      "payment_method_types": ["card", "apple_pay", "google_pay"]
    }
  }
}
```

#### Confirm Payment
```http
POST /payments/intents/{intent_id}/confirm
```

#### Get Payment History
```http
GET /users/{user_id}/payments
```

### Messaging and Communication

#### Get Conversations
```http
GET /users/{user_id}/conversations
```

#### Send Message
```http
POST /conversations/{conversation_id}/messages
Content-Type: application/json

{
  "data": {
    "type": "message",
    "attributes": {
      "content": "Hello, I'm looking forward to our session tomorrow.",
      "message_type": "text"
    }
  }
}
```

#### Upload File
```http
POST /conversations/{conversation_id}/files
Content-Type: multipart/form-data

file=@document.pdf&message=Here's the health report we discussed
```

### Health Records

#### Get Health Profile
```http
GET /users/{user_id}/health_profile
```

#### Update Health Profile
```http
PUT /users/{user_id}/health_profile
```

#### Share Health Records
```http
POST /health_records/share
Content-Type: application/json

{
  "data": {
    "type": "health_record_share",
    "attributes": {
      "practitioner_id": "prac_123",
      "record_types": ["conditions", "medications"],
      "expires_at": "2024-12-31T23:59:59Z"
    }
  }
}
```

---

## WebSocket API

### Connection

```javascript
const ws = new WebSocket('wss://ws.klearkarma.com');

// Authentication
ws.onopen = function() {
  ws.send(JSON.stringify({
    type: 'auth',
    token: 'your_jwt_token'
  }));
};
```

### Message Types

#### Subscribe to Events
```json
{
  "type": "subscribe",
  "channel": "bookings",
  "user_id": "user_123"
}
```

#### Real-time Chat
```json
{
  "type": "message",
  "conversation_id": "conv_123",
  "content": "Hello!",
  "message_type": "text"
}
```

#### Typing Indicators
```json
{
  "type": "typing",
  "conversation_id": "conv_123",
  "is_typing": true
}
```

#### Video Call Signaling
```json
{
  "type": "webrtc_signal",
  "booking_id": "booking_123",
  "signal_type": "offer",
  "signal_data": {
    "sdp": "...",
    "type": "offer"
  }
}
```

---

## Webhooks

### Configuration

Webhooks can be configured in the developer dashboard or via API:

```http
POST /webhooks
Content-Type: application/json

{
  "data": {
    "type": "webhook",
    "attributes": {
      "url": "https://your-app.com/webhooks/klearkarma",
      "events": ["booking.created", "booking.confirmed", "payment.completed"],
      "secret": "your_webhook_secret"
    }
  }
}
```

### Event Types

#### Booking Events
- `booking.created` - New booking created
- `booking.confirmed` - Booking confirmed by practitioner
- `booking.cancelled` - Booking cancelled
- `booking.completed` - Session completed
- `booking.no_show` - No-show recorded

#### Payment Events
- `payment.completed` - Payment successfully processed
- `payment.failed` - Payment failed
- `payment.refunded` - Refund processed

#### User Events
- `user.created` - New user registered
- `user.verified` - User email/phone verified
- `user.updated` - User profile updated

### Webhook Payload

```json
{
  "id": "evt_123",
  "type": "booking.created",
  "created_at": "2024-01-01T00:00:00Z",
  "data": {
    "id": "booking_123",
    "type": "booking",
    "attributes": {
      "scheduled_at": "2024-01-01T10:00:00Z",
      "status": "pending",
      "user_id": "user_123",
      "practitioner_id": "prac_123"
    }
  }
}
```

### Webhook Security

**Signature Verification:**
```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content returned |
| 400 | Bad Request - Invalid request format or parameters |
| 401 | Unauthorized - Authentication required or invalid |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource conflict (e.g., duplicate booking) |
| 422 | Unprocessable Entity - Validation errors |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |
| 502 | Bad Gateway - Upstream service error |
| 503 | Service Unavailable - Service temporarily unavailable |

### Error Response Format

```json
{
  "errors": [
    {
      "id": "error_123",
      "status": "422",
      "code": "VALIDATION_ERROR",
      "title": "Validation Error",
      "detail": "The email field must be a valid email address",
      "source": {
        "pointer": "/data/attributes/email",
        "parameter": "email"
      },
      "meta": {
        "field": "email",
        "validation_rule": "email"
      }
    }
  ],
  "meta": {
    "request_id": "req_123",
    "timestamp": "2024-01-01T00:00:00Z",
    "documentation_url": "https://docs.klearkarma.com/errors/validation"
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Request validation failed |
| `AUTHENTICATION_REQUIRED` | Authentication token required |
| `INVALID_TOKEN` | Authentication token invalid or expired |
| `INSUFFICIENT_PERMISSIONS` | User lacks required permissions |
| `RESOURCE_NOT_FOUND` | Requested resource not found |
| `RESOURCE_CONFLICT` | Resource already exists or conflicts |
| `RATE_LIMIT_EXCEEDED` | API rate limit exceeded |
| `PAYMENT_REQUIRED` | Payment required to access resource |
| `SERVICE_UNAVAILABLE` | Service temporarily unavailable |
| `BOOKING_CONFLICT` | Booking time slot unavailable |
| `PRACTITIONER_UNAVAILABLE` | Practitioner not available |
| `INVALID_BOOKING_STATUS` | Invalid booking status transition |

---

## Rate Limiting

### Rate Limit Headers

All API responses include rate limiting headers:

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
X-RateLimit-Window: 3600
```

### Rate Limit Tiers

| Tier | Requests per Hour | Burst Limit |
|------|-------------------|-------------|
| Free | 1,000 | 100 |
| Basic | 10,000 | 500 |
| Pro | 100,000 | 2,000 |
| Enterprise | Custom | Custom |

### Rate Limit Strategies

**Per-User Limits:**
- Authenticated requests are limited per user
- Limits reset every hour
- Burst allowance for short-term spikes

**Per-IP Limits:**
- Unauthenticated requests limited per IP
- Stricter limits for anonymous access
- Geographic rate limiting for abuse prevention

**Endpoint-Specific Limits:**
- Search endpoints: 100 requests/minute
- Booking creation: 10 requests/minute
- File uploads: 50 requests/hour
- Messaging: 1,000 requests/hour

---

## SDK and Libraries

### Official SDKs

#### JavaScript/TypeScript SDK

**Installation:**
```bash
npm install @klearkarma/sdk
```

**Usage:**
```javascript
import { KlearKarmaClient } from '@klearkarma/sdk';

const client = new KlearKarmaClient({
  apiKey: 'your_api_key',
  environment: 'production' // or 'staging', 'development'
});

// Search practitioners
const practitioners = await client.practitioners.search({
  specialization: 'yoga',
  location: 'New York',
  availableFrom: new Date()
});

// Create booking
const booking = await client.bookings.create({
  practitionerId: 'prac_123',
  scheduledAt: new Date('2024-01-01T10:00:00Z'),
  duration: 60,
  sessionType: 'video_call'
});
```

#### Python SDK

**Installation:**
```bash
pip install klearkarma-sdk
```

**Usage:**
```python
from klearkarma import KlearKarmaClient

client = KlearKarmaClient(
    api_key='your_api_key',
    environment='production'
)

# Search practitioners
practitioners = client.practitioners.search(
    specialization='yoga',
    location='New York'
)

# Create booking
booking = client.bookings.create(
    practitioner_id='prac_123',
    scheduled_at='2024-01-01T10:00:00Z',
    duration=60,
    session_type='video_call'
)
```

#### React Hooks

```javascript
import { useKlearKarma, usePractitioners, useBookings } from '@klearkarma/react';

function PractitionerSearch() {
  const { data: practitioners, loading, error } = usePractitioners({
    specialization: 'yoga',
    location: 'New York'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {practitioners.map(practitioner => (
        <PractitionerCard key={practitioner.id} practitioner={practitioner} />
      ))}
    </div>
  );
}
```

### Community Libraries

- **Ruby:** `klearkarma-ruby` (community maintained)
- **PHP:** `klearkarma-php` (community maintained)
- **Go:** `klearkarma-go` (community maintained)
- **Java:** `klearkarma-java` (community maintained)

---

## Testing and Development

### Sandbox Environment

**Base URL:** `https://api-sandbox.klearkarma.com/v1`

**Features:**
- Full API functionality without real transactions
- Test data and mock practitioners
- Simulated payment processing
- Webhook testing with ngrok integration

### Test Data

**Test Users:**
```json
{
  "test_user_1": {
    "email": "test.user@klearkarma.com",
    "password": "TestPassword123!",
    "user_id": "test_user_123"
  },
  "test_practitioner_1": {
    "email": "test.practitioner@klearkarma.com",
    "password": "TestPassword123!",
    "practitioner_id": "test_prac_123"
  }
}
```

**Test Payment Methods:**
```json
{
  "success_card": "4242424242424242",
  "decline_card": "4000000000000002",
  "insufficient_funds": "4000000000009995"
}
```

### API Testing Tools

**Postman Collection:**
```bash
curl -o klearkarma-api.postman_collection.json \
  https://docs.klearkarma.com/postman/collection.json
```

**OpenAPI Specification:**
```bash
curl -o klearkarma-openapi.yaml \
  https://api.klearkarma.com/openapi.yaml
```

### Integration Testing

**Webhook Testing:**
```bash
# Install ngrok for local webhook testing
npm install -g ngrok

# Expose local server
ngrok http 3000

# Configure webhook URL
curl -X POST https://api-sandbox.klearkarma.com/v1/webhooks \
  -H "Authorization: Bearer your_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "type": "webhook",
      "attributes": {
        "url": "https://your-ngrok-url.ngrok.io/webhooks",
        "events": ["booking.created"]
      }
    }
  }'
```

---

## Changelog

### Version 1.2.0 (2024-03-01)

**Added:**
- GraphQL subscriptions for real-time updates
- Webhook retry mechanism with exponential backoff
- Batch operations for bulk data processing
- Enhanced search filters and sorting options

**Changed:**
- Improved error response format with more detailed information
- Updated rate limiting to be more granular per endpoint
- Enhanced authentication with refresh token rotation

**Fixed:**
- Timezone handling in availability queries
- Pagination cursor stability in large result sets
- Memory optimization in file upload processing

### Version 1.1.0 (2024-02-01)

**Added:**
- Video call integration with WebRTC signaling
- File sharing in conversations
- Health record sharing with consent management
- Multi-language support for API responses

**Changed:**
- Booking cancellation policy enforcement
- Enhanced practitioner verification process
- Improved search relevance algorithm

**Fixed:**
- Booking conflict detection edge cases
- Payment processing timeout handling
- WebSocket connection stability improvements

### Version 1.0.0 (2024-01-01)

**Initial Release:**
- Core API functionality
- User and practitioner management
- Booking and payment processing
- Messaging and communication
- Health record management
- Webhook support
- Rate limiting and security features

---

## Support and Resources

### Documentation
- **API Reference:** https://docs.klearkarma.com/api
- **Developer Guides:** https://docs.klearkarma.com/guides
- **SDK Documentation:** https://docs.klearkarma.com/sdks
- **Webhook Guide:** https://docs.klearkarma.com/webhooks

### Developer Support
- **Email:** developers@klearkarma.com
- **Discord:** https://discord.gg/klearkarma-dev
- **Stack Overflow:** Tag questions with `klearkarma-api`
- **GitHub:** https://github.com/klearkarma/api-issues

### Status and Monitoring
- **API Status:** https://status.klearkarma.com
- **Incident Reports:** https://status.klearkarma.com/incidents
- **Maintenance Schedule:** https://status.klearkarma.com/maintenance

---

*This documentation is updated regularly. For the latest information, visit https://docs.klearkarma.com*

*© 2024 Klear Karma. All rights reserved.*