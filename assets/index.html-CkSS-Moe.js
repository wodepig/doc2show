import{_ as n,c as t,a as r,o}from"./app-D6s_7T7O.js";const s="/doc2show/img/26/1.png",a="/doc2show/img/26/2.png",l="/doc2show/img/26/3.png",u="/doc2show/img/26/4.png",i={};function p(c,e){return o(),t("div",null,e[0]||(e[0]=[r('<p>大家好，我是村长！</p><p>本节我们实现项目登录、注册，我们需要完成以下任务：</p><ul><li><p>鉴权相关接口设计与实现；</p></li><li><p>前端页面逻辑。</p></li></ul><h2 id="接口设计" tabindex="-1"><a class="header-anchor" href="#接口设计"><span>接口设计</span></a></h2><p>我们需要三个接口：</p><ul><li>login：登录接口，接收用户名和密码，返回登录结果；</li><li>register：注册接口，接收用户名和密码，返回注册结果；</li><li>userinfo：获取用户信息接口，接收 token，返回用户信息。</li></ul><p>下面是 Apifox 中的 login 接口设计：</p><p><img src="'+s+'" alt=""></p><p><img src="'+a+'" alt=""></p><p><img src="'+l+`" alt=""></p><p>register 接口类似，不再赘述。</p><h2 id="接口实现" tabindex="-1"><a class="header-anchor" href="#接口实现"><span>接口实现</span></a></h2><p>下面我们实现三个接口。</p><h4 id="注册接口" tabindex="-1"><a class="header-anchor" href="#注册接口"><span>注册接口</span></a></h4><p>server/api/register.post.ts</p><pre><code>import bcrypt from &#39;bcryptjs&#39;
import jwt from &#39;jsonwebtoken&#39;
import type { User } from &#39;@prisma/client&#39;
import { createUser, getUserByUsername } from &#39;../database/repositories/userRepository&#39;

export default defineEventHandler(async (e) =&gt; {
  try {
    const data = await readBody&lt;User&gt;(e)
    const { username, password } = data
    // 校验...

    // 获取用户，存在同名用户
    const user = await getUserByUsername(username)

    if (user) {
      return sendError(e, createError({
        statusCode: 400,
        statusMessage: &#39;用户名已存在!&#39;,
      }))
    }

    // 加密
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    data.password = hash

    // 入库
    const result = await createUser(data)

    // 生成token，写入cookie
    const secret = process.env.JSON_SECRET
    const token = jwt.sign({ username: result.username }, secret, { expiresIn: &#39;24h&#39; })
    setCookie(e, &#39;token&#39;, token, { maxAge: 24 * 3600 })

    return { ok: true, data: result }
  }
  catch (error) {
    console.error(error)
    return sendError(e, createError(&#39;注册失败!&#39;))
  }
})
</code></pre><p>这里用到了数据库操作，我们修改一下之前的代码，server/database/reposirory/userRepository.ts:</p><pre><code>import type { User } from &#39;@prisma/client&#39;
import prisma from &#39;~/server/database/client&#39;

export async function getUserByUsername(username: string): Promise&lt;User | null&gt; {
  const result = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  return result
}

export async function createUser(data: User) {
  const user = await prisma.user.create({ data })
  return user
}
</code></pre><h4 id="登录接口" tabindex="-1"><a class="header-anchor" href="#登录接口"><span>登录接口</span></a></h4><p>server/api/login.ts</p><pre><code>import bcrypt from &#39;bcryptjs&#39;
import jwt from &#39;jsonwebtoken&#39;
import type { User } from &#39;@prisma/client&#39;
import { getUserByUsername } from &#39;../database/repositories/userRepository&#39;

export default defineEventHandler(async (e) =&gt; {
  const { username, password } = await readBody&lt;User&gt;(e)

  // 校验...

  try {
    // 获取用户
    const user = await getUserByUsername(username)

    if (!user) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: &#39;用户错误!&#39;,
      }))
    }

    // 校验密码
    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: &#39;密码错误!&#39;,
      }))
    }

    // 写入cookie
    const secret = process.env.JSON_SECRET
    const token = jwt.sign({ username: user.username }, secret, { expiresIn: &#39;24h&#39; })
    setCookie(e, &#39;token&#39;, token, { maxAge: 24 * 3600 })

    return { ok: true, data: user }
  }
  catch (error) {
    console.error(error)
    return sendError(e, createError(&#39;登录失败!&#39;))
  }
})
</code></pre><h4 id="获取用户信息" tabindex="-1"><a class="header-anchor" href="#获取用户信息"><span>获取用户信息</span></a></h4><p>用户如果已经登录过，在固定时间内应当不需要登录。我们可以在页面中发送 token 到服务端，然后获取用户信息并返回。</p><p>/server/api/userinfo.get.ts</p><pre><code>import jwt from &#39;jsonwebtoken&#39;
import { getUserByUsername } from &#39;../database/repositories/userRepository&#39;

export default defineEventHandler(async (e) =&gt; {
  // 获取令牌
  const token = getCookie(e, &#39;token&#39;)

  // 令牌不存在
  if (!token)
    return { ok: false }

  let info
  try {
    // 解析token
    info = jwt.verify(token, process.env.JSON_SECRET!)
    const currentTime = Date.now() / 1000

    if (info.exp &lt; currentTime) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: &#39;token过期!&#39;,
      }))
    }
  }
  catch (error) {
    return sendError(e, createError({
      statusCode: 401,
      statusMessage: &#39;token不合法!&#39;,
    }))
  }

  try {
    const user = await getUserByUsername(info.username)

    // 用户不存在
    if (!user) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: &#39;用户不存在!&#39;,
      }))
    }
    return { ok: true, data: user }
  }
  catch (error) {
    console.error(error)
    return sendError(e, createError(&#39;获取用户信息失败!&#39;))
  }
})
</code></pre><h2 id="请求封装" tabindex="-1"><a class="header-anchor" href="#请求封装"><span>请求封装</span></a></h2><p>接下来要实现前端登录逻辑，需要请求数据，我们把请求封装一下便于使用。</p><p>composabes/request.ts</p><pre><code>import { merge } from &#39;lodash&#39;

type FetchType = typeof $fetch
type ReqType = Parameters&lt;FetchType&gt;[0]
type FetchOptions = Parameters&lt;FetchType&gt;[1]

export function httpRequest&lt;T = unknown&gt;(
  method: any,
  url: ReqType,
  body?: any,
  opts?: FetchOptions,
) {
  const token = useCookie(&#39;token&#39;)
  const router = useRouter()
  const route = useRoute()

  const defaultOpts = {
    method,
    // baseURL: &#39;/api&#39;,
    headers: { token: token.value } as any,
    body,
    onRequestError() {
      message.error(&#39;请求出错，请重试！&#39;)
    },
    onResponseError({ response }) {
      console.log(response)

      switch (response.status) {
        case 400:
          message.error(&#39;参数错误&#39;)
          break
        case 401:
          message.error(&#39;没有访问权限&#39;)
          router.push(\`/login?callback=\${route.path}\`)
          break
        case 403:
          message.error(&#39;服务器拒绝访问&#39;)
          break
        case 404:
          message.error(&#39;请求地址错误&#39;)
          break
        case 500:
          message.error(&#39;服务器故障&#39;)
          break
        default:
          message.error(&#39;网络连接故障&#39;)
          break
      }
    },
  } as FetchOptions

  return $fetch&lt;T&gt;(url, merge(defaultOpts, opts))
}

export function httpPost&lt;T = unknown&gt;(
  request: ReqType,
  body?: any,
  opts?: FetchOptions,
) {
  return httpRequest&lt;T&gt;(&#39;post&#39;, request, body, opts)
}

export function httpGet&lt;T = unknown&gt;(
  request: ReqType,
  opts?: FetchOptions,
) {
  return httpRequest&lt;T&gt;(&#39;get&#39;, request, null, opts)
}
</code></pre><h2 id="前端登录注册" tabindex="-1"><a class="header-anchor" href="#前端登录注册"><span>前端登录注册</span></a></h2><h4 id="登录页面逻辑实现" tabindex="-1"><a class="header-anchor" href="#登录页面逻辑实现"><span>登录页面逻辑实现</span></a></h4><p>登录页面需要完成:</p><ul><li><p>数据收集；</p></li><li><p>数据校验；</p></li><li><p>请求登录和结果处理。</p></li></ul><p>login.vue</p><pre><code>&lt;script setup lang=&quot;ts&quot;&gt;
import type { FormInst, FormRules } from &#39;naive-ui&#39;

useHead({
  title: &#39;登录&#39;,
})

// 定义页面布局
definePageMeta({
  layout: &#39;blank&#39;,
})

const formRef = ref&lt;FormInst&gt;()
const model = ref({
  username: &#39;&#39;,
  password: &#39;&#39;,
})

const rules: FormRules = {
  username: [{
    required: true,
    message: &#39;请输入用户名&#39;,
    trigger: &#39;blur&#39;,
  }],
  password: [{
    required: true,
    message: &#39;请输入密码&#39;,
    trigger: &#39;blur&#39;,
  }],
}

const store = useUser()
const login = () =&gt; {
  // 校验
  formRef.value!.validate(async (errors) =&gt; {
    if (!errors) {
      const { ok, data } = await httpPost(&#39;/api/login&#39;, {
        username: model.value.username,
        password: model.value.password,
      })
      if (ok) {
        // 保存user状态
        store.userInfo = data
        // 跳转首页
        navigateTo(&#39;/&#39;)
      }
    }
  })
}
&lt;/script&gt;

&lt;template&gt;
  &lt;h2 class=&quot;flex justify-between&quot;&gt;
    返回羊村
    &lt;nuxt-link to=&quot;/register&quot;&gt;
      &lt;NButton quaternary type=&quot;primary&quot; size=&quot;tiny&quot;&gt;
        还未入村？
      &lt;/NButton&gt;
    &lt;/nuxt-link&gt;
  &lt;/h2&gt;

  &lt;NAlert title=&quot;演示账号和密码为：test&quot; type=&quot;info&quot; class=&quot;mb-6&quot; /&gt;

  &lt;NForm ref=&quot;formRef&quot; :model=&quot;model&quot; :rules=&quot;rules&quot; class=&quot;w-[340px]&quot; size=&quot;large&quot;&gt;
    &lt;NFormItem :show-label=&quot;false&quot; path=&quot;username&quot;&gt;
      &lt;NInput v-model:value=&quot;model.username&quot; clearable placeholder=&quot;用户名&quot; /&gt;
    &lt;/NFormItem&gt;
    &lt;NFormItem :show-label=&quot;false&quot; path=&quot;password&quot;&gt;
      &lt;NInput v-model:value=&quot;model.password&quot; clearable placeholder=&quot;密码&quot; type=&quot;password&quot; /&gt;
    &lt;/NFormItem&gt;

    &lt;div&gt;
      &lt;NButton class=&quot;w-full&quot; type=&quot;primary&quot; @click=&quot;login&quot;&gt;
        登录
      &lt;/NButton&gt;
    &lt;/div&gt;
  &lt;/NForm&gt;
&lt;/template&gt;
</code></pre><p>这里用到了全局状态，新增一个 store/user.ts</p><pre><code>export const useUser = defineStore(&#39;user&#39;, {
  state: () =&gt; ({
    userInfo: null,
  }),
})
</code></pre><h4 id="注册页面逻辑实现" tabindex="-1"><a class="header-anchor" href="#注册页面逻辑实现"><span>注册页面逻辑实现</span></a></h4><p>注册页面类似登录页面，但是多了一个确认密码一致性的验证。</p><pre><code>const model = ref({
  confirmPass: &#39;&#39;, // +++
})

const rules: FormRules = {
  // +++
  confirmPass: [{
    required: true,
    message: &#39;请再次输入密码&#39;,
  }, {
    validator: (rule, value, callback) =&gt; {
      if (value !== model.value.password) {
        callback(new Error(&#39;两次输入的密码不一致&#39;))
        return false
      }
      else {
        callback()
        return true
      }
    },
    trigger: [&#39;blur&#39;, &#39;input&#39;],
  }],
}
</code></pre><h2 id="显示用户信息和注销登录" tabindex="-1"><a class="header-anchor" href="#显示用户信息和注销登录"><span>显示用户信息和注销登录</span></a></h2><p>导航栏中需要显示用户信息，并提供注销登录功能。</p><p><img src="`+u+`" alt=""></p><h4 id="显示用户信息" tabindex="-1"><a class="header-anchor" href="#显示用户信息"><span>显示用户信息</span></a></h4><p>根据全局存储的 user 状态决定显示登录按钮还是用户信息，components/MyHeader.vue：</p><pre><code>&lt;script setup&gt;
const store = useUser()
const { userInfo } = storeToRefs(store)

const options = [{
  label: &#39;用户中心&#39;,
  key: &#39;center&#39;,
}, {
  label: &#39;退出&#39;,
  key: &#39;logout&#39;,
}]

const dialog = useDialog()
const handleSelect = (k) =&gt; {
  switch (k) {
    case &#39;logout&#39;:
      dialog.warning({
        content: &#39;确定退出登录吗？&#39;,
        positiveText: &#39;退出&#39;,
        negativeText: &#39;取消&#39;,
        onPositiveClick: () =&gt; logout(),
      })
      break
    case &#39;center&#39;:
      navigateTo(&#39;/usercenter&#39;)
      break
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div class=&quot;bg-white fixed top-0 left-0 right-0 shadow-sm z-1000&quot;&gt;
    &lt;div class=&quot;container m-auto flex items-center h-[60px] px-4&quot;&gt;
      &lt;!-- ... --&gt;

      &lt;NuxtLink v-if=&quot;!userInfo&quot; to=&quot;/login&quot;&gt;
        &lt;NButton secondary strong&gt;
          登录
        &lt;/NButton&gt;
      &lt;/NuxtLink&gt;

      &lt;NDropdown
        v-else :options=&quot;options&quot; @select=&quot;handleSelect&quot;
      &gt;
        &lt;NAvatar
          round size=&quot;small&quot;
          :src=&quot;userInfo.avatar ? userInfo.avatar : &#39;/avatar.png&#39;&quot;
        /&gt;
      &lt;/NDropdown&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><p>这里用到对话框，注意添加一个 NDialogProvider，app.vue：</p><pre><code>&lt;NDialogProvider&gt;
  &lt;NMessageProvider&gt;
    &lt;NuxtLayout&gt;
      &lt;NuxtPage /&gt;
    &lt;/NuxtLayout&gt;
  &lt;/NMessageProvider&gt;
&lt;/NDialogProvider&gt;
</code></pre><h3 id="注销登录" tabindex="-1"><a class="header-anchor" href="#注销登录"><span>注销登录</span></a></h3><p>点击“退出”可以注销登录状态。</p><p>composables/auth.ts</p><pre><code>export function logout() {
  // 清除状态
  const store = useUser()
  store.userInfo = null

  // 清cookie
  const token = useCookie(&#39;token&#39;)
  if (token.value)
    token.value = null

  message.success(&#39;退出登录成功&#39;)

  // 回到首页
  const route = useRoute()
  if (route.path !== &#39;/&#39;)
    navigateTo(&#39;/&#39;)
}
</code></pre><h2 id="登录状态持久化" tabindex="-1"><a class="header-anchor" href="#登录状态持久化"><span>登录状态持久化</span></a></h2><p>用户刷新页面，应该保存登录状态才对。这里可以利用之前存储的 token，在布局页上获取用户信息。</p><p>default.vue：</p><pre><code>&lt;script setup lang=&quot;ts&quot;&gt;
onMounted(async () =&gt; {
  const store = useUser()
  // 获取用户信息
  const { ok, data } = await httpGet(&#39;/api/userinfo&#39;)
  if (ok)
    store.userInfo = data
})
&lt;/script&gt;
</code></pre><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>接下来我们计划完成首页的数据获取和显示！</p>`,58)]))}const g=n(i,[["render",p],["__file","index.html.vue"]]),m=JSON.parse(`{"path":"/nuxt3/hafngbrt/","title":"26-登陆注册业务实现","lang":"zh-CN","frontmatter":{"title":"26-登陆注册业务实现","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/hafngbrt/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"接口设计","slug":"接口设计","link":"#接口设计","children":[]},{"level":2,"title":"接口实现","slug":"接口实现","link":"#接口实现","children":[]},{"level":2,"title":"请求封装","slug":"请求封装","link":"#请求封装","children":[]},{"level":2,"title":"前端登录注册","slug":"前端登录注册","link":"#前端登录注册","children":[]},{"level":2,"title":"显示用户信息和注销登录","slug":"显示用户信息和注销登录","link":"#显示用户信息和注销登录","children":[{"level":3,"title":"注销登录","slug":"注销登录","link":"#注销登录","children":[]}]},{"level":2,"title":"登录状态持久化","slug":"登录状态持久化","link":"#登录状态持久化","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":5.34,"words":1603},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/26-登陆注册业务实现.md"}`);export{g as comp,m as data};
