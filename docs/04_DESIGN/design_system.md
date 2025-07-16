# Klear Karma Design System

## Overview

The Klear Karma Design System is a comprehensive collection of reusable components, design tokens, and guidelines that ensure consistency, accessibility, and scalability across all digital touchpoints.

**Philosophy:** *Mindful design that promotes wellness, clarity, and connection.*

---

## Design Principles

### 1. Mindful Simplicity
- **Clean, uncluttered interfaces** that reduce cognitive load
- **Purposeful white space** that allows content to breathe
- **Intuitive navigation** that feels natural and effortless

### 2. Wellness-Centered
- **Calming color palettes** inspired by nature
- **Gentle animations** that feel organic and soothing
- **Accessible design** that accommodates all users

### 3. Authentic Connection
- **Human-centered imagery** that showcases real practitioners and clients
- **Warm, approachable typography** that builds trust
- **Consistent voice and tone** that reflects our values

### 4. Adaptive Flexibility
- **Responsive design** that works seamlessly across devices
- **Scalable components** that grow with our platform
- **Cultural sensitivity** that respects diverse healing traditions

---

## Color System

### Primary Palette

```css
/* Primary Colors */
--color-primary-50: #f0f9ff;
--color-primary-100: #e0f2fe;
--color-primary-200: #bae6fd;
--color-primary-300: #7dd3fc;
--color-primary-400: #38bdf8;
--color-primary-500: #0ea5e9; /* Primary */
--color-primary-600: #0284c7;
--color-primary-700: #0369a1;
--color-primary-800: #075985;
--color-primary-900: #0c4a6e;
--color-primary-950: #082f49;
```

### Secondary Palette

```css
/* Secondary Colors - Sage Green */
--color-secondary-50: #f6f7f6;
--color-secondary-100: #e3e8e3;
--color-secondary-200: #c7d2c7;
--color-secondary-300: #a3b5a3;
--color-secondary-400: #7a947a;
--color-secondary-500: #5a7a5a; /* Secondary */
--color-secondary-600: #4a6b4a;
--color-secondary-700: #3d573d;
--color-secondary-800: #334733;
--color-secondary-900: #2b3c2b;
--color-secondary-950: #1a241a;
```

### Accent Palette

```css
/* Accent Colors - Warm Coral */
--color-accent-50: #fef7f7;
--color-accent-100: #feecec;
--color-accent-200: #fdd4d4;
--color-accent-300: #fbb5b5;
--color-accent-400: #f78a8a;
--color-accent-500: #ef5a5a; /* Accent */
--color-accent-600: #dc3a3a;
--color-accent-700: #b92d2d;
--color-accent-800: #9a2828;
--color-accent-900: #802727;
--color-accent-950: #461111;
```

### Neutral Palette

```css
/* Neutral Colors */
--color-neutral-50: #fafafa;
--color-neutral-100: #f5f5f5;
--color-neutral-200: #e5e5e5;
--color-neutral-300: #d4d4d4;
--color-neutral-400: #a3a3a3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0a0a0a;
```

### Semantic Colors

```css
/* Success */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-600: #16a34a;

/* Warning */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-600: #d97706;

/* Error */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-600: #dc2626;

/* Info */
--color-info-50: #eff6ff;
--color-info-500: #3b82f6;
--color-info-600: #2563eb;
```

### Usage Guidelines

- **Primary Blue**: Main CTAs, links, active states
- **Secondary Sage**: Supporting elements, secondary actions
- **Accent Coral**: Highlights, notifications, special offers
- **Neutrals**: Text, backgrounds, borders
- **Semantics**: Status indicators, alerts, feedback

---

## Typography

### Font Families

```css
/* Primary Font - Inter */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Secondary Font - Crimson Pro */
--font-secondary: 'Crimson Pro', Georgia, 'Times New Roman', serif;

/* Monospace Font */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### Type Scale

```css
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
```

### Typography Styles

```css
/* Headings */
.heading-1 {
  font-family: var(--font-primary);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-2 {
  font-family: var(--font-primary);
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-3 {
  font-family: var(--font-primary);
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

.heading-4 {
  font-family: var(--font-primary);
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-snug);
}

/* Body Text */
.body-large {
  font-family: var(--font-primary);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.body-base {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.body-small {
  font-family: var(--font-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

/* Special Text */
.text-quote {
  font-family: var(--font-secondary);
  font-size: var(--text-xl);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
  font-style: italic;
}

.text-caption {
  font-family: var(--font-primary);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## Spacing System

### Spacing Scale

```css
/* Spacing Scale (based on 4px grid) */
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
--space-24: 6rem;    /* 96px */
--space-32: 8rem;    /* 128px */
--space-40: 10rem;   /* 160px */
--space-48: 12rem;   /* 192px */
--space-56: 14rem;   /* 224px */
--space-64: 16rem;   /* 256px */
```

### Layout Spacing

```css
/* Component Spacing */
--spacing-component-xs: var(--space-2);  /* 8px */
--spacing-component-sm: var(--space-3);  /* 12px */
--spacing-component-md: var(--space-4);  /* 16px */
--spacing-component-lg: var(--space-6);  /* 24px */
--spacing-component-xl: var(--space-8);  /* 32px */

/* Section Spacing */
--spacing-section-sm: var(--space-12);   /* 48px */
--spacing-section-md: var(--space-16);   /* 64px */
--spacing-section-lg: var(--space-24);   /* 96px */
--spacing-section-xl: var(--space-32);   /* 128px */

/* Container Spacing */
--spacing-container-sm: var(--space-4);  /* 16px */
--spacing-container-md: var(--space-6);  /* 24px */
--spacing-container-lg: var(--space-8);  /* 32px */
```

---

## Elevation & Shadows

### Shadow System

```css
/* Shadow Tokens */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

/* Colored Shadows */
--shadow-primary: 0 4px 14px 0 rgb(14 165 233 / 0.15);
--shadow-secondary: 0 4px 14px 0 rgb(90 122 90 / 0.15);
--shadow-accent: 0 4px 14px 0 rgb(239 90 90 / 0.15);
```

### Elevation Levels

```css
/* Elevation System */
.elevation-0 { box-shadow: none; }
.elevation-1 { box-shadow: var(--shadow-xs); }
.elevation-2 { box-shadow: var(--shadow-sm); }
.elevation-3 { box-shadow: var(--shadow-md); }
.elevation-4 { box-shadow: var(--shadow-lg); }
.elevation-5 { box-shadow: var(--shadow-xl); }
.elevation-6 { box-shadow: var(--shadow-2xl); }
```

---

## Border Radius

```css
/* Border Radius Scale */
--radius-none: 0;
--radius-sm: 0.125rem;   /* 2px */
--radius-base: 0.25rem;  /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Fully rounded */

/* Component Radius */
--radius-button: var(--radius-lg);
--radius-card: var(--radius-xl);
--radius-input: var(--radius-md);
--radius-modal: var(--radius-2xl);
```

---

## Animation & Motion

### Timing Functions

```css
/* Easing Functions */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-gentle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Duration Scale

```css
/* Animation Durations */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
--duration-slower: 500ms;
--duration-slowest: 750ms;
```

### Common Animations

```css
/* Fade Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Slide Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale Animations */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Gentle Pulse */
@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

### Motion Principles

1. **Purposeful**: Every animation should have a clear purpose
2. **Gentle**: Movements should feel calm and natural
3. **Responsive**: Animations should feel immediate and responsive
4. **Accessible**: Respect user preferences for reduced motion

```css
/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Component Library

### Button Components

#### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  color: white;
  background-color: var(--color-primary-500);
  border: 1px solid var(--color-primary-500);
  border-radius: var(--radius-button);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
  user-select: none;
}

.btn-primary:hover {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-primary:focus {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

#### Secondary Button
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  color: var(--color-primary-600);
  background-color: transparent;
  border: 1px solid var(--color-primary-300);
  border-radius: var(--radius-button);
  transition: all var(--duration-fast) var(--ease-out);
  cursor: pointer;
  user-select: none;
}

.btn-secondary:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-400);
  color: var(--color-primary-700);
}
```

#### Button Sizes
```css
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}

.btn-xl {
  padding: var(--space-5) var(--space-10);
  font-size: var(--text-xl);
}
```

### Card Components

#### Base Card
```css
.card {
  background-color: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-neutral-100);
}

.card-body {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--color-neutral-100);
  background-color: var(--color-neutral-50);
}
```

#### Practitioner Card
```css
.practitioner-card {
  position: relative;
  background: white;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.practitioner-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.practitioner-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.practitioner-card__content {
  padding: var(--space-6);
}

.practitioner-card__name {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-neutral-900);
  margin-bottom: var(--space-1);
}

.practitioner-card__title {
  font-size: var(--text-sm);
  color: var(--color-neutral-600);
  margin-bottom: var(--space-3);
}

.practitioner-card__rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.practitioner-card__specialties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.practitioner-card__price {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-primary-600);
}
```

### Form Components

#### Input Field
```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-neutral-900);
  background-color: white;
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-input);
  transition: all var(--duration-fast) var(--ease-out);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input:disabled {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-500);
  cursor: not-allowed;
}

.input--error {
  border-color: var(--color-error-500);
}

.input--error:focus {
  border-color: var(--color-error-500);
  box-shadow: 0 0 0 3px var(--color-error-100);
}
```

#### Form Group
```css
.form-group {
  margin-bottom: var(--space-6);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-neutral-700);
  margin-bottom: var(--space-2);
}

.form-help {
  font-size: var(--text-xs);
  color: var(--color-neutral-500);
  margin-top: var(--space-1);
}

.form-error {
  font-size: var(--text-xs);
  color: var(--color-error-600);
  margin-top: var(--space-1);
}
```

### Badge Components

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  line-height: var(--leading-none);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge--primary {
  color: var(--color-primary-700);
  background-color: var(--color-primary-100);
}

.badge--secondary {
  color: var(--color-secondary-700);
  background-color: var(--color-secondary-100);
}

.badge--success {
  color: var(--color-success-700);
  background-color: var(--color-success-100);
}

.badge--warning {
  color: var(--color-warning-700);
  background-color: var(--color-warning-100);
}

.badge--error {
  color: var(--color-error-700);
  background-color: var(--color-error-100);
}
```

---

## Iconography

### Icon System

**Primary Icon Library:** Heroicons (Outline & Solid)
**Secondary Icons:** Lucide React
**Custom Icons:** SVG-based wellness and healing symbols

#### Icon Sizes
```css
.icon-xs { width: 12px; height: 12px; }
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }
.icon-xl { width: 32px; height: 32px; }
.icon-2xl { width: 48px; height: 48px; }
```

#### Icon Categories

**Navigation Icons:**
- Home, Search, Profile, Settings
- Menu, Close, Back, Forward
- Filter, Sort, More

**Action Icons:**
- Add, Edit, Delete, Save
- Share, Download, Upload
- Like, Bookmark, Star

**Status Icons:**
- Check, Warning, Error, Info
- Loading, Success, Pending

**Wellness Icons:**
- Meditation, Yoga, Massage
- Heart, Lotus, Om, Chakra
- Nature, Peace, Balance

---

## Responsive Design

### Breakpoint System

```css
/* Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;

/* Media Queries */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Container System

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-container-sm);
  padding-right: var(--spacing-container-sm);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--spacing-container-md);
    padding-right: var(--spacing-container-md);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--spacing-container-lg);
    padding-right: var(--spacing-container-lg);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* Responsive Grid */
@media (min-width: 640px) {
  .sm\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 768px) {
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}
```

---

## Accessibility

### Focus Management

```css
/* Focus Styles */
.focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--color-primary-600);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### Color Contrast

- **AA Compliance**: Minimum 4.5:1 contrast ratio for normal text
- **AAA Compliance**: Minimum 7:1 contrast ratio for enhanced accessibility
- **Large Text**: Minimum 3:1 contrast ratio for text 18pt+ or 14pt+ bold

### Screen Reader Support

```css
/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### ARIA Patterns

- Use semantic HTML elements
- Provide descriptive labels and instructions
- Implement proper ARIA attributes
- Ensure keyboard navigation support
- Test with screen readers

---

## Implementation Guidelines

### CSS Custom Properties

Use CSS custom properties for all design tokens to enable easy theming and maintenance:

```css
:root {
  /* All design tokens defined here */
}

[data-theme="dark"] {
  /* Dark theme overrides */
  --color-neutral-50: #171717;
  --color-neutral-900: #fafafa;
}
```

### Component Architecture

1. **Atomic Design**: Build components from atoms → molecules → organisms
2. **BEM Methodology**: Use Block__Element--Modifier naming convention
3. **CSS Modules**: Scope styles to prevent conflicts
4. **Design Tokens**: Use tokens for all design decisions

### Performance Considerations

- **Critical CSS**: Inline critical styles for above-the-fold content
- **CSS Optimization**: Minimize and compress CSS files
- **Font Loading**: Use font-display: swap for web fonts
- **Image Optimization**: Use responsive images with proper formats

---

## Brand Guidelines

### Logo Usage

- **Primary Logo**: Full color on light backgrounds
- **Secondary Logo**: White version for dark backgrounds
- **Icon Mark**: Simplified version for small sizes
- **Clear Space**: Minimum clear space equals the height of the "K" in Klear

### Voice & Tone

- **Warm & Welcoming**: Friendly, approachable, inclusive
- **Knowledgeable**: Expert guidance without being intimidating
- **Mindful**: Thoughtful, present, intentional
- **Empowering**: Supportive, encouraging, uplifting

### Photography Style

- **Natural Lighting**: Soft, warm, natural light preferred
- **Authentic Moments**: Real people in genuine wellness practices
- **Diverse Representation**: Inclusive of all backgrounds and abilities
- **Calming Environments**: Peaceful, serene settings

---

*This design system serves as the foundation for creating consistent, accessible, and beautiful experiences across the Klear Karma platform. It should be treated as a living document that evolves with our product and user needs.*