import { d as n, c as a, a as r, o as s, b as c, u as l, _ as i } from './index-D9CJmY94.js'
const h = '/assets/example-B_uq3Jhe.jpg',
  m = { class: 'markdown-body' },
  p = n({
    __name: 'README',
    setup(o, { expose: d }) {
      return (
        d({ frontmatter: {}, excerpt: void 0 }),
        (t, e) => (
          s(),
          a(
            'div',
            m,
            e[0] ||
              (e[0] = [
                r(
                  `<h1>html-to-pdf 文档手册</h1><p>本库致力于 html 在线导出为 pdf，实现智能分页效果，不会切断文本图片表格等内容，可兼容手机端。本库依赖 html2canvas 和 jspdf，使用 canvas 绘图，请保证使用浏览器对以上库是支持的。</p><h3>安装</h3><pre><code class="language-bash"># 使用npm
npm i -S ai-html-to-pdf
# 使用yarn
yarn add ai-html-to-pdf
</code></pre><h3>用法</h3><pre><code class="language-ts">// ...
import htmlToPdf from &#39;ai-html-to-pdf&#39;

function exportPDF() {
  Loading.show()
  const element = document.getElementById(&#39;pdf-container&#39;)
  htmlToPdf
    .exportPDF(element, {
      name: &#39;葵花宝典&#39;,
    })
    .finally(() =&gt; {
      Loading.hide()
    })
}
</code></pre><h3>方法</h3><p>使用规则：htmlToPdf(element, PdfOptions)</p><ul><li>element 要导出的 dom 元素</li><li>PdfOptions 通过设置配置，来达到更理想的效果</li></ul><h3>PdfOptions</h3><table><thead><tr><th>参数</th><th>类型</th><th>必填项</th><th>默认</th><th>说明</th></tr></thead><tbody><tr><td>name</td><td>string</td><td>否</td><td>–</td><td>导出文件名称</td></tr><tr><td>monoblockClassName</td><td>string | string[]</td><td>否</td><td>‘html-pdf-monoblock’</td><td>分页处理时，将元素内容当作一个整体</td></tr><tr><td>scale</td><td>number</td><td>否</td><td>2</td><td>导出内容放大倍数，增加内容清晰度，必须大于 0</td></tr><tr><td>margin</td><td>number | number[]</td><td>否</td><td>10</td><td>PDF 内容边距</td></tr><tr><td>ignoreElement</td><td>(element: Element) =&gt; Element[]</td><td>否 ｜ 分页计算忽略的元素</td><td></td><td></td></tr><tr><td>resetStyleTags</td><td>string[]</td><td>否</td><td>需要重置样式的标签，目前只发现 h1-h6 标签在 html2canvas 中默认增加了 margin 值</td><td></td></tr><tr><td>header</td><td>string</td><td>否</td><td>–</td><td>页眉文案</td></tr><tr><td>headerAlign</td><td>‘center’ | ‘left’ | ‘right’</td><td>‘left’</td><td>页眉对齐方式</td><td></td></tr><tr><td>footer</td><td>string</td><td>否</td><td>–</td><td>页脚文案</td></tr><tr><td>footerAlign</td><td>‘center’ | ‘left’ | ‘right’</td><td>‘right’</td><td>页脚对齐方式</td><td></td></tr><tr><td>adaptive</td><td>boolean</td><td>true</td><td>是否开启自适应，开启自适应会根据设置宽度导出 PDF</td><td></td></tr><tr><td>adaptiveOptions</td><td>AdaptiveOptions</td><td>否</td><td>–</td><td>自适应导出 PDF 配置</td></tr></tbody></table><h3>AdaptiveOptions</h3><table><thead><tr><th>参数</th><th>类型</th><th>必填项</th><th>默认</th><th>说明</th></tr></thead><tbody><tr><td>pdfWidth</td><td>number</td><td>否</td><td>800</td><td>按此宽度绘制导出 PDF 内容</td></tr><tr><td>parentElement</td><td>HTMLElement</td><td>否</td><td>document.body</td><td>自适应创建元素挂载节点，必要时可以规避一些样式问题</td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr><tr><td>resetView</td><td>(element: Element) =&gt; void</td><td>否</td><td>–</td><td>自适应模式下，是克隆的元素，导致 canvas 无法展示，对内容重新绘制</td></tr><tr><td>resetViewDelay</td><td>number</td><td>否</td><td>1000</td><td>图表重绘后，延迟处理导出，给图表绘制预留充足的时间</td></tr></tbody></table><h2>License</h2><p>MIT</p>`,
                  15,
                ),
              ]),
          )
        )
      )
    },
  }),
  f = { class: 'wk-content' },
  _ = n({
    name: 'HomePage',
    __name: 'HomeView',
    setup(o) {
      return (d, t) => (
        s(),
        a('div', f, [
          t[0] ||
            (t[0] = r(
              '<h2 class="wk-content__title" data-v-ec599f7c>简述</h2><div class="wk-content__section" data-v-ec599f7c> 本插件旨在实现HTML导出PDF场景智能化分页，规避文字、图片、canvas等被分页切断。通常情况下，通用的报告文档，分页都具有良好的表现，但一些特殊情况，分页会变得复杂和难以控制，出于降低代码的复杂度,和特殊场景的稀少，特殊情况暂不采用智能分页。 </div><h2 class="wk-content__title" data-v-ec599f7c>智能分页思路</h2><div class="wk-content__section" data-v-ec599f7c> 本插件利用<a href="https://html2canvas.hertzen.com/" target="_blank" data-v-ec599f7c>html2canvas</a> 将Element元素生成一个Canvas，再根据PDF的高度进行分页计算，根据每一页的分页节点(Y坐标)截取部分内容，通过创建一个虚拟canvas，连同页眉页脚,绘制整个PDF单页，通过 <a href="https://www.jspdf.top/" target="_blank" data-v-ec599f7c>jspdf</a>将多个单页合并成一个完整的PDF文件。 </div><div class="wk-content__section" data-v-ec599f7c> 计算分页节点，会遇到文字、图片、表格、canvas等被切断，本插件会按照一定规则优化切断处Y坐标，避免内容被切断。 </div><ul class="wk-content__list" data-v-ec599f7c><li data-v-ec599f7c> 段落文案内容分页 - 通过段落的高度和行高比对，精确找出被合理分段的Y坐标，在该坐标位置进行分页。 </li><li data-v-ec599f7c> 图片、canvas、表格、自定义整体内容等分页 - 图片和canvas是一个整体；表格单行内容复杂，多个td内容无法精准对齐，故将表格的整行tr看作一个整体；图文组合、定位等脱离文档流的布局，都需看作一个整体。对整体内容分页，规则比较简单，当页无法容纳整体内容，则顺移到下一页。特殊情况，若整体内容超过PDF的单页高度，则默认不处理，即内容会被正常切断（若是有大量改场景，后期考虑予以支持）。 </li><li data-v-ec599f7c>自定义页眉页脚 - 页眉页脚目前仅支持文字，支持左、中、右三个位置。</li></ul><img class="wk-content__example" src="' +
                h +
                '" data-v-ec599f7c>',
              7,
            )),
          c(l(p)),
        ])
      )
    },
  }),
  g = i(_, [['__scopeId', 'data-v-ec599f7c']])
export { g as default }
