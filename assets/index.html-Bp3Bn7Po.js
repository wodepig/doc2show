import{_ as e,c as n,a,o as l}from"./app-D6s_7T7O.js";const o="/doc2show/img/7/1.png",i={};function p(s,t){return l(),n("div",null,t[0]||(t[0]=[a(`<p>大家好，我是村长！</p><p>上一讲我们掌握了项目中静态资源的使用方法，并整合的样式库 Tailwindcss。要快速构建视图，我们还需要引入一个组件库。我估计大家应该挺烦每次使用组件时的各种导入和注册操作，这点 Nuxt3 早就解决了，组件用就完了！而且不仅仅是组件，项目中的复用逻辑 composables，工具方法 utils 等都会自动导入，这可以有效提升开发体验。</p><p>下面我们就来体验一下 Nuxt3 丝滑的自动导入功能！</p><h2 id="nuxt-自动导入特性" tabindex="-1"><a class="header-anchor" href="#nuxt-自动导入特性"><span>Nuxt 自动导入特性</span></a></h2><p>Nuxt3 中会处理以下依赖的自动导入。</p><ul><li><p>Nuxt 自动导入：数据访问 useFetch、状态管理 useState、App 上下文 useNuxtApp、运行时配置 useRuntimeConfig 等等。</p></li><li><p>Vue自动导入：ref、reactive、computed 等等。</p></li><li><p>基于路径自动导入：</p><ul><li><p>组件目录：/components ；</p></li><li><p>hooks目录：/composables ；</p></li><li><p>工具库目录：/utils 。</p></li></ul></li></ul><h2 id="组件自动导入" tabindex="-1"><a class="header-anchor" href="#组件自动导入"><span>组件自动导入</span></a></h2><p>Nuxt 中约定把组件放在<code>components/</code>目录中，这些组件只要被用在页面或其他组件中，就会自动导入并注册。</p><p>创建 components/Navbar.vue：</p><pre><code>&lt;template&gt;
  &lt;nav
    class=&quot;border-b border-slate-200 px-5 py-2 flex items-center justify-between&quot;
  &gt;
    &lt;h1 class=&quot;text-2xl font-bold&quot;&gt;Nuxt3 in Action&lt;/h1&gt;
    &lt;img
      class=&quot;w-[50px] border-[1px] border-slate-300 rounded-full inline-block&quot;
      src=&quot;~/assets/avatar.png&quot;
      alt=&quot;avatar&quot;
    /&gt;
  &lt;/nav&gt;
&lt;/template&gt;
</code></pre><p>下面就可以直接使用了，layouts/default.vue:</p><pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;Navbar&gt;&lt;/Navbar&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><h3 id="组件名称约定" tabindex="-1"><a class="header-anchor" href="#组件名称约定"><span>组件名称约定</span></a></h3><p>没有嵌套的组件会以文件名直接导入，但如果存在嵌套关系呢？例如下面的路径：</p><pre><code>| components/
--| base/
----| foo/
------| Button.vue
</code></pre><p>那么 <strong>组件名称将会基于路径和文件名以大驼峰方式连起来</strong> ，比如上面的<code>base/foo/Button.vue</code>注册名称将会是<code>BaseFooButton</code>，用起来将会像下面这样：</p><pre><code>&lt;BaseFooButton /&gt;
</code></pre><p>我们尝试一下，从 Navbar 中提取一个 Avatar 组件，以便后续添加其他功能，路径像下面这样设计：</p><pre><code>| components/
--| nav/
----| Bar.vue
--- Avatar.vue
</code></pre><p>这样，访问导航组件的名称是：<code>NavBar</code>，注意<code>Bar</code>变成大写了，default.vue：</p><pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;NavBar&gt;&lt;/NavBar&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><p>再看看 Bar.vue 的变化：</p><pre><code>&lt;template&gt;
  &lt;nav
    class=&quot;border-b border-slate-200 px-5 py-2 flex items-center justify-between&quot;
  &gt;
    &lt;h1 class=&quot;text-2xl font-bold&quot;&gt;Nuxt3 in Action&lt;/h1&gt;
    &lt;Avatar&gt;&lt;/Avatar&gt;
  &lt;/nav&gt;
&lt;/template&gt;
</code></pre><p>最后创建 components/Avatar.vue：</p><pre><code>&lt;template&gt;
  &lt;img
    class=&quot;w-[50px] border-[1px] border-slate-300 rounded-full inline-block&quot;
    src=&quot;~/assets/avatar.png&quot;
    alt=&quot;avatar&quot;
  /&gt;
&lt;/template&gt;
</code></pre><h2 id="整合组件库-naive-ui" tabindex="-1"><a class="header-anchor" href="#整合组件库-naive-ui"><span>整合组件库：Naive UI</span></a></h2><p>下面进行 Naive UI 整合工作，我在实践中发现需要解决的问题比较多，例如：</p><ul><li><p>Naive UI 组件库按需自动导入；</p></li><li><p>Tailwindcss 覆盖组件库样式问题；</p></li><li><p>TS 类型支持等等。</p></li></ul><p>还好，社区有现成的解决方案可用，我们可以安装 @huntersofbook/naive-ui-nuxt 模块：</p><pre><code>yarn add @huntersofbook/naive-ui-nuxt -D
</code></pre><p>配置，nuxt.config.ts：</p><pre><code>// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [&quot;@huntersofbook/naive-ui-nuxt&quot;],
});
</code></pre><p>测试一下，index.vue：</p><pre><code>&lt;template&gt;
  &lt;div class=&quot;flex items-center flex-col gap-2&quot;&gt;
    &lt;h1&gt;Index Page&lt;/h1&gt;
    &lt;div&gt;
      &lt;NButton&gt;hello&lt;/NButton&gt;
    &lt;/div&gt;
    &lt;NuxtLink to=&quot;/detail/1&quot;&gt;detail 1&lt;/NuxtLink&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><p>效果如下：</p><p><img src="`+o+`" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>自动导入体验之后会觉得非常舒爽，开发体验爆棚。不过很快会有一些疑惑：</p><ul><li><p>哪些库可以直接用，哪些库不能自动导入。这时候大家可以回到本节开头部分，再确认一下 Nuxt3 提供了哪些库和目录的默认导入。</p></li><li><p>Nuxt3 默认只扫描根目录中模块。</p></li><li><p>可以通过设置 nuxt.config.ts 中 <code>imports</code> 选项自定义扫描目录：</p><ul><li><pre><code>    export default defineNuxtConfig({
imports: {
  dirs: [
    // 扫描顶层目录中模块
    &#39;composables&#39;,
    // 扫描内嵌一层深度的模块，指定特定文件名和后缀名
    &#39;composables/*/index.{ts,js,mjs,mts}&#39;,
    // 扫描给定目录中所有模块
    &#39;composables/**&#39;
  ]
}
</code></pre> })</li></ul></li></ul><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>好了！相信大家都可以很自如地使用各种组件和第三方库了，下一步，我们学习 Nuxt 提供给我们的服务端能力，开发一些项目中需要的接口，全栈开发正式起航！</p>`,41)]))}const u=e(i,[["render",p],["__file","index.html.vue"]]),c=JSON.parse(`{"path":"/nuxt3/1lqb9h2n/","title":"07-丝滑的自动导入特性及 NaiveUI 整合","lang":"zh-CN","frontmatter":{"title":"07-丝滑的自动导入特性及 NaiveUI 整合","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/1lqb9h2n/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"Nuxt 自动导入特性","slug":"nuxt-自动导入特性","link":"#nuxt-自动导入特性","children":[]},{"level":2,"title":"组件自动导入","slug":"组件自动导入","link":"#组件自动导入","children":[{"level":3,"title":"组件名称约定","slug":"组件名称约定","link":"#组件名称约定","children":[]}]},{"level":2,"title":"整合组件库：Naive UI","slug":"整合组件库-naive-ui","link":"#整合组件库-naive-ui","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.29,"words":988},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/07-丝滑的自动导入特性及 NaiveUI 整合.md"}`);export{u as comp,c as data};
