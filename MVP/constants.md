# Klear Karma MVP Constants & Brand Guidelines

> **MVP Purpose**: Investor demo and early adopter validation through realistic user journey demonstrations
> **Scope**: Mobile app with dual user flows (Customer & Healer) using mock data
> **Architecture**: Backend-first approach with Cloudflare Workers API + React Native frontend

---

## 🎯 **MVP CORE PRINCIPLES**

### **1. Demo-First Design**
- Every screen must tell a compelling story for investors
- Focus on user journey clarity over feature completeness
- Realistic mock data that demonstrates real-world scenarios
- Smooth transitions and professional polish

### **2. Brand Consistency**
- Strict adherence to Klear Karma design system
- Consistent messaging across all touchpoints
- Authentic wellness-focused tone throughout
- Professional yet approachable interface design

### **3. Technical Integrity**
- API-first development to prevent UI rework
- Scalable architecture patterns for future expansion
- Clean separation between mock data and business logic
- Performance optimization for smooth demo experience

---

## 🎨 **BRAND IDENTITY**

### **Core Values**
- **Authenticity**: Genuine connections between seekers and practitioners
- **Mindfulness**: Thoughtful, intentional user experiences
- **Accessibility**: Wellness for everyone, regardless of background
- **Trust**: Verified practitioners and transparent processes
- **Growth**: Personal transformation and continuous learning

### **Brand Voice**
- **Tone**: Warm, supportive, professional yet approachable
- **Style**: Clear, concise, empowering language
- **Personality**: Wise guide, trusted friend, knowledgeable mentor
- **Avoid**: Clinical jargon, overly spiritual language, sales-heavy copy

### **Messaging Framework**
- **Primary Promise**: "Find your path to wellness with verified practitioners"
- **Value Proposition**: Authentic healing connections made simple
- **Emotional Benefit**: Peace of mind in your wellness journey
- **Functional Benefit**: Curated, verified practitioners at your fingertips

---

## 🎨 **DESIGN SYSTEM**

### **Color Palette**

#### **Primary Colors**
```css
/* Primary Blue - Trust & Stability */
--primary-50: #eff6ff
--primary-100: #dbeafe
--primary-200: #bfdbfe
--primary-300: #93c5fd
--primary-400: #60a5fa
--primary-500: #3b82f6  /* Main Primary */
--primary-600: #2563eb
--primary-700: #1d4ed8
--primary-800: #1e40af
--primary-900: #1e3a8a
```

#### **Secondary Colors**
```css
/* Sage Green - Wellness & Growth */
--secondary-50: #f0f9f0
--secondary-100: #dcf2dc
--secondary-200: #bbe5bb
--secondary-300: #86d186
--secondary-400: #4ade80
--secondary-500: #22c55e  /* Main Secondary */
--secondary-600: #16a34a
--secondary-700: #15803d
--secondary-800: #166534
--secondary-900: #14532d
```

#### **Accent Colors**
```css
/* Coral - Energy & Action */
--accent-50: #fef2f2
--accent-100: #fee2e2
--accent-200: #fecaca
--accent-300: #fca5a5
--accent-400: #f87171
--accent-500: #ef4444  /* Main Accent */
--accent-600: #dc2626
--accent-700: #b91c1c
--accent-800: #991b1b
--accent-900: #7f1d1d
```

#### **Neutral Colors**
```css
/* Grays - Text & Backgrounds */
--neutral-50: #fafafa
--neutral-100: #f5f5f5
--neutral-200: #e5e5e5
--neutral-300: #d4d4d4
--neutral-400: #a3a3a3
--neutral-500: #737373
--neutral-600: #525252
--neutral-700: #404040
--neutral-800: #262626
--neutral-900: #171717
```

#### **Semantic Colors**
```css
/* Success */
--success-light: #dcfce7
--success-main: #16a34a
--success-dark: #14532d

/* Warning */
--warning-light: #fef3c7
--warning-main: #f59e0b
--warning-dark: #92400e

/* Error */
--error-light: #fee2e2
--error-main: #dc2626
--error-dark: #7f1d1d

/* Info */
--info-light: #dbeafe
--info-main: #3b82f6
--info-dark: #1e3a8a
```

### **Typography**

