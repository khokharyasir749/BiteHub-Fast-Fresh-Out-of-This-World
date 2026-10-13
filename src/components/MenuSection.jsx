import React, { useState, useMemo } from "react";
import { Search, Flame, Pizza, Layers, CupSoda, Cake, SlidersHorizontal, Sparkles } from "lucide-react";
import { menuData } from "../data/menuData";
import MenuCard from "./MenuCard";

export default function MenuSection({ menuItems, onSelectFood }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const categories = [
    { id: "All", name: "All Sectors", icon: SlidersHorizontal },
    { id: "Pizzas", name: "Pizzas", icon: Pizza },
    { id: "Burgers", name: "Burgers", icon: Flame },
    { id: "Loaded Fries & Starters", name: "Fries & Starters", icon: Layers },
    { id: "Intergalactic Beverages & Shakes", name: "Beverages", icon: CupSoda },
    { id: "Desserts & Sweet Bites", name: "Desserts", icon: Cake },
  ];

  const filteredAndSortedItems = useMemo(() => {
    const itemsToDisplay = menuItems || menuData || [];

    const filteredItems = itemsToDisplay.filter((item) => {
      const query = (searchQuery || "").trim().toLowerCase();
      const matchesCategory =
        activeCategory.toLowerCase() === "all" ||
        item.category?.toLowerCase() === activeCategory.toLowerCase();

      if (!query) return matchesCategory;

      const nameMatch = item.name?.toLowerCase().includes(query);
      const descMatch = item.description?.toLowerCase().includes(query);
      const catMatch =
        item.category?.toLowerCase().includes(query) ||
        query.includes(item.category?.toLowerCase());
      const tagMatch = item.tags?.some(
        (tag) =>
          tag.toLowerCase().includes(query) ||
          query.includes(tag.toLowerCase())
      );

      return matchesCategory && (nameMatch || descMatch || catMatch || tagMatch);
    });

    let result = [...filteredItems];

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
        return (b.rating || 0) - (a.rating || 0);
      });
    }

    return result;
  }, [menuItems, activeCategory, searchQuery, sortBy]);

  return (
    <section id="menu-section" className="modern-menu-section">
      <div className="container">
        {/* Modern Section Header */}
        <div className="modern-section-header">
          <div className="menu-capsule-badge">
            <Sparkles size={12} className="badge-sparkle-icon" />
            <span>CURATED CATALOG</span>
          </div>

          <h2 className="modern-section-title">
            INTERSTELLAR FLAVORS
          </h2>

          <p className="modern-section-subtitle">
            Curated zero-gravity recipes crafted with high-impact flavor formulas
          </p>
        </div>

        {/* Controls Bar: Search & Sort Engine */}
        <div className="modern-controls-bar">
          <div className="modern-search-box">
            <Search size={16} className="modern-search-icon" />
            <input
              type="text"
              placeholder="Search dishes, burgers, pizzas or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="modern-search-field"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="modern-clear-search-btn"
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          <div className="modern-sort-box">
            <span className="sort-hint-label">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="modern-sort-dropdown"
              aria-label="Sort dishes"
            >
              <option value="popular">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Sleek Minimalist Category Pills */}
        <div className="modern-category-pills-row">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`modern-category-pill ${isSelected ? "active" : ""}`}
              >
                <Icon size={15} className="pill-icon" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* High-End Menu Grid */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="modern-menu-grid">
            {filteredAndSortedItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onSelectFood={onSelectFood}
              />
            ))}
          </div>
        ) : (
          <div className="modern-empty-state">
            <div className="empty-state-icon">📡</div>
            <h3 className="empty-state-title">No Culinary Signals Detected</h3>
            <p className="empty-state-desc">
              We couldn't find items matching "{searchQuery}". Try searching for another ingredient or reset filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
                setSortBy("popular");
              }}
              className="btn-modern-reset-filters"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
