// 题库公共字段
// 以下字段对所有试卷取值相同，故单独存放为公共字段文件，由 tiku.js 引入组合使用。
//
// 各字段说明：
// - module:         模块标识（本文件固定为 "tiku"，表示题库模块）
// - category:        主分类（如 公考类、技术类、研考类）
// - subcategory1:    一级子分类（如 行测、申论、计算机基础）
// - subcategory2:    二级子分类（如 真题、模拟题，无则填空字符串 ""）
// - subcategory3:    三级子分类（地区）→ 该地区数据文件的路径（相对仓库根目录）。
//                    地区试卷数据按文件独立存放（如 tiku/公考类/行测/真题/黑龙江/hlj_json/tiku_黑龙江.js），
//                    选择哪个地区才加载哪个文件，避免一次性加载全部地区导致文件过大、卡顿。
//                    值为 "" 表示该地区暂无数据。

export const tikuCommon = {
    module: [
   "tiku"
    ],
    category: [
"公考类","研考类","技术类"
    ],
    subcategory1: [
"行测","申论",
    ],
    subcategory2: [
"真题","模拟题"
    ],
    subcategory3: {
        // 地区 → 数据文件路径（相对仓库根目录），加载分类时只拉取所选地区对应的文件
        "黑龙江": "tiku/公考类/行测/真题/黑龙江/hlj_json/tiku_黑龙江.js",
        "国考": ""
    }
};

export default tikuCommon;
