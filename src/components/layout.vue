<template>
  <main class="wk-layout">
    <WkHeader></WkHeader>
    <section class="wk-main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </section>
    <WkFooter></WkFooter>
  </main>
</template>
<script setup lang="ts">
import WkHeader from './header.vue'
import WkFooter from './footer.vue'
defineOptions({
  name: 'LayoutComponent',
})
</script>
<style lang="less" scoped>
.wk-layout {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  background-color: #f7f8fb;
}
.wk-main {
  flex: 1;
  position: relative;
  z-index: 0;
  width: 100%;
  overflow-y: auto;
}
</style>
