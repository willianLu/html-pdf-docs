<template>
  <WkHeader></WkHeader>
  <section ref="main" class="wk-main">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <WkFooter></WkFooter>
  </section>
</template>
<script setup lang="ts">
import WkHeader from './header.vue'
import WkFooter from './footer.vue'

defineOptions({
  name: 'LayoutComponent',
})
</script>
<style lang="less" scoped>
.wk-main {
  position: relative;
  padding-top: 50px;
  width: 100%;
  height: 100%;
}
</style>
