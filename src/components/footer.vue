<template>
  <footer class="wk-footer">
    <section class="wk-footer__content flex-v-center">
      @ 2025 智能化 HTML TO PDF - 使用html2canvas和jsPDF实现
    </section>
  </footer>
</template>
<script setup lang="ts">
defineOptions({
  name: 'HeaderComponent',
})
</script>
<style lang="less" scoped>
.wk-footer {
  background-color: #666;
  &__content {
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1200px;
    height: 50px;
    line-height: 1.4;
    font-size: 14px;
    color: #fff;
  }
}
</style>
