// 黑龙江地区真题试卷数据
// 本文件按地区独立存放，仅在选择「黑龙江」地区时才加载对应文件，
// 避免一次性加载全部地区导致文件过大、卡顿。
// papers 每项字段说明：
//   id    唯一标识（年份+行测+卷型拼音，便于程序引用与跨模块查找）
//   name  试卷名称（展示用）
//   count 题数
//   json  题库 JSON 文件名（与本文件同目录，即 hlj_json/ 下，题目与解析已合并到单一文件）
//   pdf   对应 PDF 下载链接（默认本目录 pdf/ 下的 raw 地址，可替换为任意直链，未上传时填 "#"）
export const regionPapers = {
    "papers": [
        {
            "id": "2015xingce",
            "name": "2015年行测",
            "count": 130,
            "json": "hlj_json/2015年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2015年行测.pdf"
        },
        {
            "id": "2015xingce_gongjianfa",
            "name": "2015年行测公检法卷",
            "count": 130,
            "json": "hlj_json/2015年行测公检法卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2015年行测公检法卷.pdf"
        },
        {
            "id": "2015xingce_bianyuan",
            "name": "2015年行测边远卷",
            "count": 120,
            "json": "hlj_json/2015年行测边远卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2015年行测边远卷.pdf"
        },
        {
            "id": "2016xingce_gongjianfa",
            "name": "2016年行测公检法卷",
            "count": 120,
            "json": "hlj_json/2016年行测公检法卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2016年行测公检法卷.pdf"
        },
        {
            "id": "2016xingce",
            "name": "2016年行测",
            "count": 119,
            "json": "hlj_json/2016年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2016年行测.pdf"
        },
        {
            "id": "2016xingce_xianxiang",
            "name": "2016年行测县乡卷",
            "count": 120,
            "json": "hlj_json/2016年行测县乡卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2016年行测县乡卷.pdf"
        },
        {
            "id": "2017xingce",
            "name": "2017年行测",
            "count": 129,
            "json": "hlj_json/2017年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2017年行测.pdf"
        },
        {
            "id": "2017xingce_gongjianfa",
            "name": "2017年行测公检法卷",
            "count": 120,
            "json": "hlj_json/2017年行测公检法卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2017年行测公检法卷.pdf"
        },
        {
            "id": "2018xingce_xiangzhen",
            "name": "2018年行测乡镇卷",
            "count": 110,
            "json": "hlj_json/2018年行测乡镇卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2018年行测乡镇卷.pdf"
        },
        {
            "id": "2018xingce_gongjianfa",
            "name": "2018年行测公检法卷",
            "count": 118,
            "json": "hlj_json/2018年行测公检法卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2018年行测公检法卷.pdf"
        },
        {
            "id": "2018xingce_shengzhi",
            "name": "2018年行测省直卷",
            "count": 130,
            "json": "hlj_json/2018年行测省直卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2018年行测省直卷.pdf"
        },
        {
            "id": "2019xingce_gongjianfa",
            "name": "2019年行测公检法卷",
            "count": 125,
            "json": "hlj_json/2019年行测公检法卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2019年行测公检法卷.pdf"
        },
        {
            "id": "2019xingce_xianxiang",
            "name": "2019年行测县乡卷",
            "count": 120,
            "json": "hlj_json/2019年行测县乡卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2019年行测县乡卷.pdf"
        },
        {
            "id": "2019xingce_shengzhi",
            "name": "2019年行测省直卷",
            "count": 130,
            "json": "hlj_json/2019年行测省直卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2019年行测省直卷.pdf"
        },
        {
            "id": "2019xingce_bianjing",
            "name": "2019年行测边境卷",
            "count": 120,
            "json": "hlj_json/2019年行测边境卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2019年行测边境卷.pdf"
        },
        {
            "id": "2020xingce",
            "name": "2020年行测",
            "count": 125,
            "json": "hlj_json/2020年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2020年行测.pdf"
        },
        {
            "id": "2021xingce",
            "name": "2021年行测",
            "count": 120,
            "json": "hlj_json/2021年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2021年行测.pdf"
        },
        {
            "id": "2021xingce_gongjianfa_bianjing",
            "name": "2021年行测公检法边境卷",
            "count": 120,
            "json": "hlj_json/2021年行测公检法边境卷.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2021年行测公检法边境卷.pdf"
        },
        {
            "id": "2022xingce",
            "name": "2022年行测",
            "count": 114,
            "json": "hlj_json/2022年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2022年行测.pdf"
        },
        {
            "id": "2023xingce",
            "name": "2023年行测",
            "count": 120,
            "json": "hlj_json/2023年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2023年行测.pdf"
        },
        {
            "id": "2024xingce",
            "name": "2024年行测",
            "count": 120,
            "json": "hlj_json/2024年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2024年行测.pdf"
        },
        {
            "id": "2025xingce",
            "name": "2025年行测",
            "count": 120,
            "json": "hlj_json/2025年行测.json",
            "pdf": "https://raw.githubusercontent.com/fhpeerless/study/refs/heads/main/tiku/公考类/行测/真题/黑龙江/pdf/2025年行测.pdf"
        }
    ]
};

export default regionPapers;
