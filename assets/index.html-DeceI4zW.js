import{_ as t,c as n,a,o as s}from"./app-D6s_7T7O.js";const l="/doc2show/img/18/1.png",r={};function i(o,e){return s(),n("div",null,e[0]||(e[0]=[a(`<p>大家好，我是村长！</p><p>前面我提到了一个开发中常见需求：能够复用之前项目中的配置、已存在的组件、工具方法等等。Nuxt3 提供的 layers 特性能使我们非常容易地创建和维护这样的项目基础结构。</p><p>本节将会包括如下内容：</p><ul><li><p>layers 的使用场景；</p></li><li><p>layers 使用方法 ；</p></li><li><p>layers 常见用例；</p></li><li><p>如何定制一个 layers。</p></li></ul><h2 id="layers-使用场景" tabindex="-1"><a class="header-anchor" href="#layers-使用场景"><span>Layers 使用场景</span></a></h2><p>以下情况下比较适合使用 layers：</p><ul><li>共享可重用配置项；</li><li>使用 components 目录共享组件库；</li><li>使用 composables 和 utils 目录共享工具函数；</li><li>创建 Nuxt 主题；</li><li>创建模块预设；</li><li>共享标准初始化步骤。</li></ul><h2 id="layers-使用方法" tabindex="-1"><a class="header-anchor" href="#layers-使用方法"><span>Layers 使用方法</span></a></h2><p>我们可以在 nuxt.config.ts 中配置 <code>extends</code> 选项从而继承一个 layers 配置。</p><p>有三种配置 layers 方式：</p><ul><li>相对地址：从本地继承；</li><li>Npm 包名：从 npm 安装；</li><li>Github URL：从 Github 下载。</li></ul><p>就像下面这样配置，nuxt.config.ts：</p><pre><code>export default defineNuxtConfig({
  extends: [
    &#39;../base&#39;,                     // 从本地继承
    &#39;@my-themes/awesome&#39;,          // 从 npm 安装
    &#39;github:my-themes/awesome#v1&#39;, // 从 github 下载
  ]
})
</code></pre><h3 id="范例-使用-docus-建设文档网站" tabindex="-1"><a class="header-anchor" href="#范例-使用-docus-建设文档网站"><span>范例：使用 docus 建设文档网站</span></a></h3><p>社区有个用于文档建设的项目叫 docus，提供了 50 多个组件和设计系统便于创建文档类页面。docus 完全基于 layers 方式创建，因此可以快速在已存在的 Nuxt 项目中引入。</p><p>首先安装 docus：</p><pre><code>yarn add @nuxt-themes/docus
</code></pre><p>接下来只需要在项目中添加 extends 选项，nuxt.config.ts：</p><pre><code>defineNuxtConfig({
  extends: &#39;@nuxt-themes/docus&#39;
})
</code></pre><p>这就好了！下面在 content 目录创建一个页面试试，content/index.md：</p><pre><code>---
title: &quot;Get Started&quot;
description: &quot;Let&#39;s learn how to use my amazing module.&quot;
aside: true
bottom: true
toc: true
---

# Get Started
Let&#39;s learn how to use my amazing module.
go to [installed](/install) page.

## 使用组件

### alert 组件
::alert{type=&quot;info&quot;}
Check out an **info** alert with \`code\`.
::

## 配置页面

### layout
</code></pre><p>效果如下：</p><p><img src="`+l+`" alt=""></p><h2 id="定制一个-layers" tabindex="-1"><a class="header-anchor" href="#定制一个-layers"><span>定制一个 layers</span></a></h2><p>下面我带大家定制一个 layers 结构，它基本上和一个 Nuxt 项目的结构是一致的，因此非常容易构建和维护。</p><h3 id="基本范例" tabindex="-1"><a class="header-anchor" href="#基本范例"><span>基本范例</span></a></h3><p>下面我们重构之前案例为如下结构：nuxt-docus 是之前的 docus 项目， base 基于 layers 结构存放公用资源，nuxt-app 使用 base 中的资源。</p><pre><code>base/
nuxt-app/
nuxt-docus/
</code></pre><p>base 中至少应该存放一个 nuxt.config.ts 文件，存放一些通用配置，这指明当前目录是一个 layers 结构:</p><pre><code>export default defineNuxtConfig({
  app: {
    head: {
      title: &#39;Extending configs by layers&#39;,
      meta: [
        { name: &#39;description&#39;, content: &#39;I am using the extends feature in nuxt3!&#39; }
      ],
    }
  }
})
</code></pre><p>同时我们再创建一个公用组件 BaseButton.vue:</p><pre><code> &lt;template&gt;
  &lt;button
    class=&quot;text-white px-4 py-2 flex-1 flex items-center justify-center shadow-lg rounded bg-sky-500 hover:bg-sky-600&quot;
  &gt;
    &lt;slot&gt;按钮&lt;/slot&gt;
  &lt;/button&gt;
&lt;/template&gt;
</code></pre><p>准备就绪，我们在 nuxt-app 中配置该继承 base：</p><pre><code>// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    &#39;@nuxtjs/tailwindcss&#39;
  ],
  extends: [
    &#39;../base&#39;
  ]
})
</code></pre><p>现在 app.vue 中可以直接使用 BaseButton：</p><pre><code>&lt;BaseButton&gt;&lt;/BaseButton&gt;
</code></pre><h3 id="从模版项目开始定制-layers" tabindex="-1"><a class="header-anchor" href="#从模版项目开始定制-layers"><span>从模版项目开始定制 layers</span></a></h3><p>Nuxi 有个命令可以初始化一个 layer 结构让我们快速开始：</p><pre><code>npx nuxi init --template layer nuxt-layer
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>layers 相关知识就跟小伙伴们介绍到这里了，可以看到利用层特性很容易复用已存在的项目中的共享资源，让我们项目可维护性大增。例如我们有一个大项目，可以做成一个 monorepo 项目，提取通用部分到 layers 中共享，其他项目按模块拆分，这样项目整体就会变得非常清爽易维护。</p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>下节课我们一起完成 Nuxt 项目工程化搭建工作，会包括一些常见的代码规范化、测试等任务。</p>`,43)]))}const d=t(r,[["render",i],["__file","index.html.vue"]]),c=JSON.parse(`{"path":"/nuxt3/whynsfbp/","title":"18-利用 layers 全面提升 Nuxt 应用复用性","lang":"zh-CN","frontmatter":{"title":"18-利用 layers 全面提升 Nuxt 应用复用性","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/whynsfbp/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"Layers 使用场景","slug":"layers-使用场景","link":"#layers-使用场景","children":[]},{"level":2,"title":"Layers 使用方法","slug":"layers-使用方法","link":"#layers-使用方法","children":[{"level":3,"title":"范例：使用 docus 建设文档网站","slug":"范例-使用-docus-建设文档网站","link":"#范例-使用-docus-建设文档网站","children":[]}]},{"level":2,"title":"定制一个 layers","slug":"定制一个-layers","link":"#定制一个-layers","children":[{"level":3,"title":"基本范例","slug":"基本范例","link":"#基本范例","children":[]},{"level":3,"title":"从模版项目开始定制 layers","slug":"从模版项目开始定制-layers","link":"#从模版项目开始定制-layers","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.05,"words":914},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/18-利用 layers 全面提升 Nuxt 应用复用性.md"}`);export{d as comp,c as data};
