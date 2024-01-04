---
title: "LaTeX Workshop で subflies まわりの挙動に変更があったので対応する"
slug: "adapt-to-latex-workshop-subfiles"
createdAt: "2020-02-18T00:00:00+09:00"
updatedAt: "2020-02-18T00:00:00+09:00"
categories: ["tech"]
tags: ["TeX", "vscode"]
keywords:
---

vscode で TeX ファイルを編集するときに LaTeX Workshop というエクステンションを普段利用していました. この拡張機能の中で, subflies という TeX パッケージを含んだファイルをビルドするときの挙動が最近変更されていたようで, 初見でちょっと戸惑いました.

今までのような動作を復元するために設定調整をしたので, 備忘録としてその方法を残しておきます.

## 変更された機能について

例えば `\documentclass[../main.tex]{subfiles}` のような宣言を含んだサブファイルをビルドしようとすると, 'Subfiles package detected. Which file to build?' という文とともに 'Default root file' または 'Subfiles package root file' という選択肢が表示されます. 少し前まではこのような選択肢はありませんでした.

LaTeX-Workshop の [変更ログ](https://github.com/James-Yu/LaTeX-Workshop/blob/a693907aff0736f95eb7c7e792f9d54e50d84e9d/CHANGELOG.md) を見ると, 2020 年 02 月 12 日付 8.7.2 の変更
のときにこのオプションが追加されたようです.

この選択肢は `latex-workshop.latex.rootFile.doNotPrompt` の値を変更することで表示の有無を切り替えることができます (詳細は [Wiki](https://github.com/James-Yu/LaTeX-Workshop/wiki/Multi-File-Projects#latex-workshoplatexrootfiledonotprompt) の説明を参照).

上の方法だけで解決できればよかったのですが, 自分の環境だとこれだけでは足りませんでした.

というのも, サブファイルをビルドしたときに生成されるファイル (.aux や .pdf など) が ルートファイル (上の宣言では `main.tex`) があるディレクトリに出力されしまいました. サブファイルをビルドするときにはサブファイルがあるディレクトリに出力する, というのが今までの動作でしたが, これが変更されていたようです.

この変更については同じく [Wiki](https://github.com/James-Yu/LaTeX-Workshop/wiki/Multi-File-Projects#the-root-file) に説明があります. そこに書かれているように `$do_cd = 1;` という設定を追加することで, 今まで通りの動作が復元できました.

## 解決方法

選択肢の有無を切り替えるには, 次の設定を vscode の設定 (setting.json など) に追記する:

```json
"latex-workshop.latex.rootFile.doNotPrompt": true,
```

サブファイルのあるディレクトリにファイル出力するためには, 同じく vscode の設定に次のような感じで `$do_cd = 1;` の設定を追記する:

```json
{
    "name": "latexmk",
    "command": "latexmk",
    "args": [
        "-e",
        "$latex=q/uplatex %O -kanji=utf8 -no-guess-input-enc -synctex=1 -interaction=nonstopmode -file-line-error %S/",
        "-e",
        "$dvipdf=q/dvipdfmx -g 1.5pt %O -o %D %S/",
        "-e",
        "$do_cd=1",
        "-norc",
        "-gg",
        "-pdfdvi",
        "%DOC%"
    ]
},
```
