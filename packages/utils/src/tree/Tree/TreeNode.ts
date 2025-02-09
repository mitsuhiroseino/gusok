import { DEFAULT_PROPS } from './constants';
import NodeBase from './NodeBase';
import { ChildNode, Node, ProxiedItem, ProxyHandlers, TreeNodeOptions } from './types';

/**
 * ツリーのノード
 */
export default class TreeNode<
    I extends object,
    N extends Node<I, N> = Node<I, any>,
    CN extends TreeNode<I, N, CN> = TreeNode<I, N, any>,
  >
  extends NodeBase<I, N, CN>
  implements ChildNode<I, N, CN>
{
  /**
   * 元の要素
   */
  private _item: I;

  /**
   * プロキシされた要素
   */
  private _proxy: ProxiedItem<I, N, CN>;

  /**
   * 親ノード
   */
  protected _parent: N;

  constructor(item: I, options: TreeNodeOptions<I, N> = {}) {
    super();
    const { parent, childrenProp = DEFAULT_PROPS.CHILDREN, isExpandedProp, proxyHandlers } = options;
    this._options = { ...options, parent: this.getNode() };
    // 受け取ったものを保持
    this._item = item;
    this._parent = parent;
    this._isExpanded = isExpandedProp ? !!item[isExpandedProp] : false;
    // レベルを設定
    this._level = parent.getLevel() + 1;
    // itemのプロキシを作成
    this._proxy = this._proxyItem(item, proxyHandlers);
    // 子要素もNodeインスタンスを作る
    const children = item[childrenProp];
    if (children !== undefined) {
      this._hasChildren = true;
      this._setChildren(children);
    }
  }

  /**
   * 要素のプロキシを作成する
   * @param item
   * @param handlers
   * @returns
   */
  private _proxyItem(item: I, handlers: ProxyHandlers<I, N, CN>): ProxiedItem<I, N, CN> {
    return new Proxy(item, {
      get: (target, prop, receiver) => {
        const handler = handlers.get[prop];
        if (handler) {
          // ハンドラーがある場合はハンドラーで処理
          return handler(this.getTreeNode(), prop);
        }
        // ハンドラーが無い場合は通常の処理
        return Reflect.get(target, prop, receiver);
      },
      set: (target, prop, newValue, receiver) => {
        const handler = handlers.set[prop];
        if (handler) {
          // ハンドラーがある場合はハンドラーで処理
          return handler(this.getTreeNode(), prop, newValue);
        }
        // ハンドラーが無い場合は通常の処理
        return Reflect.set(target, prop, newValue, receiver);
      },
    }) as ProxiedItem<I, N, CN>;
  }

  remove(): void {
    this._parent.removeChild(this.getProxy());
  }

  setChildren(items: I[]): CN[] {
    this._item[this._options.childrenProp] = items;
    return super.setChildren(items);
  }

  expandAll() {
    return this.expand().then(() => {
      const childNodes = this.getChildNodes() || [];
      return Promise.all(childNodes.map((child) => child.expandAll()));
    });
  }

  collapseAll() {
    return this.collapse().then(() => {
      const childNodes = this.getChildNodes() || [];
      return Promise.all(childNodes.map((child) => child.collapseAll()));
    });
  }

  /**
   * 子要素を開く
   */
  expand() {
    if (!this.hasChildren()) {
      return Promise.resolve([]);
    }
    if (this._canLoad()) {
      return this._options.loadChildren(this.getItem()).then((items) => {
        this._setChildren(items);
        this.setExpanded(true);
        return this.getChildNodes();
      });
    } else {
      this.setExpanded(true);
      return Promise.resolve(this.getChildNodes());
    }
  }

  /**
   * 子要素のロードが可能か
   * @returns
   */
  private _canLoad() {
    return this._hasChildren && !this._children && this._options.loadChildren;
  }

  /**
   * 子要素を閉じる
   */
  collapse() {
    this.setExpanded(false);
    return Promise.resolve(this.getChildNodes() || []);
  }

  setExpanded(value: boolean) {
    if (!this.hasChildren()) {
      return;
    }
    const item = this.getItem();
    this._isExpanded = value;
    const isExpandedProp = this._options.isExpandedProp;
    if (isExpandedProp) {
      item[isExpandedProp] = value;
    }
    this.handleStateChange();

    const { onExpand, onCollapse } = this._options;
    if (value && onExpand) {
      onExpand(item);
    } else if (!value && onCollapse) {
      onCollapse(item);
    }
  }

  /**
   * 要素を取得
   * @returns
   */
  getItem() {
    return this._item;
  }

  /**
   * プロキシを取得
   * @returns
   */
  getProxy() {
    return this._proxy;
  }

  /**
   * ツリーノードを取得
   * @returns
   */
  getTreeNode() {
    return this as unknown as CN;
  }

  /**
   * 要素に値を設定する
   * @param prop
   * @param value
   */
  setValue(prop: string | symbol, value: unknown): void {
    this._item[prop] = value;
  }

  /**
   * 要素から値を取得する
   * @param prop
   */
  getValue(prop: string | symbol): unknown {
    return this._item[prop];
  }

  /**
   * ルートのツリーノードか
   * @returns
   */
  isRoot() {
    return this._level === 0;
  }

  getParent(): N {
    return this._parent;
  }

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: N) {
    return this._parent === node;
  }

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: N) {
    const parent = this._parent;
    if (parent === node) {
      return true;
    } else {
      return parent.isDescendantOf(node);
    }
  }

  handleStateChange() {
    if (super.handleStateChange()) {
      this._parent.handleStateChange();
      return true;
    }
    return false;
  }

  protected _createChildNode(item: I) {
    return new TreeNode(item, this._options) as unknown as CN;
  }
}
