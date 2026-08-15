# -*- coding: utf-8 -*-
"""
题库拆分脚本
将题目目录下的整卷 HTML 文件按小题拆分为独立文件。

每个源文件（如 2008年.html）会在同目录下生成同名文件夹（2008年/），
其中包含拆分后的每个小题文件（第1题.html、第2题.html ...）。

拆分规则:
- 以 <p class="q"> 作为每道题的起始标记，选项 <p class="opt"> 紧随其后；
- 无 <p class="q"> 的卷（或部分题目）以普通 <p> 段落中的题号开题，
  题号必须等于"上一题号 + 1"才识别为新题，避免把年份/数值误判为题号；
- 图形推理题中紧跟题目后的 <img> 归入该题；
- 资料分析等带材料题型（h3/h2 标题含"资料"）中，
  题目之前的文字/图片/表格作为材料附加到该题（材料出现在题目之间时归入后续各题）；
- 其余题型说明文字不纳入小题文件。

用法:
    python split_tiku.py [题目目录]
    不传参数时使用下方 DEFAULT_INPUT_DIR。
"""

import os
import re
import sys

# 默认题目目录
DEFAULT_INPUT_DIR = r"e:\_Web\web_study\study-main\tiku\公考类\行测\真题\黑龙江\题目"

# 判定带材料题型的关键词（仅"资料"：所有资料分析小节标题均含该词，
# 而"根据"等词出现在几乎所有题型说明中，会导致全卷被误判为材料）
MATERIAL_KEYWORDS = ("资料",)


def build_token_pattern():
    """构建用于切分内容块的正则，具体标签优先于普通 <p>。"""
    return re.compile(
        r"(<h1[^>]*>.*?</h1>)"
        r"|(<h2[^>]*>.*?</h2>)"
        r"|(<h3[^>]*>.*?</h3>)"
        r"|(<p class=\"q\">.*?</p>)"
        r"|(<p class=\"opt\">.*?</p>)"
        r"|(<p class=\"sep\">.*?</p>)"
        r"|(<img[^>]*>)"
        r"|(<table[^>]*>.*?</table>)"
        r"|(<p[^>]*>.*?</p>)",
        re.DOTALL,
    )


def _is_material_section(title_html):
    return any(k in title_html for k in MATERIAL_KEYWORDS)


def strip_tags_with_map(html):
    """去掉 HTML 标签得到纯文本，同时返回 纯文本下标 -> 原 HTML 下标 的映射表。"""
    plain = []
    char_map = []
    i = 0
    n = len(html)
    while i < n:
        ch = html[i]
        if ch == "<":
            j = html.find(">", i)
            if j == -1:
                break
            i = j + 1
            continue
        if ch == "&":
            low = html[i:i + 6].lower()
            if low == "&nbsp;":
                plain.append(" ")
                char_map.append(i)
                i += 6
                continue
        plain.append(ch)
        char_map.append(i)
        i += 1
    return "".join(plain), char_map


