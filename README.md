# 使用说明
## 添加科目和章节数
在app.js添加科目和章节数
然后再notes文件夹中添加对应科目名字的文件夹
文件统一为chapter1.js，chapter2.js.....后面数字自此类推

## 版本说明
study2.0:  
css布局为书香无章节  
study3.0:添加章节，章节文件分段，阅读那章，加载那章文件  
study3.1:分隔style作用域，以防章节内多篇文章的style混淆  
study3.2:添加跳转目录到页面指定位置  


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
