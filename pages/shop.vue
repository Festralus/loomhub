<template>
  <!-- <Breadcrumbs_component /> -->

  <div class="shop-gallery">
    <!-- Filters -->
    <div class="shop__filters">
      <div class="filters__title">
        <div class="filters__title-text">Filters</div>
        <div class="filters__title-icon"></div>
      </div>

      <div class="horizontal-separator-90"></div>
      <!-- Category picker -->
      <div class="filters__list">
        <div class="filters__category__container">
          <div class="filters__category__item">
            <div class="category__item-text"></div>
            <div class="category__item-icon"></div>
          </div>
        </div>
      </div>

      <div class="horizontal-separator-90"></div>
      <!-- Price picker -->
      <div class="filters__price__container">
        <div class="filters__price__title">
          <div class="filters__price__title-text">Price</div>
          <div class="filters__price__title-icon"></div>
        </div>
        <div class="filters__price__slider">
          <div class="price__slider__line">
            <div class="price__slider__left-slider"></div>
            <div class="price__slider__right-slider"></div>
          </div>
        </div>
      </div>

      <div class="horizontal-separator-90"></div>
      <!-- Colors picker -->
      <div class="filters__colors__container">
        <div class="filters__colors__title">
          <div class="filters__colors__title-text">Colors</div>
          <div class="filters__colors__title-icon"></div>
        </div>
        <div class="colors__option__list">
          <div class="colors__option"></div>
        </div>
      </div>

      <div class="horizontal-separator-90"></div>
      <!-- Size picker -->
      <div class="filters__sizes__container">
        <div class="filters__sizes__title">
          <div class="filters__sizes__title-text">Sizes</div>
          <div class="filters__sizes__title-icon"></div>
        </div>

        <div class="filters__sizes__category">
          <div class="sizes__caregory__clothes">
            <div class="sizes__option__list">
              <div class="sizes__option"></div>
            </div>
          </div>
        </div>
        <div class="filters__sizes__category">
          <div class="sizes__caregory__shoes">
            <div class="sizes__option__list">
              <div class="sizes__option"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="horizontal-separator-90"></div>
      <!-- Dress Style picker -->
      <div class="filters__dress-style__container">
        <div class="filters__dress-style__title">
          <div class="filters__dress-style__title-text">Dress styles</div>
          <div class="filters__dress-style__title-icon"></div>
        </div>
        <div class="dress-style__options__list">
          <div class="dress-style__option"></div>
        </div>
      </div>

      <div class="horizontal-separator-90"></div>
      <!-- Dress Style picker -->
      <div class="filters__clothing-type__container">
        <div class="filters__clothing-type__title">
          <div class="filters__clothing-type__title-text">Clothing types</div>
          <div class="filters__clothing-type__title-icon"></div>
        </div>
        <div class="clothing-type__options__list">
          <div class="clothing-type__option"></div>
        </div>
      </div>

      <!-- Apply changes button -->
      <button class="filters__apply-button">Apply Filters</button>
    </div>
    <!-- Product gallery -->
    <div class="shop__products"></div>
  </div>

  <Subscribe_news_component />
</template>
<script setup>
import Breadcrumbs_component from '~/components/breadcrumbs_component.vue';
import Subscribe_news_component from '~/components/subscribe_news_component.vue';
</script>
<style scoped></style>
