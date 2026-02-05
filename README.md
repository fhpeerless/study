# 使用说明
## 添加科目和章节数
在app.js添加科目和章节数
然后再notes文件夹中添加对应科目名字的文件夹
文件统一为chapter1.js，chapter2.js.....后面数字自此类推

## 版本说明

study3.3:以今天的日期加载js笔记 --弃用
（增加version-loader.js脚本动态加载版本号，不然则是直接引用的app.js）
（增加function getTodayVersion函数动态生成版本号，实行动态加载）
study3.4:单文件标题


## 笔记预防网页缓存须知
1.html主页引入的js更改版本号

2.app.js的版本号也需要同步版本号
const subjectChapters = {
    htmlcssjs: 12,  // HTML有12章
    python: 1,    // CSS有1章
    english: 1,  // JavaScript有1章
    政治101: 1   // Python有1章
};
<script src="./js/app.js?v=20251103"></script>
