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
            isKillKeyPress = false,
            prevVal = t.inputEl.val(),
            treeWidget = t.treeWidget;
        t.clearEl.click(function () {
            t.inputEl.val('').keyup();
        });

        t.inputEl.keyup(function () {
            // if (prevTimeout) {
            //     clearTimeout(prevTimeout);
            //     prevTimeout = false;
            // }

            // prevTimeout = setTimeout(function () {
            //     prevTimeout = false;
                treeWidget.find('.list-group-item').css('display', '');
                if (t.inputEl.val().length) {
                    treeWidget.treeview('collapseAll');
                    var findedNodes = treeWidget.treeview('search', [t.inputEl.val(), {
                        ignoreCase: true,     // case insensitive
                        exactMatch: false,    // like or equals
                        revealResults: true,  // reveal matching nodes
                    }]);
                    treeWidget.find('.list-group-item').hide();
                    findedNodes.map(function (node) {
                        $(node.$el).show();
                        t._expandAllParents([node]);
                        // t._showAllSiblings([node]);
                    });
                    if (!findedNodes.length) {
                        t.inputEl.val(prevVal).keyup();
                        isKillKeyPress = true;
                    } else {
                        prevVal = t.inputEl.val();
                        isKillKeyPress = false;
                    }
                } else {
                    treeWidget.treeview('clearSearch').treeview('collapseAll');
                    var parentNode = treeWidget.treeview('getSelected');
                    t._expandAllParents(parentNode);
                }
            // }, t.delayBetweenSearch);
        });
        t.inputEl.keypress(function () {
            if (isKillKeyPress) {
                t.inputEl.val(prevVal);
                return false;
            }
        });
    },
    _showAllSiblings: function (nodes) {
        var t = this,
            treeWidget = t.treeWidget,
            nodes = $(treeWidget.treeview('getSiblings', nodes));
        nodes.each(function () {
            this.$el.css('display', '');
        });

        t._showAllSiblings(nodes);
    },
    _expandAllParents: function (parentNode) {
        var t = this,
            treeWidget = t.treeWidget;
        if (parentNode.length) {
            parentNode = parentNode[0];
            parentNode.$el.css('display', '');
            while ((parentNode = treeWidget.treeview('getParents', parentNode)) && parentNode.length) {
                parentNode = parentNode[0];
                parentNode.$el.css('display', '');
                treeWidget.treeview('expandNode', parentNode);
            }
        }
    }
});