(function (undefined) {

    pl.extend(ke.templates, {
        get wordlistItem() {
            return '\
            <div class="wordlist wl-<%=id%>" id="<%=id%>" from="<%=from_lang_code%>" to="<%=to_lang_code%>">\
                <div class="wl-name"><%=name%></div>\
                <div class="wl-meta">\
                    <img class="wl-lang" src="../../res/images/flags/<%=from_lang_code%>@2x.png"><div class="wl-dir"></div><img class="wl-lang" src="../../res/images/flags/<%=to_lang_code%>@2x.png"><div class="wl-count"><%=phrases_count%> <%=l_phrases%></div>\
                </div>\
                <div class="pb-delete wl-delete" id="<%=id%>"></div>\
            </div>\
            ';
        }
    });

})();