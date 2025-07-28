# Klear Karma Mobile App - Frontend PRD

## Project Overview
**Product**: Klear Karma Mobile Application (MVP)
**Platform**: React Native (Generated via rork.com)
**Architecture**: Single app with dual user flows (Customer & Healer)
**Purpose**: Investor demo and early adopter validation with realistic mock data integration

## Brand Guidelines Integration

### Visual Identity
- **Primary Colors**: Deep Blue (#1a365d), Sage Green (#68d391), Coral Accent (#f56565)
- **Typography**: Inter (primary), Crimson Pro (headings), JetBrains Mono (code/data)
- **Design Philosophy**: Mindful Simplicity, Wellness-Centered, Authentic Connection
- **UI Style**: Glassmorphism with subtle physics-based animations

### Voice & Tone
- **Voice**: Compassionate, knowledgeable, trustworthy, inclusive
- **Tone**: Warm yet professional, encouraging, non-judgmental
- **Messaging**: Focus on healing journey, authentic connections, holistic wellness

## Application Flow Architecture

### 1. Splash Screen
**Components**:
- Klear Karma logo with subtle animation
- Loading indicator with wellness-themed micro-interactions
- Background: Gradient from deep blue to sage green
- Duration: 2-3 seconds with smooth transition

### 2. Onboarding Sequence (First-time users)
**Screen 1 - Welcome**:
- Hero message: "Welcome to Your Healing Journey"
- Subtitle: "Connect with verified wellness practitioners"
- Continue button with glassmorphism effect

**Screen 2 - User Type Selection**:
- Two card options with icons:
  - "I'm seeking healing" (Customer path)
  - "I'm a wellness practitioner" (Healer path)
- Each card shows brief description and benefits

**Screen 3 - Permissions**:
- Location access for nearby practitioners
- Notification permissions for appointments
- Clear explanation of data usage

### 3. Authentication Screens

#### Login Screen
**Layout**:
- Header: "Welcome Back" with user type indicator
- Email/phone input field
- Password input with show/hide toggle
- "Remember me" checkbox
- Login button (primary color)
- "Forgot password?" link
- "Don't have an account? Sign up" link
- Social login options (Google, Apple)

#### Registration Screen
**Customer Registration**:
- Full name input
- Email address
- Phone number
- Password with strength indicator
- Confirm password
- Terms & privacy checkbox
- "Create Account" button
- "Already have an account? Login" link

**Healer Registration**:
- Personal information section:
  - Full name
  - Professional title
  - Email and phone
  - Password creation
- Professional details section:
  - Specializations (multi-select)
  - Years of experience
  - Certifications upload
  - Professional bio (character limit)
- Verification notice: "Account pending verification"

### 4. Customer Flow Screens

#### Home/Dashboard
**Header Section**:
- Greeting: "Good [morning/afternoon], [Name]"
- Location indicator with change option
- Notification bell icon

**Quick Actions**:
- "Find Practitioners" button
- "My Appointments" card
- "Wellness Journal" entry
- "Emergency Support" quick access

**Recommended Section**:
- "Practitioners Near You" horizontal scroll
- "Popular Services" grid
- "Wellness Tips" content cards

#### Search & Discovery
**Search Bar**:
- Placeholder: "Search by service, practitioner, or specialty"
- Voice search icon
- Filter button

**Filter Modal**:
- Service type checkboxes
- Distance slider
- Price range slider
- Availability toggle
- Rating filter
- "Apply Filters" button

**Results List**:
- Practitioner cards with:
  - Profile photo
  - Name and title
  - Specializations tags
  - Rating and review count
  - Distance and availability
  - Starting price
  - "View Profile" button

#### Practitioner Profile
**Header**:
- Large profile photo
- Name and credentials
- Rating with stars
- "Message" and "Book Now" buttons

**About Section**:
- Professional bio
- Specializations list
- Years of experience
- Certifications display

**Services & Pricing**:
- Service cards with descriptions and prices
- Duration indicators
- "Add to Cart" or "Book Now" options

**Reviews Section**:
- Overall rating breakdown
- Recent reviews with customer names
- "See All Reviews" link

**Availability Calendar**:
- Monthly view with available slots
- Time slot selection
- Booking confirmation flow

#### Booking Flow
**Service Selection**:
- Chosen practitioner summary
- Service options with descriptions
- Duration and pricing display
- "Continue" button

**Date & Time Selection**:
- Calendar view with available dates
- Time slots for selected date
- Timezone display
- "Confirm Selection" button

**Booking Details**:
- Session summary
- Customer information form
- Special requests text area
- Payment method selection
- Total cost breakdown
- "Confirm Booking" button

**Confirmation Screen**:
- Booking success message
- Session details summary
- Calendar add option
- "Message Practitioner" button
- "Return to Home" button

#### My Appointments
**Upcoming Tab**:
- Appointment cards with:
  - Practitioner photo and name
  - Service type
  - Date and time
  - Location/video call indicator
  - "Reschedule" and "Cancel" options
  - "Join Session" button (for virtual)

**Past Tab**:
- Completed session history
- "Leave Review" prompts
- "Book Again" quick action
- Session notes access

#### Messages
**Conversation List**:
- Practitioner conversations
- Last message preview
- Unread indicators
- Search conversations

**Chat Interface**:
- Standard messaging UI
- File/image sharing
- Appointment booking shortcuts
- Professional boundary reminders

#### Profile & Settings
**Profile Section**:
- Profile photo upload
- Personal information editing
- Health preferences
- Emergency contacts

**Settings**:
- Notification preferences
- Privacy settings
- Payment methods
- Language selection
- Help & support
- Logout option

### 5. Healer Flow Screens

#### Healer Dashboard
**Overview Cards**:
- Today's appointments count
- This week's earnings
- New messages count
- Profile completion percentage

**Quick Actions**:
- "View Schedule" button
- "Update Availability" button
- "Manage Services" button
- "View Analytics" button

**Recent Activity**:
- New booking notifications
- Recent reviews
- Payment confirmations
- System updates

#### Schedule Management
**Calendar View**:
- Monthly/weekly/daily views
- Appointment blocks with client info
- Available time slots highlighted
- "Add Availability" button

**Appointment Details Modal**:
- Client information
- Service details
- Session notes
- "Start Session" button
- "Reschedule" and "Cancel" options

#### Service Management
**Services List**:
- Current services with edit options
- Pricing and duration display
- Active/inactive toggles
- "Add New Service" button

**Service Creation/Edit Form**:
- Service name and description
- Duration selection
- Pricing input
- Category selection
- Availability settings
- "Save Service" button

#### Client Management
**Client List**:
- Client profiles with session history
- Search and filter options
- Communication history
- Notes and preferences

**Client Profile View**:
- Contact information
- Session history
- Notes section
- Communication log
- "Message Client" button

#### Earnings & Analytics
**Revenue Overview**:
- Monthly earnings chart
- Payment history
- Pending payments
- Tax document access

**Performance Metrics**:
- Booking conversion rates
- Client retention statistics
- Review ratings trends
- Popular services analysis

#### Professional Profile
**Profile Management**:
- Professional photo upload
- Bio editing with character count
- Specializations management
- Certification uploads
- Availability settings

**Verification Status**:
- Document verification progress
- Required certifications checklist
- Approval status indicators
- Resubmission options

## Modal Windows & Pop-ups

### Confirmation Modals
- Booking cancellation confirmation
- Account deletion warning
- Logout confirmation
- Payment processing alerts

### Information Modals
- Service details expansion
- Practitioner credential verification
- Privacy policy display
- Terms of service

### Action Sheets
- Profile photo options (camera/gallery)
- Appointment actions (reschedule/cancel/message)
- Share options for practitioners
- Report/block user options

### Loading States
- Skeleton screens for content loading
- Progress indicators for uploads
- Shimmer effects for image loading
- Spinner overlays for processing

## Navigation Structure

### Customer Bottom Tab Navigation
1. **Home** (house icon)
2. **Search** (magnifying glass icon)
3. **Appointments** (calendar icon)
4. **Messages** (chat bubble icon)
5. **Profile** (user icon)

### Healer Bottom Tab Navigation
1. **Dashboard** (grid icon)
2. **Schedule** (calendar icon)
3. **Clients** (users icon)
4. **Messages** (chat bubble icon)
5. **Profile** (user icon)

## Error States & Edge Cases

### Network Errors
- Offline mode indicators
- Retry mechanisms
- Cached content display
- Connection restoration alerts

### Empty States
- No appointments illustration
- No messages placeholder
- No search results guidance
- No practitioners available

### Form Validation
- Real-time field validation
- Error message display
- Success state indicators
- Required field highlighting

## Accessibility Features

### Visual Accessibility
- High contrast mode support
- Font size adjustment
- Color blind friendly palette
- Screen reader compatibility

### Interaction Accessibility
- Voice navigation support
- Gesture alternatives
- Keyboard navigation
- Touch target sizing

## Performance Considerations

### Image Optimization
- Lazy loading implementation
- Progressive image loading
- Compressed image formats
- Placeholder blur effects

### Data Management
- Efficient pagination
- Smart caching strategies
- Background sync
- Optimistic UI updates

## Integration Points

### Mock API Endpoints
- User authentication endpoints
- Practitioner search and filtering
- Booking management
- Messaging system
- Payment processing simulation
- Review and rating system

### Third-party Services
- Map integration for location
- Calendar sync capabilities
- Video call integration
- Payment gateway simulation
- Push notification system

## Content Guidelines

### Microcopy Standards
- Button text: Action-oriented and clear
- Error messages: Helpful and solution-focused
- Success messages: Encouraging and next-step oriented
- Placeholder text: Descriptive and example-driven

### Content Tone
- Empathetic and supportive language
- Inclusive and non-judgmental phrasing
- Professional yet warm communication
- Clear and jargon-free explanations

## Technical Specifications

### React Native Requirements
- Cross-platform compatibility (iOS/Android)
- Responsive design for various screen sizes
- Smooth animations and transitions
- Efficient state management
- Modular component architecture

### Mock Data Integration
- Realistic user profiles and data
- Diverse practitioner specializations
- Varied appointment scenarios
- Sample conversation threads
- Representative review content

This PRD serves as the complete specification for generating the React Native frontend that will seamlessly integrate with the Cloudflare Workers backend API, ensuring a cohesive and realistic MVP experience for investors and early adopters.