---
title: コンカレンシーを設定する
---

GitHub Actionsのワークフローやジョブにコンカレンシーを設定することで同時実行が制御できる。

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

上記のように設定することで、同じ`concurrency.group`内の実行中ワークフローやジョブのキャンセルができ、CIリソースの削減ができる。

## 判断基準

- [ ] テストやLintなど、最新の状態が分かればいいユースケースである
- [ ] 本番環境へのデプロイなど、途中で止めたくないユースケース**ではない**

## 参考

- [Control the concurrency of workflows and jobs](https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency#using-concurrency-in-different-scenarios)
