import{_ as t,c as e,a as n,o as a}from"./app-D6s_7T7O.js";const l="/doc2show/img/6/1.png",o="/doc2show/img/6/2.png",i="/doc2show/img/6/3.png",c="/doc2show/img/6/4.png",p="/doc2show/img/6/5.png",d="/doc2show/img/6/6.png",r={};function u(g,s){return a(),e("div",null,s[0]||(s[0]=[n(`<p>大家好，我是村长！</p><p>上一讲我们掌握了文件路由的各种使用方法，并用 layouts 特性实现快速页面布局。本节我们继续完善个人博客的功能和用户体验，添加一些图片和 CSS 样式，并且引入目前比较流行的 CSS 库：Tailwindcss。</p><h2 id="资源目录" tabindex="-1"><a class="header-anchor" href="#资源目录"><span>资源目录</span></a></h2><p>Nuxt 项目存放样式、图片等静态资源的目录默认有两个：</p><ul><li><p>public：会被作为应用程序根目录提供给用户，打包工具不会处理，访问时添加<code>/</code>即可，例如：<code>/logo.png</code>。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;img src=&quot;/logo.png&quot; /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>assets：打包工具会处理，访问时以<code>~</code>开头，例如：<code>~/assets/logo.png</code>。</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>&lt;template&gt;</span></span>
<span class="line"><span>  &lt;img src=&quot;~/assets/logo.png&quot; /&gt;</span></span>
<span class="line"><span>&lt;/template&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><blockquote><p>除了<code>~</code>，Nuxt3 中还有一些默认别名：</p><pre><code>{
  &quot;~~&quot;: &quot;/&lt;rootDir&gt;&quot;,
  &quot;@@&quot;: &quot;/&lt;rootDir&gt;&quot;,
  &quot;~&quot;: &quot;/&lt;rootDir&gt;&quot;,
  &quot;@&quot;: &quot;/&lt;rootDir&gt;&quot;,
  &quot;assets&quot;: &quot;/&lt;rootDir&gt;/assets&quot;,
  &quot;public&quot;: &quot;/&lt;rootDir&gt;/public&quot;
}
</code></pre></blockquote><p>下面我们引入一个作者头像图片试一下，layouts/default.vue：</p><pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;nav&gt;
      导航栏
      &lt;img class=&quot;avatar&quot; src=&quot;~/assets/avatar.png&quot; alt=&quot;avatar&quot; /&gt;
    &lt;/nav&gt;
    &lt;slot /&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;style scoped&gt;
.avatar {
  width: 50px;
  border: 1px solid rgb(218, 218, 218);
  border-radius: 50%;
}
&lt;/style&gt;
</code></pre><p>可以正常使用!</p><p><img src="`+l+`" alt=""></p><h2 id="全局样式" tabindex="-1"><a class="header-anchor" href="#全局样式"><span>全局样式</span></a></h2><p>有两种方式可以配全局样式：</p><ul><li><p>配置文件 nuxt.config.ts；</p></li><li><p>app.vue 中引入。</p></li></ul><h3 id="nuxt-config-ts-配置全局样式" tabindex="-1"><a class="header-anchor" href="#nuxt-config-ts-配置全局样式"><span>nuxt.config.ts 配置全局样式:</span></a></h3><pre><code>export default defineNuxtConfig({
  css: [
    &#39;assets/global.css&#39;
  ]
})
</code></pre><p>创建 assets/global.css：</p><pre><code>a {
  text-decoration: none;
  color: #3370ff;
}
</code></pre><h3 id="app-vue-中引入全局样式" tabindex="-1"><a class="header-anchor" href="#app-vue-中引入全局样式"><span>app.vue 中引入全局样式</span></a></h3><p>也可以在 app.vue 中引入样式：</p><pre><code>&lt;script&gt;
import &quot;~/assets/global.css&quot;;
&lt;/script&gt;
</code></pre><p>效果如下：</p><p><img src="`+o+`" alt=""></p><h3 id="使用-css-预处理器-sass" tabindex="-1"><a class="header-anchor" href="#使用-css-预处理器-sass"><span>使用 CSS 预处理器：Sass</span></a></h3><p>如果要使用 Sass，安装 <code>sass</code> 即可：</p><pre><code>yarn add sass -D 
</code></pre><p>对应的，重命名 global.css 为 global.scss，并添加一个变量测试一下：</p><pre><code>$linkColor: #3370ff;

a {
  text-decoration: none;
  color: $linkColor;
}
</code></pre><p>修改配置文件，nuxt.config.ts：</p><pre><code>export default defineNuxtConfig({
  css: [
    &#39;assets/global.scss&#39;
  ]
})
</code></pre><p>效果如初~</p><p><img src="`+i+`" alt=""></p><h3 id="全局样式导入" tabindex="-1"><a class="header-anchor" href="#全局样式导入"><span>全局样式导入</span></a></h3><p>如果想在 pages 和 components 里面使用 Sass 变量，则需要配置全局样式导入。</p><p>首先创建 assets/_variables.scss，移动变量到它里面。然后添加一个 vite 配置，nuxt.config.ts</p><pre><code>// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [&quot;assets/global.scss&quot;],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: &#39;@import &quot;~/assets/_variables.scss&quot;;&#39;,
        },
      },
    },
  },
});
</code></pre><p>下面就可以在组件页面中使用这些变量了，[id].vue：</p><pre><code>&lt;style scoped lang=&quot;scss&quot;&gt;
p {
  color: $linkColor
}
&lt;/style&gt;
</code></pre><p>效果如下：</p><p><img src="`+c+`" alt=""></p><h2 id="整合-tailwindcss" tabindex="-1"><a class="header-anchor" href="#整合-tailwindcss"><span>整合 Tailwindcss</span></a></h2><p>现在原子化 css 已经非常流行了，例如 Tailwindcss、Windicss 等，能够提升开发效率和体验。我们在后续项目开发中也将使用 Tailwindcss，因此这里给大家演示一下如何整合。</p><h3 id="整合-tailwindcss-1" tabindex="-1"><a class="header-anchor" href="#整合-tailwindcss-1"><span>整合 Tailwindcss</span></a></h3><p>安装 @nuxtjs/tailwindcss 模块：</p><pre><code>yarn add --dev @nuxtjs/tailwindcss
</code></pre><p>添加配置项，nuxt.config.ts：</p><pre><code>{
  modules: [
    &#39;@nuxtjs/tailwindcss&#39;
  ]
}
</code></pre><h3 id="配置全局样式和变量" tabindex="-1"><a class="header-anchor" href="#配置全局样式和变量"><span>配置全局样式和变量</span></a></h3><p>Tailwind 官方强烈建议单独使用 postcss，不要和其他 Sass 等预处理器混用。因此我们将替换掉前面的实现。</p><p>添加全局样式文件，请注意路径和文件名必须是：<code>assets/css/tailwind.css</code></p><pre><code>@import &#39;_variables.css&#39;;

@tailwind base;
@tailwind components;
@tailwind utilities;

a {
  text-decoration: none;
  color: var(--link-color);
}
</code></pre><p>_variables.css 就是前面的 _variables. scss，同时修改内容为：</p><pre><code>:root {
  --link-color: #3370ff;
}
</code></pre><p>最后，修改组件中使用方式，[id].vue:</p><pre><code>&lt;style scoped&gt;
p {
  color: var(--link-color)
}
&lt;/style&gt;
</code></pre><p>除了头像部分，这是因为 tailwind 默认样式导致，我们添加一些 class 修正一下：</p><pre><code>&lt;img
    class=&quot;w-[50px] border-[1px] border-slate-300 rounded-full inline-block&quot;
    src=&quot;~/assets/avatar.png&quot;
    alt=&quot;avatar&quot;
/&gt;
</code></pre><p>效果基本如初~</p><p><img src="`+p+`" alt=""></p><h3 id="样式调整" tabindex="-1"><a class="header-anchor" href="#样式调整"><span>样式调整</span></a></h3><p>最后我们调整导航样式，让它看起来更像个导航~ default.vue：</p><pre><code>&lt;nav
  class=&quot;border-b border-slate-200 px-5 py-2 flex items-center justify-between&quot;
&gt;
  &lt;h1 class=&quot;text-2xl font-bold&quot;&gt;Nuxt3 in Action&lt;/h1&gt;
  &lt;img
    class=&quot;w-[50px] border-[1px] border-slate-300 rounded-full inline-block&quot;
    src=&quot;~/assets/avatar.png&quot;
    alt=&quot;avatar&quot;
  /&gt;
&lt;/nav&gt;
</code></pre><p>效果还不错：</p><p><img src="`+d+'" alt=""></p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>好了！相信大家都可以很自如的使用各种图片和样式资源了，下一步，我们体验 Nuxt 丝滑的自动导入特性，并整合组件库到项目中，以备后续项目功能开发使用！</p>',65)]))}const m=t(r,[["render",u],["__file","index.html.vue"]]),v=JSON.parse(`{"path":"/nuxt3/cmlxapi9/","title":"06-如何使用静态资源及整合 TailwindCSS？","lang":"zh-CN","frontmatter":{"title":"06-如何使用静态资源及整合 TailwindCSS？","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/cmlxapi9/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"资源目录","slug":"资源目录","link":"#资源目录","children":[]},{"level":2,"title":"全局样式","slug":"全局样式","link":"#全局样式","children":[{"level":3,"title":"nuxt.config.ts 配置全局样式:","slug":"nuxt-config-ts-配置全局样式","link":"#nuxt-config-ts-配置全局样式","children":[]},{"level":3,"title":"app.vue 中引入全局样式","slug":"app-vue-中引入全局样式","link":"#app-vue-中引入全局样式","children":[]},{"level":3,"title":"使用 CSS 预处理器：Sass","slug":"使用-css-预处理器-sass","link":"#使用-css-预处理器-sass","children":[]},{"level":3,"title":"全局样式导入","slug":"全局样式导入","link":"#全局样式导入","children":[]}]},{"level":2,"title":"整合 Tailwindcss","slug":"整合-tailwindcss","link":"#整合-tailwindcss","children":[{"level":3,"title":"整合 Tailwindcss","slug":"整合-tailwindcss-1","link":"#整合-tailwindcss-1","children":[]},{"level":3,"title":"配置全局样式和变量","slug":"配置全局样式和变量","link":"#配置全局样式和变量","children":[]},{"level":3,"title":"样式调整","slug":"样式调整","link":"#样式调整","children":[]}]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.12,"words":935},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"xxdl","email":"xxdl@xxdl.top","commits":2},{"name":"DengChang","email":"85365","commits":1}]},"filePathRelative":"notes/nuxt3/06-如何使用静态资源及整合 TailwindCSS？.md"}`);export{m as comp,v as data};
