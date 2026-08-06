export const note1 = {
    title: "Hello, World — 第一个Go程序",
    contentmd: `
## Hello, World

每个 Go 程序都从 \`main\` 包的 \`main\` 函数开始执行。

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 世界")
}
\`\`\`

**逐行解读：**

| 行 | 代码 | 含义 |
|---|------|------|
| 1 | \`package main\` | 声明这个文件属于 \`main\` 包，只有 \`main\` 包才能生成可执行文件 |
| 3 | \`import "fmt"\` | 导入 fmt 包（格式化输入输出），Go 的标准打印库 |
| 5 | \`func main()\` | 定义 main 函数，程序入口，无参数无返回值 |
| 6 | \`fmt.Println(...)\` | 调用 fmt 包的 Println 函数，打印后自动换行 |

**运行方式：**

\`\`\`bash
go run hello.go
\`\`\`

> 💡 Go 源文件以 \`.go\` 为后缀，文件名不必和包名一致。但属于 \`main\` 包的文件才能编译成可执行程序。

---

## 包（Package）与导入（Import）

Go 通过**包**来组织代码：

\`\`\`go
import (
    "fmt"
    "os"
    "strings"
)
\`\`\`

- 每个源文件开头必须声明所属包：\`package xxx\`
- 用 \`import\` 导入其他包，导入后用 \`包名.函数名\` 调用
- 未使用的导入会**编译报错**，Go 不允许冗余

> 💡 \`fmt\` 包名来源于 "format"，是 Go 最常用的 I/O 包。

---

## 函数声明

Go 函数的基本形式：

\`\`\`go
func 函数名(参数列表) 返回类型 {
    函数体
}
\`\`\`

示例 — 两个数相加：

\`\`\`go
func add(x int, y int) int {
    return x + y
}
\`\`\`

如果参数类型相同，可以简写：

\`\`\`go
func add(x, y int) int {
    return x + y
}
\`\`\`

多返回值：

\`\`\`go
func swap(x, y string) (string, string) {
    return y, x
}
\`\`\`

\`\`\`go
go help 可以列出所有子命令
\`\`\`
`,
    timestamp: "2026-05-04 18:00",
    embed: ``
};

export const note2 = {
    title: "命令行参数",
    contentmd: `
## 命令行参数

程序运行时可以接收命令行参数。Go 通过 \`os.Args\` 获取。

\`\`\`go
package main

import (
    "fmt"
    "os"
)

func main() {
    // os.Args[0] 是程序本身的名字
    // os.Args[1:] 是用户传入的参数
    fmt.Println(os.Args[0])
    fmt.Println(strings.Join(os.Args[1:], " "))
}
\`\`\`

**运行示例：**

\`\`\`bash
go run echo.go hello world
# 输出: hello world
\`\`\`

**关键点：**

| 概念 | 说明 |
|------|------|
| \`os.Args\` | \`[]string\` 切片，存储所有命令行参数 |
| \`os.Args[0]\` | 程序名本身（如 \`/tmp/go-buildxxx/echo\`） |
| \`os.Args[1:]\` | 用户传入的实际参数 |
| \`strings.Join\` | 将字符串切片用指定分隔符拼接 |

---

## 切片（Slice）速览

\`os.Args[1:]\` 用到了**切片**语法，这是 Go 中最重要的数据结构之一：

\`\`\`go
s := []string{"a", "b", "c", "d"}

s[1:3]  // ["b", "c"]   — 左闭右开
s[:2]   // ["a", "b"]   — 省略起始，从0开始
s[1:]   // ["b", "c", "d"] — 省略结束，到末尾
\`\`\`

> 💡 切片 \`s[m:n]\` 包含从索引 m 到 n-1 的元素，左闭右开，和 Python 一样。
`,
    timestamp: "2026-05-04 18:00",
    embed: ``
};

