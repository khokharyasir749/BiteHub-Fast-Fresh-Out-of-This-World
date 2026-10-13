import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, Check, Sparkles } from "lucide-react";

export const heroSlides = [
  {
    id: "burger-2",
    titleLine1: "FRIED CHICKEN",
    titleLine2: "BURGER",
    backdropText: "BURGERS",
    subDescription: "BITEHUB'S SPECIAL CRISPY CHICKEN BURGERS",
    description: "Crispy golden spiced chicken breast, neon spicy mayo, fresh iceberg crunch and signature wire-basket golden fries.",
    price: 550,
    image: "/hero-burger-2.jpg",
    fallbackImage: "https://i.ibb.co/L8N4bXQ/fried-chicken-burger.png",
    category: "Burgers",
    rating: 4.9,
    accentGlow: "rgba(245, 158, 11, 0.18)",
    tag: "SIGNATURE SHOWCASE"
  },
  {
    id: "pizza-1",
    titleLine1: "HOLOGRAPHIC",
    titleLine2: "SUPREME",
    backdropText: "PIZZAS",
    subDescription: "INFUSED WITH SPICED NEON FEASTS",
    description: "Laser-cut beef pepperoni, double mozzarella, and our signature glowing nebula marinara sauce, dusted with stardust oregano.",
    price: 1490,
    image: "/hero-pizza.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&auto=format&fit=crop&q=80",
    category: "Pizzas",
    rating: 4.9,
    accentGlow: "rgba(255, 0, 127, 0.18)",
    tag: "WARP FLAVORS"
  },
  {
    id: "starter-1",
    titleLine1: "STARDUST",
    titleLine2: "FRIES",
    backdropText: "LOADED",
    subDescription: "CYBERPUNK CRUNCH WITH EXTRA CHEESE LOAD",
    description: "Golden crinkle-cut fries loaded with zero-gravity melted cheese sauce, chopped crispy chicken tenders, jalapeños, and cyber ranch glaze.",
    price: 550,
    image: "/hero-fries.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80",
    category: "Loaded Fries & Starters",
    rating: 4.9,
    accentGlow: "rgba(0, 243, 255, 0.18)",
    tag: "MELT OVERLOAD"
  }
];

export default function Hero({ onAddToCart, onSelectFood }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [addedToast, setAddedToast] = useState(false);
  const timerRef = useRef(null);

  const currentSlide = heroSlides[currentSlideIndex];

  // Automatic Rotation Engine: Advances smoothly every 4.5 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Handle Add to Bag CTA
  const handleAddToBag = () => {
    if (onAddToCart) {
      onAddToCart({
        id: currentSlide.id,
        name: `${currentSlide.titleLine1} ${currentSlide.titleLine2}`,
        category: currentSlide.category,
        price: currentSlide.price,
        description: currentSlide.description,
        image: currentSlide.image,
        rating: currentSlide.rating
      });
    }

    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2000);
  };

  // Handle Customize trigger
  const handleCustomize = () => {
    if (onSelectFood) {
      onSelectFood({
        id: currentSlide.id,
        name: `${currentSlide.titleLine1} ${currentSlide.titleLine2}`,
        category: currentSlide.category,
        price: currentSlide.price,
        description: currentSlide.description,
        image: currentSlide.image,
        rating: currentSlide.rating
      });
    }
  };

  return (
    <section className="hero-borderless-viewport" aria-label="Cinematic Showcase">
      {/* Massive Semi-transparent Backdrop Typography (BURGERS / PIZZAS / LOADED - >=25vw) */}
      <div className="hero-massive-backdrop-wrap" aria-hidden="true">
        {heroSlides.map((slide, idx) => (
          <span
            key={slide.backdropText}
            className={`hero-massive-backdrop-text ${idx === currentSlideIndex ? "active" : ""}`}
          >
            {slide.backdropText}
          </span>
        ))}
      </div>

      {/* Full-Frame Borderless Media Stage (Right 60% with Multi-directional Soft Vignette Melts) */}
      <div className="hero-borderless-media-stage" aria-hidden="true">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`hero-slide-media-layer ${idx === currentSlideIndex ? "active" : ""}`}
          >
            <img
              src={slide.image}
              alt={`${slide.titleLine1} ${slide.titleLine2}`}
              className="hero-borderless-img"
              onError={(e) => {
                if (slide.fallbackImage && e.target.src !== slide.fallbackImage) {
                  e.target.src = slide.fallbackImage;
                }
              }}
            />
          </div>
        ))}

        {/* Soft Multi-Directional Vignette Gradients - Melts image seamlessly into #0a0a0c */}
        <div className="hero-vignette-fade-left" />
        <div className="hero-vignette-fade-right" />
        <div className="hero-vignette-fade-top" />
        <div className="hero-vignette-fade-bottom" />
        <div
          className="hero-vignette-ambient-glow"
          style={{
            background: `radial-gradient(circle at 65% 50%, ${currentSlide.accentGlow} 0%, rgba(10, 10, 12, 0) 70%)`
          }}
        />
      </div>

      {/* Left-Side Content Overlay (Over Left ~42% of Screen with Smooth 1s Fade Transition) */}
      <div className="hero-borderless-content-overlay">
        <div className="hero-content-column">
          <div key={currentSlideIndex} className="hero-animated-text-block">
            <div className="hero-badge-tag">
              <Sparkles size={13} className="hero-badge-icon" />
              <span>{currentSlide.tag}</span>
            </div>

            <h1 className="hero-borderless-title">
              <span className="hero-title-part1">{currentSlide.titleLine1}</span>
              <span className="hero-title-part2">{currentSlide.titleLine2}</span>
            </h1>

            <p className="hero-borderless-subheading">
              {currentSlide.subDescription}
            </p>

            <div className="hero-borderless-price-row">
              <span className="hero-price-currency">PKR</span>
              <span className="hero-price-val">{currentSlide.price}</span>
              <span className="hero-price-tag-sub">ZERO-G TAX INCL.</span>
            </div>

            <div className="hero-cta-button-row">
              {/* Cinematic ADD TO BAG Button with Orange/Amber Glow */}
              <button
                onClick={handleAddToBag}
                className={`hero-cinematic-add-btn ${addedToast ? "added" : ""}`}
                id="hero-add-to-bag"
                aria-label={`Add ${currentSlide.titleLine1} ${currentSlide.titleLine2} to bag`}
              >
                <span className="hero-add-btn-text">
                  {addedToast ? "ADDED TO BAG" : "ADD TO BAG"}
                </span>
                <span className="hero-add-chevron-circle">
                  {addedToast ? <Check size={18} strokeWidth={3} /> : <ChevronRight size={20} strokeWidth={3} />}
                </span>
              </button>

              {/* CUSTOMIZE Button */}
              <button
                onClick={handleCustomize}
                className="hero-cinematic-customize-btn"
                aria-label="Customize food item"
              >
                CUSTOMIZE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
