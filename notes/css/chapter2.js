
export const note1 = {
    title: "css的语法",
    contentmd:`
# css的语法介绍，专有名词
[css语法专有名词介绍](https://www.w3school.com.cn/css/css_syntax.asp "进入超链接")

# 我是二级标题啊，哈哈哈哈

- 列表项1
列表项换行后的普通文本必须顶格写，不然就会仍然当作列表项
- 列表项2
- 列表项3

### 我是三级标题啊，哈哈哈哈
### 代码块
\`\`\`javascript copy
console.log("Hello, World!");
\`\`\`

\`\`\`markdown copy

![图片描述](图片URL "width=宽度值 height=高度值")

\`\`\`

### 图片示例
### 示例1：自定义不等比尺寸（原始800x400，调整为1000x200）
[Markdown图片示例](https://picsum.photos/800/400 "进入超链接")

### 示例2：仅设置宽度（高度自适应）
![Markdown图片示例](http://note.youdao.com/yws/api/personal/file/WEBe97fe01bbaf7282c7ebffe1901a437b7?method=download&inline=true&shareKey=7a07ba40ceee734f609011099b8f72c5 "width=500")

### 示例3：仅设置高度（宽度自适应）
![Markdown图片示例](http://note.youdao.com/yws/api/personal/file/WEBe97fe01bbaf7282c7ebffe1901a437b7?method=download&inline=true&shareKey=7a07ba40ceee734f609011099b8f72c5 "height=300")
### HTML引入粒子单页
{{html:../danye/css/xingkong.html,width:100%,height:400px}}

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

\`\`\`markdown copy

![图片描述](图片URL "width=宽度值 height=高度值")

\`\`\`

### 图片示例
### 示例1：自定义不等比尺寸（原始800x400，调整为1000x200）
![Markdown图片示例](https://picsum.photos/800/400 "width=500 height=100")

### 示例2：仅设置宽度（高度自适应）
![Markdown图片示例](http://note.youdao.com/yws/api/personal/file/WEBe97fe01bbaf7282c7ebffe1901a437b7?method=download&inline=true&shareKey=7a07ba40ceee734f609011099b8f72c5 "width=500")

### 示例3：仅设置高度（宽度自适应）
![Markdown图片示例](http://note.youdao.com/yws/api/personal/file/WEBe97fe01bbaf7282c7ebffe1901a437b7?method=download&inline=true&shareKey=7a07ba40ceee734f609011099b8f72c5 "height=300")
### HTML引入粒子单页
{{html:../danye/css/xingkong.html,width:100%,height:400px}}

`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};




// export default [note1, note2, note3, note4];

export default [note1, note2];



