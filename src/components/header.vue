<template>
  <header class="wk-header">
    <section class="wk-header__content">
      <div class="wk-header__top flex-center-space-between">
        <div>HTML TO PDF</div>
        <WkNav></WkNav>
      </div>
    </section>
  </header>
</template>
<script setup lang="ts">
import WkNav from './nav.vue'
defineOptions({
  name: 'HeaderComponent',
})
</script>
<style lang="less" scoped>
.wk-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  &__content {
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1200px;
  }
  &__top {
    height: 50px;
  }
}
</style>
