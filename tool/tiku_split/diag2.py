# -*- coding: utf-8 -*-
"""诊断2：对每卷缺口题号，在源文件中查找其出现格式（前15字符上下文）。"""
import os
import re
import split_tiku

INPUT = r"e:\_Web\web_study\study-main\tiku\公考类\行测\真题\黑龙江\题目"


def find_gaps(nums):
    gaps = []
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1] + 1:
            gaps.append((nums[i - 1], nums[i]))
    return gaps


for filename in sorted(f for f in os.listdir(INPUT) if f.lower().endswith(".html")):
    path = os.path.join(INPUT, filename)
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    body_m = re.search(r"<body>(.*?)</body>", html, re.DOTALL)
    body = body_m.group(1) if body_m else html
    qs = split_tiku.split_questions(body)
    nums = [n for n, _ in qs]
    gaps = find_gaps(nums)
    if not gaps:
        continue
    print(f"\n===== {filename} 拆出{len(nums)}题 缺口:{gaps}")
    missing = set()
    for a, b in gaps:
        for n in range(a + 1, b):
            missing.add(n)
    for n in sorted(missing):
        # 找 非数字前缀 的 n 后跟 空格/标点/引号 的出现位置
        pat = re.compile(r"(?<![0-9])%d(?=[\s\uff0e.、:：,，。．\"'“”）)\]])" % n)
        found = []
        for m in pat.finditer(body):
            s = max(0, m.start() - 15)
            e = min(len(body), m.end() + 15)
            ctx = body[s:e].replace("\n", " ")
            found.append(ctx)
        if found:
            for ctx in found[:3]:
                print(f"  题{n} 出现: ...{ctx}...")
        else:
            print(f"  题{n} 未找到数字出现")
