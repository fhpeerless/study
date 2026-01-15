// HTML第一章 多篇笔记（改为命名导出+数组汇总）
// 第一篇笔记
export const note1 = {
    title: "可视化与基本结构！",
    contentmd: `
# 渲染网页的几种方法
## 1.点击蓝色字进入webstrom官网，利用webstrom进行渲染

--> [webstrom](https://www.jetbrains.com/webstorm/ "WebStorm") 
 
 ## 2.文本编辑
 
 ：新建一个txt文本把h5代码复制进去,修改为html后缀名后，用浏览器打开即可！
 
 ## 3.在线编辑器
 
 --> [在线代码编辑器](https://codepen.io/pen/ "WebStorm") 
 
 ## 4.代码查询网址
 
  --> [在线代码编辑器](https://www.w3school.com.cn/ "WebStorm") 


`,
    timestamp: "2025-10-10 08:30",
    images: [],
    embed: "<iframe src=\"//player.bilibili.com/player.html?isOutside=true&aid=115412666747576&bvid=BV1EkWdzvEBx&cid=33343736793&p=2\" scrolling=\"no\" border=\"0\" frameborder=\"no\" framespacing=\"0\" allowfullscreen=\"true\"></iframe>"
};

// 第二篇笔记
export const note2 = {
    title: "html 的基本结构",
    contentmd: `
    
## h5简介以及基本结构
    
html是一个超链接的网页语言，h5是第五代，大多数网页都是基于h5等各种语言编写的！

\`\`\`javascript copy


<!DOCTYPE html>
    告诉浏览器用html5的方式解析此网页的html代码
<html lang=“en”>
    告诉浏览器该网页是英文编写的，也可用中文编写
    浏览器和辅助设备会根据这个辅助处理排版
<head>
    head–相当于开始内容，head标签里面包含的是网页目录索引
    相当于书的封皮，head 和 /head 为称之为开始标签，和结束标签，两个两个使用
    成对出现不可单独使用
    <br>–表示换行，单独出现，且只有开始标签没有结束标签，称之为空标签
    <meta charset=“UTF-8”>
    <meta>：–是HTML中的元数据标签，用于提供关于网页的额外信息
    charset=“UTF-8”：–指定网页使用的字符编码方式为UTF-8
    为什么需要这个标签？–如果网页里有中文，但没有这句代码，将会导致中文乱码。
    UTF-8 --是目前最常用的字符集编码方式
    它包含全世界所有国家需要用到的字符（包括中文、英文、数字、符号等）。
    <title>标题标签</title>
</head>
<body>  body包含的是网页的内容部分
    <p>这是代码示例内容</p>
</body>
</html>  至此代码结束

\`\`\`        
        
       `,
    timestamp: "2025-10-11 14:20",
    images: []
};

// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）

export default [note1, note2];

