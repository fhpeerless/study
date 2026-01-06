
export const note1 = {
    title: "外边距--margin",
    contentmd: `
## 1.外边距的解释
  页面中的每一个元素包括一个文字都是一个框的形式存在的，这种框就叫盒模型，

## 2.外边距的w3c介绍

- 点击进入-[w3c框模型概述](https://www.w3school.com.cn/css/css_boxmodel.asp "框模型概述")
- 点击进入-[w3c外边距代码在线演示](https://www.w3school.com.cn/tiy/t.asp?f=css_margin_sides "外边距代码在线演示")
## 3.外边距的自述
 - padding是元素和外框的空隙长度，width和height为元素的宽高，
 - border是外框的长高， 而margin则是两个外框之间的距离了，
 - 温馨提示:如果不设置padding和border则浏览器可能默认设置为1px或2px



\`\`\`javascript copy
<!DOCTYPE html>


<html>

<head>
    <meta charset="utf-8">
    <style>
        p {
            margin-top: 90px;
            margin-bottom: 110px;
            margin-right: 130px;
            margin-left: 80px;
            background-color: lightblue;
            width: 100px;
            height: 100px;
            padding: 100px 80px 60px 80px ; /* 修正：必须加单位，且值要合理（原50导致内容区域为0） */
            border: 5px solid orangered; /* 修正：必须指定样式和颜色 */
            /* text-align: center;  关键：让文本水平居中 */
        }
    </style>
</head>


<body>
<h1>使用单独的外边距属性</h1>
<p>nihao</p>
</body>
</html>

\`\`\`

### 图片示例
![Markdown图片示例](http://note.youdao.com/yws/api/personal/file/WEBf35db5b39af331af139681d566fe7df6?method=download&inline=true&shareKey=03a8ea58355c3934dec0f651e3f828df)

`,
    timestamp: "2026-01-02 08:30",
    images: [],
    embed: ""
};


export const note2 = {
    title: "内边距-padding",
    contentmd: `
## 内边距的各种写法
- 点击进入-[w3c内边距的多种写法](https://www.w3school.com.cn/css/css_padding.asp "框模型概述")

## 内边距的自述
- 内边距为内容本身到边框的距离，当然内容可输入的区域是不会变的
    
    
## padding变换，border-box和content-box盒模型的变化详解
当padding从0开始增加时，是否改变height和width的显示区域大小，取决于盒模型类型（box-sizing）：

- 1. 默认的 content-box 盒模型（CSS默认）
padding增加会改变元素的总尺寸（width和height）：

元素的width和height只包含内容区域
padding会额外增加元素的总尺寸
例如：width: 100px; padding: 0; → 总宽度 = 100px
当padding增加到20px：width: 100px; padding: 20px; → 总宽度 = 100 + 20×2 = 140px
元素在页面上变大了，内容区域不变。

- 2. border-box 盒模型（推荐全局设置）
padding增加不会改变元素的总尺寸（width和height）：

元素的width和height包含内容、padding和border
padding增加会压缩内容区域，但总尺寸不变
例如：width: 100px; padding: 0; → 内容宽度 = 100px
当padding增加到20px：width: 100px; padding: 20px; → 内容宽度 = 100 - 20×2 = 60px，但总宽度仍为100px
视觉效果：元素在页面上大小不变，但内容区域变小了。


## 内边距相关代码请看上面相关代码即可

\`\`\`javascript copy
内边距相关代码请看上一个章节相关代码即可！
\`\`\`


`,
    timestamp: "2026-01-05 08:30",
    images: [],
    embed: ""
};


export const note3 = {
    title: "边框-border",
    contentmd: `
## 边框是设置边框的颜色，粗细，粗细的宽度设置，
- 点击进入w3c-->[边框的简写属性](https://www.w3school.com.cn/css/css_border_shorthand.asp "边框的属性")
- 点击进入w3c-->[边框的颜色属性](https://www.w3school.com.cn/css/css_border_color.asp "边框的属性")
## 边框颜色的自述
border直接的属性就三个，不加指定的属性必须简写三个：宽度 形状 颜色，例如border-style只是形状属性

`,
    timestamp: "2026-01-05 08:30",
    images: [],
    embed: ""
};


export const note4 = {
    title: "浮动",
    contentmd: `
# 我是一级Markdown测试
  这是一篇**Markdown格式**的笔记，支持：

## 我是二级标题啊，哈哈哈哈

- 列表项1
- 列表项2
- 列表项3

### 我是三级标题啊，哈哈哈哈
### 代码块
\`\`\`javascript copy
console.log("Hello, World!");
\`\`\`

### 图片示例
![Markdown图片示例](https://picsum.photos/800/400)

### HTML引入粒子单页
{{html:../danye/xingkong.html,width:100%,height:400px}}

`,
    timestamp: "2025-10-18 08:30",
    images: [],
    embed: ""
};



export default [note1, note2, note3, note4];
