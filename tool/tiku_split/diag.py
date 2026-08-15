# -*- coding: utf-8 -*-
"""临时诊断：打印各卷拆出的题号序列与缺口。"""
import os
import re
import split_tiku

INPUT = r"e:\_Web\web_study\study-main\tiku\公考类\行测\真题\黑龙江\题目"

for filename in sorted(f for f in os.listdir(INPUT) if f.lower().endswith(".html")):
    path = os.path.join(INPUT, filename)
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    body_m = re.search(r"<body>(.*?)</body>", html, re.DOTALL)
    body = body_m.group(1) if body_m else html
    qs = split_tiku.split_questions(body)
    nums = [n for n, _ in qs]
    # 缺口
    gaps = []
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1] + 1:
            gaps.append((nums[i - 1], nums[i]))
    print(f"{filename}: 拆出 {len(nums)} 题, 缺口: {gaps}")
