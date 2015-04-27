<?php
namespace execut\widget;


use yii\web\AssetBundle;

/**
 * Custom styles
 *
 * @author eXeCUT
 */
class TreeViewAsset extends AssetBundle {
    public $sourcePath = '@vendor/execut/yii2-widget-bootstraptreeview/assets';
    public $css = [
        'TreeView.css',
    ];

    public $depends = [
        'execut\widget\TreeViewBowerAsset',
    ];
}