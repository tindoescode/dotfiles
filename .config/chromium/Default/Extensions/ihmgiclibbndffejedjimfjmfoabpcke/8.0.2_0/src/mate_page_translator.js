/*
 * Mate For Safari App v7.0.0
 * March 2019
 * Twopeople Software (c)
 */

//
// Constants
//

const TO = 'de'; // replace with {{to}} in production
const TO_NAME = 'German'; // replace with {{to_name}} in production (localized)
const TOOLTIP_PREFIX = "TnITTtw-";
const LOCALES = {
    en: {
        'FullPageTranslatedTo': 'Translated to',
        'FullPageShowOriginal': 'Show original',
        'FullPageTranslate': 'Translate'
    }
};
const CURRENT_LOCALE = window.navigator.language
    .split('-').shift()
    .split('_').shift();
const fullpage_bar = '\
        <div class="' + TOOLTIP_PREFIX + 'fullpage-bar">\
            <div class="' + TOOLTIP_PREFIX + 'mate-logo"></div>\
            <div class="' + TOOLTIP_PREFIX + 'fullpage-trans-layout">\
                <div class="' + TOOLTIP_PREFIX + 'label">' + getLocale('FullPageTranslatedTo') + ':</div>\
                <div class="' + TOOLTIP_PREFIX + 'lang-name">' + TO_NAME + '</div>\
                <div class="' + TOOLTIP_PREFIX + 'trans-orig-toggle-button show-orig">' + getLocale('FullPageShowOriginal') + '</div>\
            </div>\
            <div class="' + TOOLTIP_PREFIX + 'close-bar"></div>\
        </div>\
    ';

function getLocale(key) {
    return (LOCALES[CURRENT_LOCALE] || LOCALES["en"])[key] || "";
}

$(function () {
    loadGoogleWidget();
});

window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source != window) {
        return;
    }

    if (event.data.action && event.data.action === 'goog-loaded') {
        googleWidgetLoaded();
    }
});

function parseHtml(h) {
    return h.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
}

function compileString(str, data) {
    data = data || {};
    str = parseHtml(str);

    for (var key in data) {
        str = str
            .replace(new RegExp("<%=" + key + "%>", 'g'), data[key])
            .replace(new RegExp("<%= " + key + " %>", 'g'), data[key]);
    }

    return str;
}

function loadGoogleWidget() {
    removeGoogleWidget();

    var body = document.querySelector('body');
    var uid = Math.floor(Math.random() * 1e16);

    var sk_tr = document.createElement('script');
    sk_tr.type = 'text/javascript';
    sk_tr.className = 'skiptranslate';
    sk_tr.textContent =
        ['function googleTrButton' + uid + '() {',
            '  var el = new google.translate.TranslateElement({',
            '    pageLanguage: "auto",',
            '    includedLanguages: "' + TO + '",',
            '    layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,',
            '    autoDisplay: false,',
            '    multilanguagePage: true,',
            '    floatPosition: 0',
            '  });',
            '  el.showBanner(false);',
            '  var data = {action: "goog-loaded", lang: "' + TO + '"};',
            '  window.postMessage(data, "*");',
            '}'
        ].join('\n');

    body.appendChild(sk_tr);

    if (window.location.host.indexOf("ebay.") != -1) {
        body.style.overflow = "visible";
    }

    var translateElementScript = document.createElement('script');
    translateElementScript.type = 'text/javascript';
    translateElementScript.src = '//translate.google.com/translate_a/element.js?cb=googleTrButton' + uid + '&hl=en';

    body.appendChild(translateElementScript);
}

function googleWidgetLoaded() {
    var i = setInterval(function () {
        if ($('.goog-te-banner-frame').length > 0) {
            clearInterval(i);

            $('.goog-te-banner-frame').hide();
            $('.goog-te-banner-frame').before(compileString(fullpage_bar, {
                lang_name: TO
            }));

            var j = setInterval(function () {
                var iframe_doc = fullPageActions.getIFrameDocument();

                if (iframe_doc
                    && iframe_doc.getElementById(":0.confirm")
                    && $('.' + TOOLTIP_PREFIX + 'trans-orig-toggle-button').length > 0) {
                    clearInterval(j);

                    setTimeout(function () {
                        $('.' + TOOLTIP_PREFIX + 'trans-orig-toggle-button').on('click', fullPageActions.toggle);
                        $('.' + TOOLTIP_PREFIX + 'close-bar').on('click', removeGoogleWidget);

                        fullPageActions.translate();
                    }, 200);
                }
            }, 50);
        }
    }, 50);
}

var fullPageActions = {
    toggle: function () {
        if ($(this).hasClass('show-orig')) {
            fullPageActions.restore();
            $(this).html(getLocale('FullPageTranslate'));
        } else {
            fullPageActions.translate();
            $(this).html(getLocale('FullPageShowOriginal'));
        }

        $(this).toggleClass('show-orig');
    },

    getIFrameDocument: function () {
        var iframe = document.getElementById(':0.container');

        if (!iframe) {
            return null;
        }

        return iframe.contentDocument;
    },

    translate: function () {
        var doc = fullPageActions.getIFrameDocument();

        if (doc) {
            doc.getElementById(":0.confirm").click();
        }
    },

    restore: function () {
        var doc = fullPageActions.getIFrameDocument();

        if (doc) {
            doc.getElementById(":0.restore").click();
        }
    }
};

function removeGoogleWidget() {
    fullPageActions.restore();

    $('script[src*="//translate.google.com/"]').remove();
    $('*[class~="skiptranslate"]').remove();
    $('.goog-te-spinner-pos').remove();

    $('body').css({
        'position': 'inherit',
        'min-height': 'auto',
        'top': 'auto'
    });
}