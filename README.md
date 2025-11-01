# 使用说明
## 在app.js添加科目和章节数
然后再notes文件夹中添加对应科目名字的文件夹
文件统一为chapter1.js，chapter2.js.....后面数字自此类推

### html主页引入的js也需要加入版本号


## 代码示例
const subjectChapters = {
    htmlcssjs: 12,  // HTML有12章
    python: 1,    // CSS有1章
    english: 1,  // JavaScript有1章
    政治101: 1   // Python有1章
};


<script src="./js/app.js?v=20251103"></script>
