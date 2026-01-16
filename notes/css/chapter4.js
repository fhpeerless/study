// 第一篇笔记
export const note1 = {
    title: "css初识",
    contentmd:` 
### css概述（了解一下即可）

- 可以把html比作造型的过程，则css相当于给素描上色的过程，html编写内容，css布局等,js相当于动画编写
 ### css的发展史
 /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */
<br>   
点击--> [css的发展史](https://www.w3school.com.cn/tags/tag_map.asp "WebStorm") 了解css的发展史

点击--> [css的发展史](https://www.webdesignmuseum.org/all-websites\ "WebStorm") 了解css的发展史

点击--> [css发展之网页的变迁](https://www.webdesignmuseum.org/all-websites\ "WebStorm") 了解，不同时期的css代码进化后而随之改变的网页样式-->

`,
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note2 = {
    title: "css的基本结构和属性标签",
    contentmd:`
   /* 123123*/
## css标签参考手册
点击--> [css标签参考手册](https://www.w3school.com.cn/cssref/index.asp "WebStorm") 了解ccss的参考手册
## css属性基本使用展示
点击--> [css语法使用w3c](https://www.w3school.com.cn/css/css_syntax.asp "WebStorm") 了解ccss的参考手册
## css的代码位置
css代码可打包成单独的文件后引入，或者直接写在head标签内
       
`,
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

export const note3 = {
    title: "属性选择器",
    contentmd:`
## css选择器功能就是选择指定的元素，进行样式布局的修改

## css选择器的几大类

点击--> [css选择器](https://www.w3school.com.cn/css/css_selectors.asp "WebStorm") 了解css选择器

## 属性选择器

属性选择器是选择带有指定属性的元素，官方介绍

点击--> [css属性选择器](https://www.w3school.com.cn/cssref/selector_attribute.asp "WebStorm") 了解css的属性选择器

## 属性选择器在线演示
点击--> [属性选择器的在线代码演示](https://www.w3school.com.cn/tiy/t.asp?f=selector_attribute "WebStorm") 点击进入属性选择器代码展示

 
`,
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note4 = {
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

### 1.1.class选择器的介绍

点击--> [class选择器](https://www.w3school.com.cn/cssref/selector_class.asp "WebStorm") 了解class选择器功能介绍
### 2.2.class代码在线演示

点击--> [class代码在线演示](https://www.w3school.com.cn/tiy/t.asp?f=selector_class_1 "WebStorm") 了解class选择器在线演示


## 3.id选择器的功能
id选择器是选择一个带有id值的一个唯一元素，来更改他的样式,class可能是为都多个元素设计的

## 4.id选择器的介绍

点击--> [id选择器的介绍](https://www.w3school.com.cn/cssref/selector_id.asp "WebStorm") 了解id选择器介绍

## 5.id代码在线演示

点击--> [id代码在线演示](https://www.w3school.com.cn/tiy/t.asp?f=selector_id "WebStorm") 了解id选择器在线演示

## 6.class选择器的多种使用方法
点击--> [class选择器的多种使用方法](https://www.w3school.com.cn/cssref/selector_class.asp "WebStorm") 了解css的class选择器


`,
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};


// 第一篇笔记
export const note5 = {
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
    images: [],  // 确保有images属性
    embed: ""
};

// 第一篇笔记
export const note6 = {
    title: "其他css选择器",
    contentmd:`   /* 123123*/
## css的多种选择器参考

点击--> [css的其他选择器](https://www.w3school.com.cn/cssref/css_selectors.asp "WebStorm") 了解css多种选择器

上面的w3c网址，已经包含了在线代码测试，直接在网站测试学习即可
       
`,
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};


// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1,note2,note3,note4,note5, note6];






