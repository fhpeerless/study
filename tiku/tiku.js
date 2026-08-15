// 题库索引
// 记录每张试卷的分类层级、属性标签以及题目/解析文件夹的相对路径（相对于 tiku/ 目录）
// 加载方式:
//   1. 先加载本文件获取所有试卷的题目/解析文件夹相对路径
//   2. 拼接完整URL: https://speedgh.xtwa.org/https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/ + path
//   3. 根据 questionCount（题目数量），从 1 到 questionCount 逐题加载：
//      - 题目文件: questionPath + "第{i}题.html"
//      - 解析文件: analysisPath + "第{i}题.html"（与题目文件同名，位于解析文件夹）
//      可用正则 /第(\d+)题\.html/ 从文件路径中提取题号 i，用于题目与解析一一对应。
//
// 字段说明:
// - category:        主分类（如 公考类、技术类、研考类）
// - subcategory1:    一级子分类（如 行测、申论、计算机基础）
// - subcategory2:    二级子分类（如 真题、模拟题，无则填空字符串 ""）
// - subcategory3:    三级子分类（如 黑龙江、国考，无则填空字符串 ""）
// - year:            年份（如 "2008年"）
// - tags:            属性标签数组（文件名中的种类，如 ["424联考"]、["公检法卷"]，无种类则为 []）
// - questionCount:   试卷题目数量（数字，用于逐题拼接路径）
// - questionPath:    题目文件夹相对路径（相对于 tiku/ 目录，带尾部斜杠，内含 第{N}题.html）
// - analysisPath:    解析文件夹相对路径（相对于 tiku/ 目录，带尾部斜杠，内含与题目同名的 第{N}题.html）

export const tiku = [
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2008",
        tags: [],
        questionCount: 135,
        questionPath: "公考类/行测/真题/黑龙江/题目/2008年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2008年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2009",
        tags: [],
        questionCount: 140,
        questionPath: "公考类/行测/真题/黑龙江/题目/2009年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2009年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2009",
        tags: ["B"],
        questionCount: 118,
        questionPath: "公考类/行测/真题/黑龙江/题目/2009年B/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2009年B解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2010",
        tags: [],
        questionCount: 140,
        questionPath: "公考类/行测/真题/黑龙江/题目/2010年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2010年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2011",
        tags: ["424联考"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2011年424联考/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2011年424联考解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2012",
        tags: ["421联考"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2012年421联考/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2012年421联考解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2013",
        tags: ["413统考"],
        questionCount: 154,
        questionPath: "公考类/行测/真题/黑龙江/题目/2013年413统考/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2013年413统考解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2014",
        tags: [],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2014年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2014年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2015",
        tags: [],
        questionCount: 130,
        questionPath: "公考类/行测/真题/黑龙江/题目/2015年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2015年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2015",
        tags: ["公检法卷"],
        questionCount: 130,
        questionPath: "公考类/行测/真题/黑龙江/题目/2015年公检法卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2015年公检法卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2015",
        tags: ["边远卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2015年边远卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2015年边远卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2016",
        tags: ["423公检法卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2016年423公检法卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2016年423公检法卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2016",
        tags: ["423联考县乡卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2016年423联考县乡卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2016年423联考县乡卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2016",
        tags: ["423行测"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2016年423行测/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2016年423行测解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2017",
        tags: ["422联考"],
        questionCount: 130,
        questionPath: "公考类/行测/真题/黑龙江/题目/2017年422联考/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2017年422联考解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2017",
        tags: ["公检法卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2017年公检法卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2017年公检法卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2018",
        tags: ["421联考乡镇卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2018年421联考乡镇卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2018年421联考乡镇卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2018",
        tags: ["421联考公检法行测"],
        questionCount: 125,
        questionPath: "公考类/行测/真题/黑龙江/题目/2018年421联考公检法行测/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2018年421联考公检法行测解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2018",
        tags: ["421联考省直"],
        questionCount: 130,
        questionPath: "公考类/行测/真题/黑龙江/题目/2018年421联考省直/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2018年421联考省直卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2019",
        tags: ["420联考公检法卷"],
        questionCount: 125,
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年420联考公检法卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年420联考公检法卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2019",
        tags: ["420联考县乡卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年420联考县乡卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年420联考县乡卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2019",
        tags: ["420联考省直卷"],
        questionCount: 130,
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年420联考省直卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年420联考省直卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2019",
        tags: ["边境卷"],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2019年边境卷/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2019年边境卷解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2020",
        tags: [],
        questionCount: 121,
        questionPath: "公考类/行测/真题/黑龙江/题目/2020年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2020年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2021",
        tags: [],
        questionCount: 116,
        questionPath: "公考类/行测/真题/黑龙江/题目/2021年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2021年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2021",
        tags: ["公检法边境"],
        questionCount: 115,
        questionPath: "公考类/行测/真题/黑龙江/题目/2021年公检法边境/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2021年公检法边境解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2022",
        tags: [],
        questionCount: 118,
        questionPath: "公考类/行测/真题/黑龙江/题目/2022年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2022年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2023",
        tags: [],
        questionCount: 117,
        questionPath: "公考类/行测/真题/黑龙江/题目/2023年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2023年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2024",
        tags: [],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2024年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2024年解析/"
    },
    {
        category: "公考类",
        subcategory1: "行测",
        subcategory2: "真题",
        subcategory3: "黑龙江",
        year: "2025",
        tags: [],
        questionCount: 120,
        questionPath: "公考类/行测/真题/黑龙江/题目/2025年/",
        analysisPath: "公考类/行测/真题/黑龙江/解析/2025年解析/"
    }
];

export default tiku;
