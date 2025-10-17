// 语文笔记数据
const chineseNotes = [
  {
    title: "初识html可视化编程！",
    content: "html可视化编程可以下载<a href=\"https://www.jetbrains.com/webstorm/\">WebStorm</a>，或者更简单的方式实现可视化：新建一个txt文本把h5代码复制进去，用浏览器打开即可！",
    timestamp: "2025-10-10 08:30",
    image: "https://picsum.photos/seed/love1/400/300"
  },
  {
    title: "html 的基本结构",
    content: "html是一个超链接的网页语言，h5是第五代，大多数网页都是基于h5等各种语言编写的！<br><br>" +
             "<div class=\"code-block\">" +
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
             "</code></pre>" +
             "</div>",
    timestamp: "2025-10-11 14:20",
    embed: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=2147533175&auto=1&height=66"></iframe>'
  },
  {
    title: "html 的字体标签",
    content: "<em>&lt;em&gt;斜体的内容放在两个标签里面&lt;/em&gt;斜体标签</em><br>" +
             "<span style=\"text-decoration: line-through;\">&lt;del&gt;删除线标签内容放在标签里面&lt;/del&gt;删除线标签</span>。<br>" +
             "<u>&lt;u&gt;下划线标签放在标签里面&lt;/u&gt;下划线标签</u>",
    timestamp: "2025-10-12 10:00",
    image: "https://picsum.photos/seed/love1/400/300",
    embed: '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=2147533175&auto=1&height=66"></iframe>'
  }
];
