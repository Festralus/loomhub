<!-- !! THIS PAGE WAS MOSTLY GENERATED !! -->
<template>
  <div class="form-wrapper">
    <h1>Add New Item</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group" v-for="field in fields" :key="field.name">
        <label :for="field.name">{{ field.label }}</label>
        <input
          v-if="!field.isArray"
          :id="field.name"
          v-model="form[field.name]"
          type="text"
          class="form-input"
          :class="{ 'bg-green-200': field.optional }"
        />
      </div>

      <!-- Stock Inputs -->
      <div class="form-group">
        <label>Stock:</label>
        <div
          v-for="(item, index) in form.stock"
          :key="index"
          class="stock-item"
        >
          <input v-model="item.size" placeholder="Size" class="form-input" />
          <input v-model="item.color" placeholder="Color" class="form-input" />
          <input
            v-model.number="item.quantity"
            type="number"
            placeholder="Quantity"
            class="form-input"
          />
          <button type="button" @click="removeStockItem(index)">Remove</button>
        </div>
        <button type="button" @click="addStockItem" class="add-button">
          + Add Stock
        </button>
      </div>

      <!-- Arrays like sizes, colors, dressStyle -->
      <div
        class="form-group"
        v-for="arrayField in arrayFields"
        :key="arrayField.name"
      >
        <label :for="arrayField.name"
          >{{ arrayField.label }} (separated by space)</label
        >
        <input
          :id="arrayField.name"
          v-model="form[arrayField.name]"
          type="text"
          class="form-input"
          :class="{ 'bg-green-200': arrayField.optional }"
        />
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <button type="submit" class="submit-button">Submit</button>
      <button type="button" class="clear-button" @click="clearForm">
        Clear
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// API endpoint
import { useApi } from '@/composables/useApi.js';
const api = useApi();

const form = ref({
  name: '',
  description: '',
  price: '',
  oldPrice: '',
  stock: [
    { size: '', color: '', quantity: 0 },
    { size: '', color: '', quantity: 0 },
    { size: '', color: '', quantity: 0 },
  ],
  sizes: '',
  colors: '',
  images: '',
  rating: '',
  salesCount: '',
  brand: '',
  clothingType: '',
  productCategory: '',
  composition: '',
  country: '',
  brandStyleID: '',
  careInstructions: '',
  detailsImages: '',
  dressStyle: [],
});

const fields = [
  { name: 'name', label: 'Name', optional: false },
  { name: 'description', label: 'Description', optional: true },
  { name: 'brand', label: 'Brand', optional: false },
  { name: 'clothingType', label: 'Clothing Type', optional: false },
  { name: 'productCategory', label: 'Product Category', optional: false },
  { name: 'price', label: 'Price', optional: false },
  { name: 'oldPrice', label: 'Old Price', optional: true },
  { name: 'composition', label: 'Composition', optional: true },
  { name: 'rating', label: 'Rating', optional: true },
  { name: 'salesCount', label: 'Sales Count', optional: true },
  { name: 'careInstructions', label: 'Care Instructions', optional: true },
  { name: 'country', label: 'Country', optional: true },
  { name: 'brandStyleID', label: 'Brand Style ID', optional: true },
];

const arrayFields = [
  { name: 'sizes', label: 'Sizes', optional: true },
  { name: 'colors', label: 'Colors', optional: true },
  { name: 'images', label: 'Images' },
  { name: 'detailsImages', label: 'Details Images' },
  { name: 'dressStyle', label: 'Dress Style' },
];

const errorMessage = ref('');

const addStockItem = () => {
  form.value.stock.push({ size: '', color: '', quantity: 0 });
};

const validateForm = () => {
  if (!form.value.name || !form.value.brand) {
    errorMessage.value = 'Name and Brand are required.';
    return false;
  }
  if (isNaN(form.value.price)) {
    errorMessage.value = 'Price must be a number.';
    return false;
  }

  errorMessage.value = '';
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  // Fill missing fields with defaults or random values
  if (!form.value.description) {
    form.value.description =
      'A timeless essential designed for everyday style and comfort. Crafted with care from quality materials, it offers a perfect blend of versatility, durability, and effortless appeal for any occasion.';
  }

  if (!form.value.price) {
    form.value.price = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  }
  if (!form.value.oldPrice) {
    form.value.oldPrice = null;
  }

  // For stock quantity if empty or 0
  form.value.stock = form.value.stock.map((item) => ({
    size: item.size || 'M',
    color: item.color || 'Multicolor',
    quantity: item.quantity || Math.floor(Math.random() * 20) + 1,
  }));

  // ✅ Auto-generate sizes from stock if sizes field is missing or empty
  if (!form.value.sizes || form.value.sizes.trim() === '') {
    const extractedSizes = Array.from(
      new Set(form.value.stock.map((item) => item.size).filter((size) => size))
    );
    form.value.sizes = extractedSizes.join(',');
  }

  // ✅ Auto-generate colors from stock if colors field is missing or empty
  if (!form.value.colors || form.value.colors.trim() === '') {
    const extractedColors = Array.from(
      new Set(
        form.value.stock.map((item) => item.color).filter((color) => color)
      )
    );
    form.value.colors = extractedColors.join(',');
  }

  if (!form.value.rating) {
    const random = Math.random() * (5 - 0.1) + 0.1;
    form.value.rating = Math.round(random * 10) / 10;
  }

  if (!form.value.composition) {
    form.value.composition = '100% cotton';
  }

  if (!form.value.salesCount) {
    form.value.salesCount = Math.floor(Math.random() * 200) + 1;
  }

  if (!form.value.clothingType) {
    form.value.clothingType = 'Unisex';
  }

  if (!form.value.country) {
    form.value.country = 'China';
  }

  if (!form.value.brandStyleID) {
    form.value.brandStyleID = Math.floor(
      1000000000 + Math.random() * 9000000000
    );
  }

  if (!form.value.dressStyle) {
    form.value.dressStyle = ['Casual'];
  }

  if (!form.value.careInstructions) {
    form.value.careInstructions =
      'Machine wash cold with similar colors or hand wash. Use mild detergent and avoid bleach. Tumble dry low or lay flat to dry. Iron on low heat if needed. Always check the care label before washing.';
  }

  const payload = {
    name: form.value.name,
    description: form.value.description,
    price: form.value.price,
    oldPrice: form.value.oldPrice,
    images: form.value.images.split(' ').map((img) => img.trim()),
    brand: form.value.brand,
    productCategory: form.value.productCategory,
    clothingType: form.value.clothingType,
    dressStyle:
      typeof form.value.dressStyle === 'string'
        ? form.value.dressStyle.split(',').map((style) => style.trim())
        : form.value.dressStyle,
    stock: form.value.stock,
    rating: form.value.rating,
    salesCount: form.value.salesCount,
    sizes: form.value.sizes.split(' ').map((s) => s.trim()),
    colors: form.value.colors.split(' ').map((c) => c.trim()),
    composition: form.value.composition,
    country: form.value.country,
    brandStyleID: form.value.brandStyleID,
    careInstructions: form.value.careInstructions,
    detailsImages: form.value.detailsImages.split(' ').map((img) => img.trim()),
  };

  console.log('Payload being sent:', payload);

  try {
    const { data } = await api.post('/api/addNewItem', payload);
    console.log('Item added:', data);
  } catch (error) {
    console.error('Error adding item:', error);
    console.log(error.response?.data); // (Safe access with ?)
  }
};

function removeStockItem(index) {
  form.value.stock.splice(index, 1);
}

const clearForm = () => {
  form.value = {
    name: '',
    description: '',
    price: '',
    stock: [
      { size: '', color: '', quantity: 0 },
      { size: '', color: '', quantity: 0 },
      { size: '', color: '', quantity: 0 },
    ],
    sizes: '',
    colors: '',
    images: '',
    rating: '',
    salesCount: '',
    brand: '',
    clothingType: '',
    productCategory: '',
    composition: '',
    country: '',
    brandStyleID: '',
    careInstructions: '',
    detailsImages: '',
    dressStyle: [],
  };
  errorMessage.value = '';
};
</script>

<style scoped>
.form-wrapper {
  max-width: 700px;
  margin: 40px auto;
  background: #f9f9f9;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #bbb;
  border-radius: 4px;
}

.stock-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.add-button {
  padding: 6px 12px;
  background-color: #e0e0e0;
  border: 1px solid #bbb;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.clear-button {
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #cd0909;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.error-message {
  color: red;
  margin-bottom: 15px;
}
</style>
