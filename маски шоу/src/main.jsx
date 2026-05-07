import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ExternalLink, Search, ShieldAlert, ShoppingBag } from "lucide-react";
import { masks } from "./masks";
import "./styles.css";

const categories = ["All", ...Array.from(new Set(masks.map((mask) => mask.category)))];
const rarityRank = { Common: 1, Uncommon: 2, Rare: 3, Legendary: 4, Mythic: 5 };

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const visibleMasks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = masks.filter((mask) => {
      const matchesCategory = category === "All" || mask.category === category;
      const haystack = `${mask.name} ${mask.caption} ${mask.rarity}`.toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });

    return [...filtered].sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "rarity") return rarityRank[b.rarity] - rarityRank[a.rarity];
      return masks.findIndex((mask) => mask.id === a.id) - masks.findIndex((mask) => mask.id === b.id);
    });
  }, [category, query, sort]);

  const featuredMask = masks[0];

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="MEMEMASK home">
          <span className="brand-mark">M</span>
          <span>
            MEMEMASK
            <small>$MASK marketplace</small>
          </span>
        </a>
        <nav className="nav-actions" aria-label="Primary">
          <a className="ghost-button" href="https://x.com/MemeMask_" target="_blank" rel="noreferrer">
            X
          </a>
          <a className="primary-button" href="https://dexscreener.com/" target="_blank" rel="noreferrer">
            <ShoppingBag size={17} aria-hidden="true" />
            Buy $MASK
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">Outbreak-season listings are live</p>
            <h1 id="hero-title">
              The only way to stop hantavirus…
              <span>is $MASK.</span>
            </h1>
            <p className="hero-text">
              A fictional meme marketplace for panic-cycle facewear, rare listings, and very serious unserious
              internet preparedness.
            </p>
            <div className="hero-actions">
              <a className="primary-button large" href="#shop">
                Browse masks
              </a>
              <a className="ghost-button large" href="https://x.com/MemeMask_" target="_blank" rel="noreferrer">
                Follow on X
              </a>
            </div>
          </div>
          <div className="deal-panel" aria-label="Featured marketplace stats">
            <div className="deal-header">
              <span>Today&apos;s hottest lot</span>
              <strong>Peak heat</strong>
            </div>
            <img src={featuredMask.image} alt={`${featuredMask.name} product preview`} />
            <div className="deal-row">
              <span>Current ask</span>
              <strong>{featuredMask.priceLabel}</strong>
            </div>
            <p>{featuredMask.caption}</p>
          </div>
        </section>

        <section className="market-strip" aria-label="Marketplace stats">
          <span>{masks.length} listings</span>
          <span>Same-day panic shipping</span>
          <span>Dexscreener checkout placeholder</span>
          <span>100% parody inventory</span>
        </section>

        <section className="shop" id="shop" aria-labelledby="shop-title">
          <div className="shop-heading">
            <div>
              <p className="eyebrow">MemeBay listings</p>
              <h2 id="shop-title">Shop the mask wall</h2>
            </div>
            <p>{visibleMasks.length} of {masks.length} masks shown</p>
          </div>

          <div className="controls" aria-label="Shop controls">
            <label className="search-field">
              <Search size={18} aria-hidden="true" />
              <span className="sr-only">Search masks</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search masks"
              />
            </label>
            <label>
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Sort</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rarity">Rarity</option>
              </select>
            </label>
          </div>

          <div className="product-grid">
            {visibleMasks.map((mask, index) => (
              <article className="product-card" key={mask.id}>
                <div className="image-wrap">
                  {index < 4 && <span className="hot-label">hot listing</span>}
                  <img src={mask.image} alt={mask.name} loading="lazy" />
                </div>
                <div className="card-body">
                  <div className="title-row">
                    <h3>{mask.name}</h3>
                    <span className={`rarity ${mask.rarity.toLowerCase()}`}>{mask.rarity}</span>
                  </div>
                  <p>{mask.caption}</p>
                  <div className="buy-row">
                    <strong>{mask.priceLabel}</strong>
                    <a href={mask.buyUrl} target="_blank" rel="noreferrer" aria-label={`Buy ${mask.name}`}>
                      Buy
                      <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>MEMEMASK</strong>
          <p>Built for the next panic cycle. Powered by $MASK and questionable listings.</p>
        </div>
        <div className="footer-links">
          <a href="https://x.com/MemeMask_" target="_blank" rel="noreferrer">X</a>
          <a href="https://dexscreener.com/" target="_blank" rel="noreferrer">Dexscreener</a>
        </div>
        <p className="disclaimer">
          <ShieldAlert size={15} aria-hidden="true" />
          MEMEMASK is a parody meme project. Not affiliated with referenced brands, platforms, characters, or
          properties. Not medical advice. Not protective equipment.
        </p>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
