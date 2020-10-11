var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function makeUrlAbsolute(base, relative) {
    return new URL(relative, base).href;
}
function parseUrl(url) {
    return new URL(url).host;
}
function getProvider(host) {
    return host
        .replace(/www[a-zA-Z0-9]*\./, "")
        .replace(".co.", ".")
        .split(".")
        .slice(0, -1)
        .join(" ");
}
function buildRuleSet(ruleSet) {
    return function (doc, context) {
        var maxScore = 0;
        var maxValue;
        for (var currRule = 0; currRule < ruleSet.rules.length; currRule++) {
            var _a = ruleSet.rules[currRule], query = _a[0], handler = _a[1];
            var elements = Array.from(doc.querySelectorAll(query));
            if (elements.length) {
                for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                    var element = elements_1[_i];
                    var score = ruleSet.rules.length - currRule;
                    if (ruleSet.scorers) {
                        for (var _b = 0, _c = ruleSet.scorers; _b < _c.length; _b++) {
                            var scorer = _c[_b];
                            var newScore = scorer(element, score);
                            if (newScore) {
                                score = newScore;
                            }
                        }
                    }
                    if (score > maxScore) {
                        maxScore = score;
                        maxValue = handler(element);
                    }
                }
            }
        }
        if (!maxValue && ruleSet.defaultValue) {
            maxValue = ruleSet.defaultValue(context);
        }
        if (maxValue) {
            if (ruleSet.processors) {
                for (var _d = 0, _e = ruleSet.processors; _d < _e.length; _d++) {
                    var processor = _e[_d];
                    maxValue = processor(maxValue, context);
                }
            }
            if (maxValue.trim) {
                maxValue = maxValue.trim();
            }
            return maxValue;
        }
    };
}
window.metadataRuleSets = {
    description: {
        rules: [
            [
                'meta[property="og:description"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[name="description" i]',
                function (element) { return element.getAttribute("content"); },
            ],
        ]
    },
    icon: {
        rules: [
            [
                'link[rel="apple-touch-icon"]',
                function (element) { return element.getAttribute("href"); },
            ],
            [
                'link[rel="apple-touch-icon-precomposed"]',
                function (element) { return element.getAttribute("href"); },
            ],
            ['link[rel="icon" i]', function (element) { return element.getAttribute("href"); }],
            ['link[rel="fluid-icon"]', function (element) { return element.getAttribute("href"); }],
            ['link[rel="shortcut icon"]', function (element) { return element.getAttribute("href"); }],
            ['link[rel="Shortcut Icon"]', function (element) { return element.getAttribute("href"); }],
            ['link[rel="mask-icon"]', function (element) { return element.getAttribute("href"); }],
        ],
        scorers: [
            // Handles the case where multiple icons are listed with specific sizes ie
            // <link rel="icon" href="small.png" sizes="16x16">
            // <link rel="icon" href="large.png" sizes="32x32">
            function (element, score) {
                var sizes = element.getAttribute("sizes");
                if (sizes) {
                    var sizeMatches = sizes.match(/\d+/g);
                    if (sizeMatches) {
                        return sizeMatches[0];
                    }
                }
            },
        ],
        defaultValue: function (context) { return "favicon.ico"; },
        processors: [function (icon_url, context) { return makeUrlAbsolute(context.url, icon_url); }]
    },
    image: {
        rules: [
            [
                'meta[property="og:image:secure_url"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[property="og:image:url"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[property="og:image"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[name="twitter:image"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[property="twitter:image"]',
                function (element) { return element.getAttribute("content"); },
            ],
            ['meta[name="thumbnail"]', function (element) { return element.getAttribute("content"); }],
        ],
        processors: [
            function (image_url, context) { return makeUrlAbsolute(context.url, image_url); },
        ]
    },
    keywords: {
        rules: [
            ['meta[name="keywords" i]', function (element) { return element.getAttribute("content"); }],
        ],
        processors: [
            function (keywords, context) {
                return keywords.split(",").map(function (keyword) { return keyword.trim(); });
            },
        ]
    },
    title: {
        rules: [
            [
                'meta[property="og:title"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[name="twitter:title"]',
                function (element) { return element.getAttribute("content"); },
            ],
            [
                'meta[property="twitter:title"]',
                function (element) { return element.getAttribute("content"); },
            ],
            ['meta[name="hdl"]', function (element) { return element.getAttribute("content"); }],
            ["title", function (element) { return element.text; }],
        ]
    },
    language: {
        rules: [
            ["html[lang]", function (element) { return element.getAttribute("lang"); }],
            ['meta[name="language" i]', function (element) { return element.getAttribute("content"); }],
        ],
        processors: [function (language, context) { return language.split("-")[0]; }]
    },
    type: {
        rules: [
            [
                'meta[property="og:type"]',
                function (element) { return element.getAttribute("content"); },
            ],
        ]
    },
    url: {
        rules: [
            ["a.amp-canurl", function (element) { return element.getAttribute("href"); }],
            ['link[rel="canonical"]', function (element) { return element.getAttribute("href"); }],
            ['meta[property="og:url"]', function (element) { return element.getAttribute("content"); }],
        ],
        defaultValue: function (context) { return context.url; },
        processors: [function (url, context) { return makeUrlAbsolute(context.url, url); }]
    },
    provider: {
        rules: [
            [
                'meta[property="og:site_name"]',
                function (element) { return element.getAttribute("content"); },
            ],
        ],
        defaultValue: function (context) { return getProvider(parseUrl(context.url)); }
    }
};
function getMetadata(doc, url, customRuleSets) {
    if (customRuleSets === void 0) { customRuleSets = undefined; }
    var metadata = {};
    var context = {
        url: url
    };
    var ruleSets = customRuleSets || window.metadataRuleSets;
    Object.keys(ruleSets).map(function (ruleSetKey) {
        var ruleSet = ruleSets[ruleSetKey];
        var builtRuleSet = buildRuleSet(ruleSet);
        metadata[ruleSetKey] = builtRuleSet(doc, context);
    });
    return metadata;
}
function parseMetaTags() {
    var data = getMetadata(document, window.location);
    //youtube special code
    if ("url" in data && data.url.startsWith("https://www.youtube.com")) {
        var node = document.querySelector("#upload-info #channel-name #text-container");
        if (node != null) {
            data.yt_author = node.textContent.trim();
        }
    }
    return __assign(__assign({}, data), { domainName: window.location.hostname });
}
parseMetaTags();
