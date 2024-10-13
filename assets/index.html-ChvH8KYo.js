import{_ as n,c as t,a,o as s}from"./app-D6s_7T7O.js";const o="/doc2show/img/19/1.png",i="/doc2show/img/19/2.png",r="/doc2show/img/19/3.png",l="/doc2show/img/19/4.png",c={};function p(d,e){return s(),t("div",null,e[0]||(e[0]=[a(`<p>大家好，我是村长！</p><p>这将是我们这个模块的最后一节，主题是 Nuxt 项目工程化。</p><p>实际上 Nuxt 已经帮我们完成了大部分任务，例如：项目创建、自动导入、路由生成、ts支持、服务端整合/渲染、打包等等。 美中不足的是，Nuxi 目前还比较弱，没有 create-vue 那样丰富个性化的配置，例如代码规范和测试支持。另外，项目开发时也需要一些额外的三方库、工具函数等，例如 HTTP 请求封装、图标库使用等等。</p><p>因此，我们本节计划完成如下任务：</p><ul><li>代码规范；</li><li>代码测试；</li><li>整合 unocss；</li><li>使用图标；</li><li>使用模版项目。</li></ul><p>最终，我们会得到一个不错的 starter 项目，作为起始，便于后续项目开发。如果你不关心该项目的搭建过程，可以直接跳到最后一步，学习如何以该项目为模版创建新项目即可。</p><h2 id="代码规范" tabindex="-1"><a class="header-anchor" href="#代码规范"><span>代码规范</span></a></h2><p>通常代码规范这块的配置是非常繁琐的，例如我们通常需要结合 ESLint + Prettier，这需要两个配置，还要有额外插件的安装。这里我给大家推荐的方案是 <a href="https://github.com/antfu/eslint-config" target="_blank" rel="noopener noreferrer">@antfu/eslint-config</a>，优点是配置非常简单，支持 ts，单独使用不依赖 Prettier。</p><h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装"><span><strong>安装</strong></span></a></h3><p>需要安装依赖：</p><pre><code>yarn add -D eslint @antfu/eslint-config typescript
</code></pre><h3 id="配置-eslintrc" tabindex="-1"><a class="header-anchor" href="#配置-eslintrc"><span><strong>配置</strong> <strong><code>.eslintrc</code></strong></span></a></h3><p>创建 .eslintrc:</p><pre><code>{
  &quot;extends&quot;: &quot;@antfu&quot;
}
</code></pre><h3 id="添加脚本-package-json" tabindex="-1"><a class="header-anchor" href="#添加脚本-package-json"><span><strong>添加脚本 package.json</strong></span></a></h3><p>添加<code>lint</code>和<code>lint:fix</code>两个命令脚本:</p><pre><code>{
  &quot;scripts&quot;: {
    &quot;lint&quot;: &quot;eslint .&quot;,
    &quot;lint:fix&quot;: &quot;eslint . --fix&quot;
  }
}
</code></pre><h3 id="自动格式化" tabindex="-1"><a class="header-anchor" href="#自动格式化"><span><strong>自动格式化</strong></span></a></h3><p>配置 VS Code 可以实现自动格式化代码：</p><ul><li><p>安装扩展：<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer">VS Code ESLint extension</a></p></li><li><p>创建配置文件：<code>.vscode/settings.json</code></p><ul><li><pre><code>    {
&quot;prettier.enable&quot;: false,
&quot;editor.formatOnSave&quot;: false,
&quot;editor.codeActionsOnSave&quot;: {
  &quot;source.fixAll.eslint&quot;: true
}
</code></pre> }</li></ul></li></ul><h2 id="代码测试" tabindex="-1"><a class="header-anchor" href="#代码测试"><span>代码测试</span></a></h2><p>在 Nuxt3 中，可以使用官方提供的<code>@nuxt/test-utils</code>编写单测。</p><h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1"><span>安装</span></a></h3><pre><code>yarn add --dev @nuxt/test-utils vitest
</code></pre><h3 id="编写测试" tabindex="-1"><a class="header-anchor" href="#编写测试"><span>编写测试</span></a></h3><p>创建 test/index.spec.ts:</p><pre><code>import { describe, expect, test } from &#39;vitest&#39;
import { $fetch, setup } from &#39;@nuxt/test-utils&#39;

describe(&#39;My test&#39;, async () =&gt; {
  await setup({
    // test context options
  })

  test(&#39;index page should be work&#39;, async () =&gt; {
    const html = await $fetch(&#39;/&#39;)
    expect(html).toMatch(&#39;&lt;h1&gt;Index Page&lt;/h1&gt;&#39;)
  })
})
</code></pre><blockquote><p>如何使用 vitest 编写单测：<a href="https://vitest.dev/guide/" target="_blank" rel="noopener noreferrer">https://vitest.dev/guide/</a></p></blockquote><h3 id="添加脚本-package-json-1" tabindex="-1"><a class="header-anchor" href="#添加脚本-package-json-1"><span>添加脚本 package.json</span></a></h3><p>添加一个 test:unit 命令执行测试：</p><pre><code>{
  &quot;scripts&quot;: {
    &quot;test:unit&quot;: &quot;vitest&quot;
  }
}
</code></pre><p>执行测试，效果如下：</p><p><img src="`+o+`" alt=""></p><h2 id="整合-unocss" tabindex="-1"><a class="header-anchor" href="#整合-unocss"><span>整合 UnoCSS</span></a></h2><p>下面整合 UnoCSS，这是一个按需原子化 CSS 引擎，比起直接使用 TailwindCSS 更轻更快！</p><h3 id="安装-2" tabindex="-1"><a class="header-anchor" href="#安装-2"><span>安装</span></a></h3><p>安装模块 @unocss/nuxt：</p><pre><code>yarn add @unocss/nuxt -D
</code></pre><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><p>配置模块，nuxt.config.ts：</p><pre><code>export default {
  modules: [
    &#39;@unocss/nuxt&#39;,
  ],
  unocss: {
    uno: true, // enabled \`@unocss/preset-uno\`
    icons: true, // enabled \`@unocss/preset-icons\`
    attributify: true, // enabled \`@unocss/preset-attributify\`,
    // core options
    shortcuts: [],
    rules: [],
    safelist: [],
  },
}
</code></pre><p>测试效果，index.vue</p><pre><code>&lt;h1 class=&quot;bg-blue-200&quot;&gt;
  Index Page
&lt;/h1&gt;
</code></pre><p>效果如下：</p><p><img src="`+i+'" alt=""></p><h2 id="使用图标" tabindex="-1"><a class="header-anchor" href="#使用图标"><span>使用图标</span></a></h2><p>由于前面引入了 UnoCSS，因此图标的使用遵循它的规则即可：</p><ul><li><p>在 <a href="https://icones.js.org/" target="_blank" rel="noopener noreferrer">Icônes</a> 或者 <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener noreferrer">Iconify</a> 搜索图标；</p></li><li><p>安装所属图标集；</p></li><li><p>按照<code>&lt;prefix&gt;&lt;collection&gt;-&lt;icon&gt;</code>规则使用图标。</p></li></ul><h3 id="搜索图标" tabindex="-1"><a class="header-anchor" href="#搜索图标"><span>搜索图标</span></a></h3><p>可以在 <a href="https://icones.js.org/" target="_blank" rel="noopener noreferrer">Icônes</a> 或者 [Iconify](https://icon- sets.iconify.design/) 搜索图标，例如我们想要找一个 nuxt 图标，在下面地址搜索该关键字：<a href="https://icones.js.org/collection/all" target="_blank" rel="noopener noreferrer">https://icones.js.org/collection/all</a></p><p><img src="'+r+'" alt=""></p><h3 id="安装图标集" tabindex="-1"><a class="header-anchor" href="#安装图标集"><span>安装图标集</span></a></h3><p>我们选择 vscode-icons 图标集：</p><p><img src="'+l+`" alt=""></p><p>安装该依赖：</p><pre><code>yarn add @iconify-json/vscode-icons -D
</code></pre><h3 id="使用图标-1" tabindex="-1"><a class="header-anchor" href="#使用图标-1"><span>使用图标</span></a></h3><p>按照<code>&lt;prefix&gt;&lt;collection&gt;-&lt;icon&gt;</code>规则使用图标。</p><p>例如上面的 nuxt 图标规则为：<code>i-vscode-icons-file-type-nuxt</code>，就可以像下面这样使用：</p><pre><code>&lt;div class=&quot;i-vscode-icons-file-type-nuxt&quot; /&gt;
</code></pre><blockquote><p>更多相关知识：<a href="https://github.com/unocss/unocss/tree/main/packages/preset-icons/" target="_blank" rel="noopener noreferrer">https://github.com/unocss/unocss/tree/main/packages/preset-icons/</a></p></blockquote><h2 id="整合组件库" tabindex="-1"><a class="header-anchor" href="#整合组件库"><span>整合组件库</span></a></h2><p><a href="https://znu2mxl8tu.feishu.cn/docx/Tn4OdbjuPoyZLsxLXlPcB5MFnDg#LiEOdiGoooOgQexorfwc9H6Fn7f" target="_blank" rel="noopener noreferrer">整合 NaiveUI</a> 在前面课程已有演示，不再赘述。</p><h2 id="整合-pinia" tabindex="-1"><a class="header-anchor" href="#整合-pinia"><span>整合 Pinia</span></a></h2><p><a href="https://znu2mxl8tu.feishu.cn/docx/GrX9d4Ac7oAyg5xZNaecHXNXnFV#PyOYdskGioMkG2xqiPJcfTxlnqb" target="_blank" rel="noopener noreferrer">整合 Pinia</a> 在前面课程已有演示，不再赘述。</p><h2 id="使用模版项目" tabindex="-1"><a class="header-anchor" href="#使用模版项目"><span>使用模版项目</span></a></h2><p>到目前为止，我们的模版已经基本做好了，大家可以将项目推送到 github 以备后续使用，使用方法如下：</p><pre><code>npx nuxi init -t gh:org/name
</code></pre><p>上面的 <code>gh</code> 是 github 缩写，<code>org</code> 为组织名或者用户名，<code>name</code> 为项目名，比如我的 github 用户名为 57code，项目名称为 nuxt3-starter，则初始化项目可以使用下面命令:</p><pre><code>npx nuxi init -t gh:57code/nuxt3-starter
</code></pre><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>工程化相关的内容就跟大家先说到这里了，工程化总体上是从项目创建 -&gt; 开发 -&gt; 测试 -&gt; 部署 -&gt; 维护的一系列任务。这里面有一些任务还未涉及，但是主要的任务都给大家介绍到了，一些特殊的需求也欢迎大家一起来总结分享经验。</p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>从下一节开始，我们将探讨服务端端开发相关的知识，包括数据库、接口、Node.js 等知识。</p>`,74)]))}const u=n(c,[["render",p],["__file","index.html.vue"]]),g=JSON.parse(`{"path":"/nuxt3/6rrwhym0/","title":"19-Nuxt 项目工程化搭建指南","lang":"zh-CN","frontmatter":{"title":"19-Nuxt 项目工程化搭建指南","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/6rrwhym0/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"代码规范","slug":"代码规范","link":"#代码规范","children":[{"level":3,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":3,"title":"配置 .eslintrc","slug":"配置-eslintrc","link":"#配置-eslintrc","children":[]},{"level":3,"title":"添加脚本 package.json","slug":"添加脚本-package-json","link":"#添加脚本-package-json","children":[]},{"level":3,"title":"自动格式化","slug":"自动格式化","link":"#自动格式化","children":[]}]},{"level":2,"title":"代码测试","slug":"代码测试","link":"#代码测试","children":[{"level":3,"title":"安装","slug":"安装-1","link":"#安装-1","children":[]},{"level":3,"title":"编写测试","slug":"编写测试","link":"#编写测试","children":[]},{"level":3,"title":"添加脚本 package.json","slug":"添加脚本-package-json-1","link":"#添加脚本-package-json-1","children":[]}]},{"level":2,"title":"整合 UnoCSS","slug":"整合-unocss","link":"#整合-unocss","children":[{"level":3,"title":"安装","slug":"安装-2","link":"#安装-2","children":[]},{"level":3,"title":"配置","slug":"配置","link":"#配置","children":[]}]},{"level":2,"title":"使用图标","slug":"使用图标","link":"#使用图标","children":[{"level":3,"title":"搜索图标","slug":"搜索图标","link":"#搜索图标","children":[]},{"level":3,"title":"安装图标集","slug":"安装图标集","link":"#安装图标集","children":[]},{"level":3,"title":"使用图标","slug":"使用图标-1","link":"#使用图标-1","children":[]}]},{"level":2,"title":"整合组件库","slug":"整合组件库","link":"#整合组件库","children":[]},{"level":2,"title":"整合 Pinia","slug":"整合-pinia","link":"#整合-pinia","children":[]},{"level":2,"title":"使用模版项目","slug":"使用模版项目","link":"#使用模版项目","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.85,"words":1156},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/19-Nuxt 项目工程化搭建指南.md"}`);export{u as comp,g as data};
