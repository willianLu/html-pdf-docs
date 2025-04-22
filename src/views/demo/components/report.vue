<template>
  <section class="wk-section">
    <h2>瓜果蔬菜报告</h2>
    <h3>简介</h3>
    <p>
      水果，是指多汁且主要味觉为甜味和酸味，可食用的植物果实。水果不但含有丰富的维生素营养，而且能够促进消化。
    </p>
    <p>
      蔬菜（vegetables）是指可以做菜、烹饪成为食品的一类植物或菌类，蔬菜是人们日常饮食中必不可少的食物之一。蔬菜可提供人体所必需的多种维生素和矿物质等营养物质。
    </p>
    <p>
      据联合国粮食及农业组织1990年统计，人体必需的维生素C的90%、维生素A的60%来自蔬菜。此外，蔬菜中还有多种多样的植物化学物质，是人们公认的对健康有效的成分，已知果蔬中的营养素可以有效预防慢性、退行性疾病的多种物质，正在被人们研究发现。
    </p>
    <ul>
      <li v-for="item in 4" :key="item">
        西瓜的分类历史可追溯到18世纪。1775年，福斯卡尔首次称呼西瓜植物为Citrullus，根据优先法则，许多植物学家认为他是西瓜属的订名人，但由于福斯卡尔没有作出属的判断，因而按照国际植物命名法规不予以承认；1835年，植物分类学家施奈德正式将西瓜植物订名为西瓜属，从而被第七届国际植物学大会承认为合法。
      </li>
    </ul>
    <h3>趋势</h3>
    <div class="chart-item" ref="melonChartEl"></div>
    <h3>瓜果列表</h3>
    <a-table :columns="columns" :data="melonList" :pagination="false" />
    <a-list style="margin-top: 16px">
      <a-list-item v-for="idx in 5" :key="idx" class="html-pdf-monoblock">
        <a-list-item-meta
          title="西瓜"
          description="西瓜（学名：Citrullus lanatus (Thunb.) Matsum. et Nakai），为葫芦科西瓜属 [2]一年生蔓生藤本植物 [3]，又名寒瓜、水瓜、西瓜皮等 [1]。"
        >
          <template v-if="avatarUrl" #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="avatarUrl" />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <h3>趋势</h3>
    <div class="chart-item" ref="vegetableChartEl"></div>
    <h3>蔬菜列表</h3>
    <a-table :columns="columns" :data="vegetableList" :pagination="false" />
    <a-list style="margin-top: 16px">
      <a-list-item v-for="idx in 8" :key="idx" class="html-pdf-monoblock">
        <a-list-item-meta
          title="西瓜"
          description="西瓜（学名：Citrullus lanatus (Thunb.) Matsum. et Nakai），为葫芦科西瓜属 [2]一年生蔓生藤本植物 [3]，又名寒瓜、水瓜、西瓜皮等 [1]。"
        >
          <template v-if="avatarUrl" #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="avatarUrl" />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <h3>西瓜起源</h3>
    <p>
      起源于非洲，主要分布于地中海东部、非洲热带、亚洲西部。广泛分布在全世界热带、亚热带和温带地区，野生、半栽培和栽培植物。模式种西瓜性喜高温干燥气候，生长适宜温度为25-30℃，6-10℃时易受寒害。全年月平均气温在19℃以上的月份超过3个月的地区可露地生长。属长日照植物，喜强光，光饱和点为80000勒克斯。耐旱力强，要求排水良好、土层深厚、pH值5-7的砂质壤土。
    </p>
    <h3>西瓜价值</h3>
    <p>
      西瓜属中的西瓜的果实为夏季之水果，果肉味甜，能降温去暑；种子含油，可作消遣食品；果皮药用，有清热、利尿、降血压之效。
    </p>
    <p>
      西瓜属中的西瓜的果实为夏季之水果，果肉味甜，能降温去暑；种子含油，可作消遣食品；果皮药用，有清热、利尿、降血压之效。
    </p>
    <p>
      西瓜属中的西瓜的果实为夏季之水果，果肉味甜，能降温去暑；种子含油，可作消遣食品；果皮药用，有清热、利尿、降血压之效。
    </p>
    <p>
      起源于非洲，主要分布于地中海东部、非洲热带、亚洲西部。广泛分布在全世界热带、亚热带和温带地区，野生、半栽培和栽培植物。模式种西瓜性喜高温干燥气候，生长适宜温度为25-30℃，6-10℃时易受寒害。全年月平均气温在19℃以上的月份超过3个月的地区可露地生长。属长日照植物，喜强光，光饱和点为80000勒克斯。耐旱力强，要求排水良好、土层深厚、pH值5-7的砂质壤土。
    </p>
    <p>
      起源于非洲，主要分布于地中海东部、非洲热带、亚洲西部。广泛分布在全世界热带、亚热带和温带地区，野生、半栽培和栽培植物。模式种西瓜性喜高温干燥气候，生长适宜温度为25-30℃，6-10℃时易受寒害。全年月平均气温在19℃以上的月份超过3个月的地区可露地生长。属长日照植物，喜强光，光饱和点为80000勒克斯。耐旱力强，要求排水良好、土层深厚、pH值5-7的砂质壤土。
    </p>
    <p>
      起源于非洲，主要分布于地中海东部、非洲热带、亚洲西部。广泛分布在全世界热带、亚热带和温带地区，野生、半栽培和栽培植物。模式种西瓜性喜高温干燥气候，生长适宜温度为25-30℃，6-10℃时易受寒害。全年月平均气温在19℃以上的月份超过3个月的地区可露地生长。属长日照植物，喜强光，光饱和点为80000勒克斯。耐旱力强，要求排水良好、土层深厚、pH值5-7的砂质壤土。
    </p>
    <p>
      起源于非洲，主要分布于地中海东部、非洲热带、亚洲西部。广泛分布在全世界热带、亚热带和温带地区，野生、半栽培和栽培植物。模式种西瓜性喜高温干燥气候，生长适宜温度为25-30℃，6-10℃时易受寒害。全年月平均气温在19℃以上的月份超过3个月的地区可露地生长。属长日照植物，喜强光，光饱和点为80000勒克斯。耐旱力强，要求排水良好、土层深厚、pH值5-7的砂质壤土。
    </p>
  </section>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
import useWindowSize from '@/hooks/useWindowSize'
import { networkImageToLocal } from '@/utils'
import Loading from '@/components/Loading'

defineOptions({
  name: 'ReportDemo',
})
const rect = useWindowSize()
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '数量',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
]
const melonList = [
  {
    name: '西瓜',
    count: 10,
    price: 10,
  },
  {
    name: '哈密瓜',
    count: 10,
    price: 10,
  },
  {
    name: '木瓜',
    count: 10,
    price: 10,
  },
  {
    name: '火龙果',
    count: 10,
    price: 10,
  },
  {
    name: '黄瓜',
    count: 10,
    price: 10,
  },
  {
    name: '苹果',
    count: 10,
    price: 10,
  },
  {
    name: '菜瓜',
    count: 10,
    price: 10,
  },
  {
    name: '冬瓜',
    count: 10,
    price: 10,
  },
  {
    name: '南瓜',
    count: 10,
    price: 10,
  },
  {
    name: '北瓜',
    count: 10,
    price: 10,
  },
]
const vegetableList = [
  {
    name: '芹菜',
    count: 10,
    price: 10,
  },
  {
    name: '香菜',
    count: 10,
    price: 10,
  },
  {
    name: '大葱',
    count: 10,
    price: 10,
  },
  {
    name: '生菜',
    count: 10,
    price: 10,
  },
  {
    name: '酱菜',
    count: 10,
    price: 10,
  },
  {
    name: '紫菜',
    count: 10,
    price: 10,
  },
  {
    name: '四叶青',
    count: 10,
    price: 10,
  },
  {
    name: '油麦菜',
    count: 10,
    price: 10,
  },
]
const avatarUrl = ref('')
const melonChartEl = ref()
let melonChart: echarts.ECharts | null

const vegetableChartEl = ref()
let vegetableChart: echarts.ECharts | null

Loading.show()
networkImageToLocal('https://picsum.photos/40/40').then((url) => {
  avatarUrl.value = url
  Loading.hide()
})

onMounted(() => {
  initChart()
})
watch(rect.width, () => {
  melonChart?.resize()
  vegetableChart?.resize()
})
function initChart() {
  if (melonChartEl.value) {
    initMelonChart()
  }
  if (vegetableChartEl.value) {
    initVegetableChart()
  }
}
function initMelonChart() {
  melonChart = echarts.init(melonChartEl.value)
  melonChart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  })
}
function initVegetableChart() {
  vegetableChart = echarts.init(vegetableChartEl.value)
  vegetableChart.setOption({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  })
}
</script>
