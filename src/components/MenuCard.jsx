import React from "react";
import { Star, Flame, Plus } from "lucide-react";

export default function MenuCard({ item, onSelectFood }) {
  const { name, price, description, rating, image, isPopular, spiceLevel, tags } = item;

  return (
    <div
      className="modern-menu-card group"
      onClick={() => onSelectFood(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectFood(item);
        }
      }}
      aria-label={`View ${name}`}
    >
      {/* Food Image Container with crisp 16:10 aspect ratio and zero awkward dark bottom fade */}
      <div className="card-media-wrapper">
        <img
          src={image}
          alt={name}
          className="card-media-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Top-Left: Sleek Glassmorphic Rating Badge directly over image */}
        <div className="card-floating-badge badge-rating">
          <Star size={12} className="star-icon-solid" />
          <span>{rating ? rating.toFixed(1) : "4.9"}</span>
        </div>

        {/* Top-Right: Floating Glassmorphic Popular/Bestseller Badge */}
        {isPopular && (
          <div className="card-floating-badge badge-popular">
            <span>POPULAR</span>
          </div>
        )}
      </div>

      {/* Card Content Area - Aligned Flex Container */}
      <div className="card-body">
        <div className="card-body-top">
          {/* Header Row: Title & Spice indicator */}
          <div className="card-header-row">
            <h3 className="card-item-title">{name}</h3>
            {spiceLevel > 0 && (
              <div className="card-spice-indicator" title={`Spice level: ${spiceLevel}/3`}>
                {Array.from({ length: spiceLevel }).map((_, i) => (
                  <Flame key={i} size={13} className="spice-flame-icon" />
                ))}
              </div>
            )}
          </div>

          {/* Description with Clean 2-Line Clamp */}
          <p className="card-item-desc">{description}</p>

          {/* Minimalist Tags */}
          {tags && tags.length > 0 && (
            <div className="card-tags-strip">
              {tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="card-tag-pill">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer: Prominent Price & Sleek "Add +" Glowing Button */}
        <div className="card-action-footer">
          <div className="card-price-block">
            <span className="price-curr">Rs.</span>
            <span className="price-num">{Math.round(price).toLocaleString()}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectFood(item);
            }}
            className="btn-card-add-action"
            aria-label={`Customize and add ${name}`}
          >
            <span>Add</span>
            <Plus size={15} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
