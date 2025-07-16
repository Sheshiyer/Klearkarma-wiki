# KLEAR KARMA - SYSTEM ARCHITECTURE & TECHNICAL DOCUMENTATION

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Technology Stack](#technology-stack)
4. [Database Design](#database-design)
5. [API Architecture](#api-architecture)
6. [Security Framework](#security-framework)
7. [Scalability & Performance](#scalability--performance)
8. [DevOps & Infrastructure](#devops--infrastructure)
9. [AI/ML Integration](#aiml-integration)
10. [Mobile Architecture](#mobile-architecture)

---

## 1. Architecture Overview

### 1.1 High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                       │
├─────────────────┬─────────────────┬─────────────────────────────┤
│   Web App       │   Mobile Apps   │     Admin Dashboard         │
│   (Next.js)     │   (React Native)│     (React.js)              │
└─────────────────┴─────────────────┴─────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│   Load Balancer │ Rate Limiting │ Authentication │ Monitoring   │
│   (Nginx)       │ (Redis)       │ (JWT/OAuth)    │ (DataDog)    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MICROSERVICES LAYER                        │
├─────────────┬─────────────┬─────────────┬─────────────────────┤
│ User Service│Auth Service │Search Service│ Booking Service     │
│ (Node.js)   │(Node.js)    │(Elasticsearch)│ (Node.js)          │
├─────────────┼─────────────┼─────────────┼─────────────────────┤
│Payment Svc  │Notification │ML/AI Service│ Content Service     │
│(Node.js)    │Service      │(Python)     │ (Node.js)           │
│             │(Node.js)    │             │                     │
└─────────────┴─────────────┴─────────────┴─────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                              │
├─────────────┬─────────────┬─────────────┬─────────────────────┤
│ PostgreSQL  │   Redis     │Elasticsearch│    File Storage     │
│(Primary DB) │  (Cache)    │  (Search)   │    (AWS S3)         │
├─────────────┼─────────────┼─────────────┼─────────────────────┤
│ MongoDB     │ InfluxDB    │   Kafka     │    CDN              │
│(Documents)  │(Analytics)  │(Streaming)  │  (CloudFlare)       │
└─────────────┴─────────────┴─────────────┴─────────────────────┘
```

### 1.2 Architecture Principles

#### Core Principles
1. **Microservices Architecture**: Loosely coupled, independently deployable services
2. **API-First Design**: RESTful APIs with GraphQL for complex queries
3. **Event-Driven Architecture**: Asynchronous communication via message queues
4. **Cloud-Native**: Containerized applications with Kubernetes orchestration
5. **Security by Design**: Zero-trust security model with end-to-end encryption

#### Design Patterns
- **CQRS (Command Query Responsibility Segregation)**: Separate read/write operations
- **Event Sourcing**: Immutable event logs for audit trails
- **Circuit Breaker**: Fault tolerance and graceful degradation
- **Saga Pattern**: Distributed transaction management
- **Repository Pattern**: Data access abstraction

---

## 2. System Components

### 2.1 Frontend Applications

#### Web Application (Next.js)
```typescript
// Component Architecture
src/
├── components/
│   ├── common/           // Reusable UI components
│   ├── forms/            // Form components
│   ├── layout/           // Layout components
│   └── features/         // Feature-specific components
├── pages/
│   ├── api/              // API routes
│   ├── auth/             // Authentication pages
│   ├── dashboard/        // User dashboards
│   └── booking/          // Booking flow
├── hooks/                // Custom React hooks
├── utils/                // Utility functions
├── types/                // TypeScript definitions
└── styles/               // Global styles
```

**Key Features:**
- Server-side rendering (SSR) for SEO optimization
- Progressive Web App (PWA) capabilities
- Real-time updates via WebSocket connections
- Responsive design with mobile-first approach
- Accessibility compliance (WCAG 2.1 AA)

#### Mobile Applications (React Native)
```typescript
// Mobile App Structure
src/
├── components/
│   ├── UI/               // Reusable UI components
│   ├── Navigation/       // Navigation components
│   └── Features/         // Feature components
├── screens/
│   ├── Auth/             // Authentication screens
│   ├── Home/             // Home screens
│   ├── Search/           // Search screens
│   └── Profile/          // Profile screens
├── services/
│   ├── api/              // API service layer
│   ├── storage/          // Local storage
│   └── notifications/    // Push notifications
├── navigation/           // Navigation configuration
├── utils/                // Utility functions
└── types/                // TypeScript definitions
```

**Platform-Specific Features:**
- iOS: HealthKit integration, Apple Pay
- Android: Google Fit integration, Google Pay
- Cross-platform: Biometric authentication, offline mode

### 2.2 Backend Services

#### User Service
```typescript
// User Service Architecture
interface UserService {
  // User management
  createUser(userData: CreateUserDTO): Promise<User>
  updateUser(userId: string, updates: UpdateUserDTO): Promise<User>
  getUserById(userId: string): Promise<User>
  deleteUser(userId: string): Promise<void>
  
  // Profile management
  updateProfile(userId: string, profile: ProfileDTO): Promise<Profile>
  uploadProfileImage(userId: string, image: File): Promise<string>
  
  // Verification
  initiateVerification(userId: string, type: VerificationType): Promise<void>
  completeVerification(userId: string, token: string): Promise<boolean>
}
```

#### Authentication Service
```typescript
// Authentication Service
interface AuthService {
  // Authentication
  login(credentials: LoginDTO): Promise<AuthResponse>
  register(userData: RegisterDTO): Promise<AuthResponse>
  refreshToken(refreshToken: string): Promise<AuthResponse>
  logout(userId: string): Promise<void>
  
  // OAuth integration
  googleAuth(token: string): Promise<AuthResponse>
  facebookAuth(token: string): Promise<AuthResponse>
  
  // Security
  resetPassword(email: string): Promise<void>
  changePassword(userId: string, passwords: ChangePasswordDTO): Promise<void>
  enableTwoFactor(userId: string): Promise<TwoFactorSetup>
}
```

#### Booking Service
```typescript
// Booking Service
interface BookingService {
  // Booking management
  createBooking(bookingData: CreateBookingDTO): Promise<Booking>
  updateBooking(bookingId: string, updates: UpdateBookingDTO): Promise<Booking>
  cancelBooking(bookingId: string, reason: string): Promise<void>
  
  // Availability
  getAvailability(practitionerId: string, date: Date): Promise<TimeSlot[]>
  blockTimeSlot(practitionerId: string, timeSlot: TimeSlot): Promise<void>
  
  // Session management
  startSession(bookingId: string): Promise<Session>
  endSession(sessionId: string, notes: string): Promise<void>
}
```

#### Payment Service
```typescript
// Payment Service
interface PaymentService {
  // Payment processing
  createPaymentIntent(amount: number, currency: string): Promise<PaymentIntent>
  confirmPayment(paymentIntentId: string): Promise<PaymentResult>
  refundPayment(paymentId: string, amount?: number): Promise<Refund>
  
  // Subscription management
  createSubscription(planId: string, customerId: string): Promise<Subscription>
  updateSubscription(subscriptionId: string, updates: SubscriptionUpdate): Promise<Subscription>
  cancelSubscription(subscriptionId: string): Promise<void>
  
  // Payout management
  createPayout(practitionerId: string, amount: number): Promise<Payout>
  getPayoutHistory(practitionerId: string): Promise<Payout[]>
}
```

---

## 3. Technology Stack

### 3.1 Frontend Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|----------|
| **Web Framework** | Next.js | 14.x | React-based full-stack framework |
| **Mobile Framework** | React Native | 0.73.x | Cross-platform mobile development |
| **UI Library** | Tailwind CSS | 3.x | Utility-first CSS framework |
| **Component Library** | Headless UI | 1.x | Unstyled, accessible components |
| **State Management** | Zustand | 4.x | Lightweight state management |
| **Form Handling** | React Hook Form | 7.x | Performant forms with validation |
| **HTTP Client** | Axios | 1.x | Promise-based HTTP client |
| **Real-time** | Socket.io Client | 4.x | WebSocket communication |

### 3.2 Backend Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|----------|
| **Runtime** | Node.js | 20.x LTS | JavaScript runtime |
| **Framework** | Express.js | 4.x | Web application framework |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **API Documentation** | Swagger/OpenAPI | 3.x | API documentation |
| **Validation** | Joi | 17.x | Data validation |
| **ORM** | Prisma | 5.x | Database ORM |
| **Authentication** | Passport.js | 0.7.x | Authentication middleware |
| **File Upload** | Multer | 1.x | File upload handling |

### 3.3 Database Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|----------|
| **Primary Database** | PostgreSQL | 15.x | Relational data storage |
| **Document Store** | MongoDB | 7.x | Flexible document storage |
| **Cache** | Redis | 7.x | In-memory caching |
| **Search Engine** | Elasticsearch | 8.x | Full-text search |
| **Time Series** | InfluxDB | 2.x | Analytics and metrics |
| **Message Queue** | Apache Kafka | 3.x | Event streaming |

### 3.4 Infrastructure Technologies

| Component | Technology | Version | Purpose |
|-----------|------------|---------|----------|
| **Cloud Provider** | AWS | Latest | Cloud infrastructure |
| **Containerization** | Docker | 24.x | Application containerization |
| **Orchestration** | Kubernetes | 1.28.x | Container orchestration |
| **Service Mesh** | Istio | 1.19.x | Service communication |
| **Monitoring** | DataDog | Latest | Application monitoring |
| **Logging** | ELK Stack | 8.x | Centralized logging |
| **CI/CD** | GitHub Actions | Latest | Continuous integration |
| **CDN** | CloudFlare | Latest | Content delivery |

---

## 4. Database Design

### 4.1 PostgreSQL Schema

#### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('seeker', 'practitioner', 'admin')),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practitioners table
CREATE TABLE practitioners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    experience_years INTEGER,
    hourly_rate DECIMAL(10,2),
    languages TEXT[], -- Array of language codes
    certifications JSONB,
    specializations TEXT[],
    availability JSONB, -- Weekly availability schedule
    verification_status VARCHAR(20) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
    verification_documents JSONB,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_sessions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES service_categories(id),
    duration_minutes INTEGER NOT NULL,
    base_price DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seeker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    practitioner_id UUID REFERENCES practitioners(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id),
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    cancellation_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50) NOT NULL,
    payment_gateway VARCHAR(50) NOT NULL,
    gateway_transaction_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Indexes for Performance

```sql
-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type_status ON users(user_type, status);
CREATE INDEX idx_practitioners_user_id ON practitioners(user_id);
CREATE INDEX idx_practitioners_verification ON practitioners(verification_status);
CREATE INDEX idx_bookings_seeker ON bookings(seeker_id);
CREATE INDEX idx_bookings_practitioner ON bookings(practitioner_id);
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);

-- Composite indexes
CREATE INDEX idx_bookings_practitioner_date ON bookings(practitioner_id, scheduled_at);
CREATE INDEX idx_practitioners_rating_sessions ON practitioners(rating DESC, total_sessions DESC);
```

### 4.2 MongoDB Collections

#### Content Management

```javascript
// Articles collection
{
  _id: ObjectId,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  author: {
    id: String,
    name: String,
    avatar: String
  },
  category: String,
  tags: [String],
  featured_image: String,
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  status: String, // 'draft', 'published', 'archived'
  published_at: Date,
  created_at: Date,
  updated_at: Date
}

// Chat messages collection
{
  _id: ObjectId,
  conversation_id: String,
  sender_id: String,
  recipient_id: String,
  message_type: String, // 'text', 'image', 'file', 'system'
  content: String,
  attachments: [{
    type: String,
    url: String,
    filename: String,
    size: Number
  }],
  read_at: Date,
  created_at: Date
}
```

### 4.3 Redis Cache Structure

```javascript
// Cache patterns

// User sessions
"session:{sessionId}" => {
  userId: String,
  userType: String,
  permissions: [String],
  expiresAt: Number
}

// Practitioner availability cache
"availability:{practitionerId}:{date}" => {
  timeSlots: [{
    start: String,
    end: String,
    available: Boolean
  }],
  lastUpdated: Number
}

// Search results cache
"search:{query}:{filters}:{page}" => {
  results: [Object],
  totalCount: Number,
  facets: Object,
  cachedAt: Number
}

// Rate limiting
"rate_limit:{userId}:{endpoint}" => {
  count: Number,
  resetTime: Number
}
```

---

## 5. API Architecture

### 5.1 RESTful API Design

#### API Versioning Strategy
```
Base URL: https://api.klearkarma.com/v1/

Versioning approaches:
1. URL versioning: /v1/, /v2/
2. Header versioning: Accept: application/vnd.klearkarma.v1+json
3. Query parameter: ?version=1
```

#### Standard Response Format
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    timestamp: string;
    requestId: string;
  };
}
```

#### Core API Endpoints

```yaml
# Authentication endpoints
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
POST   /auth/forgot-password
POST   /auth/reset-password

# User management
GET    /users/profile
PUT    /users/profile
POST   /users/upload-avatar
DELETE /users/account

# Practitioner endpoints
GET    /practitioners
GET    /practitioners/{id}
POST   /practitioners
PUT    /practitioners/{id}
GET    /practitioners/{id}/availability
PUT    /practitioners/{id}/availability
GET    /practitioners/{id}/reviews

# Booking endpoints
POST   /bookings
GET    /bookings
GET    /bookings/{id}
PUT    /bookings/{id}
DELETE /bookings/{id}
POST   /bookings/{id}/cancel

# Payment endpoints
POST   /payments/create-intent
POST   /payments/confirm
POST   /payments/refund
GET    /payments/history

# Search endpoints
GET    /search/practitioners
GET    /search/services
GET    /search/suggestions
```

### 5.2 GraphQL API

#### Schema Definition
```graphql
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  userType: UserType!
  profile: Profile
  createdAt: DateTime!
}

type Practitioner {
  id: ID!
  user: User!
  bio: String
  experienceYears: Int
  hourlyRate: Float
  specializations: [String!]!
  rating: Float
  totalSessions: Int
  availability: [TimeSlot!]!
  services: [Service!]!
  reviews: [Review!]!
}

type Booking {
  id: ID!
  seeker: User!
  practitioner: Practitioner!
  service: Service!
  scheduledAt: DateTime!
  duration: Int!
  totalAmount: Float!
  status: BookingStatus!
  payment: Payment
}

type Query {
  me: User
  practitioner(id: ID!): Practitioner
  practitioners(filters: PractitionerFilters, pagination: Pagination): PractitionerConnection!
  booking(id: ID!): Booking
  myBookings(status: BookingStatus, pagination: Pagination): BookingConnection!
}

type Mutation {
  updateProfile(input: UpdateProfileInput!): User!
  createBooking(input: CreateBookingInput!): Booking!
  cancelBooking(id: ID!, reason: String): Booking!
  createReview(input: CreateReviewInput!): Review!
}

type Subscription {
  bookingUpdated(bookingId: ID!): Booking!
  newMessage(conversationId: ID!): Message!
}
```

### 5.3 WebSocket Events

```typescript
// Real-time events
interface WebSocketEvents {
  // Booking events
  'booking:created': (booking: Booking) => void;
  'booking:updated': (booking: Booking) => void;
  'booking:cancelled': (bookingId: string, reason: string) => void;
  
  // Chat events
  'message:new': (message: Message) => void;
  'message:read': (messageId: string) => void;
  'typing:start': (userId: string) => void;
  'typing:stop': (userId: string) => void;
  
  // Notification events
  'notification:new': (notification: Notification) => void;
  'notification:read': (notificationId: string) => void;
  
  // Presence events
  'user:online': (userId: string) => void;
  'user:offline': (userId: string) => void;
}
```

---

## 6. Security Framework

### 6.1 Authentication & Authorization

#### JWT Token Structure
```typescript
interface JWTPayload {
  sub: string; // User ID
  email: string;
  userType: 'seeker' | 'practitioner' | 'admin';
  permissions: string[];
  iat: number; // Issued at
  exp: number; // Expires at
  jti: string; // JWT ID for revocation
}
```

#### Role-Based Access Control (RBAC)
```typescript
interface Permission {
  resource: string;
  action: string;
  conditions?: Record<string, any>;
}

interface Role {
  name: string;
  permissions: Permission[];
}

// Example roles
const roles: Record<string, Role> = {
  seeker: {
    name: 'seeker',
    permissions: [
      { resource: 'booking', action: 'create' },
      { resource: 'booking', action: 'read', conditions: { owner: true } },
      { resource: 'review', action: 'create' },
      { resource: 'profile', action: 'update', conditions: { owner: true } }
    ]
  },
  practitioner: {
    name: 'practitioner',
    permissions: [
      { resource: 'booking', action: 'read', conditions: { practitioner: true } },
      { resource: 'booking', action: 'update', conditions: { practitioner: true } },
      { resource: 'availability', action: 'update', conditions: { owner: true } },
      { resource: 'profile', action: 'update', conditions: { owner: true } }
    ]
  }
};
```

### 6.2 Data Protection

#### Encryption Standards
- **Data at Rest**: AES-256 encryption
- **Data in Transit**: TLS 1.3
- **Password Hashing**: bcrypt with salt rounds 12
- **Sensitive Data**: Field-level encryption for PII

#### Data Privacy Compliance
```typescript
// GDPR compliance utilities
interface DataSubject {
  userId: string;
  email: string;
  consentGiven: boolean;
  consentDate: Date;
  dataRetentionPeriod: number; // days
}

class GDPRCompliance {
  async exportUserData(userId: string): Promise<UserDataExport> {
    // Export all user data in portable format
  }
  
  async deleteUserData(userId: string): Promise<void> {
    // Anonymize or delete user data
  }
  
  async updateConsent(userId: string, consent: ConsentUpdate): Promise<void> {
    // Update user consent preferences
  }
}
```

### 6.3 Security Monitoring

#### Security Event Logging
```typescript
interface SecurityEvent {
  eventType: 'login' | 'logout' | 'failed_login' | 'permission_denied' | 'data_access';
  userId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  metadata: Record<string, any>;
  riskScore: number;
}

class SecurityMonitor {
  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    // Log to security monitoring system
    await this.analyzeRisk(event);
    
    if (event.riskScore > 0.8) {
      await this.triggerAlert(event);
    }
  }
  
  private async analyzeRisk(event: SecurityEvent): Promise<number> {
    // ML-based risk analysis
    return this.riskAnalysisModel.predict(event);
  }
}
```

---

## 7. Scalability & Performance

### 7.1 Horizontal Scaling Strategy

#### Microservices Scaling
```yaml
# Kubernetes deployment configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: klearkarma/user-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

#### Auto-scaling Configuration
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: user-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: user-service
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### 7.2 Caching Strategy

#### Multi-Level Caching
```typescript
class CacheManager {
  private l1Cache: Map<string, any> = new Map(); // In-memory
  private l2Cache: Redis; // Redis
  private l3Cache: CDN; // CloudFlare
  
  async get<T>(key: string): Promise<T | null> {
    // L1 Cache (Memory)
    if (this.l1Cache.has(key)) {
      return this.l1Cache.get(key);
    }
    
    // L2 Cache (Redis)
    const l2Value = await this.l2Cache.get(key);
    if (l2Value) {
      this.l1Cache.set(key, l2Value);
      return l2Value;
    }
    
    return null;
  }
  
  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    this.l1Cache.set(key, value);
    await this.l2Cache.setex(key, ttl, JSON.stringify(value));
  }
}
```

#### Cache Invalidation Strategy
```typescript
class CacheInvalidation {
  async invalidateUserCache(userId: string): Promise<void> {
    const patterns = [
      `user:${userId}:*`,
      `profile:${userId}`,
      `bookings:${userId}:*`,
      `availability:${userId}:*`
    ];
    
    await Promise.all(
      patterns.map(pattern => this.redis.del(pattern))
    );
  }
  
  async invalidateSearchCache(filters: SearchFilters): Promise<void> {
    const cacheKey = this.generateSearchCacheKey(filters);
    await this.redis.del(cacheKey);
  }
}
```

### 7.3 Database Optimization

#### Read Replicas Configuration
```typescript
class DatabaseManager {
  private writeDB: Pool; // Primary database
  private readDBs: Pool[]; // Read replicas
  private currentReadIndex = 0;
  
  async executeQuery(query: string, params: any[], readOnly = false): Promise<any> {
    if (readOnly) {
      return this.executeReadQuery(query, params);
    } else {
      return this.executeWriteQuery(query, params);
    }
  }
  
  private async executeReadQuery(query: string, params: any[]): Promise<any> {
    const readDB = this.getNextReadDB();
    return readDB.query(query, params);
  }
  
  private getNextReadDB(): Pool {
    const db = this.readDBs[this.currentReadIndex];
    this.currentReadIndex = (this.currentReadIndex + 1) % this.readDBs.length;
    return db;
  }
}
```

#### Query Optimization
```sql
-- Optimized practitioner search query
EXPLAIN ANALYZE
SELECT 
    p.id,
    u.first_name,
    u.last_name,
    p.bio,
    p.hourly_rate,
    p.rating,
    p.total_sessions,
    array_agg(DISTINCT s.name) as services
FROM practitioners p
JOIN users u ON p.user_id = u.id
JOIN practitioner_services ps ON p.id = ps.practitioner_id
JOIN services s ON ps.service_id = s.id
WHERE 
    p.verification_status = 'verified'
    AND u.status = 'active'
    AND p.specializations && $1  -- Array overlap operator
    AND p.hourly_rate BETWEEN $2 AND $3
    AND ST_DWithin(p.location, ST_Point($4, $5), $6)  -- Geospatial query
GROUP BY p.id, u.first_name, u.last_name, p.bio, p.hourly_rate, p.rating, p.total_sessions
ORDER BY 
    p.rating DESC,
    p.total_sessions DESC,
    ST_Distance(p.location, ST_Point($4, $5)) ASC
LIMIT $7 OFFSET $8;
```

---

## 8. DevOps & Infrastructure

### 8.1 CI/CD Pipeline

#### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test:coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: |
        docker build -t ${{ secrets.ECR_REGISTRY }}/klearkarma-api:${{ github.sha }} .
        docker tag ${{ secrets.ECR_REGISTRY }}/klearkarma-api:${{ github.sha }} ${{ secrets.ECR_REGISTRY }}/klearkarma-api:latest
    
    - name: Push to ECR
      run: |
        aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${{ secrets.ECR_REGISTRY }}
        docker push ${{ secrets.ECR_REGISTRY }}/klearkarma-api:${{ github.sha }}
        docker push ${{ secrets.ECR_REGISTRY }}/klearkarma-api:latest
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to EKS
      run: |
        aws eks update-kubeconfig --region us-east-1 --name klearkarma-cluster
        kubectl set image deployment/api-deployment api=${{ secrets.ECR_REGISTRY }}/klearkarma-api:${{ github.sha }}
        kubectl rollout status deployment/api-deployment
```

### 8.2 Infrastructure as Code

#### Terraform Configuration
```hcl
# main.tf
provider "aws" {
  region = var.aws_region
}

# EKS Cluster
module "eks" {
  source = "terraform-aws-modules/eks/aws"
  
  cluster_name    = "klearkarma-cluster"
  cluster_version = "1.28"
  
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  
  node_groups = {
    main = {
      desired_capacity = 3
      max_capacity     = 10
      min_capacity     = 2
      
      instance_types = ["t3.medium"]
      
      k8s_labels = {
        Environment = var.environment
        Application = "klearkarma"
      }
    }
  }
}

# RDS PostgreSQL
resource "aws_db_instance" "main" {
  identifier = "klearkarma-db"
  
  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.t3.micro"
  
  allocated_storage     = 20
  max_allocated_storage = 100
  storage_encrypted     = true
  
  db_name  = "klearkarma"
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name   = aws_db_subnet_group.main.name
  
  backup_retention_period = 7
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  skip_final_snapshot = false
  final_snapshot_identifier = "klearkarma-db-final-snapshot"
  
  tags = {
    Name        = "klearkarma-db"
    Environment = var.environment
  }
}

# ElastiCache Redis
resource "aws_elasticache_subnet_group" "main" {
  name       = "klearkarma-cache-subnet"
  subnet_ids = module.vpc.private_subnets
}

resource "aws_elasticache_replication_group" "main" {
  replication_group_id       = "klearkarma-redis"
  description                = "Redis cluster for Klear Karma"
  
  node_type                  = "cache.t3.micro"
  port                       = 6379
  parameter_group_name       = "default.redis7"
  
  num_cache_clusters         = 2
  automatic_failover_enabled = true
  multi_az_enabled          = true
  
  subnet_group_name = aws_elasticache_subnet_group.main.name
  security_group_ids = [aws_security_group.redis.id]
  
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  
  tags = {
    Name        = "klearkarma-redis"
    Environment = var.environment
  }
}
```

### 8.3 Monitoring & Observability

#### DataDog Configuration
```yaml
# datadog-agent.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
    spec:
      containers:
      - name: datadog-agent
        image: datadog/agent:latest
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: datadog-secret
              key: api-key
        - name: DD_SITE
          value: "datadoghq.com"
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_PROCESS_AGENT_ENABLED
          value: "true"
        volumeMounts:
        - name: dockersocket
          mountPath: /var/run/docker.sock
        - name: procdir
          mountPath: /host/proc
        - name: cgroups
          mountPath: /host/sys/fs/cgroup
      volumes:
      - name: dockersocket
        hostPath:
          path: /var/run/docker.sock
      - name: procdir
        hostPath:
          path: /proc
      - name: cgroups
        hostPath:
          path: /sys/fs/cgroup
```

#### Custom Metrics
```typescript
class MetricsCollector {
  private statsd: StatsD;
  
  constructor() {
    this.statsd = new StatsD({
      host: process.env.DATADOG_HOST,
      port: 8125,
      prefix: 'klearkarma.'
    });
  }
  
  recordBookingCreated(practitionerId: string, amount: number): void {
    this.statsd.increment('bookings.created', 1, {
      practitioner_id: practitionerId
    });
    this.statsd.histogram('bookings.amount', amount);
  }
  
  recordAPILatency(endpoint: string, duration: number): void {
    this.statsd.histogram('api.latency', duration, {
      endpoint: endpoint
    });
  }
  
  recordUserAction(action: string, userId: string): void {
    this.statsd.increment('user.actions', 1, {
      action: action,
      user_id: userId
    });
  }
}
```

---

## 9. AI/ML Integration

### 9.1 Recommendation Engine

#### Collaborative Filtering
```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

class PractitionerRecommendationEngine:
    def __init__(self):
        self.user_item_matrix = None
        self.item_similarity_matrix = None
        
    def fit(self, interactions_df):
        """Train the recommendation model"""
        # Create user-item interaction matrix
        self.user_item_matrix = self._create_interaction_matrix(interactions_df)
        
        # Calculate item-item similarity
        self.item_similarity_matrix = cosine_similarity(self.user_item_matrix.T)
        
    def recommend_practitioners(self, user_id: str, n_recommendations: int = 5):
        """Get practitioner recommendations for a user"""
        user_index = self._get_user_index(user_id)
        user_ratings = self.user_item_matrix[user_index].toarray().flatten()
        
        # Calculate scores for all practitioners
        scores = np.zeros(self.user_item_matrix.shape[1])
        
        for item_idx in range(len(user_ratings)):
            if user_ratings[item_idx] > 0:  # User has interacted with this practitioner
                # Add similarity-weighted scores
                scores += (self.item_similarity_matrix[item_idx] * user_ratings[item_idx])
        
        # Remove already interacted practitioners
        scores[user_ratings > 0] = 0
        
        # Get top recommendations
        top_indices = np.argsort(scores)[::-1][:n_recommendations]
        
        return [
            {
                'practitioner_id': self._get_practitioner_id(idx),
                'score': scores[idx],
                'reason': self._get_recommendation_reason(user_id, idx)
            }
            for idx in top_indices
        ]
```

#### Content-Based Filtering
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

class ContentBasedRecommender:
    def __init__(self):
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2)
        )
        self.content_matrix = None
        
    def fit(self, practitioners_df):
        """Train content-based model"""
        # Combine practitioner features into text
        content_features = practitioners_df.apply(
            lambda x: f"{x['specializations']} {x['bio']} {x['certifications']}",
            axis=1
        )
        
        # Create TF-IDF matrix
        self.content_matrix = self.tfidf_vectorizer.fit_transform(content_features)
        
    def find_similar_practitioners(self, practitioner_id: str, n_similar: int = 5):
        """Find practitioners similar to the given one"""
        practitioner_index = self._get_practitioner_index(practitioner_id)
        
        # Calculate cosine similarity
        similarity_scores = linear_kernel(
            self.content_matrix[practitioner_index],
            self.content_matrix
        ).flatten()
        
        # Get top similar practitioners (excluding self)
        similar_indices = np.argsort(similarity_scores)[::-1][1:n_similar+1]
        
        return [
            {
                'practitioner_id': self._get_practitioner_id(idx),
                'similarity_score': similarity_scores[idx]
            }
            for idx in similar_indices
        ]
```

### 9.2 Fraud Detection

#### Anomaly Detection Model
```python
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import pandas as pd

class FraudDetectionModel:
    def __init__(self):
        self.isolation_forest = IsolationForest(
            contamination=0.1,
            random_state=42
        )
        self.scaler = StandardScaler()
        self.feature_columns = [
            'booking_amount',
            'time_since_registration',
            'previous_bookings_count',
            'avg_session_duration',
            'cancellation_rate',
            'payment_method_changes',
            'login_frequency',
            'device_changes'
        ]
        
    def extract_features(self, user_data: dict) -> np.ndarray:
        """Extract features for fraud detection"""
        features = []
        
        # Booking patterns
        features.append(user_data.get('booking_amount', 0))
        features.append(user_data.get('time_since_registration', 0))
        features.append(user_data.get('previous_bookings_count', 0))
        
        # Behavioral patterns
        features.append(user_data.get('avg_session_duration', 0))
        features.append(user_data.get('cancellation_rate', 0))
        features.append(user_data.get('payment_method_changes', 0))
        
        # Activity patterns
        features.append(user_data.get('login_frequency', 0))
        features.append(user_data.get('device_changes', 0))
        
        return np.array(features).reshape(1, -1)
    
    def predict_fraud_probability(self, user_data: dict) -> float:
        """Predict fraud probability for a user"""
        features = self.extract_features(user_data)
        scaled_features = self.scaler.transform(features)
        
        # Get anomaly score (-1 for outliers, 1 for inliers)
        anomaly_score = self.isolation_forest.decision_function(scaled_features)[0]
        
        # Convert to probability (0-1 scale)
        fraud_probability = max(0, (1 - anomaly_score) / 2)
        
        return fraud_probability
    
    def train(self, training_data: pd.DataFrame):
        """Train the fraud detection model"""
        features = training_data[self.feature_columns]
        scaled_features = self.scaler.fit_transform(features)
        
        self.isolation_forest.fit(scaled_features)
```

### 9.3 Natural Language Processing

#### Review Sentiment Analysis
```python
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch

class ReviewSentimentAnalyzer:
    def __init__(self):
        self.model_name = "cardiffnlp/twitter-roberta-base-sentiment-latest"
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(self.model_name)
        self.sentiment_pipeline = pipeline(
            "sentiment-analysis",
            model=self.model,
            tokenizer=self.tokenizer,
            device=0 if torch.cuda.is_available() else -1
        )
    
    def analyze_review(self, review_text: str) -> dict:
        """Analyze sentiment of a review"""
        # Clean and preprocess text
        cleaned_text = self._preprocess_text(review_text)
        
        # Get sentiment prediction
        result = self.sentiment_pipeline(cleaned_text)[0]
        
        # Extract aspects (what users are talking about)
        aspects = self._extract_aspects(cleaned_text)
        
        return {
            'sentiment': result['label'],
            'confidence': result['score'],
            'aspects': aspects,
            'summary': self._generate_summary(cleaned_text, result)
        }
    
    def _extract_aspects(self, text: str) -> list:
        """Extract aspects mentioned in the review"""
        aspect_keywords = {
            'communication': ['communication', 'responsive', 'reply', 'contact'],
            'expertise': ['knowledgeable', 'expert', 'skilled', 'experienced'],
            'punctuality': ['on time', 'punctual', 'late', 'early'],
            'effectiveness': ['helpful', 'effective', 'results', 'improvement'],
            'professionalism': ['professional', 'courteous', 'respectful']
        }
        
        detected_aspects = []
        text_lower = text.lower()
        
        for aspect, keywords in aspect_keywords.items():
            if any(keyword in text_lower for keyword in keywords):
                detected_aspects.append(aspect)
        
        return detected_aspects
```

---

## 10. Mobile Architecture

### 10.1 React Native Structure

#### App Architecture
```typescript
// App.tsx - Main application component
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAuthState } from './src/hooks/useAuthState';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthState();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};
```

#### Navigation Structure
```typescript
// navigation/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return <TabIcon route={route.name} focused={focused} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Bookings" component={BookingsStack} />
      <Tab.Screen name="Messages" component={MessagesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

// Stack Navigators for each tab
const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PractitionerDetail" component={PractitionerDetailScreen} />
      <Stack.Screen name="BookingFlow" component={BookingFlowScreen} />
    </Stack.Navigator>
  );
};
```

### 10.2 State Management

#### Redux Store Configuration
```typescript
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authSlice } from './slices/authSlice';
import { userSlice } from './slices/userSlice';
import { bookingSlice } from './slices/bookingSlice';
import { apiSlice } from './api/apiSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'user'], // Only persist auth and user data
};

const rootReducer = {
  auth: persistReducer(persistConfig, authSlice.reducer),
  user: userSlice.reducer,
  booking: bookingSlice.reducer,
  api: apiSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

#### API Slice with RTK Query
```typescript
// store/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../index';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Practitioner', 'Booking', 'Review'],
  endpoints: (builder) => ({
    // User endpoints
    getProfile: builder.query<User, void>({
      query: () => '/users/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (updates) => ({
        url: '/users/profile',
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Practitioner endpoints
    searchPractitioners: builder.query<PractitionerSearchResult, SearchFilters>({
      query: (filters) => ({
        url: '/search/practitioners',
        params: filters,
      }),
      providesTags: ['Practitioner'],
    }),
    
    // Booking endpoints
    createBooking: builder.mutation<Booking, CreateBookingRequest>({
      query: (bookingData) => ({
        url: '/bookings',
        method: 'POST',
        body: bookingData,
      }),
      invalidatesTags: ['Booking'],
    }),
    
    getBookings: builder.query<Booking[], BookingFilters>({
      query: (filters) => ({
        url: '/bookings',
        params: filters,
      }),
      providesTags: ['Booking'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useSearchPractitionersQuery,
  useCreateBookingMutation,
  useGetBookingsQuery,
} = apiSlice;
```

### 10.3 Platform-Specific Features

#### iOS Integration
```swift
// HealthKit Integration
import HealthKit

class HealthKitManager {
    private let healthStore = HKHealthStore()
    
    func requestAuthorization() {
        let readTypes: Set<HKObjectType> = [
            HKObjectType.quantityType(forIdentifier: .heartRate)!,
            HKObjectType.quantityType(forIdentifier: .stepCount)!,
            HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!
        ]
        
        healthStore.requestAuthorization(toShare: nil, read: readTypes) { success, error in
            if success {
                // Start reading health data
                self.startHealthDataCollection()
            }
        }
    }
    
    func getHeartRateData(completion: @escaping ([HKQuantitySample]) -> Void) {
        let heartRateType = HKQuantityType.quantityType(forIdentifier: .heartRate)!
        let query = HKSampleQuery(sampleType: heartRateType, predicate: nil, limit: 10, sortDescriptors: nil) { _, samples, _ in
            completion(samples as? [HKQuantitySample] ?? [])
        }
        healthStore.execute(query)
    }
}
```

#### Android Integration
```kotlin
// Google Fit Integration
class GoogleFitManager(private val context: Context) {
    private val fitnessOptions = FitnessOptions.builder()
        .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
        .addDataType(DataType.TYPE_HEART_RATE_BPM, FitnessOptions.ACCESS_READ)
        .build()
    
    fun requestPermissions(activity: Activity) {
        if (!GoogleSignIn.hasPermissions(GoogleSignIn.getLastSignedInAccount(context), fitnessOptions)) {
            GoogleSignIn.requestPermissions(
                activity,
                GOOGLE_FIT_PERMISSIONS_REQUEST_CODE,
                GoogleSignIn.getLastSignedInAccount(context),
                fitnessOptions
            )
        }
    }
    
    fun readStepCount(callback: (Int) -> Unit) {
        val account = GoogleSignIn.getLastSignedInAccount(context)
        if (account != null) {
            Fitness.getHistoryClient(context, account)
                .readDailyTotal(DataType.TYPE_STEP_COUNT_DELTA)
                .addOnSuccessListener { result ->
                    val totalSteps = result.dataPoints.firstOrNull()?.getValue(Field.FIELD_STEPS)?.asInt() ?: 0
                    callback(totalSteps)
                }
        }
    }
}
```

### 10.4 Offline Capabilities

#### Data Synchronization
```typescript
// Offline data management
class OfflineManager {
  private db: SQLiteDatabase;
  private syncQueue: SyncOperation[] = [];
  
  async initializeOfflineStorage(): Promise<void> {
    this.db = await SQLite.openDatabase({
      name: 'klearkarma_offline.db',
      location: 'default',
    });
    
    await this.createTables();
  }
  
  async cacheUserData(userData: User): Promise<void> {
    await this.db.executeSql(
      'INSERT OR REPLACE INTO cached_users (id, data, cached_at) VALUES (?, ?, ?)',
      [userData.id, JSON.stringify(userData), Date.now()]
    );
  }
  
  async getCachedBookings(): Promise<Booking[]> {
    const [results] = await this.db.executeSql(
      'SELECT data FROM cached_bookings WHERE user_id = ? ORDER BY created_at DESC',
      [this.getCurrentUserId()]
    );
    
    return results.rows.raw().map(row => JSON.parse(row.data));
  }
  
  async queueSyncOperation(operation: SyncOperation): Promise<void> {
    this.syncQueue.push(operation);
    await this.persistSyncQueue();
    
    if (await this.isOnline()) {
      await this.processSyncQueue();
    }
  }
  
  async processSyncQueue(): Promise<void> {
    while (this.syncQueue.length > 0) {
      const operation = this.syncQueue.shift()!;
      
      try {
        await this.executeSync(operation);
        await this.markSyncComplete(operation.id);
      } catch (error) {
        console.error('Sync failed:', error);
        this.syncQueue.unshift(operation); // Put back at front
        break;
      }
    }
  }
}
```

---

## Performance Optimization

### Code Splitting & Lazy Loading
```typescript
// Dynamic imports for code splitting
const PractitionerDetail = lazy(() => import('../screens/PractitionerDetail'));
const BookingFlow = lazy(() => import('../screens/BookingFlow'));
const PaymentScreen = lazy(() => import('../screens/PaymentScreen'));

// Lazy loading with suspense
const LazyScreen: React.FC<{component: React.ComponentType}> = ({ component: Component }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  );
};
```

### Image Optimization
```typescript
// Optimized image component
const OptimizedImage: React.FC<ImageProps> = ({ source, style, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  return (
    <View style={style}>
      {loading && <ImagePlaceholder />}
      <Image
        source={source}
        style={[style, { opacity: loading ? 0 : 1 }]}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        resizeMode="cover"
        {...props}
      />
      {error && <ImageErrorPlaceholder />}
    </View>
  );
};
```

---

## Security Implementation

### Biometric Authentication
```typescript
// Biometric authentication
import TouchID from 'react-native-touch-id';

class BiometricAuth {
  static async isSupported(): Promise<boolean> {
    try {
      const biometryType = await TouchID.isSupported();
      return biometryType !== false;
    } catch {
      return false;
    }
  }
  
  static async authenticate(reason: string): Promise<boolean> {
    try {
      await TouchID.authenticate(reason, {
        title: 'Authenticate',
        subtitle: 'Use your biometric to access Klear Karma',
        description: reason,
        fallbackLabel: 'Use Passcode',
        cancelLabel: 'Cancel',
      });
      return true;
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    }
  }
}
```

### Secure Storage
```typescript
// Secure token storage
import { setInternetCredentials, getInternetCredentials, resetInternetCredentials } from 'react-native-keychain';

class SecureStorage {
  private static readonly SERVICE_NAME = 'KlearKarmaApp';
  
  static async storeToken(token: string): Promise<void> {
    await setInternetCredentials(
      this.SERVICE_NAME,
      'auth_token',
      token
    );
  }
  
  static async getToken(): Promise<string | null> {
    try {
      const credentials = await getInternetCredentials(this.SERVICE_NAME);
      return credentials ? credentials.password : null;
    } catch {
      return null;
    }
  }
  
  static async clearToken(): Promise<void> {
    await resetInternetCredentials(this.SERVICE_NAME);
  }
}
```

---

## Testing Strategy

### Unit Testing
```typescript
// Jest configuration for React Native
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.{js,ts,tsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

// Example unit test
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';

describe('LoginScreen', () => {
  it('should handle login form submission', async () => {
    const mockLogin = jest.fn();
    const { getByTestId } = render(<LoginScreen onLogin={mockLogin} />);
    
    fireEvent.changeText(getByTestId('email-input'), 'test@example.com');
    fireEvent.changeText(getByTestId('password-input'), 'password123');
    fireEvent.press(getByTestId('login-button'));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

### Integration Testing
```typescript
// E2E testing with Detox
// e2e/firstTest.e2e.js
describe('Klear Karma App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  
  it('should complete booking flow', async () => {
    // Login
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('password123');
    await element(by.id('login-button')).tap();
    
    // Search for practitioner
    await element(by.id('search-tab')).tap();
    await element(by.id('search-input')).typeText('yoga');
    await element(by.id('search-button')).tap();
    
    // Select practitioner
    await element(by.id('practitioner-card-0')).tap();
    
    // Book session
    await element(by.id('book-session-button')).tap();
    await element(by.id('time-slot-0')).tap();
    await element(by.id('confirm-booking-button')).tap();
    
    // Verify booking success
    await expect(element(by.text('Booking Confirmed'))).toBeVisible();
  });
});
```

---

*This comprehensive technical architecture document provides the foundation for building a scalable, secure, and maintainable platform that can support Klear Karma's growth from startup to market leader in the alternative healing space.*