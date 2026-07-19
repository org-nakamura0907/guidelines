# nakamura0907のガイドライン

nakamura0907 の開発ガイドラインをまとめたドキュメントサイト。

**URL**: https://org-nakamura0907.github.io/guidelines

## 技術スタック

| 分類           | 技術                                        |
| -------------- | ------------------------------------------- |
| フレームワーク | [Astro](https://astro.build)                |
| UI             | React, Tailwind CSS v4, shadcn/ui (Base UI) |
| コンテンツ     | MDX, Astro Content Collections              |
| 検索           | Pagefind                                    |
| テスト         | Vitest, Playwright                          |

## セットアップ

### 前提条件

このプロジェクトを動かすには、以下のツールがインストールされている必要があります。

- Nix
- direnv

### 環境の起動

ターミナルでプロジェクトルートに移動して、以下のコマンドを実行する。

```bash
echo "use flake" >> .envrc
direnv allow
```

```sh
npm install
npm run dev
```

## ドキュメント

- [コンテンツガイドライン](docs/content-guide.md) — ドキュメント執筆のルール
- [ADR](docs/adr/) — アーキテクチャ上の技術的決定の記録
