
export const note1 = {
    title: "css的语法",
    contentmd:`
# css的语法介绍，专有名词
[css语法专有名词介绍](https://www.w3school.com.cn/css/css_syntax.asp "进入超链接")

属性和值的写法


`,
    timestamp: "2025-11-18 08:30",

    embed: ""
};

// 第一篇笔记
export const note2 = {
    title: "class选择器和id选择器",
    contentmd:`    /* 123123*/
## 1.css选择器介绍
点击--> [css选择器介绍](https://www.w3school.com.cn/cssref/css_selectors.asp "WebStorm") css的选择器参考手册  
    
## 2.class选择器功能
class选择器通常用于一块的元素，而id选择器通常用于某一个，id多和js联合使用
class选择器选择带有class属性值的标签，并加入css样式，此代码找到class为nimei的值后，更改了p标签的背景颜色

\`\`\`css copy
<P class="nimei">测试属性选择器</P> <style> .nimei{background-color: aquamarine}</style>
\`\`\`

### 2.1.类选择器的介绍

点击--> [class选择器](https://www.w3school.com.cn/cssref/selector_class.asp "WebStorm") 了解class选择器功能介绍
### 2.2.class代码在线演示

点击--> [class代码在线演示](https://www.w3school.com.cn/tiy/t.asp?f=selector_class_1 "WebStorm") 了解class选择器在线演示


\`\`\`css copy
li.leixuanze     类名为 leixuanze 的 <li> 元素             <li class="leixuanze">...</li>

li p.leixuanze   <li> 内部的、类名为 leixuanze 的 <p> 元素   <li><p class="leixuanze">...</p></li>

.leixuanze       所有类名为 leixuanze 的元素（通用）          任意带 class="leixuanze" 的标签

\`\`\`

## 3.id选择器的功能
id选择器是选择一个带有id值的一个唯一元素，来更改他的样式,class可能是为都多个元素设计的

## 4.id选择器的介绍

点击--> [id选择器的介绍](https://www.w3school.com.cn/cssref/selector_id.asp "WebStorm") 了解id选择器介绍

## 5.id代码在线演示

点击--> [id代码在线演示](https://www.w3school.com.cn/tiy/t.asp?f=selector_id "WebStorm") 了解id选择器在线演示

## id选择器和类选择器的区别
1. ID 选择器
定义：用于为页面中唯一的元素设置样式，一个 ID 在整个 HTML 文档中只能出现一次。
语法：以 # 开头，后跟 ID 名称，例如 #header { ... }。
HTML 对应：元素的 id 属性，例如 <div id="header"></div>。
2. 类选择器
定义：用于为多个元素设置相同样式，一个类名可以在页面中重复使用。
语法：以 . 开头，后跟类名称，例如 .box { ... }。
HTML 对应：元素的 class 属性，例如 <div class="box"></div>、<p class="box"></p>

## 6.class选择器的多种使用方法
点击--> [class选择器的多种使用方法](https://www.w3school.com.cn/cssref/selector_class.asp "WebStorm") 了解css的class选择器


`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};


// 第一篇笔记
export const note3 = {
    title: "css的伪类和伪元素选择器",
    contentmd:`   

## 代码实例
 \`\`\`css copy
 
< style >
 /* 未访问的链接 */ 
 a:link {color: #FF0000;} 
 /* 已访问的链接 */ 
 a:visited {color: #00FF00;}
  /* 鼠标悬停链接 */ 
 a:hover {color: #FF00FF;}
   /* 已选择的链接 */ 
 a:active {color: #0000FF;} 

</style >
<a href="https://www.w3school.com.cn/css/css_pseudo_classes.asp" title="伪类选择器"> 点击进入伪类选择器</a>
\`\`\`

## css伪类定义概念

点击--> [伪类定义](https://www.w3school.com.cn/css/css_pseudo_classes.asp "WebStorm") 了解伪类选择器

## 伪元素选择器的功能

对某元素其中一部分实现特殊效果

点击--> [w3c介绍的伪元素选择器](https://www.w3school.com.cn/css/css_pseudo_elements.asp "WebStorm") 了解w3c介绍的伪元素选择器
            
点击--> [w3c伪元素选择器在线演示](https://www.w3school.com.cn/tiy/t.asp?f=css_pseudo-element "WebStorm") 了解伪元素选择器在线演示


{{html:../danye/css/section_4_5.html,width:100%,height:450px}}

`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};

// 第一篇笔记
export const note4 = {
    title: "其他css选择器",
    contentmd:`   /* 123123*/
## css的多种选择器参考

点击--> [css的其他选择器](https://www.w3school.com.cn/cssref/css_selectors.asp "WebStorm") 了解css多种选择器

上面的w3c网址，已经包含了在线代码测试，直接在网站测试学习即可
       
`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};







export default [note1, note2, note3, note4];




