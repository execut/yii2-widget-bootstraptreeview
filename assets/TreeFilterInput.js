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
            if (prevTimeout) {
                clearTimeout(prevTimeout);
                prevTimeout = false;
            }

            prevTimeout = setTimeout(function () {
                prevTimeout = false;
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
            }, t.delayBetweenSearch);
        });
        t.inputEl.keypress(function () {
            if (isKillKeyPress) {
                t.inputEl.val(prevVal);
                return false;
            }
        });
    },
    _expandAllParents: function (parentNode) {
        var t = this,
            treeWidget = t.treeWidget;
        if (parentNode.length) {
            parentNode = parentNode[0];
            if (typeof parentNode.$el === 'undefined') {
                t.debugBug(parentNode);
            }

            parentNode.$el.css('display', '');
            var parents = [];
            while ((parentNode = treeWidget.treeview('getParents', parentNode)) && parentNode.length) {
                parentNode.map(function (node) {
                    if (typeof node.$el === 'undefined') {
                        t.debugBug(node);
                    }

                    $(node.$el).css('display', '');
                });
                parents[parents.length] = parentNode;
            }

            parents.reverse().map(function (parentNode) {
                treeWidget.treeview('expandNode', parentNode);
            });
        }
    },
    debugBug: function (node) {
        var nodeParams = '';
        for (var key in node) {
            nodeParams += key + ':' + node[key];
        }

        throw new Error("Undefined node el inside treefilterinput: " + nodeParams);
    }
});