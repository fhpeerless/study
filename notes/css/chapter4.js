// 第一篇笔记
export const note1 = {
    title: "css的颜色梗概",
    contentmd:` 
# css的颜色概述----
## 颜色名----
使用颜色名来定义颜色值，颜色不能调节深浅，颜色的属性是**color**： 值为颜色名或rgb，hex，hsl

点击--> [css的颜色代码](https://www.w3school.com.cn/css/css_colors.asp "WebStorm") 了解css的颜色代码使用
## 背景色----
背景颜色的属性和值的代码 
\`\`\`css copy
<h1 style="background-color:DodgerBlue;">
\`\`\` 

点击--> [css的背景颜色演示](https://www.w3school.com.cn/tiy/t.asp?f=css_color_background "WebStorm") 了解css的背景颜色代码使用

## 文本颜色----
文本颜色是定义了包裹了文本的标签
\`\`\`css copy
<h1 style="color:Tomato;">China</h1>
<p style="color:DodgerBlue;">China is a great country!</p>
<p style="color:MediumSeaGreen;">China, officially the People's Republic of China...</p>
\`\`\`

点击--> [css的背景颜色演示](https://www.w3school.com.cn/tiy/t.asp?f=css_color_text "WebStorm") 了解css的背景颜色代码使用

## 边框颜色----
边框颜色是定义了包裹了文本的标签的颜色属性
\`\`\`css copy
<h1 style="color:Tomato;">China</h1>
<p style="color:DodgerBlue;">China is a great country!</p>
<p style="color:MediumSeaGreen;">China, officially the People's Republic of China...</p>
\`\`\`

点击--> [css的边框颜色演示](https://www.w3school.com.cn/tiy/t.asp?f=css_color_border "WebStorm") 了解css的背景颜色代码使用

`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};

// 第一篇笔记
export const note2 = {
    title: "css的rgb调色",
    contentmd:` 
# css的rgb调色使用


点击--> [css的rgb](https://www.w3school.com.cn/css/css_colors_rgb.asp "WebStorm") 了解css的rgb调色

rgb的使用方式
\`\`\`css copy
<h1 style="background-color:rgb(238, 130, 238);">rgb(238, 130, 238)</h1>
\`\`\`

# rgb a的调色使用
属性和定义：rgba(red, green, blue, alpha)
rgba的调色使用是基于rgb加了一个透明度的属性，alpha 参数是介于 0.0（完全透明）和 1.0（完全不透明）之间的数字


点击--> [css的rgb](https://www.w3school.com.cn/tiy/t.asp?f=css_color_rgba "WebStorm") 了解css的rgb调色


`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};


// 第一篇笔记
export const note3 = {
    title: "css的hex调色",
    contentmd:` 
# css的hex调色
在 CSS 中，可以使用以下格式的十六进制值指定颜色：#rrggbb
其中 rr（红色）、gg（绿色）和 bb（蓝色）是介于 00 和 ff 之间的十六进制值（与十进制 0-255 相同）。
例如，#ff0000 显示为红色，因为红色设置为最大值（ff），其他设置为最小值（00）。

点击--> [css的hex调色](https://www.w3school.com.cn/tiy/t.asp?f=css_color_hex "WebStorm") 了解css的发展史


`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};


// 第一篇笔记
export const note4 = {
    title: "css的hsl调色",
    contentmd:` 
### csshsl润色概述
在 CSS 中，可以使用色相、饱和度和明度（HSL）来指定颜色，格式如下：hsla(hue, saturation, lightness)
- 色相（hue）是色轮上从 0 到 360 的度数。0 是红色，120 是绿色，240 是蓝色。
- 饱和度（saturation）是一个百分比值，0％ 表示灰色阴影，而 100％ 是全色。
- 亮度（lightness）也是百分比，0％ 是黑色，50％ 是既不明也不暗，100％是白色。


点击--> [css的hsl调色](https://www.w3school.com.cn/css/css_colors_hsl.asp "WebStorm") 了解css的hsl调色


`,
    timestamp: "2025-10-18 08:30",

    embed: ""
};




export default [note1, note2, note3, note4];




