<?php
namespace execut\widget;
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
class TreeView extends \yii\jui\Widget {
    const SIZE_SMALL = 'small';
    const SIZE_MIDDLE = 'middle';
    const SIZE_NORMAL = 'normal';

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
     * Run widget
     */
    public function run() {
        $bundle = new TreeViewAsset();
        $bundle->register($this->view);
        if ($this->size !== self::SIZE_NORMAL) {
            $this->options['class'] = $this->size;
        }

        echo Html::tag('div', '', $this->options);

        $this->_initDefaultIcon($this->data);
        $this->clientOptions['data'] = $this->data;
        $this->registerWidget('treeview');
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