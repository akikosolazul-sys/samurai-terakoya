@C:\00_data\ClaudeProjects\CLAUDE.md

# sample_quiz プロジェクト固有ルール

## 概要

- 一般常識クイズのサンプルアプリ。
- ビルドツール・フレームワークなしの素のHTML/CSS/JavaScriptのみで構成。

## ファイル構成

- `index.html` … 画面構造（問題カード／結果カード）
- `script.js` … クイズのロジック（`questions` 配列に問題データを保持）
- `style.css` … 見た目のスタイル

## 動作確認

- ビルド・パッケージ管理は不要。`index.html` をブラウザで直接開くか、簡易サーバーで配信して確認する。

## コーディング方針

- 素のHTML/CSS/JavaScriptの構成を維持し、新たにフレームワークやビルドツールを導入しない。
- 問題を追加・修正する場合は `script.js` の `questions` 配列（`question` / `choices` / `answer`）の形式に合わせる。

## GitHubリポジトリ

https://github.com/akikosolazul-sys/samurai-terakoya/tree/main/ClaudeCode/sample_quiz
