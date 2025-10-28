const h5Notes = [
  {
    title: "初识html可视化编程！",
    content: "html可视化编程可以下载<a href=\"https://www.jetbrains.com/webstorm/\">WebStorm</a>，或者更简单的方式实现可视化：新建一个txt文本把h5代码复制进去，用浏览器打开即可！，<br>更多代码查询请点击--><a href=\"https://www.w3school.com.cn/\">W3c</a>",
    timestamp: "2025-10-10 08:30",
    images: [],
    embed: "<iframe src=\"//player.bilibili.com/player.html?isOutside=true&aid=115412666747576&bvid=BV1EkWdzvEBx&cid=33343736793&p=2\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"></iframe>"
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
    images: []
  },
  {
    title: "html 的字体标签",
    content: "&lt;em&gt; <em>斜体的内容放在两个标签里面 </em>&lt;/em&gt;斜体标签<br>" +
             " &lt;u&gt; <u>下划线标签内容放在标签里面</u>  &lt;/u&gt;。<br>" +
             "&lt;strike&gt;   <strike>删除线标签放在标签里面</strike>  &lt;/strike&gt; ",
    timestamp: "2025-10-12 10:00",
    images: [],
    embed: ""
  },
  {
    title: "文字的上标和下标标签！",
    content: "x<sup>2</sup> 写法为：x&lt;sup&gt;2&lt;/sup&gt;   <br>  x<sub>2</sub> 写法为：x&lt;sub&gt;2&lt;/sub&gt;",
    timestamp: "2025-10-13 08:30",
    images: [
      "https://picsum.photos/seed/love1/400/300",
      "https://picsum.photos/seed/love3/400/300"
    ]
  },
  {
    title: "特殊的标记",
    content: "标记标签单独用，写在网页代码里面，即可展示在网页中，&quot; <br> &lt;&gt;  <br>&times; <br>&copy; <br>&sect; ",
    timestamp: "2025-10-14 08:30",
    images: [
      "http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664"
    ],
    embed: ""
  },
  {
    title: "段落标签",
    content: "段落标签是实现一行字符，加一个换行的效果，写法为&lt;p&gt; &lt;/p&gt;---<br>换行可用标签&lt;br&gt;换行，空标签单独用即可",
    timestamp: "2025-10-15 08:30",  
    images: [],
    embed: ""
  },
  {
    title: "段落原格式标签",
    content: [  
      "段落标签是根据标签内的自有格式来显示在网页中对于空格和换行有效，写法为&lt;pre&gt; &lt;/pre&gt;---解释不太清楚--自己使用一下就明了了" ,
      "<pre>  轻   羽    清    风</pre>" 
    ],
    timestamp: "2025-10-16 08:30",  
    images: [],
    embed: ""
  },
  {
    title: "水平线标签",
    content: [  
      "水平线标签为&lt;hr/&gt;---水平线标签的属性为宽度，长度，粗细，颜色，直接写水平线标签，不加属性则为默认样式。展示如下：<hr/> <br>" ,
      "&lt;hr width=80%&gt; <br>给hr添加宽度属性展示如下 <hr width=80%>  <br> ",
      "&lt;hr  width=10% align=\"center\" &gt; <br>给hr添加对齐属性,展示如下 <hr width=10% align=\"center\">  <br>"
    ],
    timestamp: "2025-10-17 08:30",  
    images: [],
    embed: ""
  },
  {
    title: "图像标签",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */
      "网页多用gif，jpeg，png JPG (JPEG)三种格式图片 ,区别，<hr/>JPG <br>压缩方式：: 有损压缩，会牺牲部分画质以减小文件大小。 <br>适用场景：: 数码照片、色彩丰富的图像，非常适合保存大量图片，因为文件较小。<br> 缺点：: 画质损失，不适合对颜色和细节要求极高的场景，不支持透明背景。<br> <hr/>PNG 压缩方式：: 无损压缩，保留所有图像细节，画质好。 <br>适用场景：: 网页设计中的图标、Logo、需要透明背景的图片，以及需要二次编辑的源文件。 <br>缺点：: 文件大小通常比JPG 大。 优点：: 支持透明背景（包括Alpha 通道，可调节透明度），画质比JPG 更好。<br><hr/>GIF 压缩方式：: 无损压缩，但颜色数量限制在256 色。 <br>适用场景：: 简单的动画效果、小图标。 <br>缺点：: 颜色数量少，不适合展示色彩丰富的图像，动画效果简单。 优点：: 支持简单的动画，支持透明背景。 PNG-8 是GIF 的改进版本，在透明度和色彩方面通常优于GIF，且不支持动画<br>" ,
      "<br><hr width=30%>添加图像的标签为：&lt;img src=\"填入相对图片地址或绝对地址\" &gt; 相对地址是对于html文件来说的，绝对地址也就是图片的完整路径  <br> " ,
      "<br><hr width=30%>标签的大小边框<a href=\"https://www.w3school.com.cn/tags/tag_img.asp\">img标签属性代码官方表示</a> <br>" ,
      "<br>&lt;img src=\"dancer.png\" alt=\"舞者\" width=\"100%\" height=\"100%\" border=\"2\"/&gt; border属性是加边框，数值代表边框的粗细！ " ,
      "<br><img src=\"http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664\" alt=\"图片代替字符\" width=\"100%\" height=\"100%\" border=\"10\"/> " ,
      "<br> 图像的间距vspace(是图像对于上下方的文字间距)和(是图像对于文字左右方向的间距)hspace<br>&lt;img src=\"dancer.png\" alt=\"图片未加载成功的提示\" width=\"10%\" height=\"10%\" hspace=\"30\" vspace=\"30\" title=\"鼠标悬停到图片所提示的字符\"/&gt " ,
      "<hr/><br><hr/> <img src=\"http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664\" alt=\"图片未加载成功的提示\" width=\"30%\" height=\"30%\" hspace=\"30px\" vspace=\"30px\" title=\"悬停提示字符\"/>  示例字符"
    ],
    timestamp: "2025-10-18 08:30",  
    images: [],  // 确保有images属性
    embed: ""
  },
  {
    title: "文本超链接",
    content: [" 标签内容写法：<hr width=\"30%\"/> <br>文本超链接标签&lt;a href=\"https://www.baidu.com/index.htm\"&gt;百度&lt;/a&gt;  <br> " ,
              " <a href=\"https://www.baidu.com/index.htm\">百度</a>  <br> " ,
              " <hr width=\"30%\"/>添加target属性标签，target为超链接的打开方式<br>&lt;a href=\"https://www.w3school.com.cn\" target=\"_blank\"&gt;访问 W3School&lt;/a&gt;  <br> ",
              " <a href=\"https://www.w3school.com.cn\" target=\"_blank\">访问w3c官方介绍target的介绍</a>  <br> "
    ],
    timestamp: "2025-10-19 08:30",  
    images: [],  // 确保有images属性
    embed: ""
  },
  {
    title: "书签超链接",
    content: [" 书签超链接也就是在页面比较长的时候，自动跳转到指定位置阅读指定内容，就像一本书直接翻到指定页码观看一样，<hr width=\"30%\"> " +
              " 书签超链接标签需要组合使用，跳转到指定标签位置需要，在指定位置创建标签" +
              " <br> 创建标签位置写法<br>&lt;a name=\"chuanjian\"&gt;&lt;/a&gt; <br> &lt;a id=\"chuangjian\"&gt; &lt;/a&gt;  " +
              " <br> 链接标签位置写法<br>&lt;a href=\"#chuangjian\"&gt; &lt;/a&gt; "
    ],
    timestamp: "2025-10-19 08:30",  
    images: [],  // 确保有images属性
    embed: ""
  },
  {
    title: "图像热区超链接",
    content: [" 热区链接实现的功能说明:当点击图片上的特定坐标位置的时候，可以链接到其他页面！，<hr width=\"80%\"> " +
              " <br>热区链接的写法:&lt;img src=\"life.png\" alt=\"图片未成功加载的显示或用于网页阅读器时所需要\" usemap=\"#映射图像的名称\" width=\"650\" height=\"451\" &gt;" +
              " <br>&lt;map name=\"lifemap\" 或者用id=\"lifemap\"&gt; &lt;area shape=\"rect\" coords=\"10,208,155,338\" alt=\"AirPods\" href=\"airpods.html\"&gt; &lt;/map&gt;" +
              " <br>热区链接的<a href=\"https://www.w3school.com.cn/tags/tag_map.asp\">w3c_map</a><hr width=\"80%\"> "
    ],
    timestamp: "2025-10-20 08:30",  
    images: [],  // 确保有images属性
    embed: ""
  }
];








































