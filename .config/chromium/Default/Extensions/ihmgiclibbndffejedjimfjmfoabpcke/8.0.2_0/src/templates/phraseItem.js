(function (undefined) {

    pl.extend(ke.templates, {
        get phraseItem() {
            return '\
            <div class="phrase p-<%=id%>" id="<%=id%>" pid="<%=pid%>">\
                <div class="p-orig-layout">\
                    <div class="p-orig-lang"><%=lang_orig%></div>\
                    <div class="p-orig"><%=text%></div>\
                    <div class="ipa"><%=translit_original%></div>\
                    <div class="copy-button copy-original"></div>\
                    <div class="listen-selector listen-butt0n lo-<%=id%> listen-original"></div>\
                </div>\
                <div class="p-trans-layout">\
                    <div class="p-trans-lang"><%=lang_trans%></div>\
                    <div class="p-trans"><%=translation%></div>\
                    <div class="ipa"><%=translit_translation%></div>\
                    <div class="copy-button copy-translation"></div>\
                    <div class="listen-selector listen-butt0n lo-<%=id%> listen-translation"></div>\
                </div>\
                <div class="p-preview pr-<%=id%>"><%=preview%></div>\
                \
                <div class="pb-delete p-delete" id="<%=id%>" pid="<%=pid%>"></div>\
            </div>\
            ';
        }
    });

})();