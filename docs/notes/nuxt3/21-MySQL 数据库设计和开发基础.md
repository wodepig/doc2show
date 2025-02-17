---
title: 21-MySQL 数据库设计和开发基础
author: Your name
createTime: 2024/07/29 16:11:51
permalink: /nuxt3/3olhps22/
---
## 概要

大家好，我是村长！

前面我们准备好了数据库开发环境，本讲我们给大家普及一下数据库设计和开发基础知识。

本节内容如下：

  * 用户管理；

  * 数据库增删；

  * 数据表设计；

  * 数据 CRUD。

## 用户管理

从安全角度讲，我们将来需要在应用中使用非 root 用户，则需要添加新的 MySQL 用户，并且不同用户可以赋予不同的用户权限。这个操作实际上是往
`mysql` 数据库中的 `user` 表添加新数据：

mysql数据库：

![](/img/21/1.png)

user表：

![](/img/21/2.png)

### 增加新用户

以下为添加用户的实例，新增一个普通用户，只能查看、新增和更新数据：

  * 用户名：57code；

  * 密码为：666666；

  * 操作权限：SELECT、INSERT、UPDATE。

首先选择：mysql_db_container -> 权限

![](/img/21/3.png)

选择数据库：例如 mysql

![](/img/21/4.png)

创建用户：

![](/img/21/5.png)

填入用户名和密码：

![](/img/21/6.png)

勾选权限：

![](/img/21/7.png)

点击“保存”，效果如下：

![](/img/21/8.png)

## 数据库增删改

前面我们操作的是 mysql 数据库，开发中每个应用基本都有对应的数据库。

### 创建数据库

下面我们创建一个羊村学堂数据库`ycxt`

点击“创建数据库”：

![](/img/21/9.png)

填入数据库名称：编码可以默认。

![](/img/21/10.png)

创建成功，效果如下：

![](/img/21/11.png)

### 修改数据库

点击“修改数据库”：

![](/img/21/12.png)

可以修改名称和编码，也可以删库（就是删库跑路的那个删库^_^）：

![](/img/21/13.png)

## 数据表设计

有了数据库，就可以创建具体的数据表。数据表由若干字段组成，首先我们要了解字段都有哪些数据类型。

### 数据类型

数据类型分几个大类：

  * 字符串：指 CHAR、VARCHAR、BINARY、VARBINARY、BLOB、TEXT、ENUM和SET，具体范围如下：

类型| 大小| 用途  
---|---|---  
CHAR| 0-255 bytes| 定长字符串  
VARCHAR| 0-65535 bytes| 变长字符串  
TINYBLOB| 0-255 bytes| 不超过 255 个字符的二进制字符串  
TINYTEXT| 0-255 bytes| 短文本字符串  
BLOB| 0-65 535 bytes| 二进制形式的长文本数据  
TEXT| 0-65 535 bytes| 长文本数据  
MEDIUMBLOB| 0-16 777 215 bytes| 二进制形式的中等长度文本数据  
MEDIUMTEXT| 0-16 777 215 bytes| 中等长度文本数据  
LONGBLOB| 0-4 294 967 295 bytes| 二进制形式的极大文本数据  
LONGTEXT| 0-4 294 967 295 bytes| 极大文本数据  
  * 数值：包括严格数值数据类型(INTEGER、SMALLINT、DECIMAL 和 NUMERIC)，以及近似数值数据类型(FLOAT、REAL 和 DOUBLE PRECISION)。具体范围如下：

类型| 大小| 范围（有符号）| 范围（无符号）| 用途  
---|---|---|---|---  
TINYINT| 1 Bytes| (-128，127)| (0，255)| 小整数值  
SMALLINT| 2 Bytes| (-32 768，32 767)| (0，65 535)| 大整数值  
MEDIUMINT| 3 Bytes| (-8 388 608，8 388 607)| (0，16 777 215)| 大整数值  
INT或INTEGER| 4 Bytes| (-2 147 483 648，2 147 483 647)| (0，4 294 967 295)| 大整数值  
BIGINT| 8 Bytes| (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)| (0，18
446 744 073 709 551 615)| 极大整数值  
FLOAT| 4 Bytes| (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351
E-38，3.402 823 466 351 E+38)| 0，(1.175 494 351 E-38，3.402 823 466 E+38)| 单精度
浮点数值  
DOUBLE| 8 Bytes| (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4
E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)|
0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308)| 双精度 浮点数值  
DECIMAL| 对DECIMAL(M,D) 如果M>D，为M+2，否则为D+2| 依赖于M和D的值| 依赖于M和D的值| 小数值  
  * 日期和时间：表示时间值的日期和时间类型为DATETIME、DATE、TIMESTAMP、TIME和YEAR

类型| 大小| 范围| 格式| 用途  
---|---|---|---|---  
DATE| 3bytes| 1000-01-01/9999-12-31| YYYY-MM-DD| 日期值  
TIME| 3bytes| '-838:59:59'/'838:59:59'| HH:MM:SS| 时间值或持续时间  
YEAR| 1bytes| 1901/2155| YYYY| 年份值  
DATETIME| 8bytes| '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'| YYYY-MM-DD
hh:mm:ss| 混合日期和时间值  
TIMESTAMP| 4bytes| '1970-01-01 00:00:01' UTC 到 '2038-01-19 03:14:07' UTC结束时间是第
2147483647 秒，北京时间 2038-1-19 11:14:07，格林尼治时间 2038年1月19日 凌晨 03:14:07| YYYY-MM-DD
hh:mm:ss| 混合日期和时间值，时间戳  
  * 二进制。

  * 几何图形。

### 数据表增删

了解了都有哪些数据类型可用之后，我们尝试创建并设计一张表，在选择各种字段类型时，原则是够用即可，太大了浪费空间，太小了会丢失信息。

下面我们创建一张课程表`course`，我们未来希望像下面这样展示课程：

![](/img/21/14.png)

则我们需要如下字段：

  * 封面 - cover ；

  * 价格 - price ；

  * 原价 - t_price ；

  * 标题 - title ；

  * 描述信息 - desc 。

点击“创建表”：

![](/img/21/15.png)

填写表名和字段列表，这里做一些说明：

  * Id 为主键，设置整数 int，自增 AI；
  * cover 为封面 url，设置为可变字符串，最大长度 255；
  * price 和 t_price 为小数 decimal(5,2)，精度 5，标度 2，即最大 5 位数，小数点后面两位；
  * title 为标题， 设置为可变字符串，最大长度 50
  * desc 为课程详情，设置为文本 text，最大长度 65535。

![](/img/21/16.png)

点击“保存”，效果如下：

![](/img/21/17.png)

## 数据CRUD

有了表，就要有数据，下面演示常见增删改查操作，即大家常说的 CRUD boy。

### 创建数据

对于我们新手来讲，可视化方式插入语句比较亲切，可以选中 course 表之后，点击“新建数据”：

![](/img/21/18.png)

填入必要字段：这里 id 数据库会自动填入：

![](/img/21/19.png)

点击保存，结果如下：

![](/img/21/20.png)

当然，我们也可以使用 **INSERT INTO** SQL 语句来插入数据：

    
    
    INSERT INTO table_name ( field1, field2,...fieldN )
           VALUES ( value1, value2,...valueN );
    

点击“SQL 命令”：

![](/img/21/21.png)

输入如下 SQL 语句：

    
    
    INSERT INTO `course` (`cover`, `price`, `t_price`, `title`, `desc`)
    VALUES ('https://wechatapppro-1252524126.file.myqcloud.com/appwhrkrsz84443/image/b_u_62a4204687f44_cOGIFKdC/l4gf7c0s0770.jpeg', '299.00', '399.00', 'Vue源码全家桶', '<h3>Vue源码全家桶剖析加手写</h3>\r\n<ul><li>Vue2 + Vue3</li><li>Vue-Router</li><li>Vuex + Pinia</li></ul>');
    

点击“执行”，结果如下：

![](/img/21/22.png)

查看一下结果，两条数据都在了：

![](/img/21/23.png)

### 更新数据

可视化更新数据可以点击数据条目前面的“编辑”链接：

![](/img/21/24.png)

![](/img/21/25.png)

当然，我们可以使用 SQL 语句，这样可以更新不止一条数据：

    
    
    UPDATE `course` SET
    `id` = '1',
    `cover` = 'https://wechatapppro-1252524126.file.myqcloud.com/appwhrkrsz84443/image/b_u_62a4204687f44_cOGIFKdC/l4e6hk9v0562.png',
    `price` = '299.00',
    `t_price` = '399.00',
    `title` = 'Vue3 开源组件库实战',
    `desc` = '<h3>从架构到发布全流程实战</h3>\r\n<p>Vue3 + Vite2 + VitePress + TSX + Tailwind</p>'
    WHERE `id` = '1';
    

### 查询数据

可视化查询数据可以添加各种查询条件，缩小查找范围，从而快速找到需要的数据。

比如想要排序，点击字段名称即可，像下面这样点击 price 可以按照价格排序数据：

![](/img/21/26.png)

![](/img/21/27.png)

如果要增加搜索条件，可以点击字段名称后面的“两道杠”，比如下面的方法可以查询价格小于 300 的课程：

![](/img/21/28.png)

![](/img/21/29.png)

通过以上方法同时也可以构造出复杂的查询语句。

### 删除数据

可视化删除可以先选中数据条目，然后“删除”按钮：

![](/img/21/30.png)

当然，也可以使用 SQL 命令，这样也能够删除多条数据：

    
    
    DELETE FROM `course` WHERE `id` = '2';
    

## 总结

虽说后续我们会使用 Prisma 这样的 ORM 框架避免让大家直接跟数据库打交道，或者编写 SQL 语句。

但是，这些基础还是非常重要的，我们就算不直接设计表，还是要设计数据模型，依然要知道数据类型怎么设置。就算我们不直接编写 SQL，还是要接触一些迁移用的
SQL 文件，或者查看操作结果。

因此如果你不太熟悉数据库，我还是建议大家多多尝试本节的一些操作。

## 下次预告

在我们真正开始服务端开发前，接口设计也是非常重要的一步。例如我们在一个前后端分离的团队中，不能仅靠口口相传来对接口，而是应该有一套标准流程和文档。

下一节，我们将使用 APIFox 给大家演示如何高效完成这个流程。