#### **Font Families**
```css
/* Primary Font - UI Text */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

/* Secondary Font - Headings */
--font-secondary: 'Crimson Pro', Georgia, serif

/* Monospace Font - Code/Data */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace
```

#### **Type Scale**
```css
/* Display Sizes */
--text-xs: 0.75rem     /* 12px */
--text-sm: 0.875rem    /* 14px */
--text-base: 1rem      /* 16px */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
--text-4xl: 2.25rem    /* 36px */
--text-5xl: 3rem       /* 48px */
--text-6xl: 3.75rem    /* 60px */
```

#### **Font Weights**
```css
--font-light: 300
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
```

#### **Line Heights**
```css
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

---

## 📱 **MOBILE APP SPECIFICATIONS**

### **Screen Categories & Messaging**

#### **1. Authentication Screens**
- **Welcome Screen**: "Welcome to your wellness journey"
- **Sign Up**: "Join thousands finding their path to wellness"
- **Sign In**: "Welcome back to your wellness community"
- **Forgot Password**: "Let's get you back on track"
- **Verification**: "Almost there! Verify your account"

#### **2. Onboarding Screens**
- **Role Selection**: "How would you like to use Klear Karma?"
- **Customer Onboarding**: "Tell us about your wellness goals"
- **Healer Onboarding**: "Share your healing expertise"
- **Preferences**: "Personalize your experience"
- **Permissions**: "Enable features for the best experience"

#### **3. Customer Journey Screens**
- **Home/Dashboard**: "Discover your next step in wellness"
- **Search/Browse**: "Find the perfect practitioner for you"
- **Practitioner Profiles**: "Meet [Practitioner Name]"
- **Booking**: "Schedule your session"
- **Session Management**: "Your upcoming sessions"
- **Reviews**: "Share your experience"

#### **4. Healer Journey Screens**
- **Dashboard**: "Welcome back, [Healer Name]"
- **Profile Management**: "Your professional presence"
- **Availability**: "Manage your schedule"
- **Client Management**: "Your client connections"
- **Earnings**: "Your wellness impact"
- **Analytics**: "Grow your practice"

#### **5. Shared Screens**
- **Messaging**: "Connect with care"
- **Notifications**: "Stay updated on your wellness journey"
- **Settings**: "Customize your experience"
- **Support**: "We're here to help"
- **Profile**: "Your wellness profile"

### **UI Component Guidelines**

#### **Buttons**
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: var(--font-medium);
  font-size: var(--text-base);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--primary-500);
  border: 1px solid var(--primary-500);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: var(--font-medium);
}

/* Accent Button */
.btn-accent {
  background: var(--accent-500);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: var(--font-medium);
}
```

#### **Cards**
```css
.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--neutral-200);
}

.card-elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

#### **Input Fields**
```css
.input {
  border: 1px solid var(--neutral-300);
  border-radius: 8px;
  padding: 12px 16px;
  font-size: var(--text-base);
  background: white;
}

.input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

---

## 📝 **CONTENT GUIDELINES**

### **Tone of Voice by Screen Type**

#### **Onboarding & Welcome**
- **Tone**: Encouraging, warm, supportive
- **Language**: "Welcome", "Let's begin", "Your journey starts here"
- **Avoid**: Overwhelming information, complex terminology

#### **Search & Discovery**
- **Tone**: Helpful, informative, confident
- **Language**: "Find", "Discover", "Perfect match", "Recommended"
- **Avoid**: Pushy sales language, false urgency

#### **Booking & Transactions**
- **Tone**: Clear, reassuring, professional
- **Language**: "Confirm", "Secure", "Protected", "Guaranteed"
- **Avoid**: Uncertainty, complex terms, hidden information

#### **Communication & Messaging**
- **Tone**: Respectful, private, supportive
- **Language**: "Connect", "Share", "Discuss", "Confidential"
- **Avoid**: Casual slang, overly formal language

#### **Errors & Issues**
- **Tone**: Helpful, apologetic, solution-focused
- **Language**: "Let's fix this", "Try again", "We're here to help"
- **Avoid**: Blame, technical jargon, dismissive language

### **Microcopy Standards**

