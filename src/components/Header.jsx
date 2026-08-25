import React, { useState } from "react";
import { ShoppingBag, Phone, Mail, Menu as MenuIcon, X } from "lucide-react";

export default function Header({ cartCount, cartTotal, onCartClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="cyber-header">
      {/* Top Banner - Contact Info */}
      <div className="header-top-bar">
        <div className="top-bar-content container">
          <div className="contact-links">
            <a href="https://api.whatsapp.com/send?phone=923280790704" target="_blank" rel="noopener noreferrer" className="contact-item">
              <Phone size={14} className="neon-text-cyan" />
              <span>+92 328 0790704</span>
            </a>
            <a href="mailto:khokharyasir749@gmail.com?subject=BiteHub%20Order%20%2F%20Inquiry" className="contact-item">
              <Mail size={14} className="neon-text-pink" />
              <span>khokharyasir749@gmail.com</span>
            </a>
          </div>
          <div className="top-bar-msg">
            <span>🚀 Zero-Gravity Delivery In Under 30 Earth Minutes!</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="header-main-nav">
        <div className="nav-container container">
          {/* Logo */}
          <div className="logo-container" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="logo-text">
              BITE<span className="logo-neon-accent">HUB</span>
            </span>
            <div className="logo-glow-line"></div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-link">
              Base
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="nav-link">
              Menu Grid
            </button>
            <button onClick={() => scrollToSection("about-section")} className="nav-link">
              Sector Info
            </button>
            <button onClick={() => scrollToSection("contact-section")} className="nav-link">
              Transmit Comms
            </button>
          </nav>

          {/* Cart & Menu Actions */}
          <div className="nav-actions">
            {/* Floating anti-gravity cart button */}
            <button onClick={onCartClick} className="cart-trigger-btn float-animation">
              <ShoppingBag size={20} className="cart-icon-neon" />
              <span className="cart-badge">{cartCount}</span>
              <span className="cart-price-peek">Rs. {Math.round(cartTotal).toLocaleString()}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay fade-in">
          <nav className="mobile-nav-links">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
              className="mobile-nav-link"
            >
              Base Station
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="mobile-nav-link">
              Interstellar Menu
            </button>
            <button onClick={() => scrollToSection("about-section")} className="mobile-nav-link">
              Core Mission (About)
            </button>
            <button onClick={() => scrollToSection("contact-section")} className="mobile-nav-link">
              Transmit Comms (Contact)
            </button>

            <div className="mobile-contact-info">
              <p className="neon-text-cyan font-tech">SECURE HOTLINE</p>
              <a href="https://api.whatsapp.com/send?phone=923280790704" target="_blank" rel="noopener noreferrer" className="mobile-contact-item">
                <Phone size={16} /> +92 328 0790704
              </a>
              <a href="mailto:khokharyasir749@gmail.com?subject=BiteHub%20Order%20%2F%20Inquiry" className="mobile-contact-item">
                <Mail size={16} /> khokharyasir749@gmail.com
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
