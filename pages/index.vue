<template>
  <div>
    <Title>Royal Dish</Title>
    <header>
      <span> Royal Dish </span>
    </header>
    <main>
      <h1>Our Menu</h1>
      <section>
        <Category
          v-for="category in menu.categories"
          :key="category.name"
          :category="category"
        />
      </section>
    </main>
  </div>
</template>

<script setup>
const menu = await $fetch("/api/menu");
</script>

<style lang="scss"></style>
