// 第一篇笔记
export const note1 = {
    title: "css背景",
    contentmd:` 
# 页面背景
点击--> [css的背景](https://www.w3school.com.cn/css/css_colors_rgb.asp "WebStorm") 了解css的背景

## 背景颜色的设置

点击--> [css的背景颜色](https://www.w3school.com.cn/css/css_colors_rgb.asp "WebStorm") 在线查看演示

## 背景的透明度设置(opacity属性)

\`\`\`css copy
div {
  background-color: green;
  opacity: 0.3;
}
\`\`\`

## 背景的透明度设置(利用rgbA设置)
RGBA 颜色值指定为：rgba(red, green, blue, alpha)。alpha 参数是介于 0.0（完全透明）和 1.0（完全不透明）之间的数字。
\`\`\`css copy
div {
  background: rgba(0, 128, 0, 0.3) /* 30% 不透明度的绿色背景 */
}
\`\`\`


`,
    timestamp: "2025-11-29 08:30",
    embed: ""
};


export const note2 = {
    title: "图像背景",
    contentmd:` 
# 页面背景
点击--> [css的图片背景](https://www.w3school.com.cn/css/css_background_image.asp "WebStorm") 了解css的背景

## 背景颜色的设置

点击--> [css的指定标签的自定义图片](https://www.w3school.com.cn/tiy/t.asp?f=css_background-image_p "WebStorm") 在线查看演示


`,
    timestamp: "2025-11-29 08:30",
    embed: ""
};


export const note3 = {
    title: "背景重复",
    contentmd:` 
## 重复背景
默认情况下，background-image 属性在水平和垂直方向上都重复图像。
点击--> [css的图片重复](https://www.w3school.com.cn/css/css_background_repeat.asp "WebStorm") 了解css的重复背景

## 横向重复背景

\`\`\`css copy
body {
  background-image: url("gradient_bg.png");
  background-repeat: repeat-x;
  或background-repeat: repeat-y; /* 竖向背景重复 */
}
\`\`\`

## 不重复背景图像

背景图像仅显示一次
\`\`\`css copy
body {
  background-image: url("tree.png");
  background-repeat: no-repeat;
}
\`\`\`


## 指定图像位置
CSS background-positionbackground-position 属性用于指定背景图像的位置。
把背景图片放在右上角。
\`\`\`css copy
body {
  background-image: url("tree.png");
  background-repeat: no-repeat;
  background-position: right top;
}

\`\`\`
`,
    timestamp: "2025-11-29 08:30",
    embed: ""
};

export const note4 = {
    title: "背景附着",
    contentmd:` 
## 背景图片附着
点击--> [css的背景附着](https://www.w3school.com.cn/css/css_background_attachment.asp "WebStorm") 了解css的背景附着

## 背景颜色的设置
固定图片到指定视角
\`\`\`css copy
body {
  background-image: url("tree.png");
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: fixed;
}
\`\`\`

随着页面滚动而滚动
\`\`\`css copy
body {
  background-image: url("tree.png");
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: scroll;
}

\`\`\`


`,
    timestamp: "2025-11-29 08:30",
    embed: ""
};

export const note5 = {
    title: "简写背景属性",
    contentmd:` 
# 简写背景属性代码
点击--> [css的简写背景代码](https://www.w3school.com.cn/css/css_background_shorthand.asp "WebStorm") 了解css的简写背景属性

\`\`\`css copy
body {
  background: #ffffff url("tree.png") no-repeat right top;
}
在使用简写属性时，属性值的顺序为：
- background-color
- background-image
- background-repeat
- background-attachment
- background-position
属性值之一缺失并不要紧，只要按照此顺序设置其他值即可。请注意，在上面的例子中，我们没有使用 background-attachment 属性，因为它没有值。

\`\`\`
`,
    timestamp: "2025-11-29 08:30",
    embed: ""
};

export default [note1, note2, note3, note4, note5];




