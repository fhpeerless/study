   // 第一篇笔记
export const note1 = {
    title: "css初识",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */
        "<h2>css概述 </h2> <hr width='15%'>" ,
        "可以把html比作造型的过程，则css相当于给素描上色的过程，html编写内容，css布局等,js相当于动画编写" ,
        "点击了解--><a href=\"https://blog.csdn.net/m0_67840539/article/details/130824794\">css的发展史</a><-- " ,
        "点击了解，不同时期的css代码进化后而随之改变的网页样式--><a href=\"https://www.webdesignmuseum.org/all-websites\">css的发展史</a><-- "
    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};



// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1];






