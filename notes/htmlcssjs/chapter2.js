// 第一篇笔记
export const note1 = {
    title: "关于html的字体标签",
    content: "&lt;em&gt; <em>斜体的内容放在两个标签里面 </em>&lt;/em&gt;斜体标签<br>" +
        " &lt;u&gt; <u>下划线标签内容放在标签里面</u>  &lt;/u&gt;。<br>" +
        "&lt;strike&gt;   <strike>删除线标签放在标签里面</strike>  &lt;/strike&gt; ",
    timestamp: "2025-10-12 10:00",
    images: [],
    embed: ""
};

// 第二篇笔记
export const note2 = {
    title: "文字的上标和下标标签！",
    content: "x<sup>2</sup> 写法为：x&lt;sup&gt;2&lt;/sup&gt;   <br>  x<sub>2</sub> 写法为：x&lt;sub&gt;2&lt;/sub&gt;",
    timestamp: "2025-10-13 08:30",
    images: [
        "https://picsum.photos/seed/love1/400/300",
        "https://picsum.photos/seed/love3/400/300"
    ]
};

export const note3 = {
    title: "特殊的标记",
    content: "标记标签单独用，写在网页代码里面，即可展示在网页中，&quot; <br> &lt;&gt;  <br>&times; <br>&copy; <br>&sect; ",
    timestamp: "2025-10-14 08:30",
    images: [
        "http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664"
    ],
    embed: ""
};

export const note4 = {
    title: "段落标签",
    content: "段落标签是实现一行字符，加一个换行的效果，写法为&lt;p&gt; &lt;/p&gt;---<br>换行可用标签&lt;br&gt;换行，空标签单独用即可",
    timestamp: "2025-10-15 08:30",
    images: [],
    embed: ""
};

export const note5 = {
    title: "段落原格式标签",
    content: [
        "段落标签是根据标签内的自有格式来显示在网页中对于空格和换行有效，写法为&lt;pre&gt; &lt;/pre&gt;---解释不太清楚--自己使用一下就明了了" ,
        "<pre>  轻   羽    清    风</pre>"
    ],
    timestamp: "2025-10-16 08:30",
    images: [],
    embed: ""
};

export const note6 = {
    title: "水平线标签",
    content: [
        "水平线标签为&lt;hr/&gt;---水平线标签的属性为宽度，长度，粗细，颜色，直接写水平线标签，不加属性则为默认样式。展示如下：<hr/> <br>" ,
        "&lt;hr width=80%&gt; <br>给hr添加宽度属性展示如下 <hr width=80%>  <br> ",
        "&lt;hr  width=10% align=\"center\" &gt; <br>给hr添加对齐属性,展示如下 <hr width=10% align=\"center\">  <br>"
    ],
    timestamp: "2025-10-17 08:30",
    images: [],
    embed: ""
};




export const note7 = {
    title: "文本超链接",
    content: [" 标签内容写法：<hr width=\"30%\"/> <br>文本超链接标签&lt;a href=\"https://www.baidu.com/index.htm\"&gt;百度&lt;/a&gt;  <br> " ,
        " <a href=\"https://www.baidu.com/index.htm\">百度</a>  <br> " ,
        " <hr width=\"30%\"/>添加target属性标签，target为超链接的打开方式<br>&lt;a href=\"https://www.w3school.com.cn\" target=\"_blank\"&gt;访问 W3School&lt;/a&gt;  <br> ",
        " <a href=\"https://www.w3school.com.cn\" target=\"_blank\">访问w3c官方介绍target的介绍</a>  <br> "
    ],
    timestamp: "2025-10-19 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

export const note8 = {
    title: "书签超链接",
    content: [" 书签超链接也就是在页面比较长的时候，自动跳转到指定位置阅读指定内容，就像一本书直接翻到指定页码观看一样，<hr width=\"30%\"> " +
    " 书签超链接标签需要组合使用，跳转到指定标签位置需要，在指定位置创建标签" +
    " <br> 创建标签位置写法<br>&lt;a name=\"chuanjian\"&gt;&lt;/a&gt; <br> &lt;a id=\"chuangjian\"&gt; &lt;/a&gt;  " +
    " <br> 链接标签位置写法<br>&lt;a href=\"#chuangjian\"&gt; &lt;/a&gt; "
    ],
    timestamp: "2025-10-19 08:30",
    images: [],  // 确保有images属性
    embed: ""
};


// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）

export default [note1, note2, note3, note4, note5, note6, note7, note8];

