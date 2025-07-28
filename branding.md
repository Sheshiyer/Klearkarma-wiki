# KLEAR KARMA DESIGN CONSTANTS

## Brand Identity

### Core Positioning

- **Tagline**: "Clarity is the Cure"
- **App Positioning**: "The Alignment App"
- **Mission**: Community-verified healing platform connecting seekers with authentic practitioners

### Brand Values

- **Trust**: Community verification and authentic practitioner validation
- **Clarity**: Clear, transparent healing journey tracking
- **Alignment**: Spiritual and energetic balance through proper practitioner matching
- **Transformation**: Life-changing healing experiences

## Visual Design System

### Color Palette - Chakra-Based

#### Primary Chakra Colors (Brand Aligned)

```css
--chakra-root: 0 65% 55%;        /* Root Chakra - Deep Red/Coral */
--chakra-sacral: 15 70% 60%;     /* Sacral Chakra - Warm Orange */
--chakra-solar: 45 75% 65%;      /* Solar Plexus - Golden Yellow */
--chakra-heart: 150 45% 55%;     /* Heart Chakra - Balanced Green */
--chakra-throat: 200 60% 65%;    /* Throat Chakra - Clear Blue */
--chakra-third-eye: 260 70% 60%; /* Third Eye - Deep Indigo */
--chakra-crown: 280 75% 65%;     /* Crown Chakra - Mystical Purple */
```

#### Gradient Combinations

- **Healing Gradient**: Heart → Crown → Solar (135deg)
- **Trust Gradient**: Throat → Third Eye (135deg)
- **Transformation Gradient**: Root → Sacral → Heart (135deg)
- **Mystical Gradient**: Crown → Third Eye → Throat (135deg)

#### Background System

