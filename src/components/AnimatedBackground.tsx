'use client';

export default function AnimatedBackground() {
  return (
    <>
      {/* Optimized CSS-only Background */}
      <div className="chakra-background" />
      
      {/* Minimal Floating Elements */}
      <div className="floating-particles">
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
      </div>
    </>
  );
}