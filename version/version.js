// App版本信息
// 版本号格式: v主版本.次版本.修订号.构建号 (如 v1.0.0.0)
// forceUpdate: true 表示强制更新，App检测到此字段为true时弹窗强制更新
// 追加式发布：在数组末尾追加新的版本对象即可，App 取最后一条作为最新版本
export const versions = [
    {
        version: "v1.0.0.0",
        updateTime: "2026-08-11 11:10",
        description: "初始版本：Flutter安卓App，支持学科分类浏览、笔记Markdown渲染、版本更新检查",
        updateUrl: "https://juanhaoduo.lanzoub.com/iJIwC41rur0f",
        forceUpdate: false
    },
    {
        version: "v1.0.0.0",
        updateTime: "2026-08-12 11:10",
        description: "初始版本：Flutter安卓App，支持学科分类浏览、笔记Markdown渲染、版本更新检查",
        updateUrl: "https://note.youdao.com/yws/api/personal/file/WEB26868ea90275a2902d65c8da5808b2e0?method=download&inline=true&shareKey=8cee4e9562cfefce3db70560eded9a5f",
        forceUpdate: false
    },
    {
        version: "v1.0.0.1",
        updateTime: "2026-08-12 00:05",
        description: "新增笔记本地缓存和本地笔记页面",
        updateUrl: "http://note.youdao.com/yws/api/personal/file/WEB9e857a2e0d5ff7620612af83c80b44c1?method=download&inline=true&shareKey=8758ab34fdba0f64e9d84e3294793643",
        forceUpdate: false
    },
    {
        version: "v1.0.0.5",
        updateTime: "2026-08-12 00:05",
        description: "新增文字转语音，新增书架,新增tts功能",
        updateUrl: "https://note.youdao.com/yws/api/personal/file/WEB8c3944019c4b4d5866cc0f133f710369?method=download&inline=true&shareKey=a4bdda357fa79cd28891df2f29cadc43",
        forceUpdate: false
    },
    {
        version: "v1.0.0.6",
        updateTime: "2026-08-23 00:05",
        description: "新增题库功能",
        updateUrl: "https://pan.ddda.cc/f/WJfY/study_1.0.0.6.apk",
        forceUpdate: false
    },
    {
        version: "v1.0.0.10",
        updateTime: "2026-08-25 08:16",
        description: "题库：登录激活、按省市浏览真题、下载/答题/删除/PDF，界面美化，跳题功能，新增本地PDF扫描",
        updateUrl: "https://pan.ddda.cc/f/1gCD/study_1.0.0.10.apk",
        forceUpdate: false
    }
];

export default versions;
