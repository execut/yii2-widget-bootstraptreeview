<?php
namespace execut\widget;
use execut\yii\jui\Widget;
use yii\base\Exception;
use yii\helpers\Html;

/**
 * Bootstrap Tree View wrapper for yii2
 *
 * @property string $size Widget size mode TreeView::SIZE_SMALL | TreeView::SIZE_MIDDLE | TreeView::SIZE_NORMAL
 * @property string $defaultIcon Default icon for each data item
 * @property array $data Tree data
 *
 * @author eXeCUT
 */
class TreeView extends Widget {
    const SIZE_SMALL = 'small';
    const SIZE_MIDDLE = 'middle';
    const SIZE_NORMAL = 'normal';
    const TEMPLATE_ADVANCED = '<div class="tree-view-wrapper">
    <div class="row tree-header">
        <div class="col-sm-6">
            <div class="tree-heading-container">{header}</div>
        </div>
        <div class="col-sm-6">
            {search}
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12">
            {tree}
        </div>
    </div>
</div>';
    const TEMPLATE_SIMPLE = '{tree}';

    /**
     * @var string Widget size
     */
    public $size = TreeView::SIZE_NORMAL;

    /**
     * @var string Icon class from bootstrap
     */
    public $defaultIcon = 'none';

    /**
     * @var array Items list for widget
     */
    public $data = [];

    /**
     * Main container html options
     *
     * @var array
     */
    public $containerOptions = [];

    /**
     * Searvh widget options
     *
     * @var string
     */
    public $searchOptions = [];

    /**
     * Widget header
     *
     * @var string
     */
    public $header = 'Select from tree';

    /**
     * Template for render widget
     *
     * @var string
     */
    public $template = self::TEMPLATE_ADVANCED;

    /**
     * Run widget
     */
    public function run() {
        if ($this->size !== self::SIZE_NORMAL) {
            $this->options['class'] = $this->size;
        }

        $parts = [
            '{tree}' =>  Html::tag('div', '', $this->options)
        ];
        $template = $this->template;
        if (strpos($this->template, '{tree}') === false) {
            throw new Exception('{tree} not found in widget template');
        }

        $parts = [
            '{tree}' => Html::tag('div', '', $this->options),
            '{header}' => $this->header,
        ];

        if (strpos($this->template, '{search}') !== false) {
            $parts['{search}'] = $this->renderSearchWidget();
        }

        echo Html::tag('div', strtr($this->template, $parts), $this->containerOptions);

        $this->_initDefaultIcon($this->data);
        $this->clientOptions['data'] = $this->data;

        $this->registerWidget('treeview');
    }

    protected function renderSearchWidget() {
        $options = $this->searchOptions;
        $options['treeViewId'] = $this->id;
        if (empty($options['inputOptions'])) {
            $options['inputOptions'] = [];
        }

        if (empty($options['inputOptions']['placeholder'])) {
            $options['inputOptions']['placeholder'] = 'Search...';
        }

        return TreeFilterInput::widget($options);
    }

    /**
     * @param &array $data
     */
    protected function _initDefaultIcon(&$data)
    {
        foreach ($data as &$row) {
            if (empty($row['icon'])) {
                $row['icon'] = $this->defaultIcon;
            }

            if (isset($row['nodes'])) {
                $this->_initDefaultIcon($row['nodes']);
            }
        }
    }
}