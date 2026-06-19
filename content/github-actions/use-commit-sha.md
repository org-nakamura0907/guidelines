---
title: タグの代わりにフルコミットSHAを指定する
---

サードパーティーアクションを使用する場合はフルコミットSHAを指定する。

```yaml
    steps:
    #   - uses: actions/checkout@v6.0.3
      - uses: actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3
        with:
          fetch-depth: 0 # Fetch all history for git info
```

タグやブランチよりも信頼性が高くなる。
ただし、重大なバグ修正やセキュリティ更新プログラムなどのアクションの更新を自動的に自動的に自動的に受信しないことに注意。

「Settings」の「Actions / General」にある「Require actions to be pinned to a full-length commit SHA」からフルコミットSHAを強制させることも可能。

### 参考

- [Using third-party actions](https://docs.github.com/en/actions/reference/security/secure-use#using-third-party-actions)
- [Using SHAs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions#using-shas)