def find_q_starts(text, expected, in_material=False):
    """在段落纯文本中查找题号起始位置。

    只接受 题号在 [expected, expected + MAX_GAP] 区间内（允许少量跳号，
    如 114 直接跳到 116），从而避免把年份、数值（如 2015 年、3 月末、50 万、
    1.8 倍）及材料块标识（如"回答 106～110 题"中的 106/110）误判为题号。
    支持多种书写格式：
    - 段首：题号后跟空格（"1 习近平"）、全角句号／半角点（"116．2003"）、
      顿号（"118、2015"）或引号（"38“回输”"）；
    - 段中嵌入：题号前为句号（"…净资产额。101 2017 年…"），题号后可跟
      空格或顿号（"…38.8%。106、2010 年…"）；非材料部分
      （in_material=False）还允许题号前紧贴汉字（"…人73 趋同进化…"）或
      "字母+空格"（"…A 11 根据…"），此时只接受与上一题紧邻连续的题号
      （expected 起 3 号内），降低把普通数字误判为题号的风险；
    - OCR 变体：9l. 实为 91 题（如 "9l.《 处分条例》…"）。
    返回 [(题号, 纯文本下标), ...]，按出现顺序排列。
    """
    if expected is None:
        return []
    MAX_GAP = 20  # 允许的最大跳号幅度
    lo, hi = expected, expected + MAX_GAP
    hits = []
    # 段首题号：后跟空格（如 "1 习近平…"），排除后跟"题"字（材料引导语）
    for m in re.finditer(r"^\s*(\d+)\s+(?!题)\S", text):
        num = int(m.group(1))
        if lo <= num <= hi:
            hits.append((num, m.start(1)))
    # 段首题号：后跟全角句号／半角点（如 "116．2003 年香港…"）
    m = re.match(r"^\s*(\d+)[\uff0e.]\s*\S", text)
    if m and lo <= int(m.group(1)) <= hi:
        hits.append((int(m.group(1)), m.start(1)))
    # 段首题号：后跟顿号（如 "118、2015 年…"、"124、20<img…"）
    m = re.match(r"^\s*(\d+)、\s*\S", text)
    if m and lo <= int(m.group(1)) <= hi:
        hits.append((int(m.group(1)), m.start(1)))
    # 段首题号：后跟引号（如 "38“回输”是…"）
    m = re.match(r'^\s*(\d+)["“]\S', text)
    if m and lo <= int(m.group(1)) <= hi:
        hits.append((int(m.group(1)), m.start(1)))
    # 段中嵌入题号：前为句号（如 "…净资产额。101 2017 年…"），题号后可为
    # 空格或顿号（如 "…为 38.8%。106、2010 年…"）
    for m in re.finditer(r"[。．](\d+)(?:[\s、]+)(?!题)\S", text):
        num = int(m.group(1))
        if lo <= num <= hi:
            hits.append((num, m.start(1)))
    # 段中嵌入题号：非材料部分，前紧贴汉字（"…人73 趋同进化…"）或
    # "字母+空格"（"…A 11 根据…"）；材料部分不启用，避免材料内数字误判。
    if not in_material:
        near_lo, near_hi = expected, expected + 3
        for m in re.finditer(r"(?<=[\u4e00-\u9fff])(\d+)\s+(?!题)\S", text):
            num = int(m.group(1))
            if near_lo <= num <= near_hi:
                hits.append((num, m.start(1)))
        for m in re.finditer(r"(?<=[A-Za-z])\s+(\d+)\s+(?!题)\S", text):
            num = int(m.group(1))
            if near_lo <= num <= near_hi:
                hits.append((num, m.start(1)))
    # OCR 变体：9l. 实为 91 题（如 "9l.《 处分条例》…"）
    m = re.match(r"^(\s*)(9l)[\uff0e.]\s*\S", text, re.IGNORECASE)
    if m and lo <= 91 <= hi:
        hits.append((91, m.start(2)))
    hits.sort(key=lambda x: x[1])
    return hits


def split_questions(body):
    """将 body 内容拆分为题目列表 [(题号, 题目HTML), ...]。"""
    pattern = build_token_pattern()
    tokens = []
    for m in pattern.finditer(body):
        token = m.group(0)
        if token.startswith("<h1"):
            kind = "h1"
        elif token.startswith("<h2"):
            kind = "h2"
        elif token.startswith("<h3"):
            kind = "h3"
        elif token.startswith('<p class="q"'):
            kind = "q"
        elif token.startswith('<p class="opt"'):
            kind = "opt"
        elif token.startswith('<p class="sep"'):
            kind = "sep"
        elif token.startswith("<img"):
            kind = "img"
        elif token.startswith("<table"):
            kind = "table"
        else:
            kind = "p"
        tokens.append((kind, token))

    questions = []
    h1_html = []
    current_h2 = []
    section_html = []
    material_html = []
    section_is_material = False
    cur_num = None
    cur_parts = []
    cur_material = []
    cur_has_opt = False
    expected_num = 1  # 期望的下一题题号，全卷从 1 起连续

    def flush():
        nonlocal cur_num, cur_parts, cur_has_opt, cur_material
        if cur_num is not None and cur_parts:
            full = "".join(h1_html + section_html + cur_material + cur_parts)
            questions.append((cur_num, full))
        cur_num = None
        cur_parts = []
        cur_has_opt = False
        cur_material = []

    def start_question(num, parts):
        nonlocal cur_num, cur_parts, cur_has_opt, cur_material, expected_num
        cur_num = num
        cur_parts = parts
        cur_has_opt = False
        cur_material = list(material_html)
        expected_num = num + 1

    for kind, token in tokens:
        if kind == "h1":
            h1_html.append(token)
        elif kind == "h2":
            flush()
            current_h2 = [token]
            section_html = [token]
            material_html = []
            # 部分卷的资料分析部分只有 h2 无 h3，同样需要判定是否为材料部分
            section_is_material = _is_material_section(token)
        elif kind == "h3":
            flush()
            section_html = current_h2 + [token]
            material_html = []
            section_is_material = _is_material_section(token)
        elif kind == "q":
            flush()
            q_text = re.sub(r"<[^>]+>", "", token)
            m = re.match(r"\s*(\d+)", q_text)
            num = int(m.group(1)) if m else None
            if num is not None:
                start_question(num, [token])
        elif kind == "opt":
            if cur_num is not None:
                # 源文件偶发将下一题题干合并进上一题的选项（如
                # "…企业 3、109、2015 年…"），检测"、题号、"内嵌模式并拆分
                opt_text, opt_map = strip_tags_with_map(token)
                m = re.search(r"、(\d+)、", opt_text)
                num = int(m.group(1)) if m else None
                if (
                    m
                    and num is not None
                    and expected_num <= num <= expected_num + 3
                ):
                    t_idx = m.start(1)
                    open_end = token.find(">") + 1
                    html_pos = opt_map[t_idx]
                    prefix_raw = token[open_end:html_pos]
                    if prefix_raw.strip():
                        cur_parts.append(token[:open_end] + prefix_raw + "</p>")
                        cur_has_opt = True
                    flush()
                    # 选项开标签改为题干样式，题号后的文本作为新题开头
                    open_tag = re.sub(
                        r'class="opt"', 'class="q"', token[:open_end], count=1
                    )
                    start_question(num, [open_tag + token[html_pos:]])
                else:
                    cur_parts.append(token)
                    cur_has_opt = True
        elif kind == "sep":
            flush()
        elif kind in ("img", "table"):
            if section_is_material:
                # 材料块内的图片/表格（资料分析）
                material_html.append(token)
            elif cur_num is not None:
                # 题目内图片（图形推理）
                cur_parts.append(token)
        elif kind == "p":
            text, cmap = strip_tags_with_map(token)
            hits = find_q_starts(text, expected_num, section_is_material)
            if hits:
                num, t_idx = hits[0]
                open_end = token.find(">") + 1
                html_pos = cmap[t_idx]
                # 题号前的文字：材料段归入材料，普通段归入上一题
                prefix_raw = token[open_end:html_pos]
                if prefix_raw.strip():
                    fragment = token[:open_end] + prefix_raw + "</p>"
                    if section_is_material:
                        material_html.append(fragment)
                    elif cur_num is not None:
                        cur_parts.append(fragment)
                if cur_num is not None:
                    flush()
                # 从题号起的新题（保留 <p> 开标签）
                start_question(num, [token[:open_end] + token[html_pos:]])
            elif section_is_material:
                # 材料说明文字（先于题目判断，防止并入上一题）
                material_html.append(token)
            elif cur_num is not None:
                # 题目文字拆成多段的延续内容
                cur_parts.append(token)
            # 其余题型说明段落忽略

    flush()
    return questions


