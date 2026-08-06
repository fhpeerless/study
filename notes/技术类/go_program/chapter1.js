export const note1 = {
    title: "Go语言简介与环境准备",
    contentmd: `
## 什么是 Go 语言

Go（又称 Golang）是 Google 开发的一种静态强类型、编译型语言。Go 的设计目标是简单、高效、可靠，特别适合构建大规模分布式系统和云原生应用。

**核心特点：**
- **编译速度快** — Go 编译器非常高效，大型项目也能在秒级完成编译
- **内置并发** — goroutine 和 channel 让并发编程变得简单
- **垃圾回收** — 自动内存管理，无需手动释放
- **静态链接** — 编译产物是单一二进制文件，部署极其简单
- **跨平台** — 支持 Windows、Linux、macOS 等主流操作系统

**Go 的典型应用场景：** Docker、Kubernetes、etcd、Prometheus、Terraform 等知名项目均使用 Go 编写。

---

## 下载 Go 安装包

访问 Go 官方下载页面：[https://go.dev/dl/](https://go.dev/dl/)

当前最新稳定版为 **Go 1.26.2**（截至2026年4月）。根据你的操作系统和架构选择对应的安装包：

| 操作系统 | 架构 | 推荐文件 |
|---------|------|---------|
| Windows | x86-64 | \`go1.26.2.windows-amd64.msi\` |
| Windows | ARM64 | \`go1.26.2.windows-arm64.msi\` |
| Linux | x86-64 | \`go1.26.2.linux-amd64.tar.gz\` |
| Linux | ARM64 | \`go1.26.2.linux-arm64.tar.gz\` |

> 💡 国内用户如果访问 go.dev 较慢，可以使用 Go 官方中国区镜像：[https://golang.google.cn/dl/](https://golang.google.cn/dl/)

---

## 一、Windows 安装 Go

### 方法一：MSI 安装包（推荐）

1. **下载** \`go1.26.2.windows-amd64.msi\`
2. **双击运行** MSI 安装包，按照向导提示操作
3. 默认安装路径为 \`C:\\Program Files\\Go\`
4. 安装程序会**自动配置**环境变量，将 \`C:\\Program Files\\Go\\bin\` 添加到系统 PATH

### 方法二：ZIP 压缩包（手动安装）

1. **下载** \`go1.26.2.windows-amd64.zip\`
2. **解压**到你想要的目录，例如 \`C:\\Go\`
3. **手动配置环境变量：**
   - 右键「此电脑」→「属性」→「高级系统设置」→「环境变量」
   - 在「系统变量」中找到 \`Path\`，点击「编辑」
   - 添加 \`C:\\Go\\bin\`
4. 可选：新建系统变量 \`GOROOT\`，值为 \`C:\\Go\`

### 验证 Windows 安装

打开 **命令提示符** 或 **PowerShell**，输入：

\`\`\`shell
go version
\`\`\`

如果输出类似 \`go version go1.26.2 windows/amd64\`，说明安装成功。

---

## 二、Linux 安装 Go

### 方法一：官方 tar.gz 包（推荐）

**1. 删除旧版本**（如果之前安装过）

\`\`\`bash
sudo rm -rf /usr/local/go
\`\`\`

> ⚠️ **重要：** 不要直接在已有的 \`/usr/local/go\` 目录上解压覆盖，这会导致安装损坏。必须先删除旧目录再解压。

**2. 下载并解压**

\`\`\`bash
# 下载（可根据实际版本号修改）
wget https://go.dev/dl/go1.26.2.linux-amd64.tar.gz

# 解压到 /usr/local
sudo tar -C /usr/local -xzf go1.26.2.linux-amd64.tar.gz
\`\`\`

**3. 配置环境变量**

编辑 \`~/.profile\`（当前用户）或 \`/etc/profile\`（全局）：

\`\`\`bash
export PATH=$PATH:/usr/local/go/bin
\`\`\`

然后使配置生效：

\`\`\`bash
source ~/.profile
\`\`\`

**4. 验证安装**

\`\`\`bash
go version
\`\`\`

输出 \`go version go1.26.2 linux/amd64\` 即安装成功。

### 方法二：使用包管理器（版本可能较旧）

\`\`\`bash
# Ubuntu / Debian
sudo apt update
sudo apt install golang-go

# CentOS / RHEL
sudo yum install golang

# Arch Linux
sudo pacman -S go
\`\`\`

> ⚠️ 包管理器中的 Go 版本通常落后于官方最新版。如需最新版本，请使用方法一。

---

## 三、配置 Go 模块代理（国内用户必看）

由于 Go 默认从 \`proxy.golang.org\` 下载依赖，国内访问可能很慢。建议配置国内代理：

\`\`\`bash
# Linux / macOS（添加到 ~/.profile 或 ~/.bashrc）
export GOPROXY=https://goproxy.cn,direct

# Windows PowerShell
$env:GOPROXY = "https://goproxy.cn,direct"

# Windows CMD（永久设置）
setx GOPROXY "https://goproxy.cn,direct"
\`\`\`

常用国内代理：
- **七牛云：** \`https://goproxy.cn\`（推荐）
- **阿里云：** \`https://mirrors.aliyun.com/goproxy/\`
- **官方中国区：** \`https://goproxy.io\`

---

## 四、编写第一个 Go 程序

安装完成后，来验证一下环境是否正常工作。

**1. 创建项目目录**

\`\`\`bash
mkdir hello
cd hello
\`\`\`

**2. 初始化模块**

\`\`\`bash
go mod init hello
\`\`\`

**3. 编写代码** — 创建 \`main.go\` 文件：

\`\`\`go copy
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
\`\`\`

**4. 运行**

\`\`\`bash
go run main.go
\`\`\`

输出 \`Hello, Go!\` 则说明一切正常！

**5. 编译为可执行文件**

\`\`\`bash
go build
\`\`\`

这会在当前目录生成一个可执行文件（Windows 上是 \`hello.exe\`，Linux 上是 \`hello\`），可以直接运行。

---

## 五、常用开发工具

| 工具 | 说明 | 推荐指数 |
|------|------|---------|
| **VS Code + Go 扩展** | 微软出品，轻量且插件丰富 | ⭐⭐⭐⭐⭐ |
| **GoLand** | JetBrains 出品，功能最强大（付费） | ⭐⭐⭐⭐⭐ |
| **Vim/Neovim + vim-go** | 终端党首选 | ⭐⭐⭐⭐ |

### VS Code 配置 Go 开发环境

1. 安装 VS Code
2. 安装 **Go** 扩展（由 Go Team at Google 发布）
3. 打开命令面板 (\`Ctrl+Shift+P\`)，输入 \`Go: Install/Update Tools\`
4. 全选并安装所有 Go 工具

---

## 六、环境变量说明

| 变量 | 说明 | 默认值 |
|------|------|-------|
| \`GOROOT\` | Go 安装目录 | \`/usr/local/go\`（Linux）或 \`C:\\Program Files\\Go\`（Windows） |
| \`GOPATH\` | Go 工作空间目录 | \`$HOME/go\`（Linux）或 \`C:\\Users\\用户名\\go\`（Windows） |
| \`GOPROXY\` | 模块下载代理 | \`https://proxy.golang.org,direct\` |
| \`GOBIN\` | go install 安装目录 | \`$GOPATH/bin\` |

> 💡 Go 1.16+ 之后，**推荐使用 Go Modules**（\`go mod init\`）管理依赖，不再依赖 GOPATH 模式。

---

## 参考链接

- 📖 [Go 官方安装文档](https://go.dev/doc/install)
- 📖 [Go 官方入门教程](https://go.dev/tour/)
- 📖 [Go by Example](https://gobyexample.com/)
- 📖 [Effective Go](https://go.dev/doc/effective_go)
`,
    timestamp: "2026-04-29 18:00",
    embed: ``
};

export const note2 = {
    title: "Go 环境常见问题与排查",
    contentmd: `
## 常见安装问题

### 1. \`go version\` 命令找不到

**原因：** 环境变量 PATH 未正确配置。

**解决：**

- **Windows：** 检查系统 PATH 中是否包含 Go 的 bin 目录（如 \`C:\\Program Files\\Go\\bin\`）
- **Linux：** 检查 \`~/.profile\` 或 \`/etc/profile\` 中是否有 \`export PATH=$PATH:/usr/local/go/bin\`，并执行 \`source ~/.profile\`

验证 PATH 配置：

\`\`\`bash
# Linux
echo $PATH | tr ':' '\\n' | grep go

# Windows PowerShell
$env:Path -split ';' | Select-String go
\`\`\`

### 2. 下载依赖超时

**原因：** 默认代理 \`proxy.golang.org\` 在国内访问困难。

**解决：** 配置国内代理：

\`\`\`bash
go env -w GOPROXY=https://goproxy.cn,direct
\`\`\`

### 3. VS Code Go 工具安装失败

**原因：** Go 工具默认从 GitHub 下载，网络不稳定。

**解决：** 先配置 GOPROXY，再重新安装工具：

\`\`\`bash
go env -w GOPROXY=https://goproxy.cn,direct
\`\`\`

然后在 VS Code 中重新执行 \`Go: Install/Update Tools\`。

### 4. Linux 上权限不足

如果遇到 \`permission denied\` 错误：

\`\`\`bash
# 使用 sudo 执行 tar 解压
sudo tar -C /usr/local -xzf go1.26.2.linux-amd64.tar.gz

# 或者将当前用户添加到相应组
sudo chown -R $USER:$USER /usr/local/go
\`\`\`

### 5. 多版本 Go 共存

如果需要同时使用多个 Go 版本，可以使用 Go 官方的多版本管理工具：

\`\`\`bash
# 安装额外版本
go install golang.org/dl/go1.24.13@latest
go1.24.13 download

# 使用特定版本
go1.24.13 version
\`\`\`

---

## 查看 Go 环境信息

\`\`\`bash
# 查看所有环境变量
go env

# 查看特定变量
go env GOPATH
go env GOROOT
go env GOPROXY
\`\`\`

常用环境变量设置命令：

\`\`\`bash
# 设置代理（永久生效）
go env -w GOPROXY=https://goproxy.cn,direct

# 开启模块模式
go env -w GO111MODULE=on

# 设置校验和数据库（国内加速）
go env -w GONOSUMCHECK=off
go env -w GONOSUMDB=*
\`\`\`
`,
    timestamp: "2026-04-29 18:00",
    embed: ``
};

export default [note1, note2];
