// 第一篇笔记
export const note1 = {
    title: "关于html的字体标签",
    contentmd: ` 
## 字体标签    
\`\`\`html copy
<em> 斜体的内容放在两个标签里面 </em>斜体标签
<u> 下划线标签内容放在标签里面 </u>。
<strike> 删除线标签放在标签里面 </strike>
\`\`\`

## 字体标签
\`\`\`css copy
x<sup>2</sup>
x<sub>2</sub>
\`\`\`

## 特殊符号标签
\`\`\`css copy
&quot; 
&lt;
&gt; 
&times;
&copy;
&sect;
\`\`\`

## 段落标签
\`\`\`css copy
<p> </p>
\`\`\`

## 原格式标签
\`\`\`css copy
<pre> 轻 羽 清 风 </pre>  
\`\`\`

## 下划线元素
\`\`\`css copy
<hr width=80%>
<hr width=10% align="center" >
<hr width=10% align="center" >
\`\`\`


### 代码效果浏览
{{html:../danye/css/section_2.html,width:100%,height:450px}}

        `,
    timestamp: "2025-10-12 10:00",

    embed: ""
};




export const note2 = {
    title: "文本超链接",
    contentmd:`
## 1.超链接a标签

\`\`\`html5 copy
<a href="https://www.baidu.com/index.htm">百度</a>
\`\`\`

## 2.超链接带新窗口方式
\`\`\`html5 copy
<a href="https://www.w3school.com.cn" target="_blank">访问 W3School</a>
\`\`\`


    `,
    timestamp: "2025-10-19 08:30",

    embed: ""
};

export const note3 = {
    title: "书签超链接",
    contentmd: `
## 书签超链接简述
书签超链接也就是在页面比较长的时候，自动跳转到指定位置阅读指定内容，就像一本书直接翻到指定页码观看一样，
书签超链接标签需要组合使用，跳转到指定标签位置需要，在指定位置创建标签

## 创建标签位置写法
\`\`\`css copy
<a name="chuanjian"></a>
<a id="chuangjian"> </a>
\`\`\`

## 跳转超链接位置
\`\`\`css copy
<a href="#chuangjian"> </a>
\`\`\`


`,
    timestamp: "2025-10-19 08:30",

    embed: ""
};


// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）

export default [note1, note2, note3];




