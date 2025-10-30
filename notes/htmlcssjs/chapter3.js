// 第一篇笔记
export const note1 = {
    title: "关于图像的标签",
    content: "&lt;em&gt; <em>斜体的内容放在两个标签里面 </em>&lt;/em&gt;斜体标签<br>" +
        " &lt;u&gt; <u>下划线标签内容放在标签里面</u>  &lt;/u&gt;。<br>" +
        "&lt;strike&gt;   <strike>删除线标签放在标签里面</strike>  &lt;/strike&gt; ",
    timestamp: "2025-10-12 10:00",
    images: [],
    embed: ""
};




// 统一导出笔记数组（关键：让JS加载时能获取所有笔记）, note2, note3, note4, note5, note6, note7, note8, note9

export default [note1];
