$.widget("execut.TreeFilterInput", {
    treeWidget: null,
    delayBetweenSearch: 500,
    _create: function () {
        var t = this;
        t.treeWidget = $('#' + t.options.treeViewId);
        t.inputEl = t.element.find('input');
        t.clearEl = t.element.find('.close');
        t._initEvents();
    },
    _initEvents: function () {
        var t = this,
            prevTimeout = false,
            treeWidget = t.treeWidget;
        t.clearEl.click(function () {
            t.inputEl.val('').keyup();
        });

        t.inputEl.keyup(function () {
            if (prevTimeout) {
                clearTimeout(prevTimeout);
                prevTimeout = false;
            }

            prevTimeout = setTimeout(function () {
                prevTimeout = false;
                if (t.inputEl.val().length) {
                    treeWidget.treeview('collapseAll');
                    var findedNodes = treeWidget.treeview('search', [t.inputEl.val(), {
                        ignoreCase: true,     // case insensitive
                        exactMatch: false,    // like or equals
                        revealResults: true,  // reveal matching nodes
                    }])
                } else {
                    treeWidget.treeview('clearSearch').treeview('collapseAll');
                    var parentNode = treeWidget.treeview('getSelected');
                    if (parentNode.length) {
                        parentNode = parentNode[0];
                        while ((parentNode = treeWidget.treeview('getParent', parentNode)) && typeof parentNode.id !== 'undefined') {
                            treeWidget.treeview('expandNode', parentNode);
                        }
                    }
                }
            }, t.delayBetweenSearch);
        });
    }
});