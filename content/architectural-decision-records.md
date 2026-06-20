---
title: Architectural Decision Record（ADR）
---

Architectural Decision Record（ADR）はシステム構造やプロセスといった重要な決定事項、そこに至った背景、トレードオフを保存するためのドキュメント。

- 属人化の解消: 担当者がいなくなっても決定した背景を振り返ることができる
- 正当性の担保: 何をもとに決定したのか明確になる
- 無駄な議論の防止: 以前、何らかの理由から却下された決定を再議論してしまう。といった無駄を防止できる

といったメリットがある。

## 運用ルール

- コードと同じリポジトリで管理する（`docs/adr/`）
- ファイル名には連番を付与する（`01_software-development-lifecycle.md`）
- ADRを対面で提案した場合でも指摘事項はPRのコメントとして残すこと

## テンプレート（案）

- プロジェクトに応じて最適な形に変更すること
- 最低限、「ステータス」、「コンテキスト」、「決定事項」、「選択肢」の項目を取り入れること

```md
# <タイトル>

## ステータス

<作成中|提案中|承認済み|不採用|置き換え済み|廃止>

[背景: 必要に応じてステータス変更の背景を記載]

## コンテキスト

- <課題や技術的・ビジネス的な制約>

## 決定事項

<決定事項を記載>

### メリット

<この決定によって得られるメリット>

### デメリット

<この決定によって生じるデメリットやトレードオフ>

## 選択肢

### <選択肢の内容>

#### メリット

#### デメリット

```

### 参考

- [AWS Prescriptive Guidance | Using architectural decision records to streamline technical decision-making for a software development project](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)
