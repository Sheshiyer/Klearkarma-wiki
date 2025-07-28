# KLEAR KARMA - DESIGN SYSTEM & CONSTANTS

## 1. BRAND IDENTITY

### 1.1 Brand Values
```javascript
const BRAND_VALUES = {
  mission: "Clear Your Karma, Transform Your Life",
  vision: "World's Most Trusted Alternative Healing Platform",
  values: [
    "Authenticity Through Verification",
    "Scientific Validation",
    "Community-Driven Trust",
    "Ancient Wisdom + Modern Technology",
    "20% Giveback for Global Healing"
  ]
};
```

### 1.2 Brand Voice & Tone
```javascript
const BRAND_VOICE = {
  personality: "Trustworthy, Empowering, Scientific, Spiritual",
  tone: {
    primary: "Confident yet humble",
    secondary: "Educational and inspiring",
    avoid: "Overly mystical, unsubstantiated claims"
  },
  messaging: {
    tagline: "Clear Your Karma, Transform Your Life",
    subtitle: "Community-Verified • Scientifically-Validated • Globally Trusted",
    cta_primary: "Start Your Healing Journey",
    cta_secondary: "Join 10,000+ Verified Practitioners"
  }
};
```

---

## 2. COLOR SYSTEM

### 2.1 Chakra Rainbow Palette
```css
:root {
  /* Primary Chakra Colors */
  --chakra-root: #DC2626;        /* Root Chakra - Red */
  --chakra-sacral: #EA580C;      /* Sacral Chakra - Orange */
  --chakra-solar: #F59E0B;       /* Solar Plexus - Yellow */
  --chakra-heart: #10B981;       /* Heart Chakra - Green */
  --chakra-throat: #3B82F6;      /* Throat Chakra - Blue */
  --chakra-third-eye: #8B5CF6;   /* Third Eye - Indigo */
  --chakra-crown: #A855F7;       /* Crown Chakra - Violet */
  
  /* Gradient Combinations */
  --gradient-healing: linear-gradient(135deg, #4FD1C7 0%, #F093FB 50%, #F6D365 100%);
  --gradient-trust: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-growth: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-wisdom: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --gradient-transformation: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}
```

### 2.2 Neutral & Semantic Colors
```css
:root {
  /* Dark Theme Base */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2a2a2a;
  --bg-glass: rgba(255, 255, 255, 0.05);
  --bg-glass-dark: rgba(255, 255, 255, 0.03);
  
  /* Text Colors */
  --text-primary: #ffffff;
  --text-secondary: #e5e5e5;
  --text-tertiary: #a3a3a3;
  --text-muted: #737373;
  --text-inverse: #0a0a0a;
  
  /* Border Colors */
  --border-primary: rgba(255, 255, 255, 0.1);
  --border-secondary: rgba(255, 255, 255, 0.05);
  --border-accent: rgba(79, 209, 199, 0.3);
  
  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* Interactive States */
  --hover-overlay: rgba(255, 255, 255, 0.1);
  --active-overlay: rgba(255, 255, 255, 0.2);
  --focus-ring: rgba(79, 209, 199, 0.5);
}
```

### 2.3 Color Usage Guidelines
```javascript
const COLOR_USAGE = {
  primary: {
    use: "Main CTAs, primary navigation, key highlights",
    gradient: "var(--gradient-healing)",
    solid: "var(--chakra-heart)"
  },
  secondary: {
    use: "Secondary actions, supporting elements",
    gradient: "var(--gradient-trust)",
    solid: "var(--chakra-throat)"
  },
  accent: {
    use: "Notifications, badges, special highlights",
    gradient: "var(--gradient-transformation)",
    solid: "var(--chakra-crown)"
  }
};
```

---

## 3. TYPOGRAPHY SYSTEM

### 3.1 Font Stack
```css
:root {
  /* Primary Font - Modern Sans */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Secondary Font - Display */
  --font-display: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Monospace Font */
  --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

### 3.2 Type Scale
```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
  --text-7xl: 4.5rem;    /* 72px */
  --text-8xl: 6rem;      /* 96px */
  --text-9xl: 8rem;      /* 128px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
  
  /* Font Weights */
  --font-thin: 100;
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### 3.3 Typography Components
```javascript
const TYPOGRAPHY_COMPONENTS = {
  hero: {
    fontSize: 'var(--text-6xl)',
    fontWeight: 'var(--font-bold)',
    lineHeight: 'var(--leading-tight)',
    fontFamily: 'var(--font-display)'
  },
  heading1: {
    fontSize: 'var(--text-5xl)',
    fontWeight: 'var(--font-semibold)',
    lineHeight: 'var(--leading-tight)'
  },
  heading2: {
    fontSize: 'var(--text-4xl)',
    fontWeight: 'var(--font-semibold)',
    lineHeight: 'var(--leading-snug)'
  },
  heading3: {
    fontSize: 'var(--text-3xl)',
    fontWeight: 'var(--font-medium)',
    lineHeight: 'var(--leading-snug)'
  },
  body: {
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-normal)',
    lineHeight: 'var(--leading-relaxed)'
  },
  caption: {
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-normal)',
    lineHeight: 'var(--leading-normal)'
  }
};
```

