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
    _escapeRegExp: function (str) {
        var specials = [
                // order matters for these
                "-"
                , "["
                , "]"
                // order doesn't matter for any of these
                , "/"
                , "{"
                , "}"
                , "("
                , ")"
                , "*"
                , "+"
                , "?"
                , "."
                , "\\"
                , "^"
                , "$"
                , "|"
            ], regex = RegExp('[' + specials.join('\\') + ']', 'g');
        return str.replace(regex, "\\$&");
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
                    t._hideSearchIcon();
                    treeWidget.treeview('collapseAll');
                    var findedNodes = treeWidget.treeview('search', [t._escapeRegExp(t.inputEl.val()), {
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
                    t._showSearchIcon();
                    isKillKeyPress = false;
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
    _showSearchIcon: function () {
        var t = this;
        console.debug('show search');
        t.clearEl.removeClass('glyphicon-remove').addClass('glyphicon-search');
    },
    _hideSearchIcon: function () {
        var t = this;
        console.debug('hide search');
        t.clearEl.addClass('glyphicon-remove').removeClass('glyphicon-search');
    },
    _expandAllParents: function (parentNode) {
        var t = this,
            treeWidget = t.treeWidget;
        if (parentNode.length) {
            parentNode = parentNode[0];
            if (typeof parentNode.$el === 'undefined') {
                return;
            }

            parentNode.$el.css('display', '');
            var parents = [];
            while ((parentNode = treeWidget.treeview('getParents', parentNode)) && parentNode.length) {
                parentNode.map(function (node) {
                    if (typeof node.$el === 'undefined') {
                        return;
                    }

                    $(node.$el).css('display', '');
                });
                parents[parents.length] = parentNode;
            }

            parents.reverse().map(function (parentNode) {
                treeWidget.treeview('expandNode', parentNode);
            });
        }
    }
});