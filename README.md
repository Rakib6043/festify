# Festify - イベント管理システム

Rails API + React を使用したイベント管理システム

## 🎯 機能

### ✅ 完成済み

- ユーザー認証システム (ログイン/ログアウト)
- Session ベースの認証
- 日本語 UI
- レスポンシブデザイン

### 🔄 開発予定

- Festify CRUD 操作
- イベント管理機能
- ユーザー管理機能

## 🚀 セットアップ

### 必要な環境

- Ruby 3.3+
- Node.js 18+
- Rails 8.0+
- React 19+

### Backend (Rails API)

```bash
cd backend
bundle install
rails db:migrate
rails server  # http://localhost:3000
```

### Frontend (React)

```bash
cd frontend
npm install
npm start     # http://localhost:3001
```

## 📋 テスト用アカウント

```
Email: test@example.com
Password: password123
```

## 🏗️ 技術スタック

### Backend

- Ruby on Rails 8.0 (API mode)
- SQLite3 (開発環境)
- Session-based 認証
- CORS サポート

### Frontend

- React 19
- Context API (状態管理)
- Fetch API (HTTP クライアント)
- CSS3 (カスタムスタイル)

## 📁 プロジェクト構造

```
festify/
├── backend/          # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   └── models/
│   ├── config/
│   └── db/
└── frontend/         # React App
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── services/
    │   └── utils/
    └── public/
```

## 🔧 開発

### Backend 開発

```bash
cd backend
rails console           # Rails console
rails db:reset          # Database reset
rails routes            # Routes 確認
```

### Frontend 開発

```bash
cd frontend
npm test                # Tests 実行
npm run build          # Production build
```

### デバッグ

```javascript
// Browser console でテスト
testConnection.runAllTests(); // 接続テスト
```

## 📝 API エンドポイント

### 認証

- `POST /login` - ログイン
- `DELETE /logout` - ログアウト
- `GET /logged_in` - ログイン状態確認

### Festify (開発予定)

- `GET /api/v1/festifies` - 一覧取得
- `POST /api/v1/festifies` - 新規作成
- `GET /api/v1/festifies/:id` - 詳細取得
- `PATCH /api/v1/festifies/:id` - 更新
- `DELETE /api/v1/festifies/:id` - 削除

## 🎨 UI/UX

- 日本語インターフェース
- モダンなグラデーションデザイン
- レスポンシブレイアウト
- ローディング状態表示
- エラーハンドリング

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。
