<?php
namespace execut\widget;


use yii\web\AssetBundle;

/**
 * Bower asset for Bootstrap Tree View
 *
 * @author eXeCUT
 */
class TreeViewBowerAsset extends AssetBundle {
    public $sourcePath = '@bower/patternfly-bootstrap-treeview/dist';
    public $js = [
        'bootstrap-treeview.min.js',
    ];

    public $css = [
        'bootstrap-treeview.min.css',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}