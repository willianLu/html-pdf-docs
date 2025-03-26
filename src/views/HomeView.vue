<template>
  <div class="wk-content">
    <h2 class="wk-content__title">简述</h2>
    <div class="wk-content__section">
      本插件旨在实现HTML导出PDF场景智能化分页，规避文字、图片、canvas等被分页切断。通常情况下，通用的报告文档，分页都具有良好的表现，但一些特殊情况，分页会变得复杂和难以控制，出于降低代码的复杂度,和特殊场景的稀少，特殊情况暂不采用智能分页。
    </div>
    <h2 class="wk-content__title">智能分页思路</h2>
    <div class="wk-content__section">
      本插件利用<a href="https://html2canvas.hertzen.com/" target="_blank">html2canvas</a>
      将Element元素生成一个Canvas，再根据PDF的高度进行分页计算，根据每一页的分页节点(Y坐标)截取部分内容，通过创建一个虚拟canvas，连同页眉页脚,绘制整个PDF单页，通过
      <a href="https://www.jspdf.top/" target="_blank">jspdf</a>将多个单页合并成一个完整的PDF文件。
    </div>
    <div class="wk-content__section">
      计算分页节点，会遇到文字、图片、表格、canvas等被切断，本插件会按照一定规则优化切断处Y坐标，避免内容被切断。
    </div>
    <ul class="wk-content__list">
      <li>
        段落文案内容分页 -
        通过段落的高度和行高比对，精确找出被合理分段的Y坐标，在该坐标位置进行分页。
      </li>
      <li>
        图片、canvas、表格、自定义整体内容等分页 -
        图片和canvas是一个整体；表格单行内容复杂，多个td内容无法精准对齐，故将表格的整行tr看作一个整体；图文组合、定位等脱离文档流的布局，都需看作一个整体。对整体内容分页，规则比较简单，当页无法容纳整体内容，则顺移到下一页。特殊情况，若整体内容超过PDF的单页高度，则默认不处理，即内容会被正常切断（若是有大量改场景，后期考虑予以支持）。
      </li>
      <li>自定义页眉页脚 - 页眉页脚目前仅支持文字，支持左、中、右三个位置。</li>
    </ul>
    <img class="wk-content__example" src="@/assets/imgs/example.jpg" />
    <Readme></Readme>
  </div>
</template>
<script setup lang="ts">
import Readme from '../../README.md'
import 'github-markdown-css'
defineOptions({
  name: 'HomePage',
})
</script>
<style lang="less" scoped>
.wk-content {
  margin: 10px auto;
  padding: 16px;
  max-width: 1044px;
  background-color: #fff;
  line-height: 1.5;
  font-size: 16px;
  &__title {
    padding: 12px 0;
    font-size: 18px;
  }
  &__section {
    text-indent: 32px;
    a {
      color: #08a1f8;
    }
  }
  &__list {
    padding-left: 32px;
    li {
      list-style: square;
    }
  }
  &__example {
    margin: 0 auto;
    display: block;
    max-width: 400px;
  }
}
</style>
