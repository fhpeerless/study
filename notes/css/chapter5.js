export const note1 = {
    title: "文本的属性",
    contentmd:`

## css文本的相关属性
属性不需要特意去学，写代码的时候需要则现查即可，内容会很多的
点击--> [w3c介绍css的参考手册](https://www.w3school.com.cn/cssref/index.asp "WebStorm") 了解css的参考手册
## 文本的color属性

点击--> [w3c介绍文本颜色属性](https://www.w3school.com.cn/cssref/pr_text_color.asp "WebStorm") 了解文字颜色属性，
以下三种方式润色
- 可用rgb
- 英文单词，
- #xxxxxxx

## text的align属性

详细内容为文本相关位置属性，
点击--> [w3c介绍文本align属性](https://www.w3school.com.cn/cssref/pr_text_text-align.asp "WebStorm") 了解文字颜色属性，

            
`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};


export const note2 = {
    title: "背景的相关属性",
    contentmd:`

## 背景的相关属性
点击--> [w3c介绍背景的相关属性](https://www.w3school.com.cn/css/css_background.asp "WebStorm") 了解css的背景属性

背景的相关属性，(链接内左侧侧边栏下面三个都是背景相关属性)

点击--> [w3c介绍背景的相关属性](https://www.w3school.com.cn/css/css_background.asp "WebStorm") 了解css的背景属性

## 背景相关方式属性
点击--> [w3c介绍image-repeat属性](https://www.w3school.com.cn/css/css_background_repeat.asp "WebStorm") 了解image-repeat在线测试

    
    
`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};

export const note3 = {
title: "列表的相关属性",
contentmd:`
## 列表的相关属性
点击--> [w3c介绍列表的相关属性](https://www.w3school.com.cn/css/css_list.asp "WebStorm") 了解列表属性说明

## 元素位置控制

点击--> [w3c介绍元素位置控制](https://www.w3school.com.cn/cssref/pr_class_position.asp "WebStorm") 了解元素位置控制

## padding属性的介绍
点击--> [w3c介绍padding属性的介绍](https://www.w3school.com.cn/cssref/pr_padding.asp "padding") 了解padding属性的介绍

## 代码实例

 \`\`\`css copy
height和width表示的div所占的区域
<head>
<style> 
.mes {
 width:1000px; height:10px;} 
</style> 
</head> 
<body>
 
 <div className="mes"> 宝宝特卖</div>
 
 </body>>
  \`\`\`
       
`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};

export const note4 = {
    title: "新增笔记支持md，支持单页的引入",
    contentmd:`
# 我是一级Markdown测试
  这是一篇**Markdown格式**的笔记，支持：

## 我是二级标题啊，哈哈哈哈

- 列表项1
列表项换行后的普通文本必须顶格写，不然就会仍然当作列表项
- 列表项2
- 列表项3

### 我是三级标题啊，哈哈哈哈
### 代码块
\`\`\`javascript copy
console.log("Hello, World!");
\`\`\`

### 图片示例
![Markdown图片示例](https://picsum.photos/800/400 "width=1000 height=400")

### HTML引入粒子单页
{{html:../danye/css/xingkong.html,width:100%,height:400px}}

`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};


export default [note1, note2, note3, note4];






