import{_ as t,c as n,a as p,o as r}from"./app-D6s_7T7O.js";const a={};function o(i,e){return r(),n("div",null,e[0]||(e[0]=[p(`<p>大家好，我是村长！</p><p>从本篇开始我们将探讨 Nuxt 工程架构相关的知识，我们将学习一些进阶知识，从更高层级审视 Nuxt，从而更加得心应手地使用 Nuxt。本篇涉及内容如下：</p><ul><li>Nuxt 框架生命周期；</li><li>中间件使用；</li><li>插件的使用；</li><li>模块的使用；</li><li>层的使用；</li><li>项目模版使用；</li><li>工程化搭建。</li></ul><h2 id="nuxt-生命周期钩子" tabindex="-1"><a class="header-anchor" href="#nuxt-生命周期钩子"><span>Nuxt 生命周期钩子</span></a></h2><p>本节探讨的是 Nuxt 的生命周期钩子，为什么要了解这个知识呢？</p><p>主要是因为我们后续的项目扩展知识需要用到各种钩子函数，比如编写一个 Nuxt 插件或者模块，我们常常需要在框架执行的某个特定阶段做一些特定的事情，又或者我们需要获取并修改 Nuxt 应用实例或者 Vue 实例，等等。</p><p>比如前面章节中在错误处理时，我们就用到过钩子函数：</p><pre><code>export default defineNuxtPlugin((nuxtApp) =&gt; {
  nuxtApp.hook(&#39;app:error&#39;, (..._args) =&gt; {
    console.log(&#39;app:error&#39;)
  })
  nuxtApp.hook(&#39;vue:error&#39;, (..._args) =&gt; {
    console.log(&#39;vue:error&#39;)
  })
})
</code></pre><h2 id="nuxt-生命周期分类" tabindex="-1"><a class="header-anchor" href="#nuxt-生命周期分类"><span>Nuxt 生命周期分类</span></a></h2><p>由于 Nuxt 整合了 Vue、Nitro 前后端两个运行时，再加上它自身的创建过程，因此框架生命周期钩子分为三类：</p><ul><li><p>Nuxt 钩子；</p></li><li><p>Vue App 钩子；</p></li><li><p>Nitro App 钩子。</p></li></ul><h3 id="nuxt-钩子" tabindex="-1"><a class="header-anchor" href="#nuxt-钩子"><span>Nuxt 钩子</span></a></h3><p>Nuxt 钩子在构建时执行，贯穿初始化和构建过程中各种工具和引擎，例如 Nuxi、Vite、Webpack、Nitro 等，主要用于编写模块时构建上下文。</p><p>基本用法如下：</p><pre><code>import { defineNuxtModule } from &#39;@nuxt/kit&#39;

export default defineNuxtModule({
  setup (options, nuxt) {
    nuxt.hook(&#39;ready&#39;, async (nuxt: Nuxt) =&gt; { 
      // 在这里配置 nuxt
    })
  }
})
</code></pre><p>我们做一个实际应用作为演示：在整合 NaiveUI 时，如果按照官方操作自动导入，则无法获得 TS 类型支持。</p><p>这个需求可以用一个模块来完成：这里利用了 prepare:types 这个钩子配置 ts：</p><pre><code>import { defineNuxtModule } from &#39;@nuxt/kit&#39;

export default defineNuxtModule({
  setup (options, nuxt) {
    nuxt.hook(&#39;prepare:types&#39;, ({ tsConfig, references }) =&gt; {
      tsConfig.compilerOptions!.types.push(&#39;naive-ui/volar&#39;)
      references.push({
        path: resolve(nuxt.options.buildDir, &#39;types/naive-ui.d.ts&#39;),
      })
    })
  }
})
</code></pre><h3 id="vue-app-钩子" tabindex="-1"><a class="header-anchor" href="#vue-app-钩子"><span>Vue App 钩子</span></a></h3><p>会在运行时调用，主要用于编写插件，从而可以在渲染生命周期中插入代码逻辑。</p><p>基本用法如下：</p><pre><code>export default defineNuxtPlugin((nuxtApp) =&gt; {
  nuxtApp.hook(&#39;app:created&#39;, (vueApp) =&gt; {
    // 可以在这里修改 vue 实例
  })
})
</code></pre><p>我们做一个实际应用作为演示：给 Vue 添加一个全局的方法 $alert。</p><p>这个需求可以用一个插件来完成：这里利用了 app:created 这个钩子配置 Vue 实例：</p><pre><code>// plugins/alert.ts
export default defineNuxtPlugin((nuxtApp) =&gt; {
  nuxtApp.hook(&quot;app:created&quot;, (vueApp) =&gt; {
    vueApp.config.globalProperties.$alert = (msg: string) =&gt; {
      const message = useMessage();
      message.warning(msg);
    };
  });
});
</code></pre><p>试用一下，index.vue：</p><pre><code>const ins = getCurrentInstance()
onMounted(() =&gt; {
  ins?.proxy?.$alert(&#39;component mounted！&#39;)
})
</code></pre><h3 id="nitro-app-钩子" tabindex="-1"><a class="header-anchor" href="#nitro-app-钩子"><span>Nitro App 钩子</span></a></h3><p>会在 Nitro 引擎运行时调用，用于编写服务端插件，从而可以修改或扩展引擎的默认行为。</p><p>例如下面插件利用 render:html 钩子修改了最终渲染的 html 内容，并在响应时打了一条日志：</p><pre><code>export default defineNitroPlugin((nitroApp) =&gt; {
  nitroApp.hooks.hook(&#39;render:html&#39;, (html, { event }) =&gt; {
    console.log(&#39;render:html&#39;, html)
    html.bodyAppend.push(&#39;&lt;hr&gt;Appended by custom plugin&#39;)
  })
  nitroApp.hooks.hook(&#39;render:response&#39;, (response, { event }) =&gt; {
    console.log(&#39;render:response&#39;, response)
  })
})
</code></pre><h2 id="可用钩子列表" tabindex="-1"><a class="header-anchor" href="#可用钩子列表"><span>可用钩子列表</span></a></h2><p>文档中有一个比较详细的可用钩子列表，大家可以参考：</p><p><a href="https://nuxt.com/docs/api/advanced/hooks" target="_blank" rel="noopener noreferrer">https://nuxt.com/docs/api/advanced/hooks</a></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>Nuxt 中的钩子函数比 Vue 复杂多了，想要一下掌握非常困难。我建议大家可以先整体上了解一下都有哪些钩子，大概是干什么的，以后在真正有需要的时候，知道有这么个东西，就会给你带来解决问题的思路。另外学习其他优秀项目的时候，如果见到了，也可以很容易理解和消化人家的代码。</p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>关于生命周期就给大家讲到这里了，后续的学习中我们还会见到它们。下次内容我们将给大家介绍中间件的使用。</p>`,38)]))}const u=t(a,[["render",o],["__file","index.html.vue"]]),s=JSON.parse(`{"path":"/nuxt3/efdev1ur/","title":"14-Nuxt 生命周期钩子的作用和应用实践","lang":"zh-CN","frontmatter":{"title":"14-Nuxt 生命周期钩子的作用和应用实践","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/efdev1ur/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"Nuxt 生命周期钩子","slug":"nuxt-生命周期钩子","link":"#nuxt-生命周期钩子","children":[]},{"level":2,"title":"Nuxt 生命周期分类","slug":"nuxt-生命周期分类","link":"#nuxt-生命周期分类","children":[{"level":3,"title":"Nuxt 钩子","slug":"nuxt-钩子","link":"#nuxt-钩子","children":[]},{"level":3,"title":"Vue App 钩子","slug":"vue-app-钩子","link":"#vue-app-钩子","children":[]},{"level":3,"title":"Nitro App 钩子","slug":"nitro-app-钩子","link":"#nitro-app-钩子","children":[]}]},{"level":2,"title":"可用钩子列表","slug":"可用钩子列表","link":"#可用钩子列表","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.25,"words":976},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/14-Nuxt 生命周期钩子的作用和应用实践.md"}`);export{u as comp,s as data};
