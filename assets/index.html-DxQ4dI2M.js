import{_ as n,c as t,a as r,o as a}from"./app-D6s_7T7O.js";const s="/doc2show/img/23/1.png",i="/doc2show/img/23/2.png",o="/doc2show/img/23/3.png",p="/doc2show/img/23/4.png",l="/doc2show/img/23/5.png",c="/doc2show/img/23/6.png",m="/doc2show/img/23/7.png",d="/doc2show/img/23/8.png",u="/doc2show/img/23/9.png",g={};function h(f,e){return a(),t("div",null,e[0]||(e[0]=[r('<p>大家好，我是村长！</p><p>前面我们学习了数据库和接口的设计，是时候编写一些接口获取并返回数据。但是还是有个问题，我们可能对数据库查询语言 SQL 不是很熟悉，编写和调试 SQL 语句是非常耗时的工作。</p><p>还好，社区有很多 ORM(对象关系映射) 库，可以很好规避这个问题，例如本节我要给大家介绍的 Prisma，就是一个 ORM 库，它可以大幅简化数据库操作。本节涉及内容如下：</p><ul><li>什么是 Prisma；</li><li>快速体验 Prisma；</li><li>整合 Prisma 到 Nuxt 项目。</li></ul><h2 id="什么是-prisma" tabindex="-1"><a class="header-anchor" href="#什么是-prisma"><span>什么是 Prisma？</span></a></h2><p><strong>Prisma 是一个使用 TypeScript 和 Node.js 开发的 ORM (对象关系映射) 库</strong> ，用于简化对数据库的访问和操作。它提供了一种高级语言来定义数据模型，并且可以生成数据库架构和数据访问代码。</p><p><img src="'+s+`" alt=""></p><h2 id="快速体验-prisma" tabindex="-1"><a class="header-anchor" href="#快速体验-prisma"><span>快速体验 Prisma</span></a></h2><p>Prisma 通过以下流程简化我们的开发工作:</p><p>首先我们创建一个 Prisma schema（结构）：下面 schema 描述了我们要用 prisma-client-js 客户端和 MySQL 数据库交互。同时我们准备创建两个模型 Post 和 User，它们代表了未来要创建的数据库表结构。server/database/schema.prisma：</p><pre><code>        datasource db {
          provider = &quot;mysql&quot;
          url      = env(&quot;DATABASE_URL&quot;)
        }

        generator client {
          provider = &quot;prisma-client-js&quot;
        }

        model Post {
          id        Int     @id @default(autoincrement())
          title     String
          content   String?
          published Boolean @default(false)
          author    User?   @relation(fields: [authorId], references: [id])
          authorId  Int?
        }

        model User {
          id    Int     @id @default(autoincrement())
          email String  @unique
          name  String?
          posts Post[]
        }
</code></pre><p>添加环境变量 DATABASE_URL，.env</p><pre><code>DATABASE_URL=&quot;mysql://root:rootpassword@localhost:3306/test&quot;
</code></pre><p>然后通过定义生成数据库表结构，我们需要执行 <code>prisma migrate</code> CLI 命令，这个命令同时会生成 prisma client：</p><pre><code>npx prisma migrate dev --name init --schema server/database/schema.prisma 
</code></pre><p><img src="`+i+'" alt="image.png"> <img src="'+o+`" alt="image.png"></p><p>最后在代码中通过 client 访问数据库：</p><pre><code>import { PrismaClient } from &#39;@prisma/client&#39;

const prisma = new PrismaClient()

async function main() {
  // 查询所有用户
  const allUsers = await client.user.findMany()
  // eslint-disable-next-line no-console
  console.log(allUsers)
}

main()
  .then(async () =&gt; {
    await prisma.$disconnect()
  })
  .catch(async (e) =&gt; {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
</code></pre><p>执行这段代码：</p><pre><code>npx ts-node server/database/test.ts
</code></pre><p>注意需要配置一下 ts-node 模块选项，tsconfig.json：</p><pre><code>{
  // https://nuxt.com/docs/guide/concepts/typescript
  &quot;extends&quot;: &quot;./.nuxt/tsconfig.json&quot;,
  &quot;ts-node&quot;: {
    &quot;compilerOptions&quot;: {
      &quot;module&quot;:&quot;CommonJS&quot;
    }
  }
}
</code></pre><p>执行结果如下，此时并没有数据，所以返回空数组。</p><p><img src="`+p+`" alt="image.png"></p><p>我们插入一些数据进去：</p><pre><code>  await prisma.user.create({
    data: {
      name: &#39;村长&#39;,
      email: &#39;yt0379@qq.com&#39;,
      posts: {
        create: {
          title: &#39;10分钟速通下一代ORM解决方案：Prisma&#39;,
        },
      },
    },
  })
</code></pre><p>查询时添加 include 选项：</p><pre><code>  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  })
  console.dir(allUsers, { depth: null })
</code></pre><p>查询结果如下：</p><p><img src="`+l+`" alt=""></p><p>最后更新数据可以使用 <code>update({...})</code>：</p><pre><code>  const post = await prisma.post.update({
    where: { id: 1 },
    data: { published: true },
  })

  console.log(post)
</code></pre><p><img src="`+c+`" alt="image.png"></p><h2 id="整合-prisma-到-nuxt-项目" tabindex="-1"><a class="header-anchor" href="#整合-prisma-到-nuxt-项目"><span>整合 Prisma 到 Nuxt 项目</span></a></h2><p>下面我们整合 Prisma 到 Nuxt 项目中，主要是客户端和连接管理，以及业务代码拆分。</p><h3 id="客户端和连接管理" tabindex="-1"><a class="header-anchor" href="#客户端和连接管理"><span>客户端和连接管理</span></a></h3><p>我们观察到前面的例子中，每次调用查询后，都会明确的关闭连接，以避免连接池耗尽。不过官方文档明确表示，对于一个 long-running application，建议我们使用一个单例的 PrismaClient。</p><p>server/database/client.ts</p><pre><code>import { PrismaClient } from &#39;@prisma/client&#39;

const prisma = new PrismaClient()
export default prisma
</code></pre><h3 id="业务代码拆分" tabindex="-1"><a class="header-anchor" href="#业务代码拆分"><span>业务代码拆分</span></a></h3><p>在 Java 领域一般不会把数据库操作代码和其他业务代码混在一起，代码会被拆分为 controller 和 service 层，将数据库操作代码放 controller 层，业务代码放在 service 层，最后在接口中组合。</p><p>因此我们也模仿这种组织结构，创建一个 repositories 目录，将数据库相关操作按照表作为单元拆分，类似于 controller 层。然后在接口中调用这些 repository 进行组合完成业务。如果大家觉得业务过于复杂，还可以继续提取出 service。</p><p><img src="`+m+`" alt=""></p><h3 id="范例-编写用户登录接口" tabindex="-1"><a class="header-anchor" href="#范例-编写用户登录接口"><span>范例：编写用户登录接口</span></a></h3><p>下面我们编写一个用户登录接口，演示一下前面提到的代码组织方式。</p><p>首先创建 userRepository.ts，编写 createUser 和 getUserByEmail 两个方法：</p><pre><code>import type { User } from &#39;@prisma/client&#39;
import prisma from &#39;~/server/database/client&#39;
import type { IUser } from &#39;~/types/IUser&#39;

export async function getUserByEmail(email: string): Promise&lt;User | null&gt; {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

export async function createUser(data: IUser) {
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
    },
  })

  return user
}
</code></pre><p>这里需要创建一个 User 类型，创建 ~/types/IUser.ts:</p><pre><code>export interface IUser {
  id?: number
  email: string
  name?: string
}
</code></pre><p>下面编写登录接口，~/server/api/login.ts：</p><pre><code>import { getUserByEmail } from &#39;../database/repositories/userRepository&#39;

export default defineEventHandler(async (e) =&gt; {
  const { email } = await readBody(e)

  if (!email)
    return sendError(e, createError(&#39;email required!&#39;))

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return sendError(e, createError({
        statusCode: 401,
        statusMessage: &#39;email not exist!&#39;,
      }))
    }

    return user
  }
  catch (error) {
    console.error(error)
    return sendError(e, createError(&#39;Failed to retrieve data!&#39;))
  }
})
</code></pre><p>编写一个登录页面测试一下，~/pages/login.vue：</p><pre><code>&lt;script setup lang=&quot;ts&quot;&gt;
const email = useState(() =&gt; &#39;&#39;)
const onLogin = () =&gt; {
  $fetch(&#39;/api/login&#39;, {
    method: &#39;post&#39;,
    body: {
      email: email.value,
    },
  }).then((user) =&gt; {
    console.log(user)
  }).catch((err) =&gt; {
    console.log(err)
  })
}
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;NInput v-model:value=&quot;email&quot; /&gt;
    &lt;NButton @click=&quot;onLogin&quot;&gt;
      登录
    &lt;/NButton&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre><p>测试结果非常理想！</p><p><img src="`+d+'" alt=""></p><p><img src="'+u+'" alt=""></p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>好了，关于如何使用 Prisma 访问数据库就跟大家讲到这里了，再总结一下使用流程：</p><ol><li>创建 schema.prisma；</li><li>生成数据库；</li><li>创建 PrismaClient；</li><li>访问数据库。</li></ol><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>现在可以说万事俱备了，下节课我们正式开启项目实战，咱们下节再见！</p>',61)]))}const v=n(g,[["render",h],["__file","index.html.vue"]]),q=JSON.parse(`{"path":"/nuxt3/iu8ulv0n/","title":"23-10分钟速通下一代 ORM 解决方案：Prisma","lang":"zh-CN","frontmatter":{"title":"23-10分钟速通下一代 ORM 解决方案：Prisma","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/iu8ulv0n/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"什么是 Prisma？","slug":"什么是-prisma","link":"#什么是-prisma","children":[]},{"level":2,"title":"快速体验 Prisma","slug":"快速体验-prisma","link":"#快速体验-prisma","children":[]},{"level":2,"title":"整合 Prisma 到 Nuxt 项目","slug":"整合-prisma-到-nuxt-项目","link":"#整合-prisma-到-nuxt-项目","children":[{"level":3,"title":"客户端和连接管理","slug":"客户端和连接管理","link":"#客户端和连接管理","children":[]},{"level":3,"title":"业务代码拆分","slug":"业务代码拆分","link":"#业务代码拆分","children":[]},{"level":3,"title":"范例：编写用户登录接口","slug":"范例-编写用户登录接口","link":"#范例-编写用户登录接口","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":4.26,"words":1278},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/23-10分钟速通下一代 ORM 解决方案：Prisma.md"}`);export{v as comp,q as data};
