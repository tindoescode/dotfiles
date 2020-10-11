function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function realColor(elem) {
    var col = window.getComputedStyle(elem, null).getPropertyValue("color");
    if (col.startsWith("rgb")) {
        try {
            var _a = col
                .match(/\((.*)\)/)[1]
                .split(",")
                .map(function (e) { return parseInt(e); }), r = _a[0], g = _a[1], b = _a[2];
            return rgbToHex(r, g, b);
        }
        catch (e) { }
    }
    return "#000";
}
function haveDarkText(elem) {
    var c = realColor(elem);
    c = c.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff; // extract red
    var g = (rgb >> 8) & 0xff; // extract green
    var b = (rgb >> 0) & 0xff; // extract blue
    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma < 160;
}
function highlightRange(range) {
    var newNode = document.createElement("div");
    var isDarkText = haveDarkText(range.startContainer.parentNode);
    var colors = {
        yellowish: "#ffdd7f",
        grayish: "#99844c"
    };
    newNode.setAttribute("style", "background-color: " + (isDarkText ? colors.yellowish : colors.grayish) + "; display: inline;");
    range.surroundContents(newNode);
}
function getSafeRanges(dangerous) {
    var a = dangerous.commonAncestorContainer;
    // Starts -- Work inward from the start, selecting the largest safe range
    var s = new Array(0), rs = new Array(0);
    if (dangerous.startContainer != a)
        for (var i = dangerous.startContainer; i != a; i = i.parentNode)
            s.push(i);
    if (0 < s.length)
        for (var i = 0; i < s.length; i++) {
            var xs = document.createRange();
            if (i) {
                xs.setStartAfter(s[i - 1]);
                xs.setEndAfter(s[i].lastChild);
            }
            else {
                xs.setStart(s[i], dangerous.startOffset);
                xs.setEndAfter(s[i].nodeType == Node.TEXT_NODE ? s[i] : s[i].lastChild);
            }
            rs.push(xs);
        }
    // Ends -- basically the same code reversed
    var e = new Array(0), re = new Array(0);
    if (dangerous.endContainer != a)
        for (var i = dangerous.endContainer; i != a; i = i.parentNode)
            e.push(i);
    if (0 < e.length)
        for (var i = 0; i < e.length; i++) {
            var xe = document.createRange();
            if (i) {
                xe.setStartBefore(e[i].firstChild);
                xe.setEndBefore(e[i - 1]);
            }
            else {
                xe.setStartBefore(e[i].nodeType == Node.TEXT_NODE ? e[i] : e[i].firstChild);
                xe.setEnd(e[i], dangerous.endOffset);
            }
            re.unshift(xe);
        }
    // Middle -- the uncaptured middle
    if (0 < s.length && 0 < e.length) {
        var xm = document.createRange();
        xm.setStartAfter(s[s.length - 1]);
        xm.setEndBefore(e[e.length - 1]);
    }
    else {
        return [dangerous];
    }
    // Concat
    rs.push(xm);
    var response = rs.concat(re);
    // Send to Console
    return response;
}
function highlightSelection() {
    var userSelection = window.getSelection().getRangeAt(0);
    var safeRanges = getSafeRanges(userSelection);
    for (var i = 0; i < safeRanges.length; i++) {
        highlightRange(safeRanges[i]);
    }
    window.getSelection().removeAllRanges();
}
highlightSelection();
