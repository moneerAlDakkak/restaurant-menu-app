<template>
  <div>
    <Body class="m-theme-dark"></Body>
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss">
@include m-animation-fade("page");
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  min-height: 100vh;
  background: $color_main;
  color: $color_text;
  padding: m-ui-grid(2);
  header {
    margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: bold;
    }
  }
  main {
    h1 {
      margin: 0 0 1em;
      border-bottom: 2px solid $color_accent;
      width: fit-content;
    }
    > section {
      display: grid;
      grid-template-columns: repeat(var(--grid), 1fr);
      z-index: 0;
      gap: 20px;
      h2 {
        font-size: 1.5;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 0.97em;
        padding: 0 m-ui-grid(0.2);
      }
    }
  }
  [contenteditable="true"] {
    display: inline-block;
    padding: 0 10px !important;
    background-color: rgba(255, 255, 255, 0.1);
  }
}
.MMENU {
  > ul li {
    cursor: pointer;
  }
}
.category {
  i {
    color: grey;
  }
  input {
    background: m-change-color("text", $alpha: 0.1);
    color: $color_text;
    font-weight: bold;
    border: none;
    padding: 4px;
    width: fit-content;
    width: 140px;
    font-family: inherit;
    &[type="number"] {
      width: 50px;
    }
  }
}

@media (min-width: 1101px) {
  main > section {
    --grid: 3;
  }
}

@media (max-width: 1200px) {
  main > section {
    --grid: 2;
  }
}

@media (max-width: 900px) {
  main > section {
    --grid: 1;
  }
}
</style>
