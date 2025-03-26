<template>
  <section class="wk-nav flex-v-center">
    <button
      v-for="item in list"
      :key="item.name"
      :class="{
        active: item.path === route.path,
      }"
      @click="toPage(item)"
    >
      {{ item.name }}
    </button>
  </section>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'NavComponent',
})
const list = [
  {
    name: '指南',
    path: '/home',
  },
  {
    name: '示例',
    path: '/demo',
  },
]
const route = useRoute()
const router = useRouter()
function toPage(item: Record<string, string>) {
  if (item.path) {
    router.push(item.path)
  }
}
</script>
<style lang="less" scoped>
.wk-nav {
  button {
    padding: 0 15px;
    height: 28px;
    background-color: transparent;
    font-size: 14px;
    color: #4e5969;
    cursor: pointer;
  }
  .active {
    color: #165dff;
  }
}
</style>
