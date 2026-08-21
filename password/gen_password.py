#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
gen_password.py
生成题库解锁密码的 SHA-256 哈希并存储到 JSON（不保存明文密码）。

密码为任意字符串，例如:
    anshangren147258
    bianhua25969

用法:
    python gen_password.py anshangren147258 bianhua25969
    python gen_password.py --list
    python gen_password.py --clear

输出 passwords.json:
    {
      "algorithm": "sha256",
      "note": "...",
      "entries": [ {"hash": "..."} ]
    }

哈希算法: sha256(明文密码整串)，hex 小写。校验时对用户输入整串取同样哈希查表，
命中即通过，不保存明文密码。
"""
import json
import sys
import hashlib
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
DATA_FILE = SCRIPT_DIR / 'passwords.json'
ALGORITHM = 'sha256'


def sha256_hex(pwd):
    return hashlib.sha256(pwd.encode('utf-8')).hexdigest()


def load_entries():
    if not DATA_FILE.is_file():
        return []
    try:
        data = json.loads(DATA_FILE.read_text(encoding='utf-8'))
        return list(data.get('entries', []))
    except (json.JSONDecodeError, OSError):
        return []


def load_purchase_url():
    """读取现有文件中的购买链接（重新生成时保留）。"""
    if not DATA_FILE.is_file():
        return ''
    try:
        data = json.loads(DATA_FILE.read_text(encoding='utf-8'))
        return data.get('purchase_url', '')
    except (json.JSONDecodeError, OSError):
        return ''


def save_entries(entries, purchase_url=None):
    if purchase_url is None:
        purchase_url = load_purchase_url()
    data = {
        'algorithm': ALGORITHM,
        'purchase_url': purchase_url,
        'note': '密码为任意字符串，hash=sha256(密码整串)。'
                '本文件不保存明文密码，仅保存哈希；'
                '新增密码请调用 gen_password.py 传入明文，脚本只写入哈希。',
        'entries': entries,
    }
    DATA_FILE.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8',
    )


def main():
    args = sys.argv[1:]

    if args and args[0] == '--list':
        for e in load_entries():
            print('hash=%s' % e['hash'])
        return
    if args and args[0] == '--clear':
        save_entries([])
        print('已清空 %s' % DATA_FILE)
        return
    if not args:
        print(__doc__)
        sys.exit(1)

    entries = load_entries()
    existing = {e['hash'] for e in entries}
    added = 0
    for pwd in args:
        pwd = pwd.strip()
        if not pwd:
            print('跳过（密码为空）')
            continue
        h = sha256_hex(pwd)
        if h in existing:
            print('跳过（哈希已存在）: %r' % pwd)
            continue
        entries.append({'hash': h})
        existing.add(h)
        added += 1
        print('已生成  密码=%r  hash=%s' % (pwd, h))

    if added:
        save_entries(entries)
        print('\n共写入 %d 条 -> %s' % (added, DATA_FILE))
    else:
        print('未新增任何条目（当前共 %d 条）' % len(entries))


if __name__ == '__main__':
    main()
