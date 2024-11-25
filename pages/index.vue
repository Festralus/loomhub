<template>
  <div class="website">
    <div class="top-menu">
      <div class="top-menu__logo">LoomHub</div>
      <nav class="top-menu__nav">
        <div class="top-menu__nav-item--shop top-menu__nav-item">Shop</div>
        <div class="top-menu__nav-item--sale top-menu__nav-item">On Sale</div>
        <div class="top-menu__nav-item--arrivals top-menu__nav-item">
          New Arrivals
        </div>
        <div class="top-menu__nav-item--brands top-menu__nav-item">Brands</div>
      </nav>
      <div class="top-menu__search">
        <div class="top-menu__search-icon">SVG-search</div>
        <div class="top-menu__search-input">Search for products...</div>
      </div>
      <div class="top-menu__actions">
        <div class="top-menu__actions-cart">SVG-cart</div>
        <div class="top-menu__actions-profile">SVG-profile</div>
      </div>
    </div>
    <div class="home-description">
      <div class="home-description__interactive">
        <div class="home-description__interactive--main-text">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </div>
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
    <div class="new-arrivals">
      <div class="new-arrivals__title">NEW ARRIVALS</div>
      <div class="new-arrivals__items">
        <div class="new-arrivals__items-item">
          <div class="new-arrivals__items-item__pic"></div>
          <div class="new-arrivals__items-item__title"></div>
          <div class="new-arrivals__items-item__rating"></div>
          <div class="new-arrivals__items-item__price">$ {{ item_price }}</div>
        </div>
      </div>
      <div class="new-arrivals__button">
        <div class="new-arrivals__button-text">View All</div>
      </div>
    </div>
  </div>
</template>
<script setup>
const item_price = 120;
</script>
<style></style>
