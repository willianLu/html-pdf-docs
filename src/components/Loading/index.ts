import { createApp } from 'vue'
import LoadingComponent from './Loading.vue'
import { isNumber } from '@/utils/util'

let LoadingInstance: ReturnType<typeof createApp> | null = null
const root = document.createElement('div')
let timestamp = 0

// 显示 Loading 组件
function show(delay?: number) {
  // 已存在 Loading 实例，则不做展示处理
  if (LoadingInstance) return
  delay = isNumber(delay) && delay >= 0 ? delay : 500
  timestamp = Date.now() + delay
  document.body.appendChild(root)
  LoadingInstance = createApp(LoadingComponent, {
    visible: true,
    delay,
  })
  LoadingInstance.mount(root)
}

function removeLoadingInstance() {
  // 存在 Loading 实例，方可关闭 Loading 展示
  if (LoadingInstance) {
    LoadingInstance.unmount()
    LoadingInstance = null
    document.body.removeChild(root)
    timestamp = 0
  }
}
// 隐藏 Loading 组件
function hide() {
  const temp = Date.now()
  if (temp < timestamp + 300) {
    setTimeout(
      () => {
        removeLoadingInstance()
      },
      timestamp + 300 - temp,
    )
  } else {
    removeLoadingInstance()
  }
}

export default {
  show,
  hide,
}
