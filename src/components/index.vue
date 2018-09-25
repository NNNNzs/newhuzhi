<template>
<div class="layout">
  <n-banner></n-banner>
  <div class="main-container">
    <n-main></n-main>
    <n-side></n-side>
  </div>
</div>
</template>
<script>
import nBanner from "./banner.vue";
import nMain from "./main.vue";
import nSide from "./side.vue";
export default {
  data() {
    return {};
  },
  components: {
    nBanner,
    nMain,
    nSide
  }
};
</script>

<style>
.main-container {
  margin-top: 10px;
  width: 1000px;
  margin: 0 auto;
}
.main-side {
  margin-left: 10px;
  width: 330px;
  float: left;
}
</style>
