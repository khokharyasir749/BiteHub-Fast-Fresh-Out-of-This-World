import React from "react";
import { X, Plus, Minus, Trash2, ShieldAlert, ArrowRight } from "lucide-react";

export default function Cart({ isOpen, onClose, cartItems, onUpdateQty, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const transmissionFee = subtotal > 0 ? 150 : 0; // zero-g delivery surcharge (Rs. 150)
  const total = subtotal + transmissionFee;

  return (
    <div className="cart-sidebar-backdrop fade-in" onClick={onClose}>
      <div className="cart-sidebar glass-card card-glow-pink slide-left" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <h3 className="neon-text-pink">CARGO BAY</h3>
            <span className="cart-status-badge font-tech">SECURE_LINK</span>
          </div>
          <button onClick={onClose} className="cart-close-btn" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-hologram float-animation">
                <span className="hologram-symbol">🛰️</span>
              </div>
              <p className="empty-title">Cargo Hold Empty</p>
              <p className="empty-subtitle">Initialize food telemetry by adding items from the sector menu.</p>
              <button onClick={onClose} className="btn-neon-cyan mt-4">
                <span>OPEN MENU VAULTS</span>
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.cartId} className="cart-item glass-card">
                  {/* Item Image */}
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  {/* Item Info */}
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    
                    {/* Display customizations if any */}
                    {item.customizations && (
                      <div className="cart-item-custom-details">
                        <span className="custom-size">Size: {item.customizations.size}</span>
                        {item.customizations.addons.length > 0 && (
                          <span className="custom-addons">
                            Upgrades: {item.customizations.addons.join(", ")}
                          </span>
                        )}
                        {item.customizations.notes && (
                          <span className="custom-notes">Notes: "{item.customizations.notes}"</span>
                        )}
                      </div>
                    )}

                    <div className="cart-item-price-row">
                      <span className="item-unit-price">Rs. {Math.round(item.price).toLocaleString()} ea</span>
                      <span className="item-total-price">Rs. {Math.round(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Item Quantity and Delete controls */}
                  <div className="cart-item-controls">
                    <div className="cart-item-qty">
                      <button
                        onClick={() => onUpdateQty(item.cartId, -1)}
                        className="qty-adjust-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-adjust-val">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQty(item.cartId, 1)}
                        className="qty-adjust-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="cart-item-remove-btn"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Billing Breakdown */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Subtotal Payload:</span>
              <span>Rs. {Math.round(subtotal).toLocaleString()}</span>
            </div>
            <div className="cart-summary-line">
              <span>Zero-G Warp Delivery:</span>
              <span>Rs. {Math.round(transmissionFee).toLocaleString()}</span>
            </div>
            <div className="cart-summary-divider"></div>
            <div className="cart-summary-total font-tech">
              <span className="neon-text-cyan">TOTAL INVOICE:</span>
              <span className="neon-text-cyan">Rs. {Math.round(total).toLocaleString()}</span>
            </div>

            <div className="warning-banner glass-card mt-3">
              <ShieldAlert size={14} className="neon-text-yellow mr-2 shrink-0" />
              <span>Ensure your coordinates are correct before transmission.</span>
            </div>

            <button onClick={onCheckout} className="btn-neon-pink w-full mt-4 justify-between float-animation">
              <span>INITIALIZE ORDER TRANSMISSION</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
