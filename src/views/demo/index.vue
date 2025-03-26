<template>
  <div
    class="wk-content"
    :class="{
      'wk-mobile': isMobile,
    }"
  >
    <div class="wk-feature">
      <h2>示例组件</h2>
      <div v-if="isMobile" class="wk-feature__mobile">
        <div>
          <span
            v-for="item in compList"
            :key="item.id"
            :class="{ active: item.id === compId }"
            @click="handleSelectComponent(item)"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <div v-else class="wk-feature__component">
        <span
          v-for="item in compList"
          :key="item.id"
          :class="{ active: item.id === compId }"
          @click="handleSelectComponent(item)"
          >{{ item.name }}</span
        >
      </div>
      <h2 class="wk-feature__operate">操作栏</h2>
      <div class="export-btn flex-center-space-between">
        <div>自适应：<a-switch v-model="isAdaptive" /></div>
        <a-button type="primary" size="small" status="success" @click="exportPdf">导出</a-button>
      </div>
    </div>
    <div class="wk-demo" ref="box">
      <KeepAlive>
        <component :is="comp" ref="pdfWrap"></component>
      </KeepAlive>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import FirstDemo from './components/first.vue'
import ReportDemo from './components/report.vue'
import PhotoDemo from './components/photo.vue'
import htmlToPdf from 'ai-html-to-pdf'
import Loading from '@/components/Loading'
import useWindowSize from '@/hooks/useWindowSize'
import { Message } from '@arco-design/web-vue'

defineOptions({
  name: 'DemoPage',
})
interface CompItem {
  id: string
  name: string
  component: typeof FirstDemo
}
const pdfWrap = ref()
const box = shallowRef()
const compList: CompItem[] = [
  {
    id: 'first',
    name: '沁园春雪',
    component: FirstDemo,
  },
  {
    id: 'report',
    name: '报告',
    component: ReportDemo,
  },
  {
    id: 'photo',
    name: '图册',
    component: PhotoDemo,
  },
]
const compId = ref(compList[0].id)
const fileName = ref(compList[0].name)
const comp = shallowRef(compList[0].component)
const isAdaptive = ref(true)

const rect = useWindowSize()
const isMobile = computed(() => {
  return rect.width.value < 768
})

function handleSelectComponent(item: CompItem) {
  if (compId.value === item.id) return
  compId.value = item.id
  fileName.value = item.name
  comp.value = item.component
}
async function exportPdf() {
  Loading.show()
  htmlToPdf(pdfWrap.value.$el, {
    name: fileName.value,
    ignoreElement(el: Element) {
      const children: Element[] = []
      if (el.tagName.toLowerCase() === 'table') {
        for (let i = 0; i < el.children.length; i++) {
          const child = el.children[i]
          if (child.tagName.toLowerCase() !== 'colgroup') {
            children.push(child)
          }
        }
        return children
      } else if (el.classList.contains('html-pdf-grid') && el.children.length) {
        const mp: Record<string, Element> = {}
        let min = 0
        let max = 0
        // 查找每一行最高的元素，将该元素作为分页依照
        for (let i = 0; i < el.children.length; i++) {
          const child = el.children[i]
          const rect = child.getBoundingClientRect()
          if (i !== 0 && rect.top > max) {
            children.push(mp[min + '_' + max])
          }
          if (i === 0 || rect.top < min || rect.top > max) {
            min = rect.top
            max = rect.top + rect.height
            mp[min + '_' + max] = child
          }
        }
        children.push(mp[min + '_' + max])
        return children
      }
      return Array.from(el.children)
    },
    adaptive: isAdaptive.value,
    adaptiveOptions: {
      parentElement: box.value,
      async resetView(element: Element) {
        if (compId.value === 'report') {
          const arr = element.querySelectorAll('.chart-item')
          if (arr[0]) {
            pdfWrap.value.resetMelonChart(arr[0])
          }
          if (arr[1]) {
            pdfWrap.value.resetVegetableChart(arr[1])
          }
        }
      },
    },
    header: '中华文化',
    footer: '第{page}页',
  })
    .then(() => {
      Message.success('导出成功')
    })
    .catch((error: Error) => {
      console.log(error)
      Message.error('导出失败')
    })
    .finally(() => {
      if (compId.value === 'report' && isAdaptive.value) {
        pdfWrap.value.resetMelonChart()
        pdfWrap.value.resetVegetableChart()
      }
      Loading.hide()
    })
}
</script>
<style lang="less" scoped>
.wk-content {
  padding: 10px 0;
  margin: 0 auto;
  display: flex;
  max-width: 1044px;
}
.wk-mobile {
  display: block;
  padding-top: 0;
  .wk-feature {
    margin-bottom: 10px;
    margin-right: 0;
    top: 0;
    width: 100%;
  }
}
.wk-demo {
  max-width: 832px;
  width: 100%;
  padding: 16px;
  height: 100%;
  background-color: #fff;
  overflow: auto;
}
.wk-feature {
  position: sticky;
  top: 10px;
  right: 0;
  z-index: 1;
  flex-shrink: 0;
  margin-right: 12px;
  padding: 0 16px;
  width: 200px;
  height: fit-content;
  background-color: #fff;
  &__component {
    padding: 10px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      margin: 6px 10px 6px 0;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }
    span:hover,
    .active {
      color: #165dff;
    }
  }
  &__mobile {
    overflow: auto;
    div {
      display: inline-block;
      white-space: nowrap;
    }
    span {
      line-height: 32px;
      margin-right: 10px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }
    .active {
      color: #165dff;
    }
  }
  h2 {
    padding: 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #eee;
  }
  &__operate {
    border-top: 1px solid #eee;
  }
}
.export-btn {
  padding: 12px 0;
}
.wk-demo :deep(.wk-section) {
  font-size: 16px;
  line-height: 26px;
  h2 {
    padding: 10px 0;
    text-align: center;
    line-height: 1;
    font-size: 24px;
  }
  h3 {
    margin: 16px 0;
    padding: 0 0 0 12px;
    border-left: 10px solid #4f9cee;
    line-height: 1;
    font-size: 20px;
  }
  p {
    text-indent: 32px;
  }
  .img-border {
    border: 1px solid #eee;
  }
  img {
    max-width: 100%;
  }
  ul {
    padding-left: 16px;
    li {
      list-style: disc;
    }
  }
  .chart-item {
    height: 300px;
  }
  .placeholder {
    height: 16px;
  }
  .flex-wrap-item {
    flex-wrap: wrap;
    > * {
      margin-bottom: 16px;
    }
  }
  .img-text {
    img {
      float: left;
      margin-right: 10px;
    }
    span {
      overflow: hidden;
    }
  }
  .wk-tip {
    color: #ee5353;
  }
}
</style>
