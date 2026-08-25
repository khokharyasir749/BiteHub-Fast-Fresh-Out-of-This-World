import React, { useState, useMemo } from "react";
import { X, Lock, Trash2, Edit2, Plus, RefreshCw, Eye, EyeOff, Search } from "lucide-react";

export default function AdminPanel({
  isOpen,
  onClose,
  menuItems,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onResetDefaults,
}) {
  if (!isOpen) return null;

  const [passcode, setPasscode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState("");
  const [adminTab, setAdminTab] = useState("manage"); // manage | add

  // Search & Filter state for catalog view
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Form states for Add / Edit
  const [editingItem, setEditingItem] = useState(null); // null when adding
  const [formData, setFormData] = useState({
    name: "",
    category: "Burgers",
    price: "",
    description: "",
    image: "",
    spiceLevel: 0,
    tags: "",
  });

  const categories = [
    "Pizzas",
    "Burgers",
    "Loaded Fries & Starters",
    "Intergalactic Beverages & Shakes",
    "Desserts & Sweet Bites",
  ];

  // Passcode verification
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (passcode === "1234" || passcode === "admin") {
      setIsUnlocked(true);
      setAuthError("");
    } else {
      setAuthError("⛔ ACCESS DENIED: INVALID QUANTUM PASSCODE");
    }
  };

  // Handles adding or updating items
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      ? formData.tags.split(",").map((t) => t.trim()).filter((t) => t !== "")
      : [];

    const itemPayload = {
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price, 10) || 0,
      description: formData.description,
      image: formData.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      spiceLevel: parseInt(formData.spiceLevel, 10) || 0,
      tags: tagsArray,
      isPopular: false,
      rating: 5.0,
    };

    if (editingItem) {
      // Editing
      onUpdateItem(editingItem.id, itemPayload);
      setEditingItem(null);
    } else {
      // Adding new
      onAddItem(itemPayload);
    }

    // Reset Form & Switch Tab
    resetForm();
    setAdminTab("manage");
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      image: item.image,
      spiceLevel: item.spiceLevel,
      tags: item.tags ? item.tags.join(", ") : "",
    });
    setAdminTab("add"); // Switch to form tab
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Burgers",
      price: "",
      description: "",
      image: "",
      spiceLevel: 0,
      tags: "",
    });
    setEditingItem(null);
  };

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`⚠️ DELETION CONFIRMATION: Are you sure you want to scrub ${name} from the catalog?`)) {
      onDeleteItem(id);
    }
  };

  const handleResetClick = () => {
    if (window.confirm("⚠️ SYSTEM OVERRIDE: Reset entire catalog back to initial stardust menu parameters? All changes will be lost.")) {
      onResetDefaults();
      resetForm();
      setAdminTab("manage");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
    setAdminTab("manage");
  };

  // Filtered menu items for admin table list
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div className="modal-backdrop fade-in" onClick={onClose}>
      <div className="modal-content glass-card card-glow-purple zoom-in max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-modal-header">
          <h3 className="neon-text-purple font-tech">🔒 ADMIN CORE OPERATIONS</h3>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close admin">
            <X size={20} />
          </button>
        </div>

        {/* Authorization Shield */}
        {!isUnlocked ? (
          <div className="text-center py-8 max-w-sm mx-auto">
            <Lock size={48} className="neon-text-pink mx-auto mb-4 animate-pulse-glow" />
            <h2 className="success-hud-title text-glow-pink">SECURE AUTHENTICATION</h2>
            <p className="success-hud-instructions mb-6">
              Access to orbital kitchen telemetry requires passcode credentials.
            </p>

            <form onSubmit={handleAuthSubmit} className="checkout-form">
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Enter Passcode (e.g. 1234)..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="form-input-cyber text-center font-tech"
                  autoFocus
                />
              </div>
              {authError && <p className="neon-text-pink font-tech text-xs mt-2">{authError}</p>}
              <button type="submit" className="btn-neon-pink w-full mt-4 justify-center">
                <span>VERIFY AUTH KEY</span>
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Console */
          <div className="admin-console-layout mt-4">
            {/* Tabs & Utilities */}
            <div className="admin-console-toolbar">
              <div className="admin-tabs-row">
                <button
                  onClick={() => { setAdminTab("manage"); resetForm(); }}
                  className={`category-btn btn-glow-purple ${adminTab === "manage" ? "active" : ""}`}
                >
                  <span>Manage Catalog ({menuItems.length})</span>
                </button>
                <button
                  onClick={() => setAdminTab("add")}
                  className={`category-btn btn-glow-purple ${adminTab === "add" ? "active" : ""}`}
                >
                  <Plus size={14} className="mr-1" />
                  <span>{editingItem ? "Edit Payload" : "Add New Payload"}</span>
                </button>
              </div>

              <button onClick={handleResetClick} className="btn-cyber-outline py-2 px-4 flex items-center gap-1 font-tech text-xs">
                <RefreshCw size={12} />
                <span>RESET DIRECTIVES</span>
              </button>
            </div>

            {/* TAB 1: MANAGE CATALOG */}
            {adminTab === "manage" && (
              <div className="admin-tab-content">
                {/* Search & Category Filter */}
                <div className="menu-controls my-4">
                  <div className="search-bar-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Filter product telemetry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <div className="sort-selector-wrapper">
                    <select
                      value={activeCategory}
                      onChange={(e) => setActiveCategory(e.target.value)}
                      className="sort-select"
                    >
                      <option value="All">All Sectors</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Catalog Table */}
                <div className="admin-catalog-container glass-card">
                  {filteredItems.length > 0 ? (
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Payload</th>
                          <th>Title</th>
                          <th>Sector</th>
                          <th>Price</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img src={item.image} alt={item.name} className="admin-thumbnail" />
                            </td>
                            <td className="font-tech text-sm font-semibold">{item.name}</td>
                            <td className="text-secondary text-xs">{item.category}</td>
                            <td className="font-tech text-sm text-glow-cyan">Rs. {item.price}</td>
                            <td className="text-right">
                              <div className="admin-row-actions">
                                <button
                                  onClick={() => handleEditClick(item)}
                                  className="admin-action-btn edit"
                                  title="Edit Telemetry"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(item.id, item.name)}
                                  className="admin-action-btn delete"
                                  title="Scrub Database"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-secondary text-sm">No items found matching the grid query.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: ADD / EDIT FORM */}
            {adminTab === "add" && (
              <div className="admin-tab-content my-4">
                <form onSubmit={handleFormSubmit} className="checkout-form">
                  <h4 className="form-legend font-tech text-glow-cyan">
                    {editingItem ? `EDIT PAYLOAD: ${editingItem.name}` : "ADD NEW MENU PAYLOAD"}
                  </h4>

                  <div className="form-grid-2cols">
                    <div className="form-group">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Laser Loaded Burgers"
                        className="form-input-cyber"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Sector (Category)</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="form-input-cyber"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2cols">
                    <div className="form-group">
                      <label className="form-label">Price (PKR)</label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="e.g. 750"
                        className="form-input-cyber font-tech"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Spice Level (0 - 3)</label>
                      <select
                        value={formData.spiceLevel}
                        onChange={(e) => setFormData({ ...formData, spiceLevel: parseInt(e.target.value) })}
                        className="form-input-cyber"
                      >
                        <option value={0}>0 - Cool / Zero Heat</option>
                        <option value={1}>1 - Mild Telemetry</option>
                        <option value={2}>2 - Hot / Solar Flare</option>
                        <option value={3}>3 - Extreme Peri-Peri</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Image URL</label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="Paste Unsplash image URL..."
                      className="form-input-cyber"
                    />
                    {formData.image && (
                      <div className="admin-image-preview-box glass-card mt-2">
                        <span className="text-secondary text-xs block mb-1">Image Telemetry Preview:</span>
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="admin-preview-thumbnail"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Custom Tags (Comma Separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="e.g. Best Seller, Spicy, Cheesy"
                      className="form-input-cyber"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Product Description</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the molecular flavor profile..."
                      className="form-input-cyber"
                      rows="3"
                    />
                  </div>

                  <div className="form-row-actions mt-4">
                    {editingItem && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn-cyber-outline py-3 px-6"
                      >
                        <span>ABORT EDIT</span>
                      </button>
                    )}
                    <button type="submit" className="btn-neon-pink flex-grow justify-center py-3">
                      <span>{editingItem ? "COMMIT CHANGE KEY" : "TELEPORT TO MENU"}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