---

## 4. SPACING & LAYOUT

### 4.1 Spacing Scale
```css
:root {
  /* Spacing Scale (based on 4px grid) */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-40: 10rem;    /* 160px */
  --space-48: 12rem;    /* 192px */
  --space-56: 14rem;    /* 224px */
  --space-64: 16rem;    /* 256px */
}
```

### 4.2 Container Sizes
```css
:root {
  /* Container Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Section Padding */
  --section-padding-y: var(--space-20);
  --section-padding-x: var(--space-6);
  
  /* Component Spacing */
  --component-gap: var(--space-6);
  --element-gap: var(--space-4);
}
```

### 4.3 Breakpoints
```javascript
const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};
```

---

## 5. COMPONENT SYSTEM

### 5.1 Button Variants
```css
/* Primary Button */
.btn-primary {
  background: var(--gradient-healing);
  color: var(--text-inverse);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(79, 209, 199, 0.3);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-accent);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-glass);
  border-color: var(--chakra-heart);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;
}

.btn-ghost:hover {
  background: var(--hover-overlay);
  color: var(--text-primary);
}
```

### 5.2 Card Components
```css
/* Glass Card */
.card-glass {
  background: var(--bg-glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  position: relative;
  overflow: hidden;
}

.card-glass::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
}

/* Feature Card */
.card-feature {
  background: var(--bg-secondary);
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card-feature:hover {
  transform: translateY(-4px);
  border-color: var(--border-accent);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Testimonial Card */
.card-testimonial {
  background: var(--bg-glass-dark);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  backdrop-filter: blur(10px);
}
```

### 5.3 Border Radius
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;
}
```

---

## 6. ANIMATION SYSTEM

### 6.1 Transition Durations
```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 750ms;
  
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 6.2 Keyframe Animations
```css
/* Floating Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Pulse Animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Gradient Shift */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 6.3 Animation Classes
```css
.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-scale-in {
  animation: scaleIn 0.4s ease-out;
}
```

---

## 7. SHADOW SYSTEM

### 7.1 Shadow Tokens
```css
:root {
  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  
  /* Colored Shadows */
  --shadow-primary: 0 10px 25px rgba(79, 209, 199, 0.3);
  --shadow-secondary: 0 10px 25px rgba(59, 130, 246, 0.3);
  --shadow-accent: 0 10px 25px rgba(168, 85, 247, 0.3);
  
  /* Inner Shadows */
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-inner-lg: inset 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}
```

---

## 8. ICON SYSTEM

### 8.1 Icon Categories
```javascript
const ICON_CATEGORIES = {
  chakras: [
    'root-chakra',
    'sacral-chakra',
    'solar-plexus-chakra',
    'heart-chakra',
    'throat-chakra',
    'third-eye-chakra',
    'crown-chakra'
  ],
  healing: [
    'meditation',
    'yoga',
    'reiki',
    'acupuncture',
    'crystal-healing',
    'sound-therapy',
    'aromatherapy'
  ],
  verification: [
    'verified-badge',
    'trust-score',
    'community-verified',
    'scientific-validated',
    'certification'
  ],
  interface: [
    'search',
    'filter',
    'calendar',
    'location',
    'star-rating',
    'heart',
    'share'
  ]
};
```

### 8.2 Icon Sizes
```css
:root {
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-md: 20px;
  --icon-lg: 24px;
  --icon-xl: 32px;
  --icon-2xl: 48px;
  --icon-3xl: 64px;
}
```

---

## 9. APP STORE ASSETS

### 9.1 App Store URLs
```javascript
const APP_STORE_LINKS = {
  ios: {
    seeker: 'https://apps.apple.com/app/klear-karma-seeker',
    practitioner: 'https://apps.apple.com/app/klear-karma-practitioner'
  },
  android: {
    seeker: 'https://play.google.com/store/apps/details?id=com.klearkarma.seeker',
    practitioner: 'https://play.google.com/store/apps/details?id=com.klearkarma.practitioner'
  }
};
```

### 9.2 App Store Badge Assets
```javascript
const APP_STORE_BADGES = {
  apple: {
    url: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',
    alt: 'Download on the App Store',
    width: 135,
    height: 40
  },
  google: {
    url: 'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png',
    alt: 'Get it on Google Play',
    width: 155,
    height: 60
  }
};
```

---

## 10. PERFORMANCE CONSTANTS

### 10.1 Loading States
```javascript
const LOADING_STATES = {
  skeleton: {
    duration: '1.5s',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%'
  },
  spinner: {
    size: {
      sm: '16px',
      md: '24px',
      lg: '32px'
    },
    color: 'var(--chakra-heart)'
  }
};
```

### 10.2 Performance Thresholds
```javascript
const PERFORMANCE_THRESHOLDS = {
  pageLoad: 3000,        // 3 seconds
  apiResponse: 500,      // 500ms
  imageLoad: 2000,       // 2 seconds
  animationFrame: 16.67, // 60fps
  bundleSize: 250000     // 250KB
};
```

---

## 11. ACCESSIBILITY CONSTANTS

### 11.1 ARIA Labels
```javascript
const ARIA_LABELS = {
  navigation: {
    main: 'Main navigation',
    breadcrumb: 'Breadcrumb navigation',
    pagination: 'Pagination navigation'
  },
  buttons: {
    close: 'Close dialog',
    menu: 'Open menu',
    search: 'Search practitioners',
    filter: 'Filter results'
  },
  forms: {
    required: 'Required field',
    optional: 'Optional field',
    error: 'Field has error',
    success: 'Field is valid'
  }
};
```

### 11.2 Focus Management
```css
:root {
  --focus-ring-width: 2px;
  --focus-ring-color: var(--focus-ring);
  --focus-ring-offset: 2px;
}

.focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

---

## 12. API CONSTANTS

### 12.1 Endpoints
```javascript
const API_ENDPOINTS = {
  base: 'https://api.klearkarma.com/v1',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    refresh: '/auth/refresh',
    logout: '/auth/logout'
  },
  practitioners: {
    search: '/practitioners/search',
    profile: '/practitioners/:id',
    verify: '/practitioners/:id/verify',
    reviews: '/practitioners/:id/reviews'
  },
  bookings: {
    create: '/bookings',
    list: '/bookings',
    details: '/bookings/:id',
    cancel: '/bookings/:id/cancel'
  },
  payments: {
    process: '/payments/process',
    refund: '/payments/:id/refund',
    history: '/payments/history'
  }
};
```

### 12.2 HTTP Status Codes
```javascript
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};
```

---

## 13. VALIDATION CONSTANTS

### 13.1 Form Validation
```javascript
const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  phone: {
    pattern: /^[+]?[1-9]?[0-9]{7,15}$/,
    message: 'Please enter a valid phone number'
  },
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character'
  },
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name must contain only letters and spaces'
  }
};
```

---

## 14. BUSINESS CONSTANTS

### 14.1 Pricing
```javascript
const PRICING = {
  commission: {
    standard: 0.25,      // 25%
    premium: 0.30        // 30%
  },
  membership: {
    seeker: 1000,        // ₹1,000/month
    practitioner: 5000   // ₹5,000/month
  },
  certification: {
    basic: 25000,        // ₹25,000
    advanced: 50000      // ₹50,000
  },
  giveback: 0.20         // 20% for research
};
```

### 14.2 Limits
```javascript
const LIMITS = {
  search: {
    results: 50,
    radius: 100          // km
  },
  reviews: {
    maxLength: 500,
    minRating: 1,
    maxRating: 5
  },
  upload: {
    imageSize: 5242880,  // 5MB
    videoSize: 52428800, // 50MB
    allowedTypes: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov']
  }
};
```

---

## 15. USAGE GUIDELINES

### 15.1 Implementation Notes
```javascript
// Usage in React/Next.js components
const Button = ({ variant = 'primary', children, ...props }) => {
  const baseClasses = 'btn-base';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Usage in CSS-in-JS
const cardStyles = {
  background: 'var(--bg-glass)',
  backdropFilter: 'blur(20px)',
  border: '1px solid var(--border-primary)',
  borderRadius: 'var(--radius-xl)',
  padding: 'var(--space-6)'
};
```

### 15.2 Best Practices
```javascript
const BEST_PRACTICES = {
  colors: {
    do: "Use CSS custom properties for consistency",
    dont: "Hardcode color values in components"
  },
  spacing: {
    do: "Use the spacing scale for all margins and padding",
    dont: "Use arbitrary spacing values"
  },
  typography: {
    do: "Use semantic heading levels (h1, h2, h3)",
    dont: "Choose headings based on visual appearance alone"
  },
  animations: {
    do: "Respect user's motion preferences",
    dont: "Overuse animations or make them too fast"
  }
};
```

---

*This constants file serves as the single source of truth for all design tokens, configuration values, and technical constants used throughout the Klear Karma platform. All values should be referenced from this file to ensure consistency and maintainability.*