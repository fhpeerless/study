// 语文笔记数据 - 已修正属性名和结构
const h5Notes = [
  {
    title: "初识html可视化编程！",
    content: "html可视化编程可以下载<a href=\"https://www.jetbrains.com/webstorm/\">WebStorm</a>，或者更简单的方式实现可视化：新建一个txt文本把h5代码复制进去，用浏览器打开即可！",
    timestamp: "2025-10-10 08:30",
    images: [  // 正确属性名：images（复数）
      "https://picsum.photos/seed/love1/400/300",
      "https://picsum.photos/seed/love3/400/300"
    ]
  },
  {
    title: "html 的基本结构",
    content: "html是一个超链接的网页语言，h5是第五代，大多数网页都是基于h5等各种语言编写的！<br><br>" +
             "<pre><code>" +
             "&lt;!DOCTYPE html&gt;<br>" +
             "    告诉浏览器用html5的方式解析此网页的html代码<br>" +
             "&lt;html lang=\"en\"&gt;<br>" +
             "    告诉浏览器该网页是英文编写的，也可用中文编写<br>" +
             "    浏览器和辅助设备会根据这个辅助处理排版<br>" +
             "&lt;head&gt;<br>" +
             "    head--相当于开始内容，head标签里面包含的是网页目录索引<br>" +
             "    相当于书的封皮，head 和 /head 为称之为双标签<br>" +
             "    成对出现不可单独使用<br>" +
             "    &lt;br&gt;--表示换行，单独出现，单标签<br>" +
             "    &lt;meta charset=\"UTF-8\"&gt;<br>" +
             "    &lt;meta&gt;：--是HTML中的元数据标签，用于提供关于网页的额外信息<br>" +
             "    charset=\"UTF-8\"：--指定网页使用的字符编码方式为UTF-8<br>" +
             "    为什么需要这个标签？--如果网页里有中文，但没有这句代码，将会导致中文乱码。<br>" +
             "    UTF-8 --是目前最常用的字符集编码方式<br>" +
             "    它包含全世界所有国家需要用到的字符（包括中文、英文、数字、符号等）。<br>" +
             "    &lt;title&gt;标题标签&lt;/title&gt;<br>" +
             "&lt;/head&gt;<br>" +
             "&lt;body&gt;  body包含的是网页的内容部分<br>" +
             "    &lt;p&gt;这是代码示例内容&lt;/p&gt;<br>" +
             "&lt;/body&gt;<br>" +
             "&lt;/html&gt;  至此代码结束" +
             "</code></pre>",
    timestamp: "2025-10-11 14:20",
    images: [],  // 修正：统一使用images属性，空数组表示无图片
    embed: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=1251098300&bvid=BV1iJ4m1e7SA&cid=1454387685&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
  },
  {
    title: "html 的字体标签",
    content: "&lt;em&gt; <em>斜体的内容放在两个标签里面 </em>&lt;/em&gt;斜体标签<br>" +
             " &lt;u&gt; <u>下划线标签内容放在标签里面</u>  &lt;u&gt;。<br>" +
             "&lt;strike&gt;   <strike>删除线标签放在标签里面</strike>  &lt;/strike&gt; ",
    timestamp: "2025-10-12 10:00",
    images: [],  // 修正：统一使用images属性
    embed: ''
  }
];



