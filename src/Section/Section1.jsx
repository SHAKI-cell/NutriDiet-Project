import React from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import './Section1.css'

const Section1 = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Background image */}
      <img src={heroImg} alt="Healthy food background" className="hero-bg" />

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        {/* Eyebrow badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          <span className="hero-badge-text">Your Health, Your Way</span>
        </div>

        {/* Heading */}
        <h1 className="hero-heading">
          Eat Smart, Live{' '}
          <span className="highlight">Better</span> Every Day.
        </h1>

        {/* Subtext */}
        <p className="hero-subtext">
          Discover personalized diet plans, explore detailed food nutrition facts,
          and take control of your wellness journey with NutriGuide — your
          all-in-one nutrition companion.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-row">
          <Link to="/login" className="hero-btn-primary">
            Get Started
            <svg viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          <Link to="/about" className="hero-btn-secondary">
            About Us
            <svg viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-number">500+</span>
            <span className="hero-stat-label">Diet Plans</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">10K+</span>
            <span className="hero-stat-label">Food Items</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-number">50K+</span>
            <span className="hero-stat-label">Happy Users</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section1
