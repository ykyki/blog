---
title: "texdoc で使う PDF ビューアーを設定する"
date: "2021-02-02T21:41:19+09:00"
url: "blog/texdoc-default-viewer"
draft: false
categories: ["tech"]
tags: ["TeX"]
keywords:
---

texdoc でマニュアルを読むときに使用する PDF ビューアーをシステムデフォルトのものから別のものに変更する。

## 背景

$\TeX$や$\LaTeX$を使って文書作成をしていたときに、PGF や beamer などパッケージのドキュメントを参照したくなるタイミングが何度かあった。
そうしたときには例えば `texdoc pgf` とコマンドを実行すれば当該のマニュアルを閲覧できるが、このときシステムデフォルトの PDF ビューアーが使用されるようである。
そのため私の手元の Mac ではプレビューアプリで開かれる。
しかし文書編集中の PDF ビューアーとしては普段 Skim を使っており、別々のビューアーが起動するのが煩わしく思えた。
そこでこの不満を解消するために、texdoc コマンドからマニュアルを開くときにも Skim を使用するよう設定できないかと考えた。

## 前提

texdoc のバージョンは `3.2.2` とする.

```
% texdoc -V
Texdoc 3.2.2 (2020-09-16)

Copyright 2008-2020 Manuel Pégourié-Gonnard, Takuto Asakura, the TeX Live Team.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>.
This is free software: you are free to change and redistribute it.
```

## 手順

コマンド `texdoc -h` で表示されるヘルプの内容の中に、次の記述がある:

```sh
Actions:
  -h, --help        Print this help message.
  -V, --version     Print the version number.
  -f, --files       Print the list of configuration files used.
  --just-view FILE  Display FILE, given with full path (no searching).
```

コンフィグファイルがあるようなので、その内容を確認する。

```sh
% texdoc -f
/usr/local/texlive/2020/texmf-dist/scripts/texdoc/texdoclib.tlu 3.2.2
Configuration file(s):
    active      /usr/local/texlive/2020/texmf-dist/texdoc/texdoc.cnf
Recommended file(s) for personal settings:
    /Users/ykyki/Library/texmf/texdoc/texdoc.cnf
```

指定されている場所に `texdoc.cnf` ファイルを新規作成すればよさそうである.

その前に、既にアクティブになっているファイルの内容を確認してみたところ、次のような記述があった:

```
...

 22
 23 # General settings
 24 # ================
 25
 26 ## Viewers
 27
 28 # Defaults depend on what is available on your system, as well as your desktop
 29 # environment. Here are a few examples.
 30 #
 31 # %s is optional and stands for the filename.
 32 #
 33 # viewer_pdf = xpdf             # works
 34 # viewer_pdf = xpdf %s &        # works even better
 35
 36 # If you want to enable support for zipped documentation (see below),
 37 # you may want to adapt viewer_* so that it starts a subshell:
 38 #
 39 # viewer_pdf = (xpdf %s) &
 40 #
 41 # Otherwise, the & will have no effect since the viewing command is followed by

 ...
```

ここで `viewer_pdf` という値を指定すればよさそうである。
そこで実際に `~/Library/texmf/texdoc/texdoc.cnf` ファイルを新規作成した後、次の一行を記入した:

```
viewer_pdf = open -a /Applications/Skim.app %s &
```

私は Skim を使いたかったためこのように設定した。

保存した後に試しに `texdoc pgf` を実行してみたところ、ちゃんと Skim で開かれた。
Skim にはタブ機能があるため、文章編集時に感じていた不満点も解消された。

また、`texdoc -f` を再度実行してみると、新規追加した設定ファイルが読み込まれていることが確認できた。
