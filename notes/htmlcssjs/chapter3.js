// 第一篇笔记
export const note1 = {
    title: "图像标签",
    content: [   /* 在JSON中，字符串内部的双引号必须用反斜杠转义，即\"。以下是修正后的JSON： */
        "<h1>网页多用gif，jpeg，png JPG (JPEG)三种格式图片 ,区别，</h1> <hr/>JPG <br>压缩方式：: 有损压缩，会牺牲部分画质以减小文件大小。 <br>适用场景：: 数码照片、色彩丰富的图像，非常适合保存大量图片，因为文件较小。<br> 缺点：: 画质损失，不适合对颜色和细节要求极高的场景，不支持透明背景。<br> <hr/>PNG 压缩方式：: 无损压缩，保留所有图像细节，画质好。 <br>适用场景：: 网页设计中的图标、Logo、需要透明背景的图片，以及需要二次编辑的源文件。 <br>缺点：: 文件大小通常比JPG 大。 优点：: 支持透明背景（包括Alpha 通道，可调节透明度），画质比JPG 更好。<br><hr/>GIF 压缩方式：: 无损压缩，但颜色数量限制在256 色。 <br>适用场景：: 简单的动画效果、小图标。 <br>缺点：: 颜色数量少，不适合展示色彩丰富的图像，动画效果简单。 优点：: 支持简单的动画，支持透明背景。 PNG-8 是GIF 的改进版本，在透明度和色彩方面通常优于GIF，且不支持动画<br>" ,
        "<br><hr width=30%>添加图像的标签为：&lt;img src=\"填入相对图片地址或绝对地址\" &gt; 相对地址是对于html文件来说的，绝对地址也就是图片的完整路径  <br> " ,
        "<br><hr width=30%>标签的大小边框<a href=\"https://www.w3school.com.cn/tags/tag_img.asp\">img标签属性代码官方表示</a> <br>" ,
        "<br>&lt;img src=\"dancer.png\" alt=\"舞者\" width=\"100%\" height=\"100%\" border=\"2\"/&gt; border属性是加边框，数值代表边框的粗细！ " ,
        "<br><img src=\"http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664\" alt=\"图片代替字符\" width=\"100%\" height=\"100%\" border=\"10\"/> " ,
        "<br> 图像的间距vspace(是图像对于上下方的文字间距)和(是图像对于文字左右方向的间距)hspace<br>&lt;img src=\"dancer.png\" alt=\"图片未加载成功的提示\" width=\"10%\" height=\"10%\" hspace=\"30\" vspace=\"30\" title=\"鼠标悬停到图片所提示的字符\"/&gt " ,
        "<hr/><br><hr/> <img src=\"http://note.youdao.com/yws/api/personal/file/WEBfb44c5c02a6f6a01e4ac80ab8ba84a2a?method=download&inline=true&shareKey=15e31b87597de6ecbe5bebf48ecc5664\" alt=\"图片未加载成功的提示\" width=\"30%\" height=\"30%\" hspace=\"30px\" vspace=\"30px\" title=\"悬停提示字符\"/>  示例字符"
    ],
    timestamp: "2025-10-18 08:30",
    images: [],  // 确保有images属性
    embed: ""
};

export const note2 = {
title: "图像热区超链接",
    content: [" 热区链接实现的功能说明:当点击图片上的特定坐标位置的时候，可以链接到其他页面！，<hr width=\"80%\"> ",
              " <br>热区链接的写法:&lt;img src=\"life.png\" alt=\"图片未成功加载的显示或用于网页阅读器时所需要\" usemap=\"#映射图像的名称\" width=\"650\" height=\"451\" &gt;",
              " <br>&lt;map name=\"所要关联的映射图像的名称\" 或者用id=\"所要关联的映射图像的名称\"&gt; &lt;area shape=\"rect\" coords=\"10,208,155,338\" alt=\"AirPods\" href=\"airpods.html\"&gt; &lt;/map&gt;",
              " <br>热区链接的<a href=\"https://www.w3school.com.cn/tags/tag_map.asp\">w3c_map</a><hr width=\"80%\"> "
    ],
    timestamp: "2025-10-20 08:30",  
    images: [],  // 确保有images属性
    embed: ""
};




// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1,note2];




