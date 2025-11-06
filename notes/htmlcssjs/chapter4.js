// 第一篇笔记
export const note1 = {
    title: "css初识",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */
        "<h2>css概述（了解以下即可）</h2> <hr width='15%'>" ,
        "可以把html比作造型的过程，则css相当于给素描上色的过程，html编写内容，css布局等,js相当于动画编写" ,
        "点击了解--><a href=\"https://baike.baidu.com/item/CSS/5457 target=\"_blank\" \">css的发展史</a><-- " ,
        "点击了解，不同时期的css代码进化后而随之改变的网页样式--><a href=\"https://www.webdesignmuseum.org/all-websites\">css发展之网页的变迁</a><-- "
    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note2 = {
    title: "css的基本结构和属性标签",
    content: [   /* 123123*/
        "<h3>css标签参考手册</h3>--><a href=\"https://www.w3school.com.cn/cssref/index.asp\">css的参考手册</a><-- " ,
        "<h3>css属性基本使用展示</h3><img src=\"http://note.youdao.com/yws/api/personal/file/WEBd1314486bd7a0dee19b3070650ef4b21?method=download&inline=true&shareKey=3f504772f84aa261fee6b5568109a48b\" border=\"4\" style=\"max-width: 100%; height: auto;\">",
        "<h3>css的代码位置</h3> <br>css代码可打包成单独的文件后引入，或者直接写在head标签内"

    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note3 = {
    title: "class和id属性选择器",
    content: [   /* 123123*/
        "<h3>css选择器介绍：先从最简单的四种开始学习</h3>--><a href=\"https://www.w3school.com.cn/cssref/css_selectors.asp\" target=\"_blank\">css的选择器参考手册</a><-- <br>class选择器通常用于一块的元素，而id选择器通常用于某一个，id多和js相互搭配使用" ,
        "<h3>css属性基本使用展示</h3>  <a href=\"https://www.w3school.com.cn/tiy/t.asp?f=selector_attribute\" alt=\"属性在线编辑器\">点击进入属性选择器代码展示</a>",
        "<h3>css的代码位置</h3> <br>css代码可打包成单独的文件后引入，或者直接写在head标签内",

        "<h3>选择带有class属性的标签</h3>class选择器选择带有class属性值的标签，并加入css样式，此代码找到class为nimei的值后，更改了p标签的背景颜色<br> &lt;P class=\"nimei\"&gt;测试属性选择器&lt;/P&gt; &lt;style&gt; .nimei{background-color: aquamarine}&lt;/style&gt; ",
        "<h3>代码运行展示</h3> <br>  <style> #nimei{background-color: aquamarine;}</style> <P id=\"nimei\">测试属性选择器</P> ",
       
        "<h3>选择并设置所有 target=\"_blank\" 的 a 元素的样式，</h3>带有target且值等于blank的a元素会被设置黄色背景 <br>  &lt; h3 &gt;代码运行展示&lt; /h3 &gt; <br> &lt;style&gt;a[target=\"_blank\"]{background-color: yellow;} &lt;/style&gt; <br>  &lt;a href=\"https://www.w3school.com.cn\"&gt;W3School&lt;/a&gt;  <br> &lt;a href=\"https://www.google.com\" target=\"_blank\"&gt;Google&lt;/a&gt; <br>  ",
        " <h3>代码运行展示</h3> <a href=\"https://www.w3school.com.cn\">W3School</a>  <br> <a href=\"https://www.google.com\" target=\"_blank\">Google</a><br> <style>a[target=\"_blank\"]{background-color: yellow;} </style>",

    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note4 = {
    title: "css的伪类和伪元素选择器",
    content: [   /* 123123*/
        "<h3>css的伪类和伪元素选择器说明</h3>为元素添加上一些特殊效果。" +
        "<h3>伪类选择器</h3> <br> a:link {color:#FF0000} <br>没有访问连接的样式 ，<br> a:visited {color:#00FF00} <br>已经访问元素连接的样式}" ,
        "<h3>w3c介绍伪类选择器和伪元素选择器</h3>  <a href=\"https://www.w3school.com.cn/css/css_selectors.asp\" alt=\"伪类选择器\">点击进入伪类选择器</a>",

        "<h3>伪类选择器</h3>",
        "<h4>代码展示</h4>",
        "&lt;a href=\"https://www.w3school.com.cn/css/css_selectors.asp\" alt=\"伪类选择器\"&gt;点击进入伪类选择器&lt;/a&gt;",
        "&lt; style &gt; /* 未访问的链接 */  a:link {color: #FF0000;}  /* 已访问的链接 */   a:visited {color: #00FF00;}   /* 鼠标悬停链接 */   a:hover {color: #FF00FF;}  /* 已选择的链接 */   a:active {color: #0000FF;}   &lt; /style  &gt; ",
        "<h4>代码运行效果：</h4>",
        "<a href=\"https://www.w3school.com.cn/css/css_selectors.asp\" target=\"_blank\" alt=\"伪类选择器\">点击进入伪类选择器</a>",
        "<style>/* 未访问的链接 */ a:link {color: indianred;}/* 已访问的链接 */ a:visited {color: lawngreen;} /* 鼠标悬停链接 */ a:hover {color: #FF00FF;} /* 已选择的链接 */ a:active {color: #0000FF;} </style>",




    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};



// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1,note2,note3,note4];



























