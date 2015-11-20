<?php
/**
 * User: execut
 * Date: 20.11.15
 * Time: 11:45
 */

namespace execut\widget;


use yii\bootstrap\Html;

class TreeFilterInput extends \yii\jui\Widget
{
    public $treeViewId;
    public function run() {
        echo Html::tag('div', Html::input('text', 'search', null, [
            'class' => 'form-control',
        ]), [
            'class' => 'form-group'
        ]);
    }
}