def build_question_html(head, paper_title, q_num, q_body):
    """构建单个小题的完整 HTML，复用原 head 中的样式与脚本。"""
    title = f"{paper_title} - 第{q_num}题"
    if re.search(r"<title>.*?</title>", head, re.DOTALL):
        new_head = re.sub(
            r"<title>.*?</title>",
            f"<title>{title}</title>",
            head,
            flags=re.DOTALL,
        )
    else:
        new_head = f"<title>{title}</title>\n{head}"

    return (
        "<!DOCTYPE html>\n"
        '<html lang="zh-CN">\n'
        "<head>\n"
        f"{new_head}\n"
        "</head>\n"
        "<body>\n"
        '<div class="paper-container">\n'
        f"{q_body}\n"
        "</div>\n"
        "</body>\n"
        "</html>\n"
    )


def split_file(input_dir, filename):
    """拆分单个整卷文件，返回拆出的小题数量。"""
    filepath = os.path.join(input_dir, filename)
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    head_m = re.search(r"<head>(.*?)</head>", html, re.DOTALL)
    head = head_m.group(1) if head_m else ""

    title_m = re.search(r"<title>(.*?)</title>", head, re.DOTALL)
    paper_title = title_m.group(1).strip() if title_m else os.path.splitext(filename)[0]

    body_m = re.search(r"<body>(.*?)</body>", html, re.DOTALL)
    body = body_m.group(1) if body_m else html

    questions = split_questions(body)

    folder = os.path.splitext(filename)[0]
    output_dir = os.path.join(input_dir, folder)
    os.makedirs(output_dir, exist_ok=True)

    count = 0
    for q_num, q_body in questions:
        if q_num is None:
            continue
        out_path = os.path.join(output_dir, f"第{q_num}题.html")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(build_question_html(head, paper_title, q_num, q_body))
        count += 1

    return count


def main():
    input_dir = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_INPUT_DIR
    input_dir = os.path.abspath(input_dir)
    if not os.path.isdir(input_dir):
        print(f"目录不存在: {input_dir}")
        return

    files = [f for f in os.listdir(input_dir) if f.lower().endswith(".html")]
    files.sort()

    total = 0
    for filename in files:
        n = split_file(input_dir, filename)
        total += n
        print(f"{filename}: 拆分 {n} 题")

    print(f"完成，共拆分 {total} 题 -> {input_dir}")


if __name__ == "__main__":
    main()
