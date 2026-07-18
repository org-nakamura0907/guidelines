---
title: GitHub Actions
order: 1
---

## コスト最適化

### コンカレンシーを設定する

GitHub Actionsのワークフローやジョブにコンカレンシーを設定することで同時実行が制御できる。

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

上記のように設定することで、同じ`concurrency.group`内の実行中ワークフローやジョブのキャンセルができ、CIリソースの削減ができる。

#### 判断基準

- [ ] テストやLintなど、最新の状態が分かればいいユースケースである
- [ ] 本番環境へのデプロイなど、途中で止めたくないユースケース**ではない**

#### 参考

- [Control the concurrency of workflows and jobs](https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency#using-concurrency-in-different-scenarios)

### ジョブにタイムアウトを設定する

デフォルトではジョブのタイムアウトは360分になっている。
そのままでは無料枠をすぐに使い切ってしまう可能性があるため、タイムアウトを設定してCIリソースを節約できるようにする。

> GitHubで自動的にキャンセルされるまでジョブを実行する最長時間 (分)。 デフォルト: 360
>
> *https://docs.github.com/ja/actions/reference/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes*

タイムアウトを設定するサンプルコードは以下の通り。

```yaml
jobs:
  my-job:
    runs-on: ubuntu-latest
    timeout-minutes: 60
```

## セキュリティ

### タグの代わりにフルコミットSHAを指定する

サードパーティーアクションを使用する場合はフルコミットSHAを指定する。

```yaml
steps:
  #   - uses: actions/checkout@v6.0.3
  - uses: actions/checkout@df4cb1c069e1874edd31b4311f1884172cec0e10 # v6.0.3
    with:
      fetch-depth: 0 # Fetch all history for git info
```

タグやブランチよりも信頼性が高くなる。
ただし、重大なバグ修正やセキュリティ更新プログラムなどのアクションの更新を自動的に自動的に自動的に受信しないことに注意。※

「Settings」の「Actions / General」にある「Require actions to be pinned to a full-length commit SHA」からフルコミットSHAを強制させることも可能。

※ 公式ドキュメントにはそのような記載があるが、Dependabot等でバージョンの更新は可能

#### 参考

- [Using third-party actions](https://docs.github.com/en/actions/reference/security/secure-use#using-third-party-actions)
- [Using SHAs](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/find-and-customize-actions#using-shas)
