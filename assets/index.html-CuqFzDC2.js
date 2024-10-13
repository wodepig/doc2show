import{_ as t,c as p,a as e,b as n,t as a,o as l}from"./app-D6s_7T7O.js";const h="/doc2show/img/16/1.png",d="/doc2show/img/16/2.png",r="/doc2show/img/16/3.png",k={};function o(i,s){return l(),p("div",null,[s[0]||(s[0]=e(`<p>大家好，我是村长！本节我们讲解 Nuxt 插件使用。</p><p>插件跟中间件比起来，后者影响的是路由请求本身，而插件影响的是 Nuxt 框架本身，框架主要由自身构建体系、Vue 和 Nitro 构成，所以插件影响的就是这三方面，本节包括如下内容：</p><ul><li><p>创建和注册插件；</p></li><li><p>插件常见用例。</p></li></ul><h2 id="创建和注册插件" tabindex="-1"><a class="header-anchor" href="#创建和注册插件"><span>创建和注册插件</span></a></h2><p>Nuxt3 会自动读取 plugins 目录下的文件注册为插件，并在创建 Vue 应用时加载它们。</p><h3 id="创建插件" tabindex="-1"><a class="header-anchor" href="#创建插件"><span>创建插件</span></a></h3><p>使用 <code>defineNuxtPlugin()</code> 声明一个插件，像下面这样：</p><pre><code>// 唯一的参数是 NuxtApp 实例
export default defineNuxtPlugin(nuxtApp =&gt; {
  // Doing something with nuxtApp
  console.log(nuxtApp)
})
</code></pre><h3 id="注册插件" tabindex="-1"><a class="header-anchor" href="#注册插件"><span>注册插件</span></a></h3><p>前面提到 Nuxt3 会自动读取 plugins 目录下的文件并加载，但还是有一些细节需要大家了解：</p><ul><li><p>实际上只注册 plugins 目录下根文件和子目录下的 index 文件。</p><ul><li><img src="`+h+'" alt=""></li></ul></li><li><p>插件的执行顺序可以用数字来控制，因为插件之间可能有依赖关系。</p><ul><li><img src="'+d+`" alt=""></li></ul></li><li><p>可在文件名上使用 <code>.server</code> 或 <code>.client</code> 后缀使插件仅作用于服务端或者客户端。</p><ul><li><pre><code>    plugins/
</code></pre> | - server-plugin.server.ts | - client-plugin.client.ts</li></ul></li></ul><h2 id="nuxt-上下文-nuxtapp" tabindex="-1"><a class="header-anchor" href="#nuxt-上下文-nuxtapp"><span>Nuxt 上下文：NuxtApp</span></a></h2><p>我们看到定义插件时，可以获取到 nuxtApp 对象，该对象是 NuxtApp 的实例，实际上是 Nuxt 提供的运行时上下文，可以同时用于客户端和服务端，并能帮我们访问 Vue实例、运行时钩子、运行时配置的变量、内部状态等。</p><p>我们需要了解 nuxtApp 一些重要的方法和属性以便使用：</p><ul><li><p><code>provide (name, value)</code>：定义全局变量和方法；</p></li><li><p><code>hook(name, cb)</code>：定义 nuxt 钩子函数；</p></li><li><p><code>vueApp</code>：获取 vue 实例；</p></li><li><p><code>ssrContext</code>：服务端渲染时的上下文；</p></li><li><p><code>payload</code>：从服务端到客户端传递的数据和状态；</p></li><li><p><code>isHydrating</code>：用于检测是否正在客户端注水过程中。</p></li></ul><h2 id="常见插件用例" tabindex="-1"><a class="header-anchor" href="#常见插件用例"><span>常见插件用例</span></a></h2><h3 id="用例-使用-nuxt-生命周期钩子" tabindex="-1"><a class="header-anchor" href="#用例-使用-nuxt-生命周期钩子"><span>用例：使用 Nuxt 生命周期钩子</span></a></h3><p>一个比较常见的插件用例是使用 Nuxt 生命周期钩子实现一些扩展功能，比如在前面的“错误处理”章节中，我们就曾利用插件编写生命周期处理错误的功能：</p><div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> </span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> default</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> defineNuxtPlugin</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">nuxtApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">      nuxtApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">hook</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">app:error</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (...</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">_args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">app:error</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">      })</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">      nuxtApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">hook</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">vue:error</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (...</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">_args</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">vue:error</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">      })</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    })</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="用例-访问-vue-实例" tabindex="-1"><a class="header-anchor" href="#用例-访问-vue-实例"><span>用例：访问 Vue 实例</span></a></h3><p>如果要扩展 Vue，我们就需要访问 Vue 实例，然后引入 Vue 插件或其他扩展方式。在 Nuxt3 中可以在插件中通过 <code>nuxtApp.vueApp</code> 访问：</p><p>比如我们之前配置全局实例方法的范例可以做以下简化：两个 <code>vueApp</code> 是同一个实例，plugins/alert.ts。</p><pre><code>export default defineNuxtPlugin((nuxtApp) =&gt; {
  // nuxtApp.hook(&quot;app:created&quot;, (vueApp) =&gt; {
  //   vueApp.config.globalProperties.$alert = (msg: string) =&gt; {
  //     const message = useMessage();
  //     message.warning(msg);
  //   };
  // });
  nuxtApp.vueApp.config.globalProperties.$alert = (msg: string) =&gt; {
    const message = useMessage();
    message.warning(msg);
  };
});
</code></pre><h3 id="用例-添加全局帮助方法" tabindex="-1"><a class="header-anchor" href="#用例-添加全局帮助方法"><span>用例：添加全局帮助方法</span></a></h3><p>一个常见用例是给 NuxtApp 实例提供一些额外的帮助方法，我们可以通过 <code>nuxtApp.provide(key, fn)</code> 定义这些方法，比如下面例子定义了一个格式化日期的帮助方法 <code>format</code>：</p><pre><code>import dayjs from &quot;dayjs&quot;;

export default defineNuxtPlugin((nuxtApp) =&gt; {
  nuxtApp.provide(&quot;format&quot;, (date?: Date, template?: string) =&gt; {
    return dayjs(date).format(template);
  });
});
</code></pre><p>使用 <code>useNuxtApp()</code> 获取这个帮助方法，需要额外加一个 <code>$</code>，helper.vue：</p>`,27)),n("pre",null,[n("code",null,`<template>
  <div>
    <ClientOnly>
      <p>`+a(i.date1)+`</p>
      <p>`+a(i.date2)+`</p>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const date1 = nuxtApp.$format()
const date2 = nuxtApp.$format(new Date, 'YYYY/MM/DD')
<\/script>
`,1)]),s[1]||(s[1]=e(`<h4 id="给注入方法提供类型支持" tabindex="-1"><a class="header-anchor" href="#给注入方法提供类型支持"><span>给注入方法提供类型支持</span></a></h4><p>通过模块扩展可以给注入的方法、属性提供类型支持，例如前面创建的<code>format()</code>方法，创建 ~/types/index.d.ts：</p><pre><code>declare module &#39;#app&#39; {
  interface NuxtApp {
    $format (date?: Date, msg?: string): string
  }
}

declare module &#39;vue&#39; {
  interface ComponentCustomProperties {
    $format (date?: Date, msg?: string): string
  }
}

export { }
</code></pre><p>效果如下：</p><p><img src="`+r+'" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>插件整体上来看是一种用户自定义扩展框架的方式，它跟中间件的区别主要在影响的范围和执行时刻上，我们暂时应该用到的不会太多，先做到全面了它的工作解机制即可。</p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>说到扩展框架能力，最通用、强大的方式当属模块，下次课程我们将对模块的使用和编写做一个全面的学习。</p>',9))])}const c=t(k,[["render",o],["__file","index.html.vue"]]),g=JSON.parse(`{"path":"/nuxt3/qo6kn8dx/","title":"16-如何使用插件扩展 Nuxt 能力","lang":"zh-CN","frontmatter":{"title":"16-如何使用插件扩展 Nuxt 能力","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/qo6kn8dx/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"创建和注册插件","slug":"创建和注册插件","link":"#创建和注册插件","children":[{"level":3,"title":"创建插件","slug":"创建插件","link":"#创建插件","children":[]},{"level":3,"title":"注册插件","slug":"注册插件","link":"#注册插件","children":[]}]},{"level":2,"title":"Nuxt 上下文：NuxtApp","slug":"nuxt-上下文-nuxtapp","link":"#nuxt-上下文-nuxtapp","children":[]},{"level":2,"title":"常见插件用例","slug":"常见插件用例","link":"#常见插件用例","children":[{"level":3,"title":"用例：使用 Nuxt 生命周期钩子","slug":"用例-使用-nuxt-生命周期钩子","link":"#用例-使用-nuxt-生命周期钩子","children":[]},{"level":3,"title":"用例：访问 Vue 实例","slug":"用例-访问-vue-实例","link":"#用例-访问-vue-实例","children":[]},{"level":3,"title":"用例：添加全局帮助方法","slug":"用例-添加全局帮助方法","link":"#用例-添加全局帮助方法","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.51,"words":1052},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/16-如何使用插件扩展 Nuxt 能力.md"}`);export{c as comp,g as data};
