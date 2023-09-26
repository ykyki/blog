---
title: "WSL+TeX Live環境を一から構築する"
date: "2020-04-27T02:38:25+09:00"
url: "blog/install-wsl-and-texlive"
draft: false
categories: ["tech"]
tags: ["TeX", "vscode"]
keywords:
---

個人的な環境構築のログです。

WSL の環境を再構築することにした。これを機に、今まで Windows 上で構築していた TeX 環境も WSL 上に移動することにする。

## 目標

- WSL をインストールするとデフォルトでは C ドライブ配下に置かれてしまうが、これを変更する。今回は D:\wsl\Ubuntu1804 に置く
- tmux の環境も整える。コピペを簡単にできるように
- Vim も最低限のコピペができるように程度には設定する

## 手順

### WSL のインストール

- WSL は一度使っていたので、Windows 側の初期設定は省略
- WSL を Microsoft Store からインストールしてそのまま使っていると、C ドライブ配下に WSL のファイルが溜まっていってしまう。筆者の PC の C ドライブの残量が心許なくなってきたので、これを別の場所に移動したい。そのためには[DDoSolitary/LxRunOffline](https://github.com/DDoSolitary/LxRunOffline)を使う
- このレポジトリの説明にも書かれているように、Chocolatey や Scoop 経由あるいは直接バイナリファイルをダウンロードして lxrunoffline をインストールする
  - 自分は Chocolatey を使うので`choco install lxrunoffline`。PowerShell は管理者権限で立ち上げておく
  - インストールが完了したら PowerShell から`lxrunoffline version`で動作確認。今回は v3.4.1 だった
  - `lxrunoffline`とオプションなし叩けば、サポートされているアクション一覧が見られる
- WSL のディストリビューションとして、今回は Ubuntu-18.04 を使う。これを Microsoft Store からインストールする
- インストールが完了したら起動し、ユーザー名とパスワードを入力したら `exit`
- PowerShell を管理者権限で立ち上げる
- `lxrunoffline list`でインストールされたか確認。Ubuntu-18.04 があるかをチェック
  - アンインストールするときは`lxrunoffline uninstall -n Ubuntu-18.04`
  - `wslconfig /list`で WSL として認識されているかチェックする
  - 必要であれば`wslconfig /setdefault Ubuntu-18.04`でデフォルトのボリュームに設定する。`lxrunoffline set-default -n Ubuntu-18.04`でもよい
- インストールした Ubuntu-18.04 を移動する
  - `lxrunoffline move -n Ubuntu-18.04 -d D:\wsl\Ubuntu1804`
  - もし「WSL が起動中で移動できない」といった旨のエラーが出た場合には、`wsl -t Ubuntu-18.04`で止める
- `lxrunoffline summary -n Ubuntu-18.04`でディレクトリが変更されているか確認
- WSL が起動するかチェックする。デフォルトに設定してあれば`wsl`。そうでなければ`lxrunoffline run -n Ubuntu-18.04`
- 確認できたら`exit`。PowerShell も終了させる

### WSL の初期設定

- WSL を起動する。Powershell から立ち上げるもよし。自分は Windows Terminal を使っている
- `sudo sed -i -e 's%http://.*.ubuntu.com%http://ftp.jaist.ac.jp/pub/Linux%g' /etc/apt/sources.list`
- `sudo apt update`
- `sudo apt upgrade`
- `sudo apt install language-pack-ja`
- `sudo dpkg-reconfigure tzdata`
  - タイムゾーンを Asia->Tokyo に設定
  - `date`で確認できる
- chmod や環境変数の設定

  - `echo $PATH`すると、Windows の環境変数まで引き継いでしまっていることが分かる。パスにスペースを含んでいたりして不具合の元になるので、これを修正したい
  - `sudo vim /etc/wsl.conf`
  - 次を記入して終了

    ```
    [automount]
    options = "metadata"

    [interop]
    appendWindowsPath = false
    ```

- 保存したら`exit`
- 環境変数の設定の変更を反映させるために、PowerShell から`wsl -t Ubuntu-18.04`で確実に終了させる
- その後 WSL に再ログイン。`echo $PATH`で変わっているかチェック

### tmux のインストール

- 画面分割したり、画面上の文字列をコピーしたりしたいので、tmux を使う
- `sudo apt install git automake bison build-essential pkg-config libevent-dev libncurses5-dev`
- 作業用ファイルを作って移動
  - `mkdir ~/temp`
  - `cd ~/temp`
- `git clone -b 3.1 https://github.com/tmux/tmux`
- `cd tmux`
- `sh autogen.sh`
- `./configure && make`
- `sudo make install`
- `tmux -V`で確認。今回は 3.1 をインストールした
- インストールに使ったファイルを削除
  - `cd ../`
  - `rm -rf ./tmux`
- tmux の設定

  - `vim ~/.tmux.conf`。次のように記述して保存（普段自分が使っている設定）

    ```sh
    set-option -g default-shell /bin/bash

    # tmuxを256色表示できるようにする
    set-option -g default-terminal screen-256color
    set -g terminal-overrides 'xterm:colors=256'

    # キーストロークのディレイを減らす
    set -sg escape-time 1

    # ウィンドウのインデックスを1から始める
    set -g base-index 1
    # ペインのインデックスを1から始める
    setw -g pane-base-index 1

    # 設定ファイルをリロードする
    bind r source-file ~/.tmux.conf \; display "Reloaded!"

    # prefixキーをC-qに変更
    set -g prefix C-w
    unbind C-b

    # ステータスバーをトップに配置する
    set-option -g status-position top

    # 左右のステータスバーの長さを決定する
    set-option -g status-left-length 90
    set-option -g status-right-length 90

    # #P => ペイン番号
    # 最左に表示
    set-option -g status-left '#H:[#P]'

    # Wi-Fi、バッテリー残量、現在時刻
    # 最右に表示
    set-option -g status-right '#(wifi) #(battery --tmux) [%Y-%m-%d(%a) %H:%M]'

    # ステータスバーを1秒毎に描画し直す
    set-option -g status-interval 1

    # センタライズ（主にウィンドウ番号など）
    set-option -g status-justify centre

    # vimのキーバインドでペインを移動する
    bind h select-pane -L
    bind j select-pane -D
    bind k select-pane -U
    bind l select-pane -R

    # vimのキーバインドでペインをリサイズする
    bind -r H resize-pane -L 5
    bind -r J resize-pane -D 5
    bind -r K resize-pane -U 5
    bind -r L resize-pane -R 5

    # \ でペインを縦分割する
    bind \\ split-window -h
    # - でペインを縦分割する
    bind - split-window -v

    # マウス操作を有効にする
    set-option -g mouse on
    # bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'copy-mode -e'"

    # コピーモードを設定する
    # コピーモードでvimキーバインドを使う
    setw -g mode-keys vi
    bind -T copy-mode-vi v send -X begin-selection
    bind -T copy-mode-vi V send -X select-line
    bind -T copy-mode-vi C-v send -X rectangle-toggle
    bind -T copy-mode-vi y send-keys -X copy-pipe-and-cancel 'xsel -bi'
    bind -T copy-mode-vi Y send-keys -X copy-pipe 'xsel -bi'

    # ペインボーダーの色を設定する
    set -g pane-border-style fg="green"
    set -g pane-border-style bg="black"
    # アクティブなペインを目立たせる
    set -g pane-active-border-style fg="white"
    set -g pane-active-border-style bg="yellow"
    ```

  - クリップボードへのコピーをできるようにしていく。ついでに GUI を使うための設定をする
  - `sudo apt install xsel`
  - GUI のために X410 を使う。無料の VcXsrv でも大体同じ動作が再現できるはず
    - X410 を Windows 側で立ち上げておく。自分は自動起動の設定をしている
    - X410 の設定をしていく
    - `echo '[ -z $DISPLAY ] && export DISPLAY=127.0.0.1:0.0' >> ~/.bashrc`
    - `source ~/.bashrc`
    - `echo $DISPLAY`で確認
    - `sudo apt install dbus-x11`
    - `sudo dbus-uuidgen --ensure`
    - `dbus-launch --exit-with-x11`
  - xeyes を使って、動作チェック
    - `sudo apt install x11-apps`
    - `xeyes`を起動して目を回せれば成功
  - ここまでできれば、tmux でもコピーができるようになっている
    - もしできなければ X410 や WSL を再起動してみる

### フォントの設定

- GUI で日本語が文字化けしてしまう。そこで Windows からフォントを持ってくる
  - GUI の表示テストとして自分は lxterminal を使った。これは次のようにしてインストール
    - `sudo apt install lxterminal`
  - `lxterminal &`で起動すると、ターミナルが開かれる。適当にディレクトリを移動してみて、日本語を含むファイル名がある場所などを覗いてみる。すると文字化けしている
- `sudo apt install fontconfig`
- `sudo ln -s /mnt/c/Windows/Fonts /usr/share/fonts/windows`
- `sudo fc-cache -fv`
- この後、lxterminal で表示チェック

### vim の設定

- 今回は取り敢えずクリップボードへのコピーができる程度に
- `sudo apt install vim-gtk`
- `vim ~/.vimrc`で次を入力して保存（これも普段の自分が使っている設定）

  ```vim
  " setting
  "文字コードをUFT-8に設定
  set fenc=utf-8
  " 入力中のコマンドをステータスに表示する
  set showcmd
  " バックアップファイルを作らない
  set nobackup
  " スワップファイルを作らない
  set noswapfile
  " 編集中のファイルが変更されたら自動で読み直す
  set autoread
  " バッファが編集中でもその他のファイルを開けるように
  set hidden
  " ヤンクしたときに自動的にクリップボードに送る
  if has('nvim')
      " xclipをインストールしているとする
      set clipboard+=unnamedplus
  else
      " vim-gtkでvimをインストールしているとする(xselも必要?)
      set clipboard=unnamedplus
  endif

  " 見た目系
  " 行番号を表示
  set number
  " 現在の行を強調表示
  " set cursorline
  " インデントはスマートインデント
  set smartindent
  " ビープ音を可視化
  set visualbell
  " 括弧入力時の対応する括弧を表示
  set showmatch
  " ステータスラインを常に表示
  set laststatus=2
  " 不可視文字を可視化
  set list listchars=tab:+-

  " 操作系
  " コマンドラインの補完
  set wildmode=list:longest
  " 行末の1文字先までカーソルを移動できるように
  set virtualedit=onemore
  " 折り返し時に表示行単位での移動できるようにする
  nnoremap j gj
  nnoremap k gk
  " ESC連打でハイライト解除
  nmap <Esc><Esc> :nohlsearch<CR><Esc>

  inoremap <silent> jj <ESC>

  " Tab系
  set tabstop=4
  set shiftwidth=0
  set softtabstop=4
  set smarttab

  " 検索系
  " 検索文字列が小文字の場合は大文字小文字を区別なく検索する set ignorecase
  " 検索文字列に大文字が含まれている場合は区別して検索する
  set smartcase
  " 検索文字列入力時に順次対象文字列にヒットさせる
  set incsearch
  " 検索時に最後まで行ったら最初に戻る
  set wrapscan
  " 検索語をハイライト表示
  set hlsearch

  " シンタックスハイライトの有効化
  syntax enable
  ```

- これで Vim でヤンクしたときにクリップボードへコピーされる

### TeX 環境構築

- 殆ど次のページの通りに進める。解説はそちらを参照
  - [TeX Live を使おう ── 主に Linux ユーザのために ──](http://www.fugenji.org/~thomas/texlive-guide/)
- sudo の設定
  - `vim ~/.bashrc`して次を追記: `alias sudo='sudo env PATH=$PATH'`
  - `source ~/.bashrc`
  - `alias`で追加されているか確認
- `cd ~/temp`
- `wget http://mirror.ctan.org/systems/texlive/tlnet/install-tl-unx.tar.gz`
- `tar -zxvf install-tl-unx.tar.gz`
- `cd install-tl-20200426/`
  - ディレクトリの名前は適宜合わせる
- `sudo ./install-tl`
  - 画面が表示されたら, `I`と一文字入力してインストールを始める
  - 1 時間ぐらいかかった
- `whereis texlive`で`texlive: /usr/local/texlive`と確認
- 不要になったファイルを削除する
  - `cd ~/temp`
  - `rm install-tl-unx.tar.gz`
  - `rm -rf install-tl-20200426/`
- パスを設定する
  - `vim ~/.profile`で次を追記
    ```sh
        PATH="/usr/local/texlive/2020/bin/x86_64-linux:$PATH"
        MANPATH="/usr/local/texlive/2020/texmf/doc/man:$MANPATH"
    ```
  - `source ~/.profile`
  - `echo $PATH`で変更確認
- texlive-dummy の設定
  - `sudo apt install equivs`
  - `wget http://www.tug.org/texlive/files/debian-equivs-2020-ex.txt`
  - 手順に沿って`equivs-build`をしたいが、`fakeroot`まわりで実行が失敗する。次を実行して対処
    - `sudo update-alternatives --set fakeroot /usr/bin/fakeroot-tcp`
  - `equivs-build debian-equivs-2020-ex.txt`
  - 前行で生成された.deb ファイルをインストールしようとするとパッケージ不足のエラーが出たので、追加しておく
    - `sudo apt install freeglut3`
  - `sudo dpkg -i texlive-local_2020-1_all.deb`
  - これでダミーの設定は終わり。不要になったファイルを削除しておく
    - `rm debian-equivs-2020-ex.txt`
    - `rm texlive-local_2020-1_all.deb`
- ガイドに沿ってファイルの確認をしてみる
  - `sudo updatedb`
  - `locate beamer | grep texmf | less`
- tlmgr のアップデート
  - `sudo tlmgr option repository http://mirror.ctan.org/systems/texlive/tlnet`
  - `sudo tlmgr update --self`
  - `sudo tlmgr update --list`で確認
  - もしこのとき 'skipping forcibly removed package <package_name>' といったエラーが表示されていたとする. このときビルドが上手くいかないことがある。次のように対処
    - `sudo tlmgr update --reinstall-forcibly-removed --all`
    - 再び確認してエラーがなくなっていることを確認する
- フォントの設定は後回しにして、.tex ファイルから PDF ファイルが生成できるのかテストしてみる

  - PDF ビューアーとして zathura を使ってみる。そのためにインストール
    - `sudo apt install zathura`
  - 適当にテスト用ファイルを作る

    - `cd ~/temp`
    - `vim test.tex`して次を記入

      ```tex
      \documentclass[uplatex]{jsarticle}

      \begin{document}
          テスト用のファイルです.
          \begin{enumerate}
              \item $f \colon X \to Y$,
              \item $f (x) = \sin (x^2 + 1)$.
          \end{enumerate}
      \end{document}
      ```

- `uplatex test.tex`
- `dvipdfmx test.dvi`
- `zathura test.pdf`
  - zathura は Vim のキーバインドで操作ができる。j で下方スクロール、k で上方スクロール、q で終了など
- これにて最小限のセッティングは完了！
- vscode で作業したときには、Remote WSL から今回のディストリビューションに接続し、LaTeX Workshop をリモートインストールするなりして、ビルドする

## 参考

- [(a)WSL を C ドライブ以外の場所に置き，(b)home も別の場所に置いて，(c)chmod も使えるようにする方法．(自分用メモ) | 萌えとかプログラミングとか](https://differentialengine.wordpress.com/2018/10/21/wsl%E5%B0%8E%E5%85%A5%EF%BC%88%E8%87%AA%E5%88%86%E7%94%A8%E3%83%A1%E3%83%A2%EF%BC%89/)
- [WSL で Windows の PATH を引き継がないようにする方法 - Qiita](https://qiita.com/raccy/items/456a7158f588670c0850)
- [Ubuntu や CentOS に最新の tmux を導入する - Qiita](https://qiita.com/ha4gu/items/aebe9207904f52ee4fb6)
- [tmux/tmux: tmux source code](https://github.com/tmux/tmux)
- [Setting up Ubuntu (WSL) for Linux GUI Apps - X410.dev](https://x410.dev/cookbook/wsl/setting-up-wsl-for-linux-gui-apps/)
- [Automatically Start X410 on Login - X410.dev](https://x410.dev/cookbook/automatically-start-x410-on-login/)
- [fcitx で作る WSL 日本語開発環境 - Qiita](https://qiita.com/dozo/items/97ac6c80f4cd13b84558)
- [TeX Live を使おう ── 主に Linux ユーザのために ──](http://www.fugenji.org/~thomas/texlive-guide/)
- [texlive-dummy - TeX Wiki](https://texwiki.texjp.org/?texlive-dummy)
- [WSL で fakeroot - Qiita](https://qiita.com/ignorant/items/b10b3d172b81c482193f)
