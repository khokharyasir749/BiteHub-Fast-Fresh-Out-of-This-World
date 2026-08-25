import React, { useState, useMemo } from "react";
import { Search, Flame, Pizza, Layers, CupSoda, Cake, SlidersHorizontal } from "lucide-react";
import { menuData } from "../data/menuData";
import MenuCard from "./MenuCard";

export default function MenuSection({ menuItems, onSelectFood }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular"); // popular, price-asc, price-desc, rating

  const categories = [
    { id: "All", name: "All Sectors", icon: SlidersHorizontal, glow: "cyan" },
    { id: "Pizzas", name: "Pizzas", icon: Pizza, glow: "cyan" },
    { id: "Burgers", name: "Burgers", icon: Flame, glow: "pink" },
    { id: "Loaded Fries & Starters", name: "Fries & Starters", icon: Layers, glow: "pink" },
    { id: "Intergalactic Beverages & Shakes", name: "Beverages", icon: CupSoda, glow: "yellow" },
    { id: "Desserts & Sweet Bites", name: "Desserts", icon: Cake, glow: "yellow" },
  ];

  const filteredAndSortedItems = useMemo(() => {
    const itemsToDisplay = menuItems || menuData || [];

    const filteredItems = itemsToDisplay.filter((item) => {
      const query = (searchQuery || "").trim().toLowerCase();
      const matchesCategory = activeCategory.toLowerCase() === "all" || item.category?.toLowerCase() === activeCategory.toLowerCase();
      
      if (!query) return matchesCategory;

      const nameMatch = item.name?.toLowerCase().includes(query);
      const descMatch = item.description?.toLowerCase().includes(query);
      const catMatch = item.category?.toLowerCase().includes(query) || query.includes(item.category?.toLowerCase());
      const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(query) || query.includes(tag.toLowerCase()));

      return matchesCategory && (nameMatch || descMatch || catMatch || tagMatch);
    });

    let result = [...filteredItems];

    // Sort Items
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popular") {
      result.sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return b.rating - a.rating; // tie breaker
      });
    }

    return result;
  }, [menuItems, activeCategory, searchQuery, sortBy]);

  return (
    <section id="menu-section" className="cyber-menu-section">
      <div className="container">
        {/* Title */}
        <div className="section-header text-center">
          <h2 className="section-title text-glow-cyan">INTERSTELLAR MENU</h2>
          <p className="section-subtitle">Select your payload from our neon food vaults</p>
          <div className="header-divider"></div>
        </div>

        {/* Filter controls: Search and Sort */}
        <div className="menu-controls">
          <div className="search-bar-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Query food name or cyber tags (e.g., Cheesy, Spicy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="clear-search">
                &times;
              </button>
            )}
          </div>

          <div className="sort-selector-wrapper">
            <span className="sort-label">Sort Engine:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Telemetry: Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">System rating: Highest</option>
            </select>
          </div>
        </div>

        {/* Category filter buttons */}
        <div className="category-tabs">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-btn btn-glow-${cat.glow} ${isSelected ? "active" : ""}`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="menu-grid">
            {filteredAndSortedItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onSelectFood={onSelectFood}
              />
            ))}
          </div>
        ) : (
          <div className="no-items-state glass-card">
            <p className="no-items-text">⚠️ Zero matches in the sector databases.</p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setSortBy("popular");
              }}
              className="btn-cyber-outline reset-filters-btn"
            >
              <span>RESET GRID TELEMETRY</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
