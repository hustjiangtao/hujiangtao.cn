---
title: Vim配置
date: 2018-05-02
description: Vim配置
---

# Vim配置

## 目录

[[toc]]

## 安装 Vim 包管理工具 Vundle

Vim 的 Vundle 之于相当于 Python 的 pip

```bash
$ git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

## 配置

- 创建 Vim 配置文件

    ```bash
    $ touch ~/.vimrc
    $ vim ~/.vimrc
    ```

    添加如下内容：

    ```bash
    set nocompatible              " required
    filetype off                  " required

    colo desert
    set guifont=Menlo\ Regular\ for\ Powerline:h14
    execute pathogen#infect('pathogen/{}')
    set nobackup
    set noswapfile
    "set directory=~/.vim/swap/
    set guitablabel=%t

    " set the runtime path to include Vundle and initialize
    set rtp+=~/.vim/bundle/Vundle.vim
    call vundle#begin()

    " alternatively, pass a path where Vundle should install plugins
    "call vundle#begin('~/some/path/here')

    " let Vundle manage Vundle, required
    Plugin 'gmarik/Vundle.vim'

    Plugin 'vim-scripts/indentpython.vim'

    Plugin 'jnurmine/Zenburn'

    " supporting super-search using ctrl + p
    Plugin 'kien/ctrlp.vim'

    " Add all your plugins here (note older versions of Vundle used Bundle instead of Plugin)


    " All of your Plugins must be added before the following line
    call vundle#end()            " required
    filetype plugin indent on    " required

    " setting for normal user
    set wildmenu  " vim自身命令行模式智能补全
    set ruler
    set cursorline  " 高亮当前行

    " supporting for utf-8
    set encoding=utf-8

    " enalbe num_line
    set nu

    " clipbord from none-vim
    set clipboard=unnamed

    set splitbelow
    set splitright

    " supporting for python pep8
    au BufNewFile,BufRead *.py
      \ set tabstop=4
      \ set softtabstop=4
      \ set shiftwidth=4
      \ set textwidth=79
      \ set expandtab
      \ set autoindent
      \ set fileformat=unix
    au BufNewFile,BufRead *.js,*.html,*.css
      \ set tabstop=2
      \ set softtabstop=2
      \ set shiftwidth=2

    let python_highlight_all=1
    syntax on

    ```

## Reference

- [Vim与Python真乃天作之合](http://codingpy.com/article/vim-and-python-match-in-heaven/)
- [Vim配置（python版）](https://www.cnblogs.com/cjy15639731813/p/5886158.html)
