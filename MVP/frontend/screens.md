# Klear Karma MVP - Screen Specifications

## Overview
This document provides detailed specifications for all screens in the Klear Karma MVP mobile application, covering both customer and healer user flows.

## Design System Reference
- **Primary Colors**: Sage Green (#22c55e), Blue (#3b82f6), Coral (#ef4444)
- **Typography**: Inter font family
- **Design Language**: Clean, minimalist, wellness-focused
- **Platform**: React Native (iOS/Android)

---

# CUSTOMER FLOW SCREENS

## 1. Authentication Screens

### 1.1 Welcome Screen
**Purpose**: First impression and app introduction

**Components**:
- Hero image/illustration (wellness theme)
- App logo and tagline
- "Get Started" CTA button (sage green)
- "Already have an account? Sign In" link

**Navigation**: 
- Get Started → Sign Up Screen
- Sign In → Login Screen

### 1.2 Sign Up Screen
**Purpose**: New customer registration

**Components**:
- Form fields:
  - Full Name (text input)
  - Email (email input with validation)
  - Phone Number (phone input)
  - Password (secure input with strength indicator)
  - Confirm Password
- "Create Account" button
- "Already have an account? Sign In" link
- Terms & Privacy policy checkboxes

**Validation**:
- Email format validation
- Password strength requirements
- Phone number format
- Required field indicators

**Navigation**:
- Success → Profile Setup Screen
- Sign In → Login Screen

### 1.3 Login Screen
**Purpose**: Returning customer authentication

**Components**:
- Email/Phone input field
- Password input field
- "Sign In" button
- "Forgot Password?" link
- "Don't have an account? Sign Up" link
- Social login options (Google, Apple)

**Navigation**:
- Success → Home Screen
- Sign Up → Sign Up Screen
- Forgot Password → Password Reset Screen

## 2. Onboarding Screens

### 2.1 Profile Setup Screen
**Purpose**: Initial customer profile creation

**Components**:
- Profile photo upload (optional)
- Location/Address input
- Date of birth picker
- Gender selection (optional)
- "Continue" button
- Progress indicator (step 1 of 3)

### 2.2 Preferences Screen
**Purpose**: Service and practitioner preferences

**Components**:
- Service categories (multi-select):
  - Massage Therapy
  - Reiki Healing
  - Life Coaching
  - Meditation
  - Yoga
  - Acupuncture
- Preferred practitioner gender
- Budget range slider
- "Continue" button
- Progress indicator (step 2 of 3)

### 2.3 Notifications Setup Screen
**Purpose**: Permission and notification preferences

**Components**:
- Push notification permission request
- Notification preferences:
  - Appointment reminders
  - New practitioner matches
  - Special offers
  - Weekly wellness tips
- "Complete Setup" button
- Progress indicator (step 3 of 3)

**Navigation**: Complete → Home Screen

## 3. Main App Screens

### 3.1 Home Screen
**Purpose**: Main dashboard and service discovery

**Components**:
- Header:
  - Location indicator
  - Notification bell icon
  - Profile avatar
- Search bar ("Find your perfect healer...")
- Quick service categories (horizontal scroll):
  - Massage
  - Reiki
  - Coaching
  - Meditation
- Featured practitioners section:
  - Practitioner cards with:
    - Profile photo
    - Name and title
    - Rating (stars)
    - Starting price
    - Distance
    - "Book Now" button
- "Recommended for You" section
- Recent bookings (if any)

**Navigation**:
- Search → Search Results Screen
- Category → Category Screen
- Practitioner Card → Practitioner Profile Screen
- Profile Avatar → Profile Screen

### 3.2 Search Results Screen
**Purpose**: Display search and filter results

**Components**:
- Search bar (with current query)
- Filter button (opens filter modal)
- Sort dropdown (Distance, Price, Rating, Availability)
- Results count
- Practitioner list:
  - Same card format as home screen
  - "View Profile" and "Book Now" options
- "No results" state with suggestions

**Filters Modal**:
- Service type
- Price range
- Distance radius
- Availability (today, this week, specific date)
- Rating minimum
- Gender preference

### 3.3 Practitioner Profile Screen
**Purpose**: Detailed practitioner information

**Components**:
- Header image/background
- Profile photo and basic info:
  - Name and credentials
  - Rating and review count
  - Years of experience
  - Location/Distance
- About section
- Services offered:
  - Service name
  - Duration
  - Price
  - "Book" button
- Reviews section:
  - Overall rating breakdown
  - Recent reviews with ratings
  - "See All Reviews" link
- Availability calendar (next 7 days)
- "Message" and "Book Now" buttons

**Navigation**:
- Book → Service Selection Screen
- Message → Chat Screen
- Reviews → Reviews Screen

### 3.4 Service Selection Screen
**Purpose**: Choose specific service and time

**Components**:
- Selected practitioner summary
- Service selection:
  - Service cards with duration and price
  - Service descriptions
- Date picker (calendar view)
- Time slot selection (available slots highlighted)
- Location options:
  - Practitioner's location
  - Customer's location (if mobile service)
  - Virtual session
- "Continue to Booking" button

### 3.5 Booking Confirmation Screen
**Purpose**: Review and confirm booking details

**Components**:
- Booking summary card:
  - Practitioner info
  - Service details
  - Date and time
  - Location
  - Total price
- Special requests text area
- Payment method selection
- Cancellation policy
- "Confirm Booking" button
- "Edit Details" link

**Navigation**:
- Confirm → Payment Screen
- Edit → Previous screens

### 3.6 Payment Screen
**Purpose**: Process payment for booking

**Components**:
- Order summary
- Payment methods:
  - Saved cards
  - Add new card form
  - Digital wallets (Apple Pay, Google Pay)
- Billing address (if required)
- Promo code input
- Total amount breakdown
- "Pay Now" button
- Security badges

**Navigation**:
- Success → Booking Success Screen
- Failure → Payment Error Screen

### 3.7 Booking Success Screen
**Purpose**: Confirm successful booking

**Components**:
- Success animation/icon
- Booking confirmation details
- "Add to Calendar" button
- "Message Practitioner" button
- "View Booking Details" button
- "Book Another Session" button

## 4. Account Management Screens

### 4.1 Profile Screen
**Purpose**: Customer account overview

**Components**:
- Profile header:
  - Profile photo
  - Name and member since date
- Quick stats:
  - Total sessions
  - Favorite practitioners
  - Wellness points
- Menu options:
  - Edit Profile
  - My Bookings
  - Payment Methods
  - Notifications
  - Help & Support
  - Settings
  - Sign Out

### 4.2 My Bookings Screen
**Purpose**: View and manage bookings

**Components**:
- Tab navigation:
  - Upcoming
  - Past
  - Cancelled
- Booking cards:
  - Practitioner info
  - Service and date/time
  - Status indicator
  - Action buttons (Cancel, Reschedule, Review)
- Empty states for each tab

### 4.3 Messages Screen
**Purpose**: Communication with practitioners

**Components**:
- Conversation list:
  - Practitioner photo and name
  - Last message preview
  - Timestamp
  - Unread indicator
- Search conversations
- Individual chat interface:
  - Message bubbles
  - Timestamp
  - Message status indicators
  - Text input with send button
  - Attachment options

---

# HEALER FLOW SCREENS

## 1. Authentication & Onboarding

### 1.1 Healer Welcome Screen
**Purpose**: Practitioner-specific welcome

**Components**:
- Hero content for practitioners
- "Join as a Healer" CTA
- "Already registered? Sign In" link
- Benefits highlights:
  - Flexible scheduling
  - Secure payments
  - Client management tools

### 1.2 Healer Registration Screen
**Purpose**: Practitioner account creation

**Components**:
- Personal information:
  - Full name
  - Email
  - Phone
  - Password
- Professional information:
  - License/Certification numbers
  - Years of experience
  - Specializations
- Business information:
  - Business name (optional)
  - Tax ID (if applicable)
- "Create Practitioner Account" button

### 1.3 Profile Creation Screens

#### 1.3.1 Basic Profile Setup
**Components**:
- Profile photo upload
- Professional bio (500 char limit)
- Credentials and certifications
- Years of experience
- Languages spoken

#### 1.3.2 Services Setup
**Components**:
- Service categories selection
- Custom service creation:
  - Service name
  - Description
  - Duration options
  - Pricing
- Location preferences:
  - Home studio
  - Mobile service
  - Virtual sessions

#### 1.3.3 Availability Setup
**Components**:
- Weekly schedule grid
- Time slot duration settings
- Buffer time between appointments
- Advance booking limits
- Blackout dates

#### 1.3.4 Payment Setup
**Components**:
- Bank account information
- Tax information
- Payment schedule preferences
- Fee structure explanation

## 2. Main Dashboard Screens

### 2.1 Healer Dashboard
**Purpose**: Main practitioner overview

**Components**:
- Header with notifications and profile
- Quick stats cards:
  - Today's appointments
  - This week's earnings
  - New client requests
  - Average rating
- Today's schedule preview
- Recent activity feed
- Quick actions:
  - Add availability
  - View all bookings
  - Update services
  - Message clients

### 2.2 Calendar/Schedule Screen
**Purpose**: Appointment management

**Components**:
- Calendar view (day/week/month)
- Appointment blocks showing:
  - Client name
  - Service type
  - Duration
  - Status
- "Add Availability" button
- "Block Time" option
- Appointment details modal:
  - Client information
  - Service details
  - Notes
  - Action buttons (Confirm, Cancel, Reschedule)

### 2.3 Client Management Screen
**Purpose**: View and manage client relationships

**Components**:
- Client list with:
  - Profile photos
  - Names
  - Last session date
  - Total sessions
  - Contact options
- Search and filter clients
- Client detail view:
  - Contact information
  - Session history
  - Notes and preferences
  - Communication history

### 2.4 Earnings Screen
**Purpose**: Financial overview and management

**Components**:
- Earnings summary:
  - Today, week, month, year
  - Pending payments
  - Total lifetime earnings
- Transaction history
- Payout schedule
- Tax document downloads
- Earnings analytics charts

### 2.5 Messages Screen
**Purpose**: Client communication

**Components**:
- Similar to customer messages
- Client conversation list
- Individual chat interfaces
- Quick response templates
- Appointment-related message shortcuts

## 3. Business Management Screens

### 3.1 Services Management
**Purpose**: Manage service offerings

**Components**:
- Service list with edit options
- Add new service form
- Service analytics:
  - Most popular services
  - Revenue by service
  - Booking frequency
- Pricing optimization suggestions

### 3.2 Profile Management
**Purpose**: Update practitioner profile

**Components**:
- All profile setup components (editable)
- Profile preview (customer view)
- Profile completion percentage
- SEO optimization tips
- Review management

### 3.3 Settings Screen
**Purpose**: Account and app preferences

**Components**:
- Account settings:
  - Personal information
  - Password change
  - Two-factor authentication
- Business settings:
  - Availability preferences
  - Cancellation policies
  - Auto-accept bookings
- Notification preferences
- Privacy settings
- Help and support

---

# SHARED SCREENS

## 1. Chat/Messaging Interface
**Purpose**: Real-time communication

**Components**:
- Message thread with timestamps
- Typing indicators
- Message status (sent, delivered, read)
- Attachment support (images, documents)
- Quick actions for appointment-related messages
- Report/block functionality

## 2. Notifications Screen
**Purpose**: App notifications management

**Components**:
- Notification list with:
  - Type indicators
  - Timestamps
  - Action buttons
- Mark all as read
- Notification categories:
  - Bookings
  - Messages
  - Payments
  - System updates

## 3. Help & Support Screens
**Purpose**: User assistance

**Components**:
- FAQ sections
- Contact support form
- Live chat option
- Video tutorials
- Community guidelines
- Report issues

## 4. Legal & Policy Screens
**Purpose**: Terms, privacy, and compliance

**Components**:
- Terms of Service
- Privacy Policy
- Community Guidelines
- Cancellation Policies
- Payment Terms

---

# TECHNICAL SPECIFICATIONS

## Navigation Structure
- **Tab Navigation**: Bottom tabs for main sections
- **Stack Navigation**: Screen-to-screen navigation
- **Modal Navigation**: Overlays and forms
- **Deep Linking**: Direct access to specific screens

## State Management
- User authentication state
- Booking state management
- Real-time message state
- Offline data synchronization

## Performance Considerations
- Lazy loading for image-heavy screens
- Pagination for long lists
- Caching for frequently accessed data
- Optimistic UI updates

## Accessibility
- Screen reader compatibility
- High contrast mode support
- Font scaling support
- Voice navigation options

## Error Handling
- Network error screens
- Form validation messages
- Graceful degradation
- Retry mechanisms

This comprehensive screen specification serves as the foundation for implementing the Klear Karma MVP mobile application with consistent user experience across both customer and healer flows.