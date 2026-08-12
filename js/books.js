// 书架书籍信息定义
// 字段说明:
// - name: 书的名字
// - url: 书的PDF直链（下载时会自动拼接 speedgh 代理加速）
// - category: 书的所属分类（如：公考类、技术类、研考类）
// - subcategory: 书的所属子分类（如：常识大纲、xingce、python 等）
// - size: 书的PDF文件大小（字符串，便于显示，如 "12.5MB"）
//
// 直链填写规则:
//   1. 推荐 GitHub 仓库直链，格式:
//      https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/xxx.pdf
//   2. 也可填写其他可直接下载的 PDF 链接
//   3. App 端会自动在链接前拼接 speedgh 代理: https://speedgh.xtwa.org/
//   4. 若链接已包含 speedgh 代理，则不再重复拼接

export const books = [
    // ===== 公考类 =====
    {
        name: "常识大纲精华手册",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/gongkao_changshi.pdf",
        category: "公考类",
        subcategory: "常识大纲",
        size: "8.2MB"
    },
    {
        name: "行测言语理解专项训练",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/gongkao_xingce_yuyan.pdf",
        category: "公考类",
        subcategory: "xingce",
        size: "15.6MB"
    },
    {
        name: "申论高分范文精选",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/gongkao_shenlun.pdf",
        category: "公考类",
        subcategory: "shenlun",
        size: "12.3MB"
    },

    // ===== 技术类 =====
    {
        name: "Python编程从入门到实践",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/tech_python.pdf",
        category: "技术类",
        subcategory: "python",
        size: "25.8MB"
    },
    {
        name: "JavaScript高级程序设计",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/tech_javascript.pdf",
        category: "技术类",
        subcategory: "javascript",
        size: "32.1MB"
    },
    {
        name: "CSS权威指南",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/tech_css.pdf",
        category: "技术类",
        subcategory: "css",
        size: "18.4MB"
    },
    {
        name: "HTML5与CSS3实战",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/tech_html.pdf",
        category: "技术类",
        subcategory: "html",
        size: "14.2MB"
    },
    {
        name: "Go语言圣经",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/tech_go.pdf",
        category: "技术类",
        subcategory: "go_program",
        size: "20.5MB"
    },
    {
        name: "408计算机考研复习指导",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/tech_408.pdf",
        category: "技术类",
        subcategory: "408概念",
        size: "45.7MB"
    },

    // ===== 研考类 =====
    {
        name: "考研政治核心考点",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/kaoyan_politics.pdf",
        category: "研考类",
        subcategory: "politics101",
        size: "10.8MB"
    },
    {
        name: "考研英语历年真题详解",
        url: "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/books/kaoyan_english.pdf",
        category: "研考类",
        subcategory: "english",
        size: "22.4MB"
    }
];

export default books;
