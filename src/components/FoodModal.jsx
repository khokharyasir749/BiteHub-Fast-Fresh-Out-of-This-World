import React, { useState } from "react";
import { X, Star, Flame, Plus, Minus, ShieldCheck } from "lucide-react";

export default function FoodModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Standard");
  const [addons, setAddons] = useState({
    extraCheese: false,
    cyberSauce: false,
    crispyOnions: false,
  });
  const [notes, setNotes] = useState("");

  const sizeOptions = [
    { name: "Standard", priceModifier: 0 },
    { name: "Double/Hyper Portion", priceModifier: 150 },
  ];

  const addonOptions = [
    { id: "extraCheese", name: "Extra Cyber-Cheese", price: 80 },
    { id: "cyberSauce", name: "Supernova Chili Glaze", price: 50 },
    { id: "crispyOnions", name: "Deep Space Fried Onions", price: 60 },
  ];

  const handleQtyDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleQtyIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddonChange = (addonId) => {
    setAddons((prev) => ({ ...prev, [addonId]: !prev[addonId] }));
  };

  // Calculate final unit price
  const sizePriceMod = sizeOptions.find((o) => o.name === selectedSize)?.priceModifier || 0;
  const addonsPriceMod = addonOptions.reduce((total, option) => {
    if (addons[option.id]) {
      return total + option.price;
    }
    return total;
  }, 0);

  const unitPrice = item.price + sizePriceMod + addonsPriceMod;
  const totalPrice = unitPrice * quantity;

  const handleAddCargo = () => {
    // Generate selected add-ons array
    const selectedAddonsText = addonOptions
      .filter((option) => addons[option.id])
      .map((option) => option.name);

    const configuredItem = {
      ...item,
      // Create a unique id for the cart item based on custom choices
      cartId: `${item.id}-${selectedSize}-${selectedAddonsText.join("-")}`,
      price: unitPrice,
      quantity: quantity,
      customizations: {
        size: selectedSize,
        addons: selectedAddonsText,
        notes: notes,
      },
    };

    onAddToCart(configuredItem, true); // true indicates it's already configured with custom quantity/price
    onClose();
  };

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal-content glass-card card-glow-cyan zoom-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Grid */}
        <div className="modal-grid-layout">
          {/* Left Side: Product Image */}
          <div className="modal-visual">
            <img
              src={item.image}
              alt={item.name}
              className="modal-main-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {item.isPopular && (
              <span className="modal-popular-badge animate-pulse-glow">BEST TELEMETRY</span>
            )}
          </div>

          {/* Right Side: Details & Configurator */}
          <div className="modal-details">
            <div className="modal-header-info">
              <span className="modal-category-tag">{item.category}</span>
              <h2 className="modal-title text-glow-cyan">{item.name}</h2>
              <div className="modal-ratings-row">
                <div className="modal-rating">
                  <Star size={16} className="star-icon-filled" />
                  <span>{item.rating.toFixed(1)} / 5.0 Rating</span>
                </div>
                {item.spiceLevel > 0 && (
                  <div className="modal-spice">
                    <span>Spice Matrix:</span>
                    {Array.from({ length: item.spiceLevel }).map((_, i) => (
                      <Flame key={i} size={15} className="spice-flame-icon" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="modal-description">{item.description}</p>

            {/* Customizer Option 1: Sizes */}
            <div className="customizer-section">
              <h4 className="customizer-section-title">1. Dimension Size</h4>
              <div className="customizer-sizes">
                {sizeOptions.map((opt) => (
                  <label
                    key={opt.name}
                    className={`customizer-radio glass-card ${
                      selectedSize === opt.name ? "selected border-cyan" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="size-selection"
                      value={opt.name}
                      checked={selectedSize === opt.name}
                      onChange={() => setSelectedSize(opt.name)}
                    />
                    <span className="radio-label">{opt.name}</span>
                    <span className="radio-price">
                      {opt.priceModifier > 0 ? `+Rs. ${opt.priceModifier}` : "Standard Core"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customizer Option 2: Add-ons */}
            <div className="customizer-section">
              <h4 className="customizer-section-title">2. Core Upgrades (Add-ons)</h4>
              <div className="customizer-addons">
                {addonOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`customizer-checkbox glass-card ${
                      addons[option.id] ? "selected border-pink" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={addons[option.id]}
                      onChange={() => handleAddonChange(option.id)}
                    />
                    <span className="checkbox-label">{option.name}</span>
                    <span className="checkbox-price">+Rs. {option.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Customizer Option 3: Instructions */}
            <div className="customizer-section">
              <h4 className="customizer-section-title">3. Vector Comms (Special Notes)</h4>
              <textarea
                placeholder="Instruct culinary bay (e.g. no onions, extra heat laser)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="customizer-notes"
                rows="2"
              />
            </div>

            {/* Modal Actions Footer */}
            <div className="modal-footer-actions">
              {/* Quantity selectors */}
              <div className="qty-selector">
                <button onClick={handleQtyDecrement} className="qty-btn" aria-label="Decrease quantity">
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button onClick={handleQtyIncrement} className="qty-btn" aria-label="Increase quantity">
                  <Plus size={14} />
                </button>
              </div>

              {/* Price display and CTA */}
              <div className="checkout-cta-block">
                <div className="cta-price-display">
                  <span className="price-label">PAYLOAD TOTAL</span>
                  <span className="price-val">Rs. {Math.round(totalPrice).toLocaleString()}</span>
                </div>
                <button onClick={handleAddCargo} className="btn-add-cargo float-animation">
                  <ShieldCheck size={18} />
                  <span>SECURE TO CARGO HOLD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
