import { DEFAULT_PROPS, TREE_NODE } from './constants';
import NodeBase from './NodeBase';
import TreeNode from './TreeNode';
import { Node, ProxiedItem, ProxyHandlers, TreeOptions } from './types';

/**
 * ツリー構造の配列を扱うクラス
 */
export default class Tree<
  I extends object,
  N extends Node<I, N> = Node<I, any>,
  CN extends TreeNode<I, N, CN> = TreeNode<I, N, any>,
> extends NodeBase<I, N, CN> {
  /**
   * コンストラクター
   * @param items
   * @param options
   */
  constructor(items: I[], options: TreeOptions<I> = {}) {
    super();
    const { childrenProp = DEFAULT_PROPS.CHILDREN, isExpandedProp, ...rest } = options;
    this._hasChildren = true;
    this._isExpanded = true;
    this._level = -1;
    const proxyHandlers = this._createProxyHandlers(childrenProp, isExpandedProp);
    this._options = { ...rest, childrenProp, isExpandedProp, proxyHandlers, parent: this.getNode() };
    this._setChildren(items);
  }

  /**
   * プロキシ用のプロパティ毎のハンドラーを作る
   * @param childrenProp
   * @param isExpandedProp
   * @returns
   */
  private _createProxyHandlers(
    childrenProp: string,
    isExpandedProp: string = DEFAULT_PROPS.IS_EXPANDED,
  ): ProxyHandlers<I, N, CN> {
    return {
      get: {
        // ノードの取得
        [TREE_NODE]: (node, prop) => node,
        // 子要素の取得
        [childrenProp]: (node, prop) => node.getChildProxies(),
        // 子要素を開閉フラグを取得
        [isExpandedProp]: (node, prop) => node.isExpanded(),
      },
      set: {},
    };
  }

  expandAll() {
    return Promise.all(this.getChildNodes().map((child) => child.expandAll()));
  }

  collapseAll() {
    return Promise.all(this.getChildNodes().map((child) => child.collapseAll()));
  }

  /**
   * 子要素を開く
   */
  expand(item: ProxiedItem<I, N, CN>) {
    const node = item[TREE_NODE];
    return node.expand();
  }

  /**
   * 子要素を閉じる
   */
  collapse(item: ProxiedItem<I, N, CN>) {
    const node = item[TREE_NODE];
    return node.collapse();
  }

  protected _createChildNode(item: I) {
    return new TreeNode(item, this._options) as unknown as CN;
  }
}