export const note3 = {
    title: "查找重复行 — 文件I/O与map",
    contentmd: `
## 查找重复行

这个例子综合运用了 **map、文件读取、字符串处理**，是入门阶段最重要的实战。

### 版本一：从标准输入读取

\`\`\`go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    counts := make(map[string]int)
    input := bufio.NewScanner(os.Stdin)

    for input.Scan() {
        counts[input.Text()]++
    }

    for line, n := range counts {
        if n > 1 {
            fmt.Printf("%d\\t%s\\n", n, line)
        }
    }
}
\`\`\`

**运行：**

\`\`\`bash
go run dup1.go
# 输入几行文字，按 Ctrl+D (Linux) 或 Ctrl+Z (Windows) 结束
\`\`\`

**逐行解读：**

| 代码 | 含义 |
|------|------|
| \`make(map[string]int)\` | 创建一个 key 为 string、value 为 int 的 map |
| \`bufio.NewScanner(os.Stdin)\` | 创建一个扫描器，逐行读取标准输入 |
| \`input.Scan()\` | 读取下一行，成功返回 true，结束返回 false |
| \`counts[input.Text()]++\` | 以当前行内容为 key，计数 +1（不存在时默认值为 0） |
| \`for line, n := range counts\` | 遍历 map，line 是 key，n 是 value |

### 版本二：从文件读取

\`\`\`go
package main

import (
    "bufio"
    "fmt"
    "os"
)

func main() {
    counts := make(map[string]int)
    files := os.Args[1:]

    if len(files) == 0 {
        countLines(os.Stdin, counts)
    } else {
        for _, arg := range files {
            f, err := os.Open(arg)
            if err != nil {
                fmt.Fprintf(os.Stderr, "dup2: %v\\n", err)
                continue
            }
            countLines(f, counts)
            f.Close()
        }
    }

    for line, n := range counts {
        if n > 1 {
            fmt.Printf("%d\\t%s\\n", n, line)
        }
    }
}

func countLines(f *os.File, counts map[string]int) {
    input := bufio.NewScanner(f)
    for input.Scan() {
        counts[input.Text()]++
    }
}
\`\`\`

**关键新概念：**

| 概念 | 说明 |
|------|------|
| \`os.Open(filename)\` | 打开文件，返回 \`*os.File\` 和 \`error\` |
| \`error\` | Go 的错误处理方式，\`err != nil\` 表示出错 |
| \`fmt.Fprintf\` | 格式化写入到指定 io.Writer（如 \`os.Stderr\`） |
| \`continue\` | 跳过当前循环迭代，继续下一个 |
| \`_\` | 空白标识符，丢弃不需要的返回值（如 \`for \_, arg\`） |
| \`f.Close()\` | 关闭文件，释放资源 |

> 💡 Go 没有 try/catch，错误通过返回值处理。\`if err != nil\` 是 Go 中最常见的模式。
`,
    timestamp: "2026-05-04 18:00",
    embed: ``
};

