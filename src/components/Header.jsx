import React, { useState } from "react";
import { ShoppingBag, Phone, Mail, Menu as MenuIcon, X, Share2 } from "lucide-react";

export default function Header({ cartCount, cartTotal, onCartClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "BiteHub - Fast, Fresh & Out of This World",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2000);
    }
  };

  return (
    <header className="cyber-header">
      {/* Top Banner - Hotline & Logistics */}
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

      {/* Main Navbar styled in Image 2's clean aesthetic */}
      <div className="header-main-nav">
        <div className="nav-container container">
          {/* Circular Stamp Logo (Exact style as Image 2!) */}
          <div
            className="brand-circle-stamp"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="BiteHub Base"
          >
            <div className="stamp-ring">
              <svg className="stamp-burger-art" viewBox="0 0 40 40" fill="none" stroke="currentColor">
                {/* Burger Top Bun */}
                <path d="M8 18C8 12.5 13.5 8 20 8C26.5 8 32 12.5 32 18H8Z" strokeWidth="1.8" strokeLinecap="round" />
                {/* Sesame Seeds */}
                <circle cx="16" cy="12" r="0.75" fill="currentColor" />
                <circle cx="21" cy="11" r="0.75" fill="currentColor" />
                <circle cx="25" cy="13" r="0.75" fill="currentColor" />
                {/* Lettuce wavy layer */}
                <path d="M7 21C8.5 20 10.5 22 12 21C13.5 20 15.5 22 17 21C18.5 20 20.5 22 22 21C23.5 20 25.5 22 27 21C28.5 20 30.5 22 33 21" strokeWidth="1.6" strokeLinecap="round" />
                {/* Patty & Cheese */}
                <path d="M9 25H31" strokeWidth="2.2" strokeLinecap="round" />
                {/* Bottom Bun */}
                <path d="M10 28C10 30.5 14 32 20 32C26 32 30 30.5 30 28H10Z" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <div className="stamp-brand-name">BITEHUB</div>
            </div>
          </div>

          {/* Clean Editorial Navigation (As in Image 2: HOME · BURGERS · SNACKS · DRINKS · CONTACTS) */}
          <nav className="desktop-nav editorial-nav-links">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-link">
              HOME
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="nav-link">
              BURGERS
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="nav-link">
              SNACKS
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="nav-link">
              DRINKS
            </button>
            <button onClick={() => scrollToSection("contact-section")} className="nav-link">
              CONTACTS
            </button>
          </nav>

          {/* Actions: Share, Cart and Mobile Toggle */}
          <div className="nav-actions">
            {/* Share Button as in Image 2 */}
            <button
              onClick={handleShare}
              className="share-trigger-btn"
              title="Share BiteHub"
              aria-label="Share"
            >
              <Share2 size={18} />
              {sharedToast && <span className="share-toast">Link Copied!</span>}
            </button>

            {/* Cart Button */}
            <button onClick={onCartClick} className="cart-trigger-btn" id="header-cart-btn">
              <ShoppingBag size={18} className="cart-icon-neon" />
              <span className="cart-badge">{cartCount}</span>
              <span className="cart-price-peek">Rs. {Math.round(cartTotal).toLocaleString()}</span>
            </button>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
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
              HOME
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="mobile-nav-link">
              BURGERS
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="mobile-nav-link">
              SNACKS &amp; FRIES
            </button>
            <button onClick={() => scrollToSection("menu-section")} className="mobile-nav-link">
              DRINKS &amp; SHAKES
            </button>
            <button onClick={() => scrollToSection("about-section")} className="mobile-nav-link">
              SECTOR INFO
            </button>
            <button onClick={() => scrollToSection("contact-section")} className="mobile-nav-link">
              CONTACTS
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
