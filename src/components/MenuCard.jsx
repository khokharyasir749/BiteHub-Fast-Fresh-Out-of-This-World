import React, { useState } from "react";
import { Star, Flame, Plus, Check, Sparkles } from "lucide-react";

export default function MenuCard({ item, onSelectFood, index = 0, viewMode = "grid" }) {
  const { name, price, description, rating, image, isPopular, spiceLevel, tags, category } = item;
  const [isRippling, setIsRippling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Category thematic color schemes
  const getTheme = () => {
    switch (category) {
      case "Pizzas":
        return {
          glow: "rgba(0, 243, 255, 0.45)",
          color: "#00f3ff",
          class: "theme-cyan",
          radialAura: "radial-gradient(circle, rgba(0, 243, 255, 0.45) 0%, rgba(0, 102, 255, 0.15) 50%, transparent 75%)",
          backlightGradient: "radial-gradient(ellipse at 50% 0%, rgba(0, 243, 255, 0.15) 0%, transparent 70%)",
          ringClass: "ring-cyan"
        };
      case "Burgers":
        return {
          glow: "rgba(255, 0, 127, 0.45)",
          color: "#ff007f",
          class: "theme-pink",
          radialAura: "radial-gradient(circle, rgba(255, 0, 127, 0.45) 0%, rgba(255, 85, 0, 0.2) 50%, transparent 75%)",
          backlightGradient: "radial-gradient(ellipse at 50% 0%, rgba(255, 0, 127, 0.15) 0%, transparent 70%)",
          ringClass: "ring-pink"
        };
      case "Loaded Fries & Starters":
        return {
          glow: "rgba(255, 170, 0, 0.45)",
          color: "#ffaa00",
          class: "theme-amber",
          radialAura: "radial-gradient(circle, rgba(255, 170, 0, 0.45) 0%, rgba(255, 221, 0, 0.2) 50%, transparent 75%)",
          backlightGradient: "radial-gradient(ellipse at 50% 0%, rgba(255, 170, 0, 0.15) 0%, transparent 70%)",
          ringClass: "ring-amber"
        };
      case "Intergalactic Beverages & Shakes":
      case "Desserts & Sweet Bites":
        return {
          glow: "rgba(185, 0, 255, 0.45)",
          color: "#b900ff",
          class: "theme-purple",
          radialAura: "radial-gradient(circle, rgba(185, 0, 255, 0.45) 0%, rgba(0, 243, 255, 0.15) 50%, transparent 75%)",
          backlightGradient: "radial-gradient(ellipse at 50% 0%, rgba(185, 0, 255, 0.15) 0%, transparent 70%)",
          ringClass: "ring-purple"
        };
      default:
        return {
          glow: "rgba(0, 243, 255, 0.45)",
          color: "#00f3ff",
          class: "theme-cyan",
          radialAura: "radial-gradient(circle, rgba(0, 243, 255, 0.45) 0%, rgba(0, 102, 255, 0.15) 50%, transparent 75%)",
          backlightGradient: "radial-gradient(ellipse at 50% 0%, rgba(0, 243, 255, 0.15) 0%, transparent 70%)",
          ringClass: "ring-cyan"
        };
    }
  };

  const theme = getTheme();

  // Extract punchy watermark keyword for background reveal
  const getWatermark = (str) => {
    if (!str) return "BITE";
    const words = str.trim().split(" ");
    return words.length > 2 ? words[words.length - 1].toUpperCase() : words[0].toUpperCase();
  };

  const watermarkText = getWatermark(name);

  // Add button click with ripple
  const handleAddClick = (e) => {
    e.stopPropagation();
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 700);
    onSelectFood(item);
  };

  return (
    <div
      className={`cyber-glass-card group relative flex flex-col justify-between min-h-[460px] rounded-[2.5rem] border border-white/5 p-6 overflow-visible transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-cyan-500/25 ${theme.class} ${
        isHovered ? "is-hovered" : ""
      }`}
      style={{
        animationDelay: `${Math.min(index * 0.06, 0.6)}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectFood(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectFood(item);
        }
      }}
      aria-label={`View and customize ${name}`}
    >
      {/* 1. Subtle Cyber Corner Brackets on Hover */}
      <span className="cyber-bracket cyber-bracket-tl" aria-hidden="true" />
      <span className="cyber-bracket cyber-bracket-tr" aria-hidden="true" />
      <span className="cyber-bracket cyber-bracket-bl" aria-hidden="true" />
      <span className="cyber-bracket cyber-bracket-br" aria-hidden="true" />

      {/* 2. Holographic Digital Mesh & Soft Gradient Backlight */}
      <div className="cyber-glass-mesh-bg" aria-hidden="true" />
      <div
        className="cyber-glass-ambient-backlight"
        style={{ background: theme.backlightGradient }}
        aria-hidden="true"
      />

      {/* 3. Ghost Typography Watermark Behind the Content */}
      <div className="cyber-card-ghost-watermark" aria-hidden="true">
        {watermarkText}
      </div>

      {/* 4. DYNAMIC FLOATING IMAGE POD & 3D PARALLAX OVERLAP */}
      <div className="w-52 h-52 mx-auto -mt-20 relative z-30 flex items-center justify-center cyber-floating-pod">
        {/* Floating Badges Resting Directly On Top of Orbital Space */}
        <div className="floating-pod-badge-bar">
          <span className="frosted-star-badge">
            <Star size={11} className="star-icon-gold" />
            <span>{rating ? rating.toFixed(1) : "4.9"}</span>
          </span>

          {isPopular && (
            <span className="status-capsule-badge">
              <Sparkles size={10} />
              <span>POPULAR</span>
            </span>
          )}
        </div>

        {/* Circular 3D Platform Aura & Spinning Holographic Orbital Laser Ring */}
        <div
          className="orbital-platform-aura"
          style={{ background: theme.radialAura }}
          aria-hidden="true"
        />
        <div className={`orbital-laser-ring ${theme.ringClass}`} aria-hidden="true" />
        <div className="orbital-secondary-ring" aria-hidden="true" />

        {/* Actual Breakout Dish Cutout Image */}
        <img
          src={image}
          alt={name}
          className="dish-breakout-img scale-[1.15] group-hover:scale-[1.3] group-hover:-translate-y-4 group-hover:rotate-6 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] z-40 filter brightness-[1.05] contrast-[1.05]"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Grounding Saucer Contact Shadow */}
        <div className="saucer-contact-shadow" aria-hidden="true" />
      </div>

      {/* 5. RICH TYPOGRAPHY & TELEMETRY STREAM */}
      <div className="cyber-card-body relative z-20 flex flex-col gap-2 pt-2">
        {/* Brand Tag & Custom Tags */}
        <div className="cyber-meta-row flex items-center justify-between gap-2">
          <span className="brand-sector-tag font-sans tracking-wide text-xs text-[#00f3ff] uppercase font-semibold">
            #{category}
          </span>
          {tags && tags[0] && (
            <span className="custom-tag-pill font-mono text-[10px] tracking-wider text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full uppercase">
              #{tags[0]}
            </span>
          )}
        </div>

        {/* Item Title & Spice Flames */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="cyber-item-title text-xl font-bold tracking-wider text-white uppercase font-heading">
            {name}
          </h3>
          {spiceLevel > 0 && (
            <div
              className="cyber-spice-icons flex items-center gap-0.5"
              title={`Spice level: ${spiceLevel}/3`}
            >
              {Array.from({ length: spiceLevel }).map((_, i) => (
                <Flame key={i} size={14} className="text-[#ff007f] fill-[#ff007f]" />
              ))}
            </div>
          )}
        </div>

        {/* Description Clamped */}
        <p className="cyber-item-desc text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Compact Metadata Tags Capsules */}
        {tags && tags.length > 1 && (
          <div className="cyber-tags-row flex items-center gap-1.5 mt-1 flex-wrap">
            {tags.slice(1, 3).map((tag, i) => (
              <span key={i} className="cyber-tag-capsule text-[11px] text-gray-400 font-mono">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 6. CARD FOOTER: PRICING & ORBITAL ADD BUTTON */}
      <div className="cyber-card-footer relative z-20 flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
        {/* Bold Unboxed Price */}
        <div className="cyber-price-display flex items-baseline gap-1 group-hover:scale-105 transition-transform duration-300">
          <span className="price-curr text-xs font-bold text-amber-400 font-tech tracking-wider">
            PKR
          </span>
          <span className="price-amount text-2xl font-black text-white font-heading tracking-tight">
            Rs. {Math.round(price).toLocaleString()}
          </span>
        </div>

        {/* Futuristic Circular Interactive Add Button */}
        <button
          onClick={handleAddClick}
          className={`cyber-orbit-add-btn ${isRippling ? "rippling" : ""}`}
          aria-label={`Add ${name} to order`}
        >
          <span className="orbit-glow-ring" aria-hidden="true" />
          <span className="orbit-core-icon">
            {isRippling ? (
              <Check size={16} strokeWidth={3} className="text-white" />
            ) : (
              <Plus size={18} strokeWidth={2.5} className="text-[#00f3ff] group-hover:text-black" />
            )}
          </span>
          {isRippling && <span className="orbit-ripple-wave" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