export const note4 = {
    title: "并发 — goroutine与channel",
    contentmd: `
## 并发获取多个URL

Go 的并发模型非常简洁：**goroutine + channel**。

\`\`\`go
package main

import (
    "fmt"
    "io"
    "net/http"
    "os"
)

func fetch(url string, ch chan<- string) {
    resp, err := http.Get(url)
    if err != nil {
        ch <- fmt.Sprint(err)
        return
    }
    nbytes, err := io.Copy(io.Discard, resp.Body)
    resp.Body.Close()
    if err != nil {
        ch <- fmt.Sprintf("while reading %s: %v", url, err)
        return
    }
    ch <- fmt.Sprintf("%s  %d bytes", url, nbytes)
}

func main() {
    ch := make(chan string)
    for _, url := range os.Args[1:] {
        go fetch(url, ch)
    }
    for range os.Args[1:] {
        fmt.Println(<-ch)
    }
}
\`\`\`

**运行：**

\`\`\`bash
go run fetchall.go https://golang.org https://godoc.org https://play.golang.org
\`\`\`

**核心概念拆解：**

| 概念 | 代码 | 含义 |
|------|------|------|
| **goroutine** | \`go fetch(url, ch)\` | \`go\` 关键字启动一个并发执行的函数 |
| **channel** | \`ch := make(chan string)\` | channel 是 goroutine 之间通信的管道 |
| **发送** | \`ch <- value\` | 将值发送到 channel |
| **接收** | \`<-ch\` | 从 channel 接收值（阻塞等待） |
| **单向channel** | \`chan<- string\` | 只写channel（发送端）；\`<-chan string\` 只读 |

**执行流程：**

\`\`\`
main 启动 N 个 goroutine（每个 fetch 一个 URL）
    ↓
每个 goroutine 完成后把结果发送到 ch
    ↓
main 循环 N 次从 ch 接收结果并打印
    ↓
所有结果收完，程序退出
\`\`\`

> 💡 goroutine 非常轻量，初始栈仅 2KB，可以轻松创建成千上万个。Go 的并发哲学：**不要通过共享内存来通信，而要通过通信来共享内存。**

---

## 简易Web服务器

Go 写一个 Web 服务器只需几行代码：

\`\`\`go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "URL.Path = %q\\n", r.URL.Path)
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe("localhost:8000", nil))
}
\`\`\`

**运行后访问 \`http://localhost:8000/hello\`，页面显示：**

\`\`\`
URL.Path = "/hello"
\`\`\`

| 概念 | 说明 |
|------|------|
| \`http.HandleFunc\` | 注册路由处理函数 |
| \`http.ResponseWriter\` | 写入 HTTP 响应的接口 |
| \`*http.Request\` | HTTP 请求对象，包含 URL、Header 等 |
| \`http.ListenAndServe\` | 启动 HTTP 服务器，阻塞运行 |

> 💡 Go 的标准库 \`net/http\` 功能强大，很多生产级服务直接基于它构建，无需第三方框架。
`,
    timestamp: "2026-05-04 18:00",
    embed: ``
};

export const note5 = {
    title: "入门要点总结",
    contentmd: `
## 第一章核心知识速查

### 程序结构

\`\`\`
源文件 → package声明 → import导入 → 函数定义
                    ↓
            main包 + main函数 = 可执行程序
\`\`\`

### 变量与声明

\`\`\`go
// 短变量声明（最常用，只能在函数内使用）
x := 10
s := "hello"

// var 声明（可用于包级别）
var y int = 20
var z float64
\`\`\`

### 控制流

\`\`\`go
// if
if err != nil {
    fmt.Println(err)
}

// for — Go 唯一的循环语句
for i := 0; i < 10; i++ { }    // 经典for
for condition { }                // while风格
for { }                          // 无限循环
for idx, val := range slice { } // 遍历集合
\`\`\`

### 错误处理模式

\`\`\`go
result, err := someFunc()
if err != nil {
    fmt.Fprintf(os.Stderr, "error: %v\\n", err)
    os.Exit(1)
}
// 使用 result...
\`\`\`

### 常用标准库

| 包 | 用途 | 常用函数 |
|---|------|---------|
| \`fmt\` | 格式化I/O | \`Println\`, \`Printf\`, \`Fprintf\` |
| \`os\` | 操作系统交互 | \`Args\`, \`Open\`, \`Stdin\`, \`Stderr\` |
| \`bufio\` | 缓冲I/O | \`NewScanner\`, \`Scanner.Scan()\` |
| \`strings\` | 字符串操作 | \`Join\`, \`Split\`, \`Contains\` |
| \`net/http\` | HTTP客户端/服务 | \`Get\`, \`HandleFunc\`, \`ListenAndServe\` |
| \`io\` | I/O接口 | \`Copy\`, \`ReadAll\`, \`Discard\` |

> 💡 **一句话总结第一章：** Go 程序由包组成，\`main\` 包的 \`main\` 函数是入口；用 \`import\` 导入标准库；错误通过返回值处理；\`go\` 关键字启动并发；channel 连接 goroutine。简洁、直接、没有废话。
`,
    timestamp: "2026-05-04 18:00",
    embed: ``
};

export default [note1, note2, note3, note4, note5];
