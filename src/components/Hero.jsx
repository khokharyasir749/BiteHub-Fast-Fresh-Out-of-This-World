import React from "react";
import { ArrowRight, Flame, ShieldAlert, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="cyber-hero">
      <div className="hero-container container">
        {/* Left Side: Content */}
        <div className="hero-content">
          <div className="cyber-badge-glow">
            <Sparkles size={14} className="neon-text-yellow animate-spin-slow" />
            <span>ESTABLISHED NEON SECTOR 2026</span>
          </div>

          <h1 className="hero-title">
            Bite<span className="text-glow-cyan">Hub</span>
            <br />
            <span className="hero-subtitle-glow text-glow-pink">
              Fast, Fresh &amp; Out of This World
            </span>
          </h1>

          <p className="hero-description">
            Defy the laws of taste physics with our zero-gravity fast food selections. Crafted in neon-lit cyber kitchens and teleported directly to your coordination node.
          </p>

          <div className="hero-features">
            <div className="hero-feature-item">
              <div className="feature-icon-wrapper cyan-glow">
                <Flame size={18} className="neon-text-cyan" />
              </div>
              <div>
                <h4>Hyper-Drive Heat</h4>
                <p>Lasers keep food hot at 240°C until delivery.</p>
              </div>
            </div>
            <div className="hero-feature-item">
              <div className="feature-icon-wrapper pink-glow">
                <ShieldAlert size={18} className="neon-text-pink" />
              </div>
              <div>
                <h4>Zero-G Safe</h4>
                <p>Spill-proof magnetic packaging technology.</p>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <button onClick={scrollToMenu} className="btn-neon-pink float-animation">
              <span>INITIALIZE ORDER SEQUENCE</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={() => {
              const element = document.getElementById("about-section");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }} className="btn-cyber-outline">
              <span>SECTOR PROTOCOLS</span>
            </button>
          </div>
        </div>

        {/* Right Side: Floating Anti-Gravity Visuals */}
        <div className="hero-visual">
          <div className="hero-image-orbit-container">
            {/* Holographic grid ring backing */}
            <div className="hologram-grid-circle"></div>

            {/* Glowing floating main food item (Anti-gravity floating) */}
            <div className="floating-hero-burger float-animation-large">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80"
                alt="Cyber Gravity Smash Burger"
                className="hero-main-img"
              />
              <div className="floating-tag tag-top-left float-animation-reverse">
                <span className="tag-pulse-cyan">⚡ Anti-Gravity Melt</span>
              </div>
              <div className="floating-tag tag-bottom-right float-animation-medium">
                <span className="tag-pulse-pink">🔥 100% Angus Cyber-Beef</span>
              </div>
            </div>

            {/* Floating side satellite food elements (fries and beverage) */}
            <div className="satellite-food sat-1 float-animation-medium">
              <img
                src="https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80"
                alt="Graviti Loaded Fries"
              />
            </div>
            <div className="satellite-food sat-2 float-animation-slow">
              <img
                src="https://images.unsplash.com/photo-1553787499-6f9133860278?w=800&auto=format&fit=crop&q=80"
                alt="Nebula Berry Shake"
              />
            </div>

            {/* Orbit lines */}
            <div className="orbit-ring ring-1"></div>
            <div className="orbit-ring ring-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
