function getCustomCssData() {
    var customs = window.__save_to_notion_customs;
    return customs.map(function (x) {
        var node = document.querySelector(x.css);
        if (!node)
            return '';
        if (x.on == 'text')
            return node.text;
        var v = node.getAttribute(x.on);
        if (!v)
            return '';
        return v;
    });
}
getCustomCssData();
