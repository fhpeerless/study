// 第一篇笔记
export const note1 = {
    title: "图像标签",
    contentmd: ` 
## 网页多用gif，jpeg，png JPG (JPEG)三种格式图片de区别

### JPG
 <br>压缩方式：: 有损压缩，会牺牲部分画质以减小文件大小。 <br>适用场景：: 数码照片、色彩丰富的图像，非常适合保存大量图片，因为文件较小。<br> 缺点：: 画质损失，不适合对颜色和细节要求极高的场景，不支持透明背景。<br> <hr/>

 ### PNG 
<br> 压缩方式：: 无损压缩，保留所有图像细节，画质好。 <br>适用场景：: 网页设计中的图标、Logo、需要透明背景的图片，以及需要二次编辑的源文件。 <br>缺点：: 文件大小通常比JPG 大。 优点：: 支持透明背景（包括Alpha 通道，可调节透明度），画质比JPG 更好。<br><hr/>

### GIF 
压缩方式：: 无损压缩，但颜色数量限制在256 色。 <br>适用场景：: 简单的动画效果、小图标。 <br>缺点：: 颜色数量少，不适合展示色彩丰富的图像，动画效果简单。 优点：: 支持简单的动画，支持透明背景。 PNG-8 是GIF 的改进版本，在透明度和色彩方面通常优于GIF，且不支持动画"

## 图像标签介绍
  --> [img定义和用法](https://www.w3school.com.cn/tags/tag_img.asp "WebStorm") 

  ## 字体标签
\`\`\`css copy
  <img src="填入相对图片地址或绝对地址" > 相对地址是对于html文件来说的，绝对地址也就是图片的完整路径
  <img src="dancer.png" alt="舞者" width="100%" height="100%" border="2"/> border属性是加边框，数值代表边框的粗细！
\`\`\`

图片标签
\`\`\`css copy
  <br><img src="http://图片地址" alt="图片代替字符" width="100%" height="100%" border="9"> <hr width="85%">
 \`\`\`

 水平间距  和竖直间距
 \`\`\`css copy
 <img src="dancer.png" alt="图片未加载成功的提示" width="10%" height="10%" hspace="30" vspace="30" title="鼠标悬停到图片所提示的字符">
  \`\`\`
title悬停提示符
\`\`\`css copy
 <img src="http://图片地址" alt="图片未加载成功的提示" width="30%" height="30%" hspace="30px" vspace="30px" title="悬停提示字符"> 
\`\`\`


{{html:../danye/css/section_3.html,width:100%,height:450px}}

       
    `,
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};


export const note2 = {
title: "图像热区超链接",
    contentmd: ` 
## 1.热区链接的w3c概述
 --> [图片热区超链接](https://www.w3school.com.cn/tags/tag_map.asp "WebStorm") 
 
 
## 2.热区链接实现的功能说明
- 当点击图片上的特定坐标位置的时候，可以链接到其他页面！，图像热区区域可以通过ps来获取坐标，ps中的点击窗口，信息即可显示坐标，坐标要以像素来编写，
   
## 3.热区超链接所要注意
热区区域是根据坐标来确定的，但是区域是根据代码来计算的，如果整个图片没有加入auto属性就是固定图片大小
那么图片的大小被固定，热区域也会随之固定，当用户拖动窗口，热区域不变，图片区域不变，就会导致图片位置与图片区域对不上，
相反加入auto，那么图片大小是发生变动的，浏览器收到图片大小会发生变动的信息，热区域也会随之变动，自适应！

## 4.热区域超链接的写法说明
同一张图片上可以同时写多个area热区域标签，

\`\`\`css copy
<img src="life.png" alt="图片未成功加载的显示或用于网页阅读器时所需要" usemap="#映射图像的名称" width="650" height="451" >

### 第一个热区
<map name="所要关联的映射图像的名称" 或者用id="所要关联的映射图像的名称">
<area shape="rect（矩形）" coords="（左上角角标）10,208,（右下角角标）155,338" alt="AirPods" href="热区索要连接的地址">
</map>
### 第二个热区
<map name="所要关联的映射图像的名称" 或者用id="所要关联的映射图像的名称">
<area shape="rect（矩形）" coords="（左上角角标）10,208,（右下角角标）155,338" alt="AirPods" href="热区索要连接的地址">
</map>
\`\`\`



## 热区超链接实例代码
\`\`\`css copy
<img src=\"http://note.youdao.com/yws/api/personal/file/WEB8a48aae05f66ef8898eec51ecef9aee6?method=download&inline=true&shareKey=e80a26504cd0f7289f960603ee94eab6\" useMap=\"#123map\" alt=\"shenyue_zhao\" style=\"width: auto; height: auto; \">
<map name=\"123map\"> 
<area shape="rect" coords="0,57,347,570" alt="zhaojinmai" href="https://baike.baidu.com/item/%E8%B5%B5%E4%BB%8A%E9%BA%A6?fromModule=lemma_search-box" target="_blank">   
<area shape="rect" coords="347,112,700,576" alt="shenyue" href="https://baike.baidu.com/item/%E6%B2%88%E6%9C%88/22068465"  target="_blank">
 </map> 
\`\`\`


     `,
    timestamp: "2025-10-20 08:30",
    images: [],
    embed: ""
};


// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1, note2];













