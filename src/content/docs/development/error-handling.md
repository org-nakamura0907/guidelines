---
title: エラーハンドリング
---

## 基本方針

- ユーザーがエラーを未然に防げるよう手助けすることを最善とする（参考: [Writing | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/writing)）
- エラーを握りつぶさない

### エラーの分類基準

| 分類           | 概要                                                               | 例                                           | HTTPステータス          | ユーザーへのメッセージ                   | ログ                                 | リトライ                       |
| -------------- | ------------------------------------------------------------------ | -------------------------------------------- | ----------------------- | ---------------------------------------- | ------------------------------------ | ------------------------------ |
| 業務エラー     | 仕様上想定されるエラー。入力不正・権限不足・ビジネスルール違反など | バリデーション失敗、認証失敗、リソース未存在 | 400, 401, 403, 404, 409 | 具体的な内容と対応方法を表示             | 警告レベル                           | 不要                           |
| システムエラー | 自システム内部の障害・予期しない例外                               | NullPointerException、DB接続失敗             | 500                     | 汎用メッセージのみ表示（内部詳細は隠蔽） | エラーレベル（スタックトレース含む） | 不要                           |
| 外部連携エラー | 外部API・外部DB・メッセージキューなど依存先の障害                  | タイムアウト、外部APIの503                   | 502, 503, 504           | 汎用メッセージのみ表示                   | エラーレベル                         | 有効な場合あり（一時的エラー） |

### リトライ方針

### Exception vs Result

## エラーメッセージ

- 開発者向けのログメッセージとユーザー向けエラーメッセージは分離して考える
- エラーメッセージには「次にどのようなアクションを起こせば良いか」を記載する
- ユーザーを非難するような表現は避ける
- 予期せぬエラーが発生した場合、スタックトレースやエラーコードといった内部エラーメッセージをユーザーには表示しない
- 認証認可エラーでは意図的に曖昧なメッセージとする ※1
  - 例: ユーザーIDまたはパスワードが無効です
  - 例: ファイルが存在しないかアクセス権がありません

※1 認可についてはリソースの機密要件次第とする

### 参考

- [Writing | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/writing)
- [Improper Error Handling | OWASP Foundation](https://owasp.org/www-community/Improper_Error_Handling)
- [Error Handling - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- [Authentication - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

## エラーレスポンス

### HTTP API

- RFC7807のフォーマットを参考にする
- クライアントがエラー内容を一意に特定できるためのコンテキストと理由を返却する
  - 例: `domain: authentication`, `reason: INVALID_CREDENTIALS`
  - 実装の詳細は隠蔽し、`NULLPOINTER~`や`SQL~`といった理由にはしない

```json
{
  "status": 400,
  "detail": "1つ以上の入力値が不正です。",
  "instance": "/users",
  "domain": "user-service",
  "reason": "VALIDATION_FAILED",
  "errors": [
    {
      "field": "email",
      "reason": "EMAIL_INVALID_FORMAT",
      "detail": "有効なメールアドレスを入力してください"
    },
    {
      "field": "name",
      "reason": "NAME_REQUIRED",
      "detail": "名前は必須項目です"
    }
  ]
}
```

```json
{
  "status": 403,
  "detail": "ファイルが存在しないかアクセス権がありません。",
  "instance": "/files/secret.pdf",
  "domain": "authorization",
  "reason": "PERMISSION_DENIED"
}
```

```json
{
  "status": 500,
  "detail": "予期せぬエラーが発生しました。しばらく時間をおいてから再度お試しください。",
  "instance": "/users"
}
```

#### 参考

- [RFC 7807 - Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
- [AIP-193: Errors](https://google.aip.dev/193)

## トレーサビリティ

- ユーザーからの問い合わせが想定されるシステムの場合
  - エラーメッセージにエラー参照IDを表示することを検討する
  - エラーレスポンスにリクエストIDを含めることを検討する

```json
{
  "status": 500,
  "detail": "予期せぬエラーが発生しました。しばらく時間をおいてから再度お試しください。",
  "instance": "/users",
  "requestId": "xxx"
}
```