#### **Button Labels**
- **Primary Actions**: "Get Started", "Book Session", "Send Message", "Save Changes"
- **Secondary Actions**: "Learn More", "View Profile", "See Details", "Cancel"
- **Destructive Actions**: "Delete Account", "Remove", "Cancel Booking"

#### **Form Labels**
- **Clear & Descriptive**: "Your email address", "Choose your password", "Tell us about yourself"
- **Helper Text**: "We'll never share your email", "At least 8 characters", "This helps us match you better"

#### **Status Messages**
- **Success**: "Great! Your session is booked", "Profile updated successfully", "Message sent"
- **Loading**: "Finding practitioners...", "Saving your changes...", "Loading your sessions..."
- **Empty States**: "No sessions yet", "Start by searching for practitioners", "Your messages will appear here"

---

## 🔧 **TECHNICAL SPECIFICATIONS**

### **API Response Standards**

#### **Success Response Format**
```json
{
  "success": true,
  "data": {},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### **Error Response Format**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check your input and try again",
    "details": {}
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### **Mock Data Standards**

#### **User Profiles**
- **Realistic Names**: Mix of cultural backgrounds
- **Professional Photos**: High-quality, diverse representation
- **Authentic Bios**: 2-3 sentences, personal yet professional
- **Varied Experience**: 1-20 years, different specializations
- **Geographic Diversity**: Multiple cities, time zones

#### **Services & Pricing**
- **Market-Realistic Pricing**: $50-$300 per session
- **Varied Session Types**: 30min, 60min, 90min, packages
- **Diverse Modalities**: Reiki, Acupuncture, Massage, Coaching, etc.
- **Authentic Descriptions**: Benefits-focused, not feature-heavy

#### **Reviews & Ratings**
- **Balanced Distribution**: Mostly 4-5 stars, some 3 stars
- **Authentic Language**: Real customer voice, specific benefits
- **Varied Length**: 1-3 sentences, some longer testimonials
- **Recent Dates**: Within last 6 months

### **Performance Standards**
- **Load Time**: < 2 seconds for all screens
- **Smooth Animations**: 60fps transitions
- **Offline Capability**: Graceful degradation
- **Memory Usage**: Optimized for older devices

---

## 🎯 **MVP SUCCESS METRICS**

### **Demo Effectiveness**
- **User Journey Completion**: Smooth flow from discovery to booking
- **Visual Polish**: Professional, trustworthy appearance
- **Feature Comprehension**: Clear value proposition demonstration
- **Stakeholder Engagement**: Positive investor/partner feedback

### **Technical Quality**
- **Code Organization**: Clean, maintainable structure
- **API Design**: RESTful, well-documented endpoints
- **Data Consistency**: Realistic, coherent mock data
- **Performance**: Responsive, smooth user experience

### **Brand Alignment**
- **Visual Consistency**: Adherence to design system
- **Message Clarity**: Clear value proposition
- **Tone Consistency**: Warm, professional, trustworthy
- **User Experience**: Intuitive, accessible interface

---

## 🚀 **IMPLEMENTATION PRIORITIES**

### **Phase 1: Backend Foundation**
1. Cloudflare Workers API setup
2. KV storage configuration
3. Mock data population
4. Core endpoint implementation
5. Authentication system

### **Phase 2: Frontend Development**
1. React Native project setup via rork.com
2. Design system implementation
3. Core screen development
4. API integration
5. Navigation flow completion

### **Phase 3: Polish & Demo Prep**
1. Performance optimization
2. Visual polish and animations
3. Error handling and edge cases
4. Demo script preparation
5. Stakeholder presentation materials

---

## 📋 **QUALITY CHECKLIST**

### **Before Demo**
- [ ] All screens follow design system
- [ ] Consistent messaging and tone
- [ ] Realistic mock data populated
- [ ] Smooth user journey flows
- [ ] Performance optimized
- [ ] Error states handled
- [ ] Accessibility considerations
- [ ] Cross-device testing
- [ ] Demo script prepared
- [ ] Stakeholder materials ready

### **Code Quality**
- [ ] Clean, documented code
- [ ] Consistent naming conventions
- [ ] Proper error handling
- [ ] Security best practices
- [ ] Performance optimizations
- [ ] Scalable architecture patterns

---

*This document serves as the single source of truth for all MVP development decisions. Any deviations must be documented and approved to maintain consistency and quality.*