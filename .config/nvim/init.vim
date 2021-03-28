set nocompatible
set encoding=utf-8
set number relativenumber
syntax enable

" vim hardcodes background color erase even if the terminfo file does
" not contain bce (not to mention that libvte based terminals
" incorrectly contain bce in their terminfo files). This causes
" incorrect background rendering when using a color theme with a
" background color.
" let &t_ut=''

"let g:colorizer_auto_color = 1
"let g:colorizer_syntax = 1
"let g:colorizer_auto_map = 1



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
Plug 'ryanoasis/vim-devicons'
Plug 'mattn/emmet-vim'
Plug 'thaerkh/vim-workspace'
Plug 'Yggdroot/indentLine'
Plug 'junegunn/fzf', { 'do': './install --bin' }
Plug 'junegunn/fzf.vim'
Plug '907th/vim-auto-save'
Plug 'christoomey/vim-tmux-navigator'

Plug 'scrooloose/nerdcommenter'
Plug 'jeffkreeftmeijer/vim-numbertoggle'
Plug 'itchyny/lightline.vim'
"Plug 'tpope/vim-fugitive'
Plug 'scrooloose/nerdtree'
Plug 'majutsushi/tagbar'
Plug 'jiangmiao/auto-pairs'
"Plug 'Valloric/YouCompleteMe'
Plug 'nathanaelkane/vim-indent-guides'
Plug 'easymotion/vim-easymotion'
"Plug 'rakr/vim-one'
"Plug 'whatyouhide/vim-gotham'
Plug 'bignimbus/pop-punk.vim'
Plug 'chrisbra/colorizer'

Plug 'leafgarland/typescript-vim'
Plug 'peitalin/vim-jsx-typescript'

Plug 'mlaursen/vim-react-snippets'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'iamcco/coc-tailwindcss',  {'do': 'yarn install --frozen-lockfile && yarn run build'}

Plug 'tpope/vim-surround'

Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh',
    \ }
"
" Initialize plugin system
call plug#end()

colorscheme pop-punk

let g:terminal_ansi_colors = pop_punk#AnsiColors()
" just for fun
let g:airline_section_c = '🎸 %F'
" for lightline theme - this needs underscore too

let g:lightline = {
      \ 'colorscheme': 'pop_punk',
      \ }


"
" NERD Tree mappings
map <leader>nn :NERDTreeToggle<cr>
map <F2> :NERDTreeToggle<cr>
map <leader>nb :NERDTreeFromBookmark 
map <leader>nf :NERDTreeFind<cr>

" Setting for AutoPairs
"let g:AutoPairsFlyMode = 0

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Text, tab and indent related
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Use tabs instead of spaces
set noexpandtab
set copyindent
set preserveindent
set softtabstop=0

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

" Extend the command line completion
set wildmenu
" Wildmenu mode
set wildmode=longest,full

" Ignore compiled files
set wildignore&
set wildignore=.git,.hg,.svn
set wildignore+=*.jpg,*.jpeg,*.bmp,*.gif,*.png
set wildignore+=*.o,*.obj,*.exe,*.dll,*.manifest,*.so,*.out,*.class
set wildignore+=*.swp,*.swo,*.swn
set wildignore+=*.DS_Store

" Auto workspace config
let g:workspace_create_new_tabs = 0  " enabled = 1 (default), disabled = 0
nnoremap <leader>s :ToggleWorkspace<CR>
let g:workspace_session_name = 'session.vim'
let g:workspace_session_directory = $HOME . '/.config/nvim/sessions/'
let g:workspace_autosave_always = 0

" .vimrc
let g:auto_save = 1  " enable AutoSave on Vim startup

set shell=/bin/zsh

autocmd FileType javascript setlocal ts=2 sts=2 sw=2
autocmd FileType typescript setlocal ts=2 sts=2 sw=2
autocmd FileType typescriptreact setlocal ts=2 sts=2 sw=2

let g:tmux_navigator_no_mappings = 1
nnoremap <silent> <C-w>h :TmuxNavigateLeft<cr>
nnoremap <silent> <C-w>j :TmuxNavigateDown<cr>
nnoremap <silent> <C-w>k :TmuxNavigateUp<cr>
nnoremap <silent> <C-w>l :TmuxNavigateRight<cr>
nnoremap <silent> <C-w>\ :TmuxNavigatePrevious<cr>

"highlight Comment ctermfg=lightblue
"highlight PmenuSbar ctermfg=17 ctermbg=3 guifg=#ffffff guibg=#000000
"highlight PmenuThumb ctermfg=17 ctermbg=3 guifg=#ffffff guibg=#000000
highlight Pmenu ctermfg=228 guifg=#ffff87

"hi x016_Grey0 ctermfg=16 guifg=#000000 "rgb=0,0,0

map + <C-W>+
map - <C-W>-

" Mapping selecting mappings
nmap <leader><tab> <plug>(fzf-maps-n)
xmap <leader><tab> <plug>(fzf-maps-x)
omap <leader><tab> <plug>(fzf-maps-o)

" Insert mode completion
imap <c-x><c-k> <plug>(fzf-complete-word)
imap <c-x><c-f> <plug>(fzf-complete-path)
imap <c-x><c-l> <plug>(fzf-complete-line)

nmap <leader>r :Rg<cr>

let g:colorizer_auto_color = 1
"let g:colorizer_auto_filetype='css,html,typescriptreact,typescript,react,config'
