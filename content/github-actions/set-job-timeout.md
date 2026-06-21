---
title: ジョブにタイムアウトを設定する
---

デフォルトではジョブのタイムアウトは360分になっている。
そのままでは無料枠をすぐに使い切ってしまう可能性があるため、タイムアウトを設定してCIリソースを節約できるようにする。

> GitHubで自動的にキャンセルされるまでジョブを実行する最長時間 (分)。 デフォルト: 360
>
>*https://docs.github.com/ja/actions/reference/workflow-syntax-for-github-actions#jobsjob_idtimeout-minutes

タイムアウトを設定するサンプルコードは以下の通り。

```yaml
jobs:
  my-job:
    runs-on: ubuntu-latest
    timeout-minutes: 60
```
