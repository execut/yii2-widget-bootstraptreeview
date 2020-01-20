<?php
/**
 * User: execut
 * Date: 20.11.15
 * Time: 11:45
 */

namespace execut\widget;


use execut\yii\jui\Widget;
use yii\bootstrap\Html;
use yii\helpers\ArrayHelper;

class TreeFilterInput extends Widget
{

    /**
     * @var string target TreeView widget id
     */
    public $treeViewId;


    /**
     * @var array Html options for search input tag
     */
    public $inputOptions = [];


    /**
     * @var array Html options for clear search button tag
     */
    public $clearButtonOptions = [];
    public function run() {
        $this->clientOptions['treeViewId'] = $this->treeViewId;
        $this->registerWidget();
        \yii\helpers\Html::addCssClass($this->options, 'execut-tree-filter-input');
        $inputOptions = $this->inputOptions;
        Html::addCssClass($inputOptions, 'form-control');
        $inputOptions['autocomplete'] = 'off';
        $clearButtonOptions = ArrayHelper::merge([
            'class' => 'close glyphicon glyphicon-search',
            'title' => 'Clear search results',
        ], $this->clearButtonOptions);

        echo $this->_renderContainer(Html::input('text', 'search', null, $inputOptions) . Html::tag('span', '', $clearButtonOptions));
    }
}
