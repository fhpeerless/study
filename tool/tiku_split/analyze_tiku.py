# -*- coding: utf-8 -*-
"""临时分析脚本：统计各整卷结构特征，用于确定拆分策略。"""
import os
import re

INPUT_DIR = r"e:\_Web\web_study\study-main\tiku\公考类\行测\真题\黑龙江\题目"

for fname in sorted(os.listdir(INPUT_DIR)):
    if not fname.lower().endswith(".html"):
        continue
    path = os.path.join(INPUT_DIR, fname)
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    q_count = len(re.findall(r'<p class="q">', html))
    h3s = re.findall(r"<h3[^>]*>(.*?)</h3>", html, re.DOTALL)
    h3s = [re.sub(r"<[^>]+>", "", x).strip() for x in h3s]

    # 普通 <p>（不含 class 的 p 段落），提取纯文本
    ps = re.findall(r"<p(?![^>]*class=)[^>]*>(.*?)</p>", html, re.DOTALL)
    p_texts = [re.sub(r"<[^>]+>", "", x).strip() for x in ps]

    # 段首数字（疑似题号开题）
    head_nums = []
    for t in p_texts:
        m = re.match(r"(\d+)\s", t)
        if m:
            head_nums.append(int(m.group(1)))

    # 文本中所有 "数字+空格+非数字" 序列（疑似嵌入题号）
    emb_nums = []
    for t in p_texts:
        for m in re.finditer(r"(?<!\d)(\d+)\s+(?![0-9])", t):
            emb_nums.append(int(m.group(1)))

    print(f"{fname}: q={q_count} h3={len(h3s)} p={len(p_texts)} 段首数字={head_nums[:25]}")
    if h3s:
        print("    h3:", " | ".join(h[:18] for h in h3s))
    if head_nums:
        # 统计段首数字是否连续从1开始
        seq = head_nums
        consecutive = all(seq[i] == seq[i - 1] + 1 for i in range(1, len(seq)))
        print(f"    段首数字: 数量={len(seq)} 连续={consecutive} 范围={min(seq)}-{max(seq)} 全部={seq}")
