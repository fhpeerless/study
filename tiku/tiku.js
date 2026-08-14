// 题库索引
// 记录每道题目的分类层级、属性标签以及题目/解析文件的相对路径（相对于 tiku/ 目录）
// 加载方式:
//   1. 先加载本文件获取所有题目的相对路径
//   2. 拼接完整URL: https://speedgh.xtwa.org/https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/ + path
//   3. 分别加载题目文件和解析文件
//
// 字段说明:
// - category:      主分类（如 公考类、技术类、研考类）
// - subcategory1:  一级子分类（如 行测、申论、计算机基础）
// - subcategory2:  二级子分类（如 真题、模拟题，无则填空字符串 ""）
// - subcategory3:  三级子分类（如 黑龙江、国考，无则填空字符串 ""）
// - tags:          属性标签数组（用于筛选，填写年份和文件名中的种类，如 ["2008年"]、["2011年", "424联考"]）
// - questionPath:  题目文件相对路径（相对于 tiku/ 目录，位于 题目/ 子目录）
// - analysisPath:  解析文件相对路径（相对于 tiku/ 目录，位于 解析/ 子目录）

export const tiku = [
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2008年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2008年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2008年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2009年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2009年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2009年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2009年", "B"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2009年B.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2009年B解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2010年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2010年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2010年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2011年", "424联考"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2011年424联考.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2011年424联考解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2012年", "421联考"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2012年421联考.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2012年421联考解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2013年", "413统考"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2013年413统考.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2013年413统考解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2014年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2014年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2014年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2015年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2015年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2015年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2015年", "公检法卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2015年公检法卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2015年公检法卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2015年", "边远卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2015年边远卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2015年边远卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2016年", "423公检法卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2016年423公检法卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2016年423公检法卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2016年", "423联考县乡卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2016年423联考县乡卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2016年423联考县乡卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2016年", "423行测"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2016年423行测.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2016年423行测解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2017年", "422联考"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2017年422联考.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2017年422联考解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2017年", "公检法卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2017年公检法卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2017年公检法卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2018年", "421联考乡镇卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2018年421联考乡镇卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2018年421联考乡镇卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2018年", "421联考公检法行测"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2018年421联考公检法行测.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2018年421联考公检法行测解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2018年", "421联考省直"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2018年421联考省直.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2018年421联考省直卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2019年", "420联考公检法卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年420联考公检法卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年420联考公检法卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2019年", "420联考县乡卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年420联考县乡卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年420联考县乡卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2019年", "420联考省直卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年420联考省直卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年420联考省直卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2019年", "边境卷"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年边境卷.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年边境卷解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2020年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2020年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2020年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2021年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2021年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2021年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2021年", "公检法边境"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2021年公检法边境.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2021年公检法边境解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2022年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2022年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2022年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2023年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2023年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2023年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2024年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2024年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2024年解析.html"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        tags: ["2025年"],
        questionPath: "公考类/行测/真题/黑龙江/题目/2025年.html",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2025年解析.html"
    }
];

export default tiku;
