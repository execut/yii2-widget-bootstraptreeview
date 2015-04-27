# Bootstrap Tree View widget wrapper for yii2

[Widget page](https://github.com/jonmiles/bootstrap-treeview)

![Bootstrap Tree View Default](https://raw.github.com/jonmiles/bootstrap-treeview/master/screenshot/default.PNG)

## Installation

The preferred way to install this extension is through [composer](http://getcomposer.org/download/).

### Install

Either run

```
$ php composer.phar require execut/yii2-widget-bootstraptreeview "dev-master"
```

or add

```
"execut/yii2-widget-bootstraptreeview": "dev-master"
```

to the ```require``` section of your `composer.json` file.

## Usage
```php
use execut\widget\TreeView;

$items = [
    [
        'text' => 'Parent 1',
        'nodes' => [
            [
                'text' => 'Child 1',
                'nodes' => [
                    [
                       'text' => 'Grandchild 1'
                    ],
                    [
                       'text' => 'Grandchild 2'
                    ]
                ]
            ],
            [
                'text' => 'Child 2',
            ]
        ],
    ],
    [
        'text' => 'Parent 2',
    ]
];

$onSelect = new \yii\web\JsExpression(<<<JS
function (undefined, item) {
    $.pjax({
        container: '#pjax-container',
        url: item.href,
        timeout: null
    });
}
JS
);
$groupsContent = TreeView::widget([
    'data' => $data,
    'size' => TreeView::SIZE_SMALL,
    'clientOptions' => [
        'onNodeSelected' => $onSelect,
        'selectedBackColor' => 'rgb(40, 153, 57)',
        'borderColor' => '#fff',
    ],
]);
```

## License

**yii2-widget-bootstraptreeview** is released under the Apache License Version 2.0. See the bundled `LICENSE.md` for details.