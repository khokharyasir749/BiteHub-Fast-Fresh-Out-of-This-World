import React, { useState } from "react";
import GravityBackground from "./components/GravityBackground";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import FoodModal from "./components/FoodModal";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";
import AdminPanel from "./components/AdminPanel";
import { menuData } from "./data/menuData";
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck, Heart, Lock } from "lucide-react";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // CRUD State persistent across refreshes
  const [menuItems, setMenuItems] = useState(() => {
    const stored = localStorage.getItem("bitehub_menu_items");
    return stored ? JSON.parse(stored) : menuData;
  });
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // CRUD Handlers
  const handleAddItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: `${newItem.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
    };
    const updated = [...menuItems, itemWithId];
    setMenuItems(updated);
    localStorage.setItem("bitehub_menu_items", JSON.stringify(updated));
  };

  const handleUpdateItem = (id, updatedFields) => {
    const updated = menuItems.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedFields };
      }
      return item;
    });
    setMenuItems(updated);
    localStorage.setItem("bitehub_menu_items", JSON.stringify(updated));
  };

  const handleDeleteItem = (id) => {
    const updated = menuItems.filter((item) => item.id !== id);
    setMenuItems(updated);
    localStorage.setItem("bitehub_menu_items", JSON.stringify(updated));
    // Remove deleted items from current cart
    setCartItems((prevItems) => prevItems.filter((i) => !i.cartId.startsWith(id)));
  };

  const handleResetDefaults = () => {
    setMenuItems(menuData);
    localStorage.setItem("bitehub_menu_items", JSON.stringify(menuData));
    setCartItems([]);
  };

  // Cart Handlers
  const handleAddToCart = (item, isConfigured = false) => {
    if (isConfigured) {
      // Adding customized item from details modal
      setCartItems((prevItems) => {
        const existingIdx = prevItems.findIndex((i) => i.cartId === item.cartId);
        if (existingIdx > -1) {
          const updated = [...prevItems];
          updated[existingIdx].quantity += item.quantity;
          return updated;
        }
        return [...prevItems, item];
      });
    } else {
      // Quick add from card (standard configuration)
      const cartId = `${item.id}-Standard`;
      setCartItems((prevItems) => {
        const existingIdx = prevItems.findIndex((i) => i.cartId === cartId);
        if (existingIdx > -1) {
          const updated = [...prevItems];
          updated[existingIdx].quantity += 1;
          return updated;
        }
        
        const newItem = {
          ...item,
          cartId,
          price: item.price,
          quantity: 1,
          customizations: {
            size: "Standard",
            addons: [],
            notes: "",
          },
        };
        return [...prevItems, newItem];
      });
    }
  };

  const handleUpdateQty = (cartId, change) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + change;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (cartId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const onSelectFood = (item) => {
    setSelectedFood(item);
  };

  // Derive cart counts and prices
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Zero Gravity Cyber Ambient Background */}
      <GravityBackground />

      {/* Floating Header */}
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Banner */}
      <Hero />

      {/* Core Menu Panel */}
      <MenuSection
        menuItems={menuItems}
        onSelectFood={onSelectFood}
      />

      {/* Sector Info (About Section) */}
      <section id="about-section" className="cyber-about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-visual-box">
              <div className="about-holo-ring">
                <div className="about-holo-core"></div>
                <div className="about-burger-levitate float-animation-large">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                    alt="Zero-G Burger Illustration"
                    className="about-burger-img"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </div>
                <div className="about-telemetry-pill">SYSTEMS ACTIVE</div>
              </div>
            </div>

            <div className="about-details">
              <span className="font-tech neon-text-pink">SECTOR OPERATIONS</span>
              <h3 className="text-glow-pink">PIONEERING ZERO-G FAST FOOD</h3>
              <p>
                BiteHub was established with a singular directive: to deploy top-tier, fresh fast food that defies Earth-bound physics. Combining advanced thermo-lock chambers with molecular preservation grids, our kitchen bots guarantee that every smash burger, loaded fry box, and chilled shake reaches your quadrant at optimal thermodynamics.
              </p>
              <p>
                Our recipes are curated by culinary engineers utilizing stardust marinades and rocket peri-peri seasonings. We do not compromise on fresh payloads. Experience fast food upgraded for the next millennium.
              </p>

              <div className="stats-grid">
                <div className="stat-item glass-card card-glow-cyan">
                  <div className="stat-num neon-text-cyan">30m</div>
                  <div className="stat-label">MAX WARP DELIVERY</div>
                </div>
                <div className="stat-item glass-card card-glow-pink">
                  <div className="stat-num neon-text-pink">100%</div>
                  <div className="stat-label">FRESH BIOMASS</div>
                </div>
                <div className="stat-item glass-card card-glow-yellow">
                  <div className="stat-num neon-text-yellow">240°C</div>
                  <div className="stat-label">THERMO-LOCK HEAT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comms Center & Contact Section */}
      <footer id="contact-section" className="cyber-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-brand">
              <span className="footer-logo">
                BITE<span className="footer-logo-accent">HUB</span>
              </span>
              <p className="footer-tagline">
                BiteHub – Fast, Fresh &amp; Out of This World. Secure culinary telemetry for the neon sector.
              </p>
            </div>

            {/* Column 2: Sectors */}
            <div>
              <h4 className="footer-heading">SECTORS</h4>
              <div className="footer-links">
                <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="footer-link">Base Station</a>
                <a href="#menu-section" className="footer-link">Menu Vaults</a>
                <a href="#about-section" className="footer-link">Operational Telemetry</a>
                <a href="#contact-section" className="footer-link">Comms Center</a>
              </div>
            </div>

            {/* Column 3: Logistics */}
            <div>
              <h4 className="footer-heading">LOGISTICS</h4>
              <div className="footer-contacts">
                <div className="footer-contact-item">
                  <Clock size={16} className="neon-text-cyan shrink-0" />
                  <span>CULINARY BAY: 11:00 AM - 03:00 AM</span>
                </div>
                <div className="footer-contact-item">
                  <MapPin size={16} className="neon-text-pink shrink-0" />
                  <span>Sector 7, Neon Plaza Grid, Earth Node</span>
                </div>
              </div>
            </div>

            {/* Column 4: Comms Transmit */}
            <div>
              <h4 className="footer-heading">TRANSMIT COMMS</h4>
              <div className="footer-contacts">
                <a href="https://api.whatsapp.com/send?phone=923280790704" target="_blank" rel="noopener noreferrer" className="footer-contact-item wa-highlight">
                  <Phone size={16} className="neon-text-cyan shrink-0" />
                  <span>Call/WhatsApp: +92 328 0790704</span>
                </a>
                <a href="mailto:khokharyasir749@gmail.com?subject=BiteHub%20Order%20%2F%20Inquiry" className="footer-contact-item email-highlight">
                  <Mail size={16} className="neon-text-pink shrink-0" />
                  <span>khokharyasir749@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} BITEHUB. CODED WITH <Heart size={12} className="copyright-accent" /> FOR SECURE TRANSITIONS.
            </p>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="contact-item font-tech text-xs"
              style={{ background: "none", border: "none", cursor: "pointer", gap: "6px", display: "flex", alignItems: "center" }}
            >
              <Lock size={12} className="neon-text-purple shrink-0" />
              <span>ADMIN PORTAL</span>
            </button>
            <div className="footer-security-hud">
              🛡️ NETWORK: SECURE_COMMS_V2
            </div>
          </div>
        </div>
      </footer>

      {/* OVERLAY COMPONENTS */}

      {/* Cart Drawer */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Food Customization Modal */}
      {selectedFood !== null && (
        <FoodModal
          item={selectedFood}
          onClose={() => setSelectedFood(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Checkout WhatsApp Teleportation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Admin Panel Console */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        onResetDefaults={handleResetDefaults}
      />
    </>
  );
}
