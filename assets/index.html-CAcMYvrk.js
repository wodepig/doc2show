import{_ as t,c as n,a as r,o as a}from"./app-D6s_7T7O.js";const o="/doc2show/img/15/1.png",i="/doc2show/img/15/2.png",d={};function s(l,e){return a(),n("div",null,e[0]||(e[0]=[r(`<p>大家好，我是村长！</p><p>本节我们讲一下中间件，什么是中间件？大家如果接触过 express、koa 这类 node.js 框架，应该都会知道它们其实就是 <strong>请求拦截器</strong> ，当一个请求过来时，通过中间件可以增加自己的处理逻辑，相当于流水线上加一道“工序”。在 Nuxt 中也存在这种中间件机制，只不过被细分为两种：</p><ul><li>Route middleware：路由中间件；</li><li>Server middleware：服务器中间件。</li></ul><h2 id="路由中间件" tabindex="-1"><a class="header-anchor" href="#路由中间件"><span>路由中间件</span></a></h2><p>路由中间件并不是一定运行在客户端的中间件，而是运行在 Nuxt 应用中 Vue 渲染部分，路由中间件会在进入路由之前被调用，如果是 SSR，这个执行时刻既可能在服务端（首屏），也可能在客户端。</p><h3 id="中间件类型" tabindex="-1"><a class="header-anchor" href="#中间件类型"><span>中间件类型</span></a></h3><p>路由中间件根据影响范围和使用方式的不同，又分为三种：</p><ul><li><p>匿名中间件：只影响一个页面，不可复用；</p></li><li><p>具名中间件：指定若干影响页面，可复用、组合；</p></li><li><p>全局中间件：影响所有页面，文件名需要加后缀 global。</p></li></ul><h3 id="中间件使用" tabindex="-1"><a class="header-anchor" href="#中间件使用"><span>中间件使用</span></a></h3><p>匿名中间件用法，mid.vue：</p><pre><code>definePageMeta({
  middleware(to, from) {
    console.log(&#39;匿名中间件，具体页面执行&#39;);
  }
})
</code></pre><p>具名中间件用法，mid.vue：</p><pre><code>definePageMeta({
  middleware: [&#39;amid&#39;, &#39;bmid&#39;]
})
</code></pre><p>定义具名中间件，amid.ts：</p><pre><code>export default defineNuxtRouteMiddleware((to, from) =&gt; {
  console.log(&#39;具名中间件a，影响指定页面：&#39; + to.path); 
})
</code></pre><p>全局中间件，创建 cmid.global.ts：</p><pre><code>export default defineNuxtRouteMiddleware((to, from) =&gt; {
  console.log(&#39;全局中间件c，影响所有页面&#39;);
})
</code></pre><p>效果如下：</p><p><img src="`+o+`" alt=""></p><h3 id="参数和工具方法" tabindex="-1"><a class="header-anchor" href="#参数和工具方法"><span>参数和工具方法</span></a></h3><p>中间件可以获取目标路由 to 和来源路由 from，还有两个很常用的工具方法：</p><ul><li><p>abortNavigation(error)：跳过，留在 from；</p></li><li><p>navigateTo(route)：指定跳转目标。</p><p>export default defineNuxtRouteMiddleware((to, from) =&gt; { if (to.params.id === &#39;1&#39;) { return abortNavigation() } return navigateTo(&#39;/&#39;) })</p></li></ul><h3 id="范例-路由守卫" tabindex="-1"><a class="header-anchor" href="#范例-路由守卫"><span>范例：路由守卫</span></a></h3><p>下面给应用加一个路由守卫功能：如果没有登录则不能访问详情页 [id].vue。</p><p>首先创建 middleware/auth.ts：</p><pre><code>export default defineNuxtRouteMiddleware((to, from) =&gt; {
  const store = useUser();
  // 未登录，导航到登录页
  if (!store.isLogin) {
    return navigateTo(&quot;/login?callback=&quot; + to.path)
  }
})
</code></pre><p>页面中注册一下中间件，[id].vue：</p><pre><code>definePageMeta({
  middleware: [&#39;auth&#39;]
})

// 现在留言不需要在页内判断登录态
</code></pre><h2 id="服务端中间件" tabindex="-1"><a class="header-anchor" href="#服务端中间件"><span>服务端中间件</span></a></h2><p>每当请求到达服务器时，会在处理其他路由之前先执行中间件。因此可以用服务端中间件做一些诸如：请求头检测、请求日志、扩展请求上下文对象等等任务。</p><h3 id="服务端中间件使用" tabindex="-1"><a class="header-anchor" href="#服务端中间件使用"><span>服务端中间件使用</span></a></h3><p>Nuxt 会自动读取 ~/server/middleware 中的文件作为服务端中间件，例如下面请求日志中间件：</p><pre><code>export default defineEventHandler((event) =&gt; {
  console.log(&#39;New request: &#39; + event.node.req.url)
})
</code></pre><p>中间件还可以执行审查、扩展上下文或抛出错误：</p><pre><code>export default defineEventHandler((event) =&gt; {
  // 扩展上下文对象
  event.context.userInfo = { user: ‘cunzhang’ }
  // 审查请求信息
  const id = parseInt(event.context.params.id) as number
  if (!Number.isInteger(id)) {
    // 抛出错误
    return sendError(createError({
      statusCode: 400,
      statusMessage: &#39;ID should be an integer&#39;,
    }))
  }
})
</code></pre><h3 id="范例-保护指定服务端接口" tabindex="-1"><a class="header-anchor" href="#范例-保护指定服务端接口"><span>范例：保护指定服务端接口</span></a></h3><p>下面我们完成一个接口保护的需求：用户如果未登录，不能调用 <code>/api/detail/xxx</code>。</p><p>首先实现一个 server 中间件，检查指定接口请求中是否包含 token，~/server/middleware/auth.ts：</p><pre><code>import { H3Event } from &quot;h3&quot;;

export default defineEventHandler((event) =&gt; {
  // 请求不被允许时返回响应错误
  const isAllowed = protectAuthRoute(event);
  if (!isAllowed) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: &quot;Unauthorized&quot; })
    );
  }
});

function protectAuthRoute(event: H3Event) {
  const protectedRoutes = [&quot;/api/detail&quot;];
  // path 不以 protectedRoutes 中任何项为起始则允许请求
  if (
    !event?.path ||
    !protectedRoutes.some((route) =&gt; event.path?.startsWith(route))
  ) {
    return true;
  }
  return authCheck(event);
}

// 检查是否已认证
function authCheck(event: H3Event) { 
  const token = getHeader(event, &quot;token&quot;);
  if (!token) {
    return false;
  }
  return true;
}
</code></pre><p>对应的，客户端详情页 <code>[id].vue</code> 不再需要中间件保护，同时需要在请求时携带令牌，并且处理可能的响应错误：</p><pre><code>// definePageMeta({
//   middleware: [&quot;auth&quot;],
// });

const route = useRoute();
const router = useRouter();
const store = useUser();
const fetchPost = () =&gt;
  $fetch(\`/api/detail/\${route.params.id}\`, {
    // 如果已登录，请求时携带令牌
    headers: store.isLogin ? { token: &quot;abc&quot; } : {},
    onResponseError: ({ response }) =&gt; {
      // 如果响应 401 错误，重新登录
      if (response.status === 401) {
        router.push(&quot;/login?callback=&quot; + route.path);
      }
    },
  });
</code></pre><p>效果如下：</p><p><img src="`+i+'" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>至此，中间件的使用就介绍完了。可以看见中间件类似拦截器，前端拦截页面路由，后端拦截请求。路由中间件非常灵活，可以很容易控制作用范围和组合；服务端中间件则只能全局作用，在使用时要注意是不是指向作用于部分路由，如果是的话，要做一些额外的判断逻辑。</p><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>除了中间件，Nuxt 还提供了另一种扩展框架能力的手段：插件，下次内容我们将给大家介绍插件的使用。</p>',47)]))}const c=t(d,[["render",s],["__file","index.html.vue"]]),u=JSON.parse(`{"path":"/nuxt3/yb0x53dr/","title":"15-Route 中间件和 Server 中间件的概念和使用","lang":"zh-CN","frontmatter":{"title":"15-Route 中间件和 Server 中间件的概念和使用","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/yb0x53dr/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"路由中间件","slug":"路由中间件","link":"#路由中间件","children":[{"level":3,"title":"中间件类型","slug":"中间件类型","link":"#中间件类型","children":[]},{"level":3,"title":"中间件使用","slug":"中间件使用","link":"#中间件使用","children":[]},{"level":3,"title":"参数和工具方法","slug":"参数和工具方法","link":"#参数和工具方法","children":[]},{"level":3,"title":"范例：路由守卫","slug":"范例-路由守卫","link":"#范例-路由守卫","children":[]}]},{"level":2,"title":"服务端中间件","slug":"服务端中间件","link":"#服务端中间件","children":[{"level":3,"title":"服务端中间件使用","slug":"服务端中间件使用","link":"#服务端中间件使用","children":[]},{"level":3,"title":"范例：保护指定服务端接口","slug":"范例-保护指定服务端接口","link":"#范例-保护指定服务端接口","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":3.95,"words":1184},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/15-Route 中间件和 Server 中间件的概念和使用.md"}`);export{c as comp,u as data};