- **Primary**: Dark (#0a0a0a) - Deep space for spiritual focus
- **Secondary**: Charcoal (#1a1a1a) - Card backgrounds
- **Glass**: White 5% opacity - Glassmorphism effect
- **Textured**: Subtle noise and grain overlays

### Typography

#### Font Families

- **Primary**: Inter - Clean, readable body text
- **Display**: Poppins - Headings and brand elements

#### Scale

- **Hero**: 4rem+ (64px+) - Main landing headlines
- **Section Title**: 2.5rem (40px) - Section headings
- **Large**: 1.25rem (20px) - Subheadings and important text
- **Body**: 1rem (16px) - Standard text
- **Small**: 0.875rem (14px) - Captions and metadata

### Iconography

#### Core Icons (Lucide React)

- **Sparkles**: Magic, transformation, energy
- **Heart**: Love, healing, connection
- **Shield**: Trust, verification, safety
- **Users**: Community, connection
- **Brain**: AI, intelligence, matching
- **Smartphone**: Mobile apps, accessibility
- **Award**: Certification, excellence
- **Globe**: Global reach, worldwide healing

#### Chakra Symbols

- **Root**: Grounding, stability (Red/Rose)
- **Sacral**: Creativity, emotion (Orange/Peach)
- **Solar**: Power, confidence (Yellow/Cream)
- **Heart**: Love, compassion (Green/Sage)
- **Throat**: Communication, truth (Blue/Sky)
- **Third Eye**: Intuition, wisdom (Indigo/Lavender)
- **Crown**: Spirituality, connection (Violet/Purple)

### Animation System

#### Core Animations

- **Float**: Gentle vertical movement (6s ease-in-out infinite)
- **Pulse**: Breathing effect for energy elements
- **Chakra Flow**: Circular energy movement
- **Energy Pulse**: Radiating energy from center
- **Spiral Flow**: Spiral energy patterns
- **Gradient Shift**: Color transitions (8s ease infinite)

#### Hover Effects

- **Lift**: Subtle elevation (-8px translateY, 1.02 scale)
- **Glow**: Chakra-colored shadow effects
- **Reveal**: Sliding light reveal effect
- **Scale**: Gentle scaling (1.05-1.1)
- **Border Glow**: Animated border illumination

### Component Patterns

#### Cards

- **Glass Morphism**: Backdrop blur with subtle transparency
- **Gradient Borders**: Chakra-colored animated borders
- **Hover States**: Multi-layered interaction feedback
- **Energy Overlays**: Subtle chakra energy patterns

#### Progress Indicators

- **87% Match Accuracy**: Key metric for AI matching
- **Circular Progress**: Orb-like completion indicators
- **Energy Bars**: Chakra-colored progress visualization
- **Animated Counters**: Real-time data visualization

#### Interactive Elements

- **Primary Buttons**: Gradient backgrounds with hover glow
- **Secondary Buttons**: Glass effect with border highlights
- **Navigation**: Smooth transitions with energy trails
- **Form Elements**: Chakra-themed focus states

### Layout System

#### Grid Structure

- **Mobile First**: Responsive design starting from 320px
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px)
- **Container**: Max-width 7xl (1280px) with centered alignment
- **Spacing**: 4px base grid system

#### Section Layout

- **Hero**: Full viewport with energy background
- **Features**: 3-column grid on desktop, stacked on mobile
- **Testimonials**: Carousel with smooth transitions
- **Apps**: Side-by-side showcase with device mockups

### Content Strategy

#### Key Messaging

- **Trust**: "Community-verified healing platform"
- **Technology**: "AI-powered practitioner matching"
- **Authenticity**: "Verified healing practitioners"
- **Transformation**: "Clear your karma, transform your life"

#### Call-to-Actions

- **Primary**: "Download Seeker App"
- **Secondary**: "Join as Healer"
- **Tertiary**: "Start Your Journey"

#### Social Proof Elements

- **87% Match Accuracy**: AI algorithm effectiveness
- **Community Stories**: Transformation testimonials
- **Practitioner Spotlights**: Verified healer profiles
- **Global Impact**: Worldwide healing network

### Mobile App Design

#### Seeker App Theme

- **Primary Color**: Heart Chakra (Soft Sage)
- **Accent**: Crown Chakra (Soft Violet)
- **Background**: Healing gradient with lotus motifs
- **Icon**: Heart symbol with energy radiations

#### Practitioner App Theme

- **Primary Color**: Third Eye Chakra (Soft Lavender)
- **Accent**: Throat Chakra (Soft Sky)
- **Background**: Trust gradient with mandala patterns
- **Icon**: Sparkles symbol with wisdom elements

### Accessibility Standards

#### Color Contrast

- **Text on Dark**: Minimum 4.5:1 ratio
- **Interactive Elements**: Clear focus indicators
- **Chakra Colors**: Sufficient contrast for readability

#### Motion

- **Reduced Motion**: Respect user preferences
- **Animation Duration**: 0.3-0.8s for interactions
- **Easing**: Cubic-bezier for natural movement

#### Navigation

- **Keyboard Support**: Full keyboard navigation
- **Screen Readers**: Semantic HTML structure
- **Touch Targets**: Minimum 44px touch areas

### Performance Guidelines

#### Image Optimization

- **Format**: WebP with fallbacks
- **Compression**: Balanced quality/size ratio
- **Lazy Loading**: Progressive image loading

#### Animation Performance

- **GPU Acceleration**: Transform and opacity only
- **Frame Rate**: 60fps target
- **Reduced Complexity**: Simplified animations on mobile

#### Bundle Size

- **Code Splitting**: Route-based chunks
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli compression

## Implementation Notes

### Current Status

- ✅ Chakra color system implemented
- ✅ Glass morphism design established
- ✅ Hover effects and animations active
- ✅ Mobile-responsive layout
- 🔄 87% progress indicator needs orb animation
- 🔄 App mockups need final polish
- 🔄 Energy flow animations need refinement

### Next Priorities

1. Complete 87% match accuracy visualization with animated orb
2. Enhance app mockup designs with chakra themes
3. Add micro-interactions for better engagement
4. Implement progressive disclosure patterns
5. Add real-time data visualization

### Technical Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Components**: Shadcn/ui with custom theming
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind
- **Build**: Vite for fast development

---

*This document serves as the single source of truth for all design decisions in the Klear Karma project. All visual elements, interactions, and brand expressions should align with these constants.*
