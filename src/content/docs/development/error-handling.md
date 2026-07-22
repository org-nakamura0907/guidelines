---
title: エラーハンドリング
---

ユーザーがエラーを未然に防げるよう手助けすることを最善とする（参考: [Writing | Apple Developer Documentation](https://developer.apple.com/design/human-interface-guidelines/writing)）

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

#### 参考

- [RFC 7807 - Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc7807)
- [AIP-193: Errors](https://google.aip.dev/193)

## トレーサビリティ

- ユーザーからの問い合わせが想定されるシステムの場合
  - エラーメッセージにエラー参照IDを表示することを検討する
  - エラーレスポンスにリクエストIDを含めることを検討する
