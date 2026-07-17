@C:\00_data\ClaudeProjects\CLAUDE.md

上記の組織共通ルールを読み込んだ上で、本プロジェクト（sample_supabase）では以下のルールに従うこと。

## Git運用ルール

- コードを変更するたびに、変更内容がわかるコミットメッセージでコミットし、mainブランチにプッシュすること。
- 本フォルダはローカルで独立したGitリポジトリ（リモート名: `origin` = `https://github.com/akikosolazul-sys/samurai-terakoya.git`）だが、
  GitHub上では `samurai-terakoya` リポジトリの `ClaudeCode/sample_supabase` サブフォルダとして管理する。
  そのため、通常の `git push origin main` ではなく、以下のサブツリーマージ手順でプッシュすること。

  ```bash
  git fetch origin main
  git checkout -b subtree-push origin/main
  git read-tree --prefix=ClaudeCode/sample_supabase/ -u main
  git commit -m "<変更内容がわかるメッセージ>"
  git push origin subtree-push:main
  git checkout main
  git branch -D subtree-push
  ```

## 権限ルール

- プロジェクトフォルダ（本ディレクトリ）配下のファイル・フォルダの作成および更新は許可する。
- ファイル・フォルダの削除、およびプロジェクトフォルダ外への操作は許可しない。
