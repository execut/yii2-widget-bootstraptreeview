<?php
namespace execut\widget;
use execut\yii\web\AssetBundle;

/**
 * Custom styles
 *
 * @author eXeCUT
 */
class TreeViewAsset extends AssetBundle {
    public $depends = [
        'execut\widget\TreeViewBowerAsset',
    ];
}
