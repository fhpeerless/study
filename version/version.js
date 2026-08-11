// App版本信息
// 版本号格式: v主版本.次版本.修订号.构建号 (如 v1.0.0.0)
// 当本地版本落后远程版本3个构建号及以上时，App会强制要求更新
// 追加式发布：在数组末尾追加新的版本对象即可，App 取最后一条作为最新版本
export const versions = [
    {
        version: "v1.0.0.0",
        updateTime: "2026-08-11 11:10",
        description: "初始版本：Flutter安卓App，支持学科分类浏览、笔记Markdown渲染、版本更新检查",
        updateUrl: "https://juanhaoduo.lanzoub.com/iJIwC41rur0f"
    },
    {
        version: "v1.0.0.0",
        updateTime: "2026-08-12 11:10",
        description: "初始版本：Flutter安卓App，支持学科分类浏览、笔记Markdown渲染、版本更新检查",
        updateUrl: "https://note.youdao.com/yws/api/personal/file/WEB26868ea90275a2902d65c8da5808b2e0?method=download&inline=true&shareKey=8cee4e9562cfefce3db70560eded9a5f"
    },
    {
        version: "v1.0.0.1",
        updateTime: "2026-08-12 00:05",
        description: "新增笔记本地缓存和本地笔记页面",
        updateUrl: "http://note.youdao.com/yws/api/personal/file/WEB9e857a2e0d5ff7620612af83c80b44c1?method=download&inline=true&shareKey=8758ab34fdba0f64e9d84e3294793643"
    }
];

export default versions;
