@C:\00_data\ClaudeProjects\CLAUDE.md

上記の組織共通ルールを読み込んだ上で、本プロジェクト（sample_task_board）では以下のルールに従うこと。

## Git運用ルール

- コードを変更するたびに、変更内容がわかるコミットメッセージでコミットし、mainブランチにプッシュすること。
- 本フォルダはローカルで独立したGitリポジトリ（リモート名: `origin` = `https://github.com/akikosolazul-sys/samurai-terakoya.git`）だが、
  GitHub上では `samurai-terakoya` リポジトリの `ClaudeCode/sample_task_board` サブフォルダとして管理する。
  そのため、通常の `git push origin main` ではなく、以下のサブツリーマージ手順でプッシュすること。

  ```bash
  git fetch origin main
  git checkout -b subtree-push origin/main
  git read-tree --prefix=ClaudeCode/sample_task_board/ -u main
  git commit -m "<変更内容がわかるメッセージ>"
  git push origin subtree-push:main
  git checkout main
  git branch -D subtree-push
  ```

## 権限ルール

- プロジェクトフォルダ（本ディレクトリ）配下のファイル・フォルダの作成および更新は許可する。
- ファイル・フォルダの削除、およびプロジェクトフォルダ外への操作は許可しない。

## デプロイ先

- 公開URL: https://akikosolazul-sys.github.io/samurai-terakoya/sample_task_board/
- GitHub Pages設定: `samurai-terakoya` リポジトリの Settings → Pages → Source を `gh-pages` ブランチ / `/(root)` に設定。
- デプロイ方法: GitHub Actions（`samurai-terakoya` リポジトリルート直下の `.github/workflows/deploy-sample-task-board.yml`）。
  - `ClaudeCode/sample_task_board/**` 配下の変更が `main` にpushされたときに自動実行（`workflow_dispatch` による手動実行も可能）。
  - `npm ci` → `npm run build` でビルドし、`peaceiris/actions-gh-pages` で `dist/` を `gh-pages` ブランチの `sample_task_board/` フォルダへデプロイ（`keep_files: true` のため他プロジェクトのPages出力は残る）。
  - ワークフローには `permissions: contents: write` が必須（デフォルトのGITHUB_TOKENは読み取り専用のため）。
- `vite.config.js` の `base` は公開URLのパス（`/samurai-terakoya/sample_task_board/`）に合わせて設定済み。変更する場合は両方を揃えること。

## 技術スタック

- ビルドツール: Vite（プラグイン: `@vitejs/plugin-react`）
- UIライブラリ: React 19（関数コンポーネント + Hooks、TypeScriptは未導入）
- 状態管理: `useState` / `useEffect` のみ。外部の状態管理ライブラリは使用しない。
- データ永続化: `localStorage`（サーバー・DBは無し。フロントエンドのみで完結する構成）
- スタイリング: プレーンCSS（`App.css` / `index.css`）。CSS-in-JSやCSSフレームワークは未導入。
- Lint: `oxlint`（`npm run lint`）
- パッケージマネージャ: npm（`package-lock.json` をコミット対象とする）

## コンポーネント命名規約

- コンポーネントファイルは `PascalCase.jsx`（例: `App.jsx`）とし、対応するスタイルは同名の `PascalCase.css` に置く。
- コンポーネント本体は `function ComponentName() { ... }` の関数宣言 + `export default` とする。
- イベントハンドラ・操作系関数は動詞始まりのcamelCase（例: `addTask` / `toggleTask` / `deleteTask`）。
- CSSクラス名はkebab-case（例: `task-board` / `task-form` / `delete-button`）。状態を表す場合はモディファイア用クラスを追加で並べる（例: 完了タスクは `"task done"`）。BEMの `__` / `--` 記法は使用しない。
- ローカルストレージ等のキー定数はSCREAMING_SNAKE_CASE（例: `STORAGE_KEY`）。
- インタラクティブ要素（入力欄・削除ボタンなど）には `aria-label` を付与し、日本語でラベリングする。
