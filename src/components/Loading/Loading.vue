<template>
  <a-modal
    :simple="true"
    :mask="false"
    :closable="false"
    :footer="false"
    hide-title
    :modal-style="{ width: 'auto', padding: 0, backgroundColor: 'transparent' }"
  >
    <div v-if="showLoading" class="wk-loading-content">
      <icon-loading />
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
defineOptions({
  name: 'LoadingComponent',
})
const props = defineProps({
  delay: {
    type: Number,
    default: 500,
  },
})
const showLoading = ref(false)
if (props.delay > 0) {
  let timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
    showLoading.value = true
    timer = null
  }, props.delay)
  onUnmounted(() => {
    if (timer) {
      clearTimeout(timer)
    }
  })
}
</script>
<style lang="less" scoped>
.wk-loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  font-size: 32px;
  color: #fff;
}
</style>
