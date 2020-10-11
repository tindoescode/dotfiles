/* Kumquat Hub History Router
 * 
 **/

(function (undefined) {

    pl.extend(ke.app, {
        import: [
            'ext.const.lang',
            'ext.util.langUtil',
            'ext.const.selectors',
            'ext.const.storage',
            'ext.util.selectorsUtil',
            'ext.util.storageUtil',

            'ext.dom',
            'ext.event',
            'ext.tpl',
            'ext.googleApi',
            'ext.time',
            'ext.string',
            'ext.errorManager',
            'ext.cache',
            'ext.arr',
            'ext.orphography',
            'ext.file',

            'bg_events.audio',

            'ui_components.tooltip.help',

            'lib.qrcode',

            'templates.wordlistItem',
            'templates.phraseItem',
            'templates.historyEmptyCap',
            'templates.deleteSelectedButton',

            'particles.listen.lModel',
            'particles.scrollbars.sModel',
            'particles.upgrade_tooltip.upgradeTtModel',
            'particles.sett_trans_combo.stcView',
            'particles.lang_selectors.lsView',
            'particles.sync.syncUiModel',
            'particles.3dots_button.3dotsModel',

            'ui_components.tooltip.modal',
            'ui_components.dropdown.dropdown',
            'ui_components.pro_alert',
            'ui_components.loading',
            'ui_components.login',
            'ui_components.notifications',

            'ui_views.i18n',
            'ui_views.multi_variant'
        ],

        $wordlists: $('.wordlists'),
        $phrases: $('.phrases'),
        $add_phrase_layout: $('.add-phrase-layout'),
        $add_phrase_input: $('.add-phrase-input'),
        $quit_wordlist_button: $('.quit-wordlist'),
        $add_wordlist_button: $('.add-wordlist'),
        $page_name: $('.screen-name'),
        $new_wordlist_name: $('.new-wordlist-name'),
        $ec_wrap: $('.ec-wrap'),
        $wl_from_img: $('.wl-from-lang-img'),
        $wl_to_img: $('.wl-to-lang-img'),
        $add_phrase_loading: $('.add-phrase-loading'),
        $add_phrase_button: $('.add-phrase-button'),

        temp: {
            wl_amount: 0,
            phrases_amount: 0,

            current_wordlist_id: 0,
            current_wordlist_from_lang: '',
            current_wordlist_to_lang: '',

            word_pending_adding: '',

            new_wordlist_from_lang: '',
            new_wordlist_to_lang: '',

            window_height: 0,

            all_items: [],
            expanded: [],
            item_ids: [],
            selected: [],

            shared_list_id: ''
        },

        callbacksInitialization: {},

        VM_WORDLISTS: 1,
        VM_WORDLIST: 2,
        VM_ITEM: 3,

        view_mode: ke.app.VM_WORDLISTS,

        flags: {
            is_searching: false,
            quick_access_shown: false,
            delete_mode: false,
            all_loaded_cap_exists: false,
            isPlayingTrans: false,
            isPlayingOriginal: false,
            isTickerWrapActive: true,
            isMouseDown: false,
            isShiftDown: false,
            error: false
        },

        tts_link: (function () {
            const isHttps = window.location.protocol === 'https:';
            return (isHttps ? 'https' : 'http') + '://translate.google.com/translate_tts?ie=UTF-8&q={{text}}&tl={{lang}}&total={{textparts}}&idx=0&textlen={{textlen}}&client=dict-chrome-ex&prev=input&ttsspeed={{dictation_speed}}';
        })(),
        translation_link: '',

        getCountry: function () {
            return 'com';
        },

        init: function () {
            if (!ke.supportsOnlineAnalytics) {
                ke.import('lib.ga', ke.initAnalytics);
            } else {
                ke.loadExternalScript(ke.analyticsScriptLink, ke.initAnalytics);
            }

            ke.ui_views.i18n.init();
            document.title = ke.getLocale('Kernel_PhrasebookTitle');

            ke.ext.event.listen(ke.EF, ke.EF, ke.EF);

            $(window).on('hashchange', ke.app.handlers.onHashChange);

            ke.app.$add_wordlist_button.on('click', ke.app.handlers.onWordlistAdd);
            ke.app.$quit_wordlist_button.on('click', ke.app.handlers.onWordlistQuit);
            $('.add-wordlist-button').on('click', ke.app.handlers.addWordlist);
            $('.export-button').on('click', ke.app.handlers.downloadWordlistAsCSV);
            $('.learn-button').on('click', ke.app.handlers.learnWordlist);

            ke.ext.util.storageUtil.requestBackgroundOption('isTrueOption', ['sync'], function (sync) {
                if (sync) {
                    $('.sync-button').on('click', ke.app.handlers.sync);

                    if (ke.canSync) {
                        ke.app.handlers.sync();
                    }
                } else {
                    $('.sync-button').hide();
                }
            });

            ke.ext.util.storageUtil.requestBackgroundOption('isTrueOption', ['dark_mode'], function (dark_mode) {
                if (dark_mode) {
                    $('body').addClass('dark-mode');
                }
            });

            $('.clear-input-tick').on('click', ke.app.handlers.clearSearch);
            $('.search').on('click', ke.app.handlers.toggleSearchMode);
            $('.search-cancel').on('click', ke.app.handlers.toggleSearchMode);
            $('.search-input').on('keyup', ke.app.handlers.search);

            $('.add-phrase-input').on('keyup', ke.app.handlers.onEnterAddPhrase);
            ke.app.$add_phrase_button.on('click', ke.app.handlers.addPhrase);
            $('.lang-swap').on('click', ke.app.handlers.onWordlistAddLangSwap);

            $('.wordlist-cancel-button').on('click', ke.app.handlers.onWordlistAddClose);
            $('.not-now-button').on('click', ke.app.handlers.onUpgradeClose);
            $('.popup-layout').on('click', ke.app.handlers.onWordlistAddOuterClose);
            $('.learn').on('click', ke.app.handlers.learnWordlist);

            $('.show-android-form').on('click', ke.app.handlers.showAndroidForm);
            $('.show-chrome-form').on('click', ke.app.handlers.showChromeForm);

            ke.app.handlers.onHashChange();

            if (document.location.hash.indexOf('wl_create') > -1 && !ke.app.flags.error) {
                ke.app.temp.word_pending_adding = ke.ext.string.getParamFromQueryString('word', document.location.hash);
                ke.app.temp.new_wordlist_from_lang = ke.ext.string.getParamFromQueryString('from', document.location.hash);
                ke.app.temp.new_wordlist_to_lang = ke.ext.string.getParamFromQueryString('to', document.location.hash);
                ke.app.handlers.onWordlistAdd(null);
            } else {
                ke.app.temp.new_wordlist_from_lang = ke.ext.util.langUtil.getFromLang() === 'auto'
                    ? 'en'
                    : ke.ext.util.langUtil.getFromLang();
                ke.app.temp.new_wordlist_to_lang = ke.ext.util.langUtil.getToLang();
            }

            ke.app.initDropdown();
        },

        initDropdown: function () {
            ke.ui.dropdown.init(
                ke.app.handlers.onWordlistAddLangDropdownChange,
                [ke.app.handlers.onWordlistAddLangDropdownOpen, ke.EF],
                ke.app.render.organize.fillAddLangDropdown,
                undefined,
                function () {
                }
            );
        }
    });

})();