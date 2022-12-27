<template>
  <div>
    <h1 v-if="level === 1" v-bind="$attrs">
      <slot></slot>
    </h1>
    <h2 v-if="level === 2" v-bind="$attrs">
      <slot></slot>
    </h2>
    <h3 v-if="level === 3" v-bind="$attrs">
      <slot></slot>
    </h3>
    <h4 v-if="level === 4" v-bind="$attrs">
      <slot></slot>
    </h4>
    <h5 v-if="level === 5" v-bind="$attrs">
      <slot></slot>
    </h5>
    <h6 v-if="level === 6" v-bind="$attrs">
      <slot></slot>
    </h6>
  </div>
</template>

<script>
export default {
  name: "dynamicHeading",
  props: {
    level: Number,
  },
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
h3 {
  font-size: 1.3em;
  border-bottom: 2px solid $color_accent;
  width: fit-content;
}
h4 {
  font-size: 1.2em;
}
h5 {
  font-size: 1.1em;
}
h6 {
  font-size: 1em;
}
h3,
h4,
h5,
h6 {
  margin: 0.5em 0 0;
}
</style>
