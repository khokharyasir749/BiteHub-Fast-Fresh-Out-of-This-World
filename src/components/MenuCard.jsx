import React from "react";
import { Star, Flame, ShoppingCart } from "lucide-react";

export default function MenuCard({ item, onSelectFood }) {
  const { name, price, description, rating, image, isPopular, spiceLevel, tags } = item;

  // Determine neon theme based on item category for distinct glowing borders
  const getGlowTheme = () => {
    switch (item.category) {
      case "Pizzas":
        return "card-glow-cyan";
      case "Burgers":
        return "card-glow-pink";
      case "Intergalactic Beverages & Shakes":
        return "card-glow-yellow";
      case "Desserts & Sweet Bites":
        return "card-glow-purple";
      default:
        return "card-glow-cyan";
    }
  };

  return (
    <div className={`menu-card glass-card ${getGlowTheme()}`} onClick={() => onSelectFood(item)}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="popular-badge animate-pulse-glow">
          <span>POPULAR</span>
        </div>
      )}

      {/* Food Image Container */}
      <div className="card-image-wrapper">
        <img
          src={image}
          alt={name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="card-image-overlay"></div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        {/* Rating and Spice */}
        <div className="card-meta">
          <div className="card-rating">
            <Star size={14} className="star-icon-filled" />
            <span>{rating.toFixed(1)}</span>
          </div>

          {spiceLevel > 0 && (
            <div className="card-spice" title={`Spice level: ${spiceLevel}/3`}>
              {Array.from({ length: spiceLevel }).map((_, i) => (
                <Flame key={i} size={14} className="spice-flame-icon" />
              ))}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="card-title">{name}</h3>

        {/* Description */}
        <p className="card-description">{description}</p>

        {/* Tags */}
        <div className="card-tags">
          {tags.slice(0, 2).map((tag, idx) => (
            <span key={idx} className="card-tag">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer: Price and Add Button */}
        <div className="card-footer">
          <div className="card-price">
            <span className="price-symbol">Rs. </span>
            <span className="price-value">{Math.round(price).toLocaleString()}</span>
          </div>

          <button onClick={() => onSelectFood(item)} className="btn-add-cart">
            <ShoppingCart size={16} />
            <span>ADD PAYLOAD</span>
          </button>
        </div>
      </div>
    </div>
  );
}
