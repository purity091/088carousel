import React, { forwardRef } from 'react';
import { Slide, ThemeConfig } from '../types';
import { IconDisplay } from './IconDisplay';

interface CanvasProps {
  slide: Slide;
  theme: ThemeConfig;
  logoUrl: string | null;
  totalSlides: number;
  currentIndex: number;
  customCSS: string;
  scale?: number;
}

export const Canvas = forwardRef<HTMLDivElement, CanvasProps>(({
  slide,
  theme,
  logoUrl,
  totalSlides,
  currentIndex,
  customCSS,
  scale = 1
}, ref) => {

  // Inline styles for dynamic theming
  const containerStyle: React.CSSProperties = {
    backgroundColor: theme.backgroundColor,
    backgroundImage: theme.gradient || 'none',
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    transform: `scale(${scale})`,
    transformOrigin: 'top center',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.cardBackground,
    borderColor: theme.accentColor,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
  };

  return (
    <div className="canvas-wrapper">
      {/* CSS Injection */}
      <style>{customCSS}</style>

      <div
        ref={ref}
        id="canvas-node"
        className="slide-container"
        style={containerStyle}
      >
        {/* ===== HERO IMAGE SECTION (Full-Bleed Top) ===== */}
        <div className="hero-section">
          {/* The Main Image — Full Width, No Padding */}
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="hero-image"
            crossOrigin="anonymous"
          />

          {/* Gradient Overlay: fades image into the background color */}
          <div
            className="hero-gradient-overlay"
            style={{
              background: `linear-gradient(to bottom, transparent 30%, ${theme.backgroundColor} 100%)`
            }}
          />

          {/* Subtle vignette for depth */}
          <div className="hero-vignette" />

          {/* Decorative dot pattern overlay on image */}
          <div
            className="hero-pattern"
            style={{
              backgroundImage: `radial-gradient(${theme.accentColor} 0.8px, transparent 0.8px)`,
              backgroundSize: '24px 24px',
              opacity: theme.patternOpacity || 0.08
            }}
          />

          {/* Top-Left Accent Corner */}
          <div
            className="hero-accent-corner hero-accent-tl"
            style={{ borderColor: theme.accentColor }}
          />

          {/* Top-Right Accent Corner */}
          <div
            className="hero-accent-corner hero-accent-tr"
            style={{ borderColor: theme.accentColor }}
          />

          {/* Logo Overlay (on the image) */}
          {logoUrl && (
            <div className="hero-logo">
              <img src={logoUrl} alt="Logo" className="hero-logo-img" />
            </div>
          )}

          {/* Accent Glow */}
          <div
            className="hero-glow"
            style={{ backgroundColor: theme.accentColor }}
          />
        </div>

        {/* ===== FLOATING ICON (Bridge between image and text) ===== */}
        <div className="hero-icon-bridge">
          <div
            className="floating-icon"
            style={{ ...cardStyle, borderColor: theme.backgroundColor }}
          >
            <IconDisplay name={slide.iconName} className="w-8 h-8" color={theme.accentColor} />
          </div>
        </div>

        {/* ===== TEXT CONTENT SECTION ===== */}
        <div className="content-section">
          <h2
            className="slide-title"
            style={{ color: theme.textColor }}
          >
            {slide.title}
          </h2>

          {/* Accent line under title */}
          <div
            className="title-accent-line"
            style={{ backgroundColor: theme.accentColor }}
          />

          <p
            className="slide-description"
            style={{ color: theme.textColor }}
          >
            {slide.description}
          </p>
        </div>

        {/* ===== FOOTER: Carousel Indicators + Premium Brand Bar ===== */}
        <div className="footer-container">

          {/* Dots */}
          <div className="indicator-dots">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <div
                key={idx}
                className={`indicator-dot ${idx === currentIndex ? 'w-8' : 'w-2'}`}
                style={{
                  height: '8px',
                  backgroundColor: idx === currentIndex ? theme.accentColor : theme.textColor,
                  opacity: idx === currentIndex ? 1 : 0.3
                }}
              />
            ))}
          </div>

          {/* ── Premium Brand Footer Bar ── */}
          <div
            className="brand-footer-bar"
            style={{
              borderTopColor: theme.accentColor,
              backgroundColor: `${theme.backgroundColor}cc`,
            }}
          >
            {/* Right Side: Platform Name */}
            <span
              className="brand-footer-ar"
              style={{ color: theme.textColor }}
            >
              منصة المستثمر الاقتصادية
            </span>

            {/* Decorative line */}
            <div
              className="brand-footer-side-line"
              style={{ backgroundColor: theme.accentColor }}
            />

            {/* Diamond Separator */}
            <div className="brand-footer-diamond-wrap">
              <div
                className="brand-footer-diamond"
                style={{ backgroundColor: theme.accentColor }}
              />
            </div>

            {/* Decorative line */}
            <div
              className="brand-footer-side-line"
              style={{ backgroundColor: theme.accentColor }}
            />

            {/* Left Side: Website */}
            <span
              className="brand-footer-en"
              style={{ color: theme.textColor }}
            >
              al-investor.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

Canvas.displayName = 'Canvas';