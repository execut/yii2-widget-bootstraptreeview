<?php
/**
 * User: execut
 * Date: 20.11.15
 * Time: 11:45
 */

namespace execut\widget;


use execut\yii\jui\Widget;
use yii\bootstrap\Html;

class TreeFilterInput extends Widget
{
    public $treeViewId;
    public $inputOptions = [];
    public function run() {
        $this->clientOptions['treeViewId'] = $this->treeViewId;
        $this->registerWidget();
        \yii\helpers\Html::addCssClass($this->options, 'execut-tree-filter-input');
        $inputOptions = $this->inputOptions;
        Html::addCssClass($inputOptions, 'form-control');
        $inputOptions['autocomplete'] = 'off';

        echo $this->_renderContainer(Html::input('text', 'search', null, $inputOptions) . '<span class="close" title="Clear search results">×</span>');
    }
}