<script setup>
import { ref } from 'vue'
const props = defineProps({ categories: { type: Array, default: () => [] }, modelValue: { type: Object, default: () => ({}) } })
const emit = defineEmits(['update:modelValue'])
const expanded = ref('Category')
function update(key, value) { emit('update:modelValue', { ...props.modelValue, [key]: value }) }
function chooseCategory(category) { update('category', props.modelValue.category === category ? '' : category) }
</script>
<template>
  <aside class="filters">
    <div class="filter-head"><span class="eyebrow">Refine by</span><button @click="emit('update:modelValue', {})">Clear all</button></div>
    <section><button class="filter-title" @click="expanded = expanded === 'Category' ? '' : 'Category'">Category <span>＋</span></button><div v-if="expanded === 'Category'" class="filter-options"><button v-for="category in categories" :key="category" :class="{ selected: modelValue.category === category }" @click="chooseCategory(category)">{{ category }}</button></div></section>
    <section><button class="filter-title" @click="expanded = expanded === 'Price' ? '' : 'Price'">Price <span>＋</span></button><div v-if="expanded === 'Price'" class="filter-options"><label>Up to ${{ modelValue.maxPrice || 200 }}</label><input type="range" min="20" max="200" step="5" :value="modelValue.maxPrice || 200" @input="update('maxPrice', Number($event.target.value))"></div></section>
    <section><button class="filter-title" @click="expanded = expanded === 'Color' ? '' : 'Color'">Color <span>＋</span></button><div v-if="expanded === 'Color'" class="filter-options swatches"><button v-for="color in ['Ivory', 'Olive', 'Sand', 'Chestnut', 'Sage', 'Natural']" :key="color" :class="{ selected: modelValue.color === color }" @click="update('color', modelValue.color === color ? '' : color)">{{ color }}</button></div></section>
    <section><button class="filter-title" @click="expanded = expanded === 'Size' ? '' : 'Size'">Size <span>＋</span></button><div v-if="expanded === 'Size'" class="sizes"><button v-for="size in ['XS', 'S', 'M', 'L', 'XL']" :key="size" :class="{ selected: modelValue.size === size }" @click="update('size', modelValue.size === size ? '' : size)">{{ size }}</button></div></section>
  </aside>
</template>
<style scoped>
.filter-head{display:flex;justify-content:space-between;align-items:center;padding:0 0 14px}.filter-head button{background:none;border:0;text-decoration:underline;font-size:10px;color:#777}.filters section{border-top:1px solid #e8e7e1;padding:15px 0}
.filter-title{background:none;border:0;display:flex;justify-content:space-between;width:100%;padding:0;font-size:12px;font-weight:600}.filter-title span{font-size:15px;font-weight:400}
.filter-options{display:flex;flex-direction:column;align-items:flex-start;gap:10px;padding:15px 0 0}.filter-options button{background:none;border:0;padding:0;color:#73746c;font-size:12px}.filter-options button.selected,.sizes button.selected{color:#25251f;font-weight:700;text-decoration:underline}
.filter-options input{width:100%;accent-color:#5e6650}.filter-options label{font-size:11px;color:#777}.sizes{display:flex;gap:7px;padding-top:14px}.sizes button{background:white;border:1px solid #deded8;min-width:35px;height:34px;font-size:11px}
.swatches{display:grid;grid-template-columns:1fr 1fr}
</style>
