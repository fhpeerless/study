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

export const note3 = {
    title: "属性选择器",
    content: [   /* 123123*/
        "<h3>css选择器的几大类</h3>--><a href=\"https://www.w3school.com.cn/css/css_selectors.asp\" target=\"_blank\">css的几类选择器</a><-- <br>" ,

        "<h3>属性选择器是选择带有指定属性的元素，官方介绍</h3>--><a href=\"https://www.w3school.com.cn/cssref/selector_attribute.asp\" target=\"_blank\">css的属性选择器</a><-- <br>" ,
        "<h3>属性选择器的在线代码演示</h3>  <a href=\"https://www.w3school.com.cn/tiy/t.asp?f=selector_attribute\" title=\"属性在线编辑器\">点击进入属性选择器代码展示</a>"

    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note4 = {
    title: "class选择器和id选择器",
    content: [   /* 123123*/
        "<h3>css选择器介绍：</h3>--><a href=\"https://www.w3school.com.cn/cssref/css_selectors.asp\" target=\"_blank\">css的选择器参考手册</a><-- <br>class选择器通常用于一块的元素，而id选择器通常用于某一个，id多和js联系密切" ,

        "<h3>class选择器的功能</h3>class选择器选择带有class属性值的标签，并加入css样式，此代码找到class为nimei的值后，更改了p标签的背景颜色<br> &lt;P class=\"nimei\"&gt;测试属性选择器&lt;/P&gt; &lt;style&gt; .nimei{background-color: aquamarine}&lt;/style&gt; ",
        "<h4>class选择器的介绍</h4> --><a href=\"https://www.w3school.com.cn/cssref/selector_class.asp\" target=\"_blank\">class选择器功能介绍</a><-- ",
        "<h4>class代码在线演示</h4> --><a href=\"https://www.w3school.com.cn/tiy/t.asp?f=selector_class_1\" target=\"_blank\">class选择器在线演示</a><-- ",


        "<h3>id选择器的功能</h3>id选择器是选择一个带有id值的一个唯一元素，来更改他的样式<br> class可能是为都多个元素设计的",
        "<h4>id选择器的介绍</h4> --> <a href=\"https://www.w3school.com.cn/cssref/selector_id.asp\" target=\"_blank\">id选择器介绍</a><-- ",
        "<h4>id代码在线演示</h4> --><a href=\"https://www.w3school.com.cn/tiy/t.asp?f=selector_id\" target=\"_blank\">id选择器在线演示</a><-- ",

        "<h3>class选择器的多种使用方法</h3> <br> --><a href=\"https://www.w3school.com.cn/cssref/selector_class.asp\" target=\"_blank\">css的class选择器</a><-- ",

    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note5 = {
    title: "css的伪类和伪元素选择器",
    content: [   /* 123123*/
        `<style>
     /* 未访问的链接 */
        a:link {color: brown;}
      /* 已访问的链接 */
      a:visited {color: orangered;} 
      /* 鼠标悬停链接 */ 
      a:hover {color: #FF00FF;} 
      /* 已选择的链接 */
      a:active {color: #0000FF;}
        </style>`,

        "<h2>伪类选择器和伪元素选择器</h2>" +
        "<h3>伪类选择器功能</h3>  对选择器实现可变的特殊效果，类选择器是选择到指定类元素调整样式 --><a href=\"https://www.w3school.com.cn/css/css_pseudo_classes.asp\" title=\"伪类选择器\">伪类选择器的w3c解释</a><--" ,

        "<h4>代码展示</h4>",
        "&lt;a href=\"https://www.w3school.com.cn/css/css_pseudo_classes.asp\" title=\"伪类选择器\"&gt; 点击进入伪类选择器&lt;/a&gt;",
        "&lt; style &gt; /* 未访问的链接 */  a:link {color: #FF0000;}  /* 已访问的链接 */   a:visited {color: #00FF00;}   /* 鼠标悬停链接 */   a:hover {color: #FF00FF;}  /* 已选择的链接 */   a:active {color: #0000FF;}   &lt;/style &gt;",
        "<h4>代码在线运行效果：</h4>",

        "<a href=\"https://www.w3school.com.cn/css/css_pseudo_classes.asp\" target=\"_blank\" title=\"伪类选择器\">点击进入伪类选择器</a>",

        "<h3>伪元素选择器的功能</h3>对某元素其中一部分实现特殊效果，<a href=\"https://www.w3school.com.cn/css/css_pseudo_elements.asp\" title=\"伪元素选择器\"> w3c介绍的伪元素选择器</a> ",
        "<a href=\"https://www.w3school.com.cn/tiy/t.asp?f=css_pseudo-element\" title=\"伪元素选择器\" target=\"_blank\"> 伪元素选择器在线演示</a> ",



    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};



// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1,note2,note3,note4,note5];




