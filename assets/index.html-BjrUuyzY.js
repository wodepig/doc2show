import{_ as n,c as i,a as t,o as r}from"./app-D6s_7T7O.js";const l="/doc2show/img/24/1.png",s="/doc2show/img/24/2.png",a="/doc2show/img/24/3.png",o="/doc2show/img/24/4.png",d="/doc2show/img/24/5.png",c="/doc2show/img/24/6.png",p="/doc2show/img/24/7.png",u="/doc2show/img/24/8.png",m={};function g(h,e){return r(),i("div",null,e[0]||(e[0]=[t('<p>大家好，我是村长！</p><p>从本节开始，我们准备完成一个实战项目，验证一下前面所学知识。本节安排如下：</p><ul><li>需求分析；</li><li>项目创建；</li><li>接口设计；</li><li>接口实现；</li><li>主体布局；</li><li>首页实现；</li><li>详情页实现；</li><li>课程页实现；</li><li>专栏页实现；</li><li>项目部署。</li></ul><h2 id="项目概要" tabindex="-1"><a class="header-anchor" href="#项目概要"><span>项目概要</span></a></h2><p>项目名为《羊村学堂》，顾名思义是我们羊村的学习网站，小羊们在羊村学堂可以通过订阅课程或者专栏文章学习编程知识，需要付出的代价是“草”。该网站将包括以下页面模块：</p><ul><li>用户登录、注册</li></ul><p><img src="'+l+'" alt=""></p><ul><li>网站首页：展示最新课程和专栏、推荐课程和专栏</li></ul><p><img src="'+s+'" alt=""></p><ul><li>课程页：分页展示课程列表</li></ul><p><img src="'+a+'" alt=""></p><ul><li>课程详情：课程详细介绍、课程表、购买链接</li></ul><p><img src="'+o+'" alt=""></p><ul><li><p>专栏页：分页展示专栏列表</p></li><li><p>专栏详情：专栏详细内容、购买链接</p></li><li><p>订单页：订单详情和确认</p></li></ul><p><img src="'+d+'" alt=""></p><ul><li>支付页：支付订单</li></ul><p><img src="'+c+'" alt=""></p><ul><li>用户中心：用户信息、已购课程等</li></ul><p><img src="'+p+`" alt=""></p><h2 id="数据模型" tabindex="-1"><a class="header-anchor" href="#数据模型"><span>数据模型</span></a></h2><p>根据以上页面和业务，我们提取以下数据模型：</p><ul><li><p>用户：用户名、头像、昵称、性别、密码等；</p></li><li><p>课程：名称、现价、原价、封面、描述、详情；</p></li><li><p>目录：标题、资源地址；</p></li><li><p>专栏：名称、封面、描述、详情；</p></li><li><p>订单：产品 id、下单时间、订单状态。</p></li></ul><p>下面是 schema.prisma：</p><pre><code>datasource db {
  provider = &quot;mysql&quot;
  url      = env(&quot;DATABASE_URL&quot;)
}

generator client {
  provider = &quot;prisma-client-js&quot;
}

model Column {
  id      Int     @id @default(autoincrement())
  title   String
  cover   String
  desc    String?
  content String? @db.Text
}

model Course {
  id     Int              @id @default(autoincrement())
  title  String
  cover  String
  price  Decimal
  oPrice Decimal
  desc   String?
  detail String?          @db.Text
  users  UsersOnCourses[]
  orders Order[]
}

model Catalogue {
  id     Int    @id @default(autoincrement())
  title  String
  source String
  course   Course @relation(fields: [courseId], references: [id])
  courseId Int
}

model User {
  id       Int              @id @default(autoincrement())
  username String           @unique
  password String
  nickname String?
  avatar   String?
  sex      String?
  courses  UsersOnCourses[]
  orders   Order[]
}

model UsersOnCourses {
  user     User   @relation(fields: [userId], references: [id])
  userId   Int
  course   Course @relation(fields: [courseId], references: [id])
  courseId Int

  @@id([userId, courseId])
}

model Order {
  id        Int         @id @default(autoincrement())
  course    Course      @relation(fields: [courseId], references: [id])
  courseId  Int
  user      User        @relation(fields: [userId], references: [id])
  userId    Int
  createdAt DateTime
  status    OrderStatus
}

enum OrderStatus {
  WAIT_CONFIRM
  WAIT_PAY
  COMPLETED
}
</code></pre><p>加一个脚本方便执行，package.json：</p><pre><code>&quot;migrate&quot;: &quot;npx prisma migrate dev --name init --schema server/database/schema.prisma&quot;
</code></pre><p>执行之后的效果如下图：</p><p><img src="`+u+'" alt=""></p><h2 id="数据接口" tabindex="-1"><a class="header-anchor" href="#数据接口"><span>数据接口</span></a></h2><p>根据以上页面和业务，我们需要提供以下数据接口：</p><ul><li><p>登录、注册：login、register ；</p></li><li><p>课程页：course ；</p></li><li><p>课程详情：course/:id ；</p></li><li><p>专栏页：column ；</p></li><li><p>专栏详情：column/:id ；</p></li><li><p>订单页：order(get/patch) ；</p></li><li><p>用户中心：user(get/patch)，upload，changePassword(patch)。</p></li></ul><h2 id="下次预告" tabindex="-1"><a class="header-anchor" href="#下次预告"><span>下次预告</span></a></h2><p>下节课我们先从项目基础布局开始的我们开发之旅！</p>',33)]))}const _=n(m,[["render",g],["__file","index.html.vue"]]),I=JSON.parse(`{"path":"/nuxt3/4f6e448x/","title":"24-《羊村学堂》项目需求分析和数据模型设计","lang":"zh-CN","frontmatter":{"title":"24-《羊村学堂》项目需求分析和数据模型设计","author":"Your name","createTime":"2024/07/29 16:11:51","permalink":"/nuxt3/4f6e448x/","head":[["script",{"id":"check-dark-mode"},";(function () {const um= localStorage.getItem('vuepress-theme-appearance') || 'auto';const sm = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;const isDark = um === 'dark' || (um !== 'light' && sm);document.documentElement.dataset.theme = isDark ? 'dark' : 'light';})();"],["script",{"id":"check-mac-os"},"document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))"]]},"headers":[{"level":2,"title":"项目概要","slug":"项目概要","link":"#项目概要","children":[]},{"level":2,"title":"数据模型","slug":"数据模型","link":"#数据模型","children":[]},{"level":2,"title":"数据接口","slug":"数据接口","link":"#数据接口","children":[]},{"level":2,"title":"下次预告","slug":"下次预告","link":"#下次预告","children":[]}],"readingTime":{"minutes":2.21,"words":662},"git":{"createdTime":1722241276000,"updatedTime":1728783252000,"contributors":[{"name":"DengChang","email":"85365","commits":1},{"name":"xxdl","email":"xxdl@xxdl.top","commits":1}]},"filePathRelative":"notes/nuxt3/24-《羊村学堂》项目需求分析和数据模型设计.md"}`);export{_ as comp,I as data};
