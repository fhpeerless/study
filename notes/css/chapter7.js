
export const note1 = {
    title: "css边距",
    contentmd: `
## css外边距
- 点击进入-[w3c边框概述](https://www.w3school.com.cn/css/css_border.asp "边框演示概述")
- 点击进入-[w3c边框的在线演示](https://www.w3school.com.cn/tiy/t.asp?f=css_border-style "框模型概述")

\`\`\`css copy
p.dotted {

\`\`\`

`,
    timestamp: "2026-01-02 08:30",

    embed: ""
};


export const note2 = {
    title: "css边框宽度",
    contentmd: `
## 边框宽度自定义概述
**可以将宽度设置为特定大小（以 px、pt、cm、em 都是相似px的单位），也可以使用以下三个预定义值之一：thin大约是1px、medium大约是3px 或 thick大约是5px**

 - 点击-> [w3c宽度](https://www.w3school.com.cn/css/css_border_width.asp "边框演示概述")进入了解边框线的粗细代码使用
    

## 指定边的宽度
**border-width 属性可以设置一到四个值（用于上边框、右边框、下边框和左边框）**
\`\`\`css copy
边框风格和边框各边的宽度
p.three {
  border-style: solid;
  border-width: 25px 10px 4px 35px; /* 上边框 25px，右边框 10px，下边框 4px，左边框 35px */
}

p.one {
  border-style: solid;
  border-width: 5px 20px; /* 上边框和下边框为 5px，其他边为 20px */
}
\`\`\`
点击->[w3c边框指定边宽度](https://www.w3school.com.cn/tiy/t.asp?f=css_border-width_2 "边框演示概述")进入指定边自定义宽度

`,
    timestamp: "2026-01-05 08:30",

    embed: ""
};


export const note3 = {
    title: "边框-颜色",
    contentmd: `
## 1.边框的颜色的概述，，

- 点击进入w3c-->[边框的颜色属性](https://www.w3school.com.cn/css/css_border_color.asp "边框的属性")

## 2.指定四个边框的属性
border-color:单独使用的时候不起作用，需要指定边框样式border-style后才起作用。

\`\`\`css copy
/* 指定四个边为不同颜色*/
p.one {
  border-style: solid;
  border-color: red green blue yellow; /* 上红、右绿、下蓝、左黄 */
}
\`\`\`
\`\`\`css copy
可以通过以下方式设置颜色：
指定颜色名，比如 "red"
HEX - 指定十六进制值，比如 "#ff0000"
RGB - 指定 RGB 值，比如 "rgb(255,0,0)"
HSL - 指定 HSL 值，比如 "hsl(0, 100%, 50%)"
transparent也是颜色的值。
例如color: transparent;
rgba(0,0,0,0) 与 transparent 等价
注释：如果未设置 border-color，则它将继承元素的颜色。

\`\`\`

`,
    timestamp: "2026-01-05 08:30",
    embed: ""
};


export const note4 = {
    title: "边框各边样式自定义义",
    contentmd: `
# 1.边框各边
**从上一章的例子中，您已经看到可以为每一侧指定不同的边框。在 CSS 中，还有一些属性可用于指定每个边框（顶部、右侧、底部和左侧）：
\`\`\`css copy
边框各边
p {
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dotted;
  border-left-style: solid;
}
\`\`\`
可以简写，那就是
\`\`\`css copy
/* 四个值 对应的是，上右下左。简写可以*/
p {
  border-style: dotted solid double dashed; /*可放置1-4个值都可以*/
}

\`\`\`

`,
    timestamp: "2025-12-18 08:30",

    embed: ""
};



export const note5 = {
    title: "边框的简写属性",
    contentmd: `
# 1.css的简写属性
border 属性是以下各个边框属性的简写属性：

- border-width
- border-style（必需）
- border-color
\`\`\`css copy
p {
  border: 5px solid red;
}
/*单单指定左边框*/
p {
  border-left: 6px solid red;
  background-color: lightgrey; /* p元素的背景颜色*/
}

/*单单指定下边框*/
border-bottom


\`\`\`


`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};


export const note6 = {
    title: "CSS 圆角边框",
    contentmd: `
# 圆角边框

border-radius 属性用于向元素添加圆角边框：

- border-width
- border-style（必需）
- border-color

\`\`\`css copy
p {
  border: 2px solid red;
  border-radius: 5px; /*数值是圆的半径，半径越大弧度越大*/
}


\`\`\`


`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};



export default [note1, note2, note3, note4, note5, note6];






















