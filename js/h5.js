// 语文笔记数据 - 已修正属性名和结构
const h5Notes = [
  {
    title: "初识html可视化编程！",
    content: "html可视化编程可以下载<a href=\"https://www.jetbrains.com/webstorm/\">WebStorm</a>，或者更简单的方式实现可视化：新建一个txt文本把h5代码复制进去，用浏览器打开即可！，<br>更多代码查询请点击--><a href=\"https://www.w3schools.com/html/html_images.asp\">W3c</a>",
    timestamp: "2025-10-10 08:30",
    images: [  
    ],
    embed: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115412666747576&bvid=BV1EkWdzvEBx&cid=33283444528&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
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
             "    相当于书的封皮，head 和 /head 为称之为开始标签，和结束标签，两个两个使用<br>" +
             "    成对出现不可单独使用<br>" +
             "    &lt;br&gt;--表示换行，单独出现，且只有开始标签没有结束标签，称之为空标签<br>" +
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
    images: []  // 修正：统一使用images属性，空数组表示无图片
  
  },
  {
    title: "html 的字体标签",
    content: "&lt;em&gt; <em>斜体的内容放在两个标签里面 </em>&lt;/em&gt;斜体标签<br>" +
             " &lt;u&gt; <u>下划线标签内容放在标签里面</u>  &lt;/u&gt;。<br>" +
             "&lt;strike&gt;   <strike>删除线标签放在标签里面</strike>  &lt;/strike&gt; ",
    timestamp: "2025-10-12 10:00",
    images: [],  // 修正：统一使用images属性
    embed: ''
  },
  {
    title: "文字的上标和下标标签！",
    content: "x<sup>2</sup> 写法为：x&lt;sup&gt;2&lt;/sup&gt;   <br>  x<sub>2</sub> 写法为：x&lt;sub&gt;2&lt;/sub&gt;",
    timestamp: "2025-10-13 08:30",
    images: [  // 正确属性名：images（复数） 
      "https://picsum.photos/seed/love1/400/300",
      "https://picsum.photos/seed/love3/400/300"
      ]
  },
  {
    title: "特殊的标记",
    content: "标记标签单独用，写在网页代码里面，即可展示在网页中，&quot; <br> &lt;&gt;  <br>&times; <br>&copy; <br>&sect; ",
    timestamp: "2025-10-14 08:30",
    images: ["http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664"],
    embed: ''
  },
  {
    title: "段落标签",
    content: "段落标签是实现一行字符，加一个换行的效果，写法为&lt;p&gt; &lt;/p&gt;---<br>换行可用标签&lt;br&gt;换行，空标签单独用即可",
    timestamp: "2025-10-15 08:30",  
    embed: ''
  },
  {
    title: "段落原格式标签",
    content: [  
    "段落标签是根据标签内的自有格式来显示在网页中，写法为&lt;pre&gt; &lt;/pre&gt;---解释不太清楚--自己使用一下就明了了" ,
    "<pre>  轻   羽    清    风</pre>" 
    
    ],
    timestamp: "2025-10-16 08:30",  
    embed: ''
  },
  {
    title: "水平线标签",
    content: [  
    "水平线标签为&lt;hr/&gt;---水平线标签的属性为宽度，长度，粗细，颜色，直接写水平线标签，不加属性则为默认样式。展示如下：<hr/>",
    "给hr添加宽度属性<pre>  <hr width="80%"> </pre>"
    ],
    timestamp: "2025-10-17 08:30",  
    embed: ''
  }

  
];


































