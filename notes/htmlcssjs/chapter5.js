export const note1 = {
    title: "文本的属性",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */
        "<h3>css文本的相关属性</h3>--><a href=\"https://www.w3school.com.cn/cssref/index.asp\" target=\"_blank\">css的参考手册</a><--" ,
        "不要特意去学属性，在工作中遇到什么属性就学什么属性即可！<br>文本的color属性：--><a href=\"https://www.w3school.com.cn/cssref/pr_text_color.asp\" target=\"_blank\">文本颜色属性</a><--<br>可用rgb或英文单词，或者#xxxxxxx三种方式" ,
        "text-align，w3c参考属性--><a href=\"https://www.w3school.com.cn/cssref/pr_text_text-align.asp\" target=\"_blank\" \">text参考属性</a><--  <br>居中，左，右三种方式 " ,

    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};


export const note2 = {
    title: "背景的相关属性",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */

        "<h3>背景的相关属性</h3>--><a href=\"https://www.w3school.com.cn/css/css_background.asp\" target=\"_blank\">css的参考手册</a><--" ,
        "不要特意去学属性，遇工作中遇到什么属性就学什么属性即可！<br>背景的相关属性，(链接内左侧侧边栏下面三个都是背景相关属性)：--><a href=\"https://www.w3school.com.cn/css/css_background.asp\" target=\"_blank\">背景的相关属性</a><--" ,

        "<h3>image-repeat</h3>--><a href=\"https://www.w3school.com.cn/css/css_background_repeat.asp\" target=\"_blank\">image-repeat在线测试</a><--" ,

    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

export const note3 = {
    title: "列表的相关属性",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */

        "<h3>列表的相关属性</h3>--><a href=\"https://www.w3school.com.cn/css/css_list.asp\" target=\"_blank\">w3c列表属性说明</a><--",
        "不要特意去学属性，遇工作中遇到什么属性就学什么属性即可！<br>：--><a href=\"https://www.w3school.com.cn/css/css_background.asp\" target=\"_blank\">背景的相关属性</a><--",

        "<h3>image-repeat</h3>--><a href=\"https://www.w3school.com.cn/css/css_background_repeat.asp\" target=\"_blank\">image-repeat在线测试</a><--",
        "<h3>元素位置控制</h3>--><a href=\"https://www.w3school.com.cn/cssref/pr_class_position.asp\" target=\"_blank\">position</a><--",
        "<h3>padding属性的介绍</h3>--><a href=\"https://www.w3school.com.cn/cssref/pr_padding.asp\" target=\"_blank\">paddin——w3c</a><--",
        "<br> height和width表示的div所占的区域 <br> &lt;style&gt; .mes { width:1000px; height:10px;} &lt;/style&gt; &lt;/head&gt; &lt;body&gt; &lt;div className=\"mes\"&gt; 宝宝特卖&lt;/div&gt;   ",

        ],
        timestamp: "2025-10-18 08:30",
        images: [], // 确保有images属性
        embed: ""
        };

        // 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

        export default [note1,note2,note3];





