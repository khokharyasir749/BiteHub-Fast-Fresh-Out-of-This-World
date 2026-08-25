import React, { useEffect, useState } from "react";

export default function GravityBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate a set of static/animating particles on mount
    const newParticles = Array.from({ length: 40 }).map((_, i) => {
      const size = Math.random() * 6 + 2; // size in px
      const duration = Math.random() * 20 + 15; // duration in seconds
      const delay = Math.random() * -20; // negative delay so they start immediately at random points
      const left = Math.random() * 100; // left position %
      const glowColor = Math.random() > 0.5 ? "rgba(0, 243, 255, 0.6)" : "rgba(255, 0, 127, 0.6)";

      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          background: glowColor,
          boxShadow: `0 0 ${size * 2}px ${glowColor}`,
          position: "absolute",
          borderRadius: "50%",
          bottom: "-20px",
          pointerEvents: "none",
          zIndex: 0,
        },
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="cyber-bg-container">
      {/* Perspective Cyber Grid */}
      <div className="cyber-grid"></div>

      {/* Glow Orbs in Corners */}
      <div className="neon-glow-orb orb-cyan"></div>
      <div className="neon-glow-orb orb-pink"></div>
      <div className="neon-glow-orb orb-yellow"></div>

      {/* Scanning Laser Line */}
      <div className="cyber-scanner"></div>

      {/* Floating Gravity Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="gravity-particle"
          style={particle.style}
        />
      ))}
    </div>
  );
}
