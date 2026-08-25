import React, { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const transmissionFee = 150; // zero-g delivery surcharge (Rs. 150)
  const total = subtotal + transmissionFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate cyber-network latency
    setTimeout(() => {
      const orderId = `BH-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedOrderId(orderId);

      // Construct WhatsApp message
      let message = `🤖 BITEHUB ORDER TRANSMISSION 🤖\n`;
      message += `================================\n`;
      message += `🛰️ Order ID: ${orderId}\n`;
      message += `👤 Client Name: ${formData.name}\n`;
      message += `📞 Contact: ${formData.phone}\n`;
      message += `📍 Destination: ${formData.address}\n\n`;
      message += `📦 FOOD CARGO:\n`;
      message += `--------------------------------\n`;

      cartItems.forEach((item) => {
        let itemCustoms = "";
        if (item.customizations) {
          const mods = [];
          if (item.customizations.size !== "Standard") {
            mods.push(item.customizations.size);
          }
          if (item.customizations.addons && item.customizations.addons.length > 0) {
            mods.push(...item.customizations.addons);
          }
          if (mods.length > 0) {
            itemCustoms = ` (${mods.join(", ")})`;
          }
        }

        message += `- ${item.quantity}x ${item.name}${itemCustoms} - Rs. ${Math.round(item.price * item.quantity).toLocaleString()}\n`;
        if (item.customizations && item.customizations.notes) {
          message += `  * Notes: "${item.customizations.notes}"\n`;
        }
      });

      message += `--------------------------------\n`;
      message += `💵 Subtotal Payload: Rs. ${Math.round(subtotal).toLocaleString()}\n`;
      message += `🚀 Warp Delivery: Rs. ${Math.round(transmissionFee).toLocaleString()}\n`;
      message += `💎 TOTAL INVOICE: Rs. ${Math.round(total).toLocaleString()}\n\n`;

      if (formData.notes.trim()) {
        message += `📝 TRANSMISSION MEMO:\n"${formData.notes}"\n\n`;
      }
      message += `================================\n`;
      message += `🛸 Teleportation sequence initiated! Send this secure message to register your coordinates.`;

      // WhatsApp URL Generation
      // Target number: 03280790704 -> International: 923280790704
      const encodedMsg = encodeURIComponent(message);
      const url = `https://wa.me/923280790704?text=${encodedMsg}`;
      setWhatsappUrl(url);

      // Open WhatsApp link
      try {
        window.open(url, "_blank", "noopener,noreferrer");
      } catch (err) {
        console.error("WhatsApp tab open blocked by browser settings", err);
      }

      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal-content glass-card card-glow-pink zoom-in max-w-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <h3 className="neon-text-pink font-tech">TRANSMISSION TERMINAL</h3>
          {!isSuccess && (
            <button onClick={onClose} className="modal-close-btn" aria-label="Close checkout">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Success screen */}
        {isSuccess ? (
          <div className="checkout-success-hud text-center">
            <CheckCircle2 size={64} className="neon-text-cyan mx-auto animate-bounce-slow" />
            <h2 className="success-hud-title text-glow-cyan">TELEPORTATION LINK OPENED</h2>
            <p className="success-hud-id font-tech">NODE ID: {generatedOrderId}</p>
            
            <div className="success-invoice-box glass-card text-left">
              <div className="success-line"><span>Name:</span> <span>{formData.name}</span></div>
              <div className="success-line"><span>Total Cost:</span> <span className="neon-text-pink">Rs. {Math.round(total).toLocaleString()}</span></div>
              <div className="success-line"><span>Delivery Node:</span> <span>{formData.address}</span></div>
            </div>

            <p className="success-hud-instructions">
              If the WhatsApp transmission tab did not open automatically, please click the secure transmit button below to send your coordinates:
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-cyan w-full mt-4 justify-center"
              style={{ display: "inline-flex", textDecoration: "none", alignItems: "center" }}
            >
              <Send size={16} className="mr-2" />
              <span>TRANSMIT ORDER ON WHATSAPP</span>
            </a>

            <button onClick={handleFinish} className="btn-neon-pink w-full mt-4 justify-center">
              <span>RETURN TO BASE STATION</span>
            </button>
          </div>
        ) : isSubmitting ? (
          /* Submitting screen */
          <div className="checkout-submitting-hud text-center py-8">
            <RefreshCw size={48} className="neon-text-cyan mx-auto animate-spin" />
            <h2 className="loading-hud-title text-glow-pink">SECURE LINK ESTABLISHING...</h2>
            <p className="loading-hud-subtitle font-tech">Transmitting coordinates to orbital kitchen bay...</p>
            <div className="cyber-progress-bar">
              <div className="cyber-progress-fill"></div>
            </div>
          </div>
        ) : (
          /* Form screen */
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="invoice-summary-compact glass-card">
              <div className="invoice-summary-line">
                <span>Payload Amount:</span>
                <span>Rs. {Math.round(subtotal).toLocaleString()}</span>
              </div>
              <div className="invoice-summary-line">
                <span>Transmission Fee:</span>
                <span>Rs. {Math.round(transmissionFee).toLocaleString()}</span>
              </div>
              <div className="invoice-summary-total font-tech">
                <span className="neon-text-cyan">FINAL DEBIT:</span>
                <span className="neon-text-cyan">Rs. {Math.round(total).toLocaleString()}</span>
              </div>
            </div>

            <h4 className="form-legend font-tech text-glow-cyan">COORDINATES INPUT</h4>

            <div className="form-group">
              <label htmlFor="checkout-name" className="form-label">Client Designation (Name)</label>
              <input
                id="checkout-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter client designation name..."
                className="form-input-cyber"
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkout-phone" className="form-label">WhatsApp Contact Number</label>
              <input
                id="checkout-phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 03001234567"
                className="form-input-cyber"
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkout-address" className="form-label">Delivery Node / Coordinates (Address or Table Number)</label>
              <textarea
                id="checkout-address"
                name="address"
                required
                rows="2"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter absolute physical coordinates or table sector..."
                className="form-input-cyber"
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkout-notes" className="form-label">Transmission Memo (Notes)</label>
              <input
                id="checkout-notes"
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Optional specifications..."
                className="form-input-cyber"
              />
            </div>

            <button type="submit" className="btn-neon-pink w-full mt-4 justify-center float-animation">
              <Send size={18} />
              <span>TRANSMIT OVER SECURE CHANNELS</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
