
export const note1 = {
    title: "外边距--margin",
    contentmd: `
## 外边距的解释
  页面中的每一个元素包括一个文字都是一个框的形式存在的，这种框就叫盒模型，

## 外边距的w3c介绍

- 点击进入-[w3c框模型概述](https://www.w3school.com.cn/css/css_boxmodel.asp "框模型概述")
- 点击进入-[w3c外边距代码在线演示](https://www.w3school.com.cn/tiy/t.asp?f=css_margin_sides "外边距代码在线演示")
## 外边距的自述
 padding是元素和外框的空隙长度，width和height为元素的宽高，border是外框的长高，
 而margin则是两个外框之间的距离了，


\`\`\`javascript copy
<!DOCTYPE html>
<html>
<head>
<style>
div {
  border: 1px solid black;
  margin-top: 100px;
  margin-bottom: 100px;
  margin-right: 150px;
  margin-left: 80px;
  background-color: lightblue;
  width:300px;
  height:300px;
  padding:50px;
  border:450px;
  align:center;
  
}
</style>
</head>
<body>

<h1>使用单独的外边距属性</h1>

<div>这个 div 元素的上外边距为 100 像素，右外边距是 fghcfgjcfjvhkvj cfyjcyfgjhcfgyjhgvfyjhfvgyjhctjcyj150 像素，下外边距是 100 像素，左外边距是 80 像素。</div>

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
    title: "新增笔记支持md，支持单页的引入",
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


export const note3 = {
    title: "新增笔记支持md，支持单页的引入",
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


export const note4 = {
    title: "新增笔记支持md，支持单页的引入",
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
