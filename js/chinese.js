// 语文笔记数据
const chineseNotes = [
  {
    title: "初识html可视化编程！",
    content: "<br>html可视化编程可以下载<a href=\"https://www.jetbrains.com/webstorm/\">webstorm</a><br或者更简单的方式实现可视化， <br>新建一个txt文本把h5代码复制进去，用浏览器打开即可！<br>！",
    timestamp: "2025-10-17 08:30",
    image: "https://example.com/images/poetry.jpg" // 示例图片URL
  },
  {
    title: "html 的基本结构",
    content: "html是一个超链接的网页语言，h5是第五代，大多数网页都是基于h5等各种语言编写的！


<div class="code-block">
<pre><code>
&lt;!DOCTYPE html&gt;
    告诉游览器用html5的方式解析此网页的html代码
&lt;html lang="en"&gt;
    告诉浏览器该网页是英文编写的，也可用中文编写，浏览器和辅助设备会根据这个辅助处理排版
&lt;head&gt;
    head--相当于开始内容,head标签里面包含的是网页目录索引，相当于书的封皮，head /head为称之为双标签，就是成对出现不可单独使用，
    &lt;br&gt;--表示换行,单独出现,名单标签<br>
    &lt;meta charset="UTF-8"&gt;
    &lt;meta&gt;：--是 HTML 中的元数据标签，用于提供关于网页的额外信息
    charset="UTF-8"：--指定网页使用的字符编码方式为 UTF-8
    为什么需要这个标签？--"如果网页里有中文，但没有这句代码，将会导致中文乱码。<br>
    "UTF-8 --是目前最常用的字符集编码方式，它包含全世界所有国家需要用到的字符（包括中文、英文、数字、符号等）。
    &lt;title&gt;标题标签&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;  body包含的是网页的内容部分
    &lt;p&gt;这是代码示例内容&lt;/p&gt;
&lt;/body&gt;

&lt;/html&gt;  至此代码结束

</code></pre>
</div>。",
    timestamp: "2025-10-16 14:20",
    embed: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115270177791971&bvid=BV1BBngzfEws&cid=32649840988&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
  },
  {
    title: "诗词与视频结合",
    content: "这首诗描绘了诗人夜晚思乡的情景，配合视频可以更好地理解诗歌意境。",
    timestamp: "2025-10-15 10:00",
    image: "https://example.com/images/poetry-combined.jpg",
    embed: '<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=115270177791971&bvid=BV1BBngzfEws&cid=32649840988&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>'
  }
];







