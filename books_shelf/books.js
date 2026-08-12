// 书架书籍索引
// 记录各子分类书籍js文件的相对路径（相对于 books_shelf/ 目录）
// 加载方式:
//   1. 先加载本文件获取所有子分类的相对路径
//   2. 拼接完整URL: https://speedgh.xtwa.org/https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books_shelf/ + path
//   3. 分别加载各子分类的 books.js，合并得到完整书籍列表
//
// 字段说明:
// - category: 所属分类
// - subcategory: 所属子分类
// - path: 子分类 books.js 相对于 books_shelf/ 的路径

export const bookSources = [
    // ===== 技术类 =====
    { category: "技术类", subcategory: "408概念", path: "技术类/408概念/books.js" }
];
