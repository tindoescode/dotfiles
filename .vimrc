set nocompatible 
set encoding=utf-8
set number relativenumber
syntax enable

" vim hardcodes background color erase even if the terminfo file does
" not contain bce (not to mention that libvte based terminals
" incorrectly contain bce in their terminfo files). This causes
" incorrect background rendering when using a color theme with a
" background color.
let &t_ut=''


if !has('gui_running')
  set t_Co=256
endif

let g:vim_monokai_tasty_italic = 1
let g:lightline = {
      \ 'colorscheme': 'wombat',
      \ }

" With a map leader it's possible to do extra key combinations
" like <leader>w saves the current file
let mapleader = ","

" Smart way to move between windows
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l

" Useful mappings for managing tabs
map <leader>tn :tabnew<cr>
map <leader>to :tabonly<cr>
map <leader>tc :tabclose<cr>
map <leader>tm :tabmove
map <leader>t<leader> :tabnext

" Specify a directory for plugins
" - For Neovim: stdpath('data') . '/plugged'
" - Avoid using standard Vim directory names like 'plugin'
call plug#begin('~/.vim/plugged')

Plug 'VundleVim/Vundle.vim'
Plug 'patstockwell/vim-monokai-tasty'
Plug 'jeffkreeftmeijer/vim-numbertoggle'
Plug 'itchyny/lightline.vim'
Plug 'tpope/vim-fugitive'
Plug 'rstacruz/sparkup', {'rtp': 'vim/'}
Plug 'scrooloose/nerdtree'
Plug 'majutsushi/tagbar'
Plug 'vim-scripts/taglist.vim'
Plug 'wesleyche/SrcExpl'
Plug 'wesleyche/Trinity'
Plug 'scrooloose/syntastic'
Plug 'jiangmiao/auto-pairs'
Plug 'Valloric/YouCompleteMe'
Plug 'nathanaelkane/vim-indent-guides'
Plug 'easymotion/vim-easymotion'
Plug 'flazz/vim-colorschemes'
Plug 'mileszs/ack.vim'

" Initialize plugin system
call plug#end()

colorscheme vim-monokai-tasty

" NERD Tree mappings
map <leader>nn :NERDTreeToggle<cr>
map <leader>nb :NERDTreeFromBookmark 
map <leader>nf :NERDTreeFind<cr>

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Text, tab and indent related
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Use spaces instead of tabs
set expandtab

" Be smart when using tabs ;)
set smarttab

" 1 tab == 4 spaces
set shiftwidth=4
set tabstop=4

" Linebreak on 500 characters
set lbr
set tw=500

set ai "Auto indent
set si "Smart indent
set wrap "Wrap lines
