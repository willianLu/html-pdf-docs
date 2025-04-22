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
      <div class="export-btn">
        <a-checkbox v-model="isPageHeader" @change="handleResetHtmlPdf">页眉</a-checkbox>
        <a-checkbox v-model="isPageFooter" @change="handleResetHtmlPdf">页脚</a-checkbox>
        <a-checkbox v-model="isCover" @change="handleResetHtmlPdf">封面</a-checkbox>
        <a-checkbox v-model="isBackCover" @change="handleResetHtmlPdf">封底</a-checkbox>
      </div>
      <div class="export-btn">
        <div>自适应：<a-switch v-model="isAdaptive" @change="handleResetHtmlPdf" /></div>
      </div>
      <div class="export-btn flex-v-center">
        <a-button type="primary" size="small" @click="handlePreview" style="margin-right: 16px"
          >预览</a-button
        >
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
import HtmlToPdf, {
  CoverPlugin,
  type PdfOptions,
  type CoverPluginOptions,
} from '@wk-tools/html-to-pdf'
import Loading from '@/components/Loading'
import useWindowSize from '@/hooks/useWindowSize'
import { Message } from '@arco-design/web-vue'
import WkLogo from '@/assets/imgs/wk-logo.png'
import * as echarts from 'echarts'
import CoverBg from '@/assets/imgs/cover.jpg'

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
const isPageHeader = ref(true)
const isPageFooter = ref(true)
const isCover = ref(true)
const isBackCover = ref(true)
const isAdaptive = ref(true)

const rect = useWindowSize()
const isMobile = computed(() => {
  return rect.width.value < 768
})

let htmlToPdf: HtmlToPdf | null = null

function handleSelectComponent(item: CompItem) {
  if (compId.value === item.id) return
  htmlToPdf = null
  compId.value = item.id
  fileName.value = item.name
  comp.value = item.component
  window.scrollTo(0, 0)
}
function handleResetHtmlPdf() {
  htmlToPdf = null
}
async function handlePreview() {
  initHtmlToPdf()
  if (!htmlToPdf) {
    Message.error('预览失败')
    return
  }
  Loading.show()

  await htmlToPdf
    .preview()
    .catch(() => {
      Message.error('下载失败')
    })
    .finally(() => {
      Loading.hide()
    })
}
async function exportPdf() {
  initHtmlToPdf()
  if (!htmlToPdf) {
    Message.error('导出失败')
    return
  }
  Loading.show()
  await htmlToPdf
    .save()
    .catch(() => {
      Message.error('下载失败')
    })
    .finally(() => {
      Loading.hide()
    })
}
function initHtmlToPdf() {
  if (!pdfWrap.value || htmlToPdf) return
  const params: PdfOptions = {
    name: fileName.value,
    margin: [16, 10],
    monoblockClassName: ['arco-list-item', 'html-pdf-monoblock'],
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
        // 图册高度不同，找最高逻辑
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
        const cEl = element.querySelectorAll('.chart-item')
        cEl.forEach((item) => {
          const chart = echarts.getInstanceByDom(item as HTMLElement)
          if (chart) {
            const options = chart.getOption()
            item.setAttribute('_echarts_instance_', '')
            echarts.init(item as HTMLElement).setOption(options)
          }
        })
      },
    },
  }
  if (isPageHeader.value) {
    params.header = {
      image: WkLogo,
      imageWidth: 40,
      imageHeight: 10,
    }
  }
  if (isPageFooter.value) {
    params.footer = {
      text: '第{page}页',
    }
  }
  htmlToPdf = new HtmlToPdf(pdfWrap.value.$el, params)
  const coverOptions: CoverPluginOptions = {}
  if (isCover.value) {
    coverOptions.cover = {
      image: CoverBg,
    }
  }
  if (isBackCover.value) {
    coverOptions.backcover = {
      backgroundColor: '#88D2D7',
      text: '这是个封底',
    }
  }
  if (coverOptions.cover || coverOptions.backcover) {
    htmlToPdf.use(CoverPlugin, coverOptions)
  }
}
</script>
<style lang="less" scoped>
.wk-content {
  position: relative;
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
    top: 50px;
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
  top: 60px;
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
    margin-bottom: 12px;
    border-top: 1px solid #eee;
  }
}
.export-btn {
  padding: 0 0 12px;
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
