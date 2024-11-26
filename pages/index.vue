<template>
  <div class="website">
    <header class="top-menu">
      <div class="top-menu__logo">LoomHub</div>
      <nav class="top-menu__nav">
        <div class="top-menu__nav-item top-menu__nav-item--shop">Shop</div>
        <div class="top-menu__nav-item">On Sale</div>
        <div class="top-menu__nav-item">New Arrivals</div>
        <div class="top-menu__nav-item">Brands</div>
      </nav>
      <div class="top-menu__search">
        <div class="top-menu__search-icon" aria-label="Search">SVG-search</div>
        <input
          type="text"
          class="top-menu__search-input"
          placeholder="Search
        for products..."
          aria-label="Search for products"
        />
      </div>
      <div class="top-menu__actions">
        <div class="top-menu__actions-cart">SVG-cart</div>
        <div class="top-menu__actions-profile">SVG-profile</div>
      </div>
    </header>
    <div class="home-description">
      <div class="home-description__interactive">
        <h2 class="home-description__interactive--main-text">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h2>
        <div class="home-description__interactive--secondary-text">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </div>
        <div class="home-description__interactive--button">
          <div class="home-description__interactive--button-text">Shop Now</div>
        </div>
        <div class="home-description__interactive--stats">
          <div class="home-description__interactive--stats-brands">
            200+ International Brands
          </div>
          <div class="home-description__interactive--stats-products">
            2,000+ High-Quality Products
          </div>
          <div class="home-description__interactive--stats-customers">
            30,000+ Happy Customers
          </div>
        </div>
      </div>
      <div class="home-description__background">
        <div class="home-description__background--big-star"></div>
        <div class="home-description__background--small-star"></div>
        <div class="home-description__background--image"></div>
      </div>
    </div>
    <div class="popular-brands">
      <div class="popular-brands__certain-brand">SVG-versace</div>
      <div class="popular-brands__certain-brand">SVG-zara</div>
      <div class="popular-brands__certain-brand">SVG-gucci</div>
      <div class="popular-brands__certain-brand">SVG-prada</div>
      <div class="popular-brands__certain-brand">SVG-CalvinKlein</div>
    </div>
    <!-- Combine new-arrivals and top-selling ?? -->
    <div class="new-arrivals">
      <div class="new-arrivals__title">NEW ARRIVALS</div>
      <div class="new-arrivals__items">
        <div class="new-arrivals__items-item">
          <div class="new-arrivals__items-item__pic"></div>
          <div class="new-arrivals__items-item__title"></div>
          <div class="new-arrivals__items-item__rating"></div>
          <div class="new-arrivals__items-item__price">
            $ {{ new_item_price }}
          </div>
        </div>
      </div>
      <div class="new-arrivals__button">
        <div class="new-arrivals__button-text">View All</div>
      </div>
    </div>
    <div class="top-selling">
      <div class="top-selling__title">TOP SELLING</div>
      <div class="top-selling__items">
        <div class="top-selling__items-item">
          <div class="top-selling__items-item__pic"></div>
          <div class="top-selling__items-item__title"></div>
          <div class="top-selling__items-item__rating"></div>
          <div class="top-selling__items-item__price">
            $ {{ top_item_price }}
          </div>
        </div>
      </div>
      <div class="top-selling__button">
        <div class="top-selling__button-text">View All</div>
      </div>
    </div>
    <div class="style-masonry">
      <div class="style-masonry__title">BROWSE BY dress STYLE</div>
      <div class="style-masonry__tileset">
        <div class="style-masonry__tileset__tile">
          <div class="style-masonry__tileset__tile-text">
            {{ style_tile_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const new_item_price = 120;
const top_item_price = 220;
const style_tile_name = "Casual";
</script>
<style></style>
