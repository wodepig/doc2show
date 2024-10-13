import{_ as d,c as p,a as n,b as t,t as l,o as i}from"./app-D6s_7T7O.js";const o="/doc2show/img/5/1.png",c="/doc2show/img/5/2.png",r="/doc2show/img/5/3.png",s={};function u(a,e){return i(),p("div",null,[e[0]||(e[0]=n(`<p>大家好，我是村长！</p><p>上一讲完成了最小 Nuxt3 应用，我们体验了一下多页面写法。实际开发中情况会复杂得多，比如路由嵌套，动态路由等等。本节我们创建个人博客的基本结构，恰好会用到以下知识点：</p><ul><li><p>嵌套路由；</p></li><li><p>动态路由；</p></li><li><p>页面布局。</p></li></ul><h2 id="基于文件的路由" tabindex="-1"><a class="header-anchor" href="#基于文件的路由"><span>基于文件的路由</span></a></h2><p>如果发现项目根目录下存在 pages 目录，Nuxt 会自动整合 vue-router，并且根据 pages 目录中的文件创建 routes 配置。</p><h3 id="目前的页面结构" tabindex="-1"><a class="header-anchor" href="#目前的页面结构"><span>目前的页面结构</span></a></h3><p>目前我们的页面由主页和详情页构成：</p><ul><li><p>主页：index.vue 负责显示文章列表；</p></li><li><p>详情页：detail.vue 负责显示文章详细内容。</p><p>pages/ --- index.vue --- detail.vue</p></li></ul><p>前面的文件结构，生成的路由配置大概像下面这样：</p><pre><code>[
  {
    path: &#39;/&#39;,
    component: &#39;~/pages/index.vue&#39;,
  },
  {
    path: &#39;/detail&#39;,
    component: &#39;~/pages/detail.vue&#39;,
  }
]
</code></pre><p>虽然免去繁琐的配置工作，但是需要我们首先去了解一下约定好的映射规则，下面我们先看一下动态路由。</p><h2 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由"><span>动态路由</span></a></h2><p>如果 <strong>文件名或者文件夹名称里面包含了方括号</strong> ，它们将被转换为动态路由参数。比如我们像下面这样修改文件结构：</p><pre><code>pages/
--- index.vue
--- detail-[id].vue
</code></pre><p>我们可以在<code>detail-[id].vue</code>中访问<code>id</code>这个参数:</p>`,15)),t("pre",null,[t("code",null,`<template>
  `+l(a.$route.params.id)+`
</template>
`,1)]),e[1]||(e[1]=n(`<p>对应的我们在主页中添加一篇文章链接：<code>/detail-1</code></p><pre><code>&lt;NuxtLink to=&quot;/detail-1&quot;&gt;detail 1&lt;/NuxtLink&gt;
</code></pre><p>效果非常理想！</p><p><img src="`+o+`" alt=""></p><h3 id="理想的路径" tabindex="-1"><a class="header-anchor" href="#理想的路径"><span>理想的路径</span></a></h3><p>前面的路径<code>/detail-1</code>相当丑陋，我们希望是<code>/detail/1</code>，则再创建一个文件夹包起来即可：</p><pre><code>pages/
--- index.vue
--- detail/
------[id].vue
</code></pre><p>创建<code>/detail/</code>目录，移动<code>detail-[id].vue</code>的过去，重命名为<code>[id].vue</code>，这实际上创建了如下路由配置：</p><pre><code>{
  path: &#39;/detail/:id&#39;,
  component: &#39;~/pages/detail/[id].vue&#39;
}
</code></pre><p>修改<code>/index.vue</code>中跳转链接：</p><pre><code>&lt;NuxtLink to=&quot;/detail/1&quot;&gt;detail 1&lt;/NuxtLink&gt;
</code></pre><p>效果非常理想！</p><p><img src="`+c+`" alt=""></p><h2 id="嵌套路由" tabindex="-1"><a class="header-anchor" href="#嵌套路由"><span>嵌套路由</span></a></h2><p>如果存在目录和文件同名，就制造了嵌套路由。比如下面目录结构：</p><pre><code>pages/
--- detail/
------[id].vue
--- detail.vue
--- index.vue
</code></pre><p>这实际上创建了如下路由配置：</p><pre><code>{
  path: &#39;/detail&#39;,
  component: &#39;~/pages/detail.vue&#39;,
  children: [
    {
      path: &#39;/:id&#39;,
      component: &#39;~/pages/detail/[id].vue&#39;
    }
  ]
}
</code></pre><p>看一下 detail.vue 中的具体实现：需要添加路由出口<code>&lt;NuxtPage&gt;</code>。</p><pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Detail Page&lt;/h1&gt;
    &lt;NuxtPage&gt;&lt;/NuxtPage&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><p>相应的，<code>[id].vue</code>中的标题不需要了：</p>`,21)),t("pre",null,[t("code",null,`<template>
  <div>
    <!-- <h1>Detail Page</h1> -->
    <p>`+l(a.$route.params.id)+`</p>
  </div>
</template>
`,1)]),e[2]||(e[2]=n(`<p>测试效果和刚才一样！</p><h2 id="布局系统" tabindex="-1"><a class="header-anchor" href="#布局系统"><span>布局系统</span></a></h2><p>Nuxt 提供了布局系统，可以把公用的页面布局内容提取到<code>layouts</code>目录中以便复用。</p><p>例如，在我们案例中，需要一个顶部导航栏，显然它在主页和详情页中都存在，放在布局页中再适合不过了！</p><p>我们来看一下怎么做！</p><p>首先创建 /layouts/default.vue 作为默认布局页：</p><pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;nav&gt;导航栏&lt;/nav&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><p><code>app.vue</code>中将页面内容作为布局页的插槽：</p><pre><code>&lt;template&gt;
  &lt;NuxtLayout&gt;
    &lt;NuxtPage&gt;&lt;/NuxtPage&gt;
  &lt;/NuxtLayout&gt;
&lt;/template&gt;
</code></pre><p>看一下效果：非常好！</p><p><img src="`+r+'" alt=""></p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>页面基本结构搭建好了，需要一些图片和 CSS 修饰一下，下一节我们探索一下 Nuxt 中如何正确的使用各种静态资源并整合 CSS 框架。</p>',13))])}const m=d(s,[["render",u],["__file","index.html.vue"]]),h=JSON.parse(`{"path":"/nuxt3/z3kpn3vl/","title":"05-基于文件路由和布局特性快速构建应用视图","lang":"zh-CN","frontmatter":{"title":"05-基于文件路由和布局特性快速构建应用视图","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/z3kpn3vl/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"基于文件的路由","slug":"基于文件的路由","link":"#基于文件的路由","children":[{"level":3,"title":"目前的页面结构","slug":"目前的页面结构","link":"#目前的页面结构","children":[]}]},{"level":2,"title":"动态路由","slug":"动态路由","link":"#动态路由","children":[{"level":3,"title":"理想的路径","slug":"理想的路径","link":"#理想的路径","children":[]}]},{"level":2,"title":"嵌套路由","slug":"嵌套路由","link":"#嵌套路由","children":[]},{"level":2,"title":"布局系统","slug":"布局系统","link":"#布局系统","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":2.74,"words":822},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/05-基于文件路由和布局特性快速构建应用视图.md"}`);export{m as comp,h as data};
