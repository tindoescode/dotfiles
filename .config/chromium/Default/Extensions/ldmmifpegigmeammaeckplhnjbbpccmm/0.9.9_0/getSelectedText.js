function STN_getSelectedText() {
    return {
        pageUrl: window.location.href,
        selectionText: window.getSelection().toString()
    };
}
STN_getSelectedText();
