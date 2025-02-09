import removeAt from '../../array/removeAt';
import { ChildNode, Node, ProxiedItem, TreeNodeOptions } from './types';

/**
 * ツリー構造の配列をフラットな配列として扱うクラスの基底クラス
 */
export default abstract class NodeBase<
  I extends object,
  N extends Node<I, N> = any,
  CN extends ChildNode<I, N, CN> = any,
> implements Node<I, N, CN>
{
  /**
   * ネストレベル
   */
  protected _level: number;

  /**
   * 子要素
   */
  protected _children: I[];

  /**
   * プロキシされた子要素
   */
  protected _childProxies: ProxiedItem<I, N, CN>[];

  /**
   * 展開状態を考慮した子要素のフラットな配列
   */
  protected _flatChildProxies: ProxiedItem<I, N, CN>[];

  /**
   * 子ノード
   */
  protected _childNodes?: CN[];

  /**
   * 子要素の有無
   */
  protected _hasChildren = false;

  /**
   * 子要素の開閉状態
   */
  protected _isExpanded = false;

  /**
   * 子要素用のオプション
   */
  protected _options: TreeNodeOptions<I, N>;

  /**
   * 子要素を追加する
   * @param item
   * @returns
   */
  addChild(item: I) {
    const node = this._addChild(item);
    this.handleStateChange();
    return node;
  }

  /**
   * 子要素を纏めて追加する
   * @param items
   * @returns
   */
  addChildAll(items: I[]) {
    const nodes = items.map((item) => this._addChild(item));
    this.handleStateChange();
    return nodes;
  }

  removeChild(item: I) {
    const childProxies = this._childProxies;
    if (childProxies) {
      const index = childProxies.findIndex((child) => child === item);
      if (index > -1) {
        removeAt(this.getChildren(), index);
        removeAt(childProxies, index);
        return removeAt(this.getChildNodes(), index)[0];
      }
    }
    return;
  }

  /**
   * 子要素を設定しproxyとnodeを作成する
   * @param items
   * @returns
   */
  setChildren(items: I[]) {
    this._children = [];
    this._childProxies = [];
    this._childNodes = [];
    return this.addChildAll(items);
  }

  /**
   * 子要素を設定する
   * @param items
   * @returns
   */
  protected _setChildren(items: I[]): void {
    if (this._isExpanded) {
      this.setChildren(items);
    } else {
      // 子要素を開いていない時はitemのみ設定
      if (items) {
        this._children = items.concat([]);
      } else {
        this._children = null;
      }
      this._childProxies = null;
      this._childNodes = null;
      this.handleStateChange();
    }
  }

  /**
   * 子要素を追加する
   * @param item
   * @param excludingItems
   * @returns
   */
  private _addChild(item: I) {
    this._children.push(item);
    const node = this._createChildNode(item);
    this._childProxies.push(node.getProxy());
    this._childNodes.push(node);
    return node;
  }

  /**
   * 子要素のproxyとnodeを纏めて作成する
   * @returns
   */
  protected _createChildren() {
    const children = this.getChildren();
    if (children) {
      this._childProxies = [];
      this._childNodes = [];
      children.map((item) => {
        const node = this._createChildNode(item);
        this._childProxies.push(node.getProxy());
        this._childNodes.push(node);
      });
    }
  }

  protected abstract _createChildNode(item: I): CN;

  /**
   * レベルの取得
   * @returns
   */
  getLevel() {
    return this._level;
  }

  /**
   * ノードを取得
   * @returns
   */
  getNode(): N {
    return this as unknown as N;
  }

  /**
   * 子要素の取得
   * @returns
   */
  getChildren() {
    return this._children;
  }

  /**
   * プロキシされた子要素の取得
   * @returns
   */
  getChildProxies() {
    if (!this._childProxies) {
      this._createChildren();
    }
    return this._childProxies;
  }

  /**
   * 開いている子要素のitemをフラットな配列として取得
   * @returns
   */
  getFlatChildProxies() {
    if (this._flatChildProxies) {
      return this._flatChildProxies;
    }

    let flatChildProxies: ProxiedItem<I, N, CN>[] = [];
    const childNodes = this.getChildNodes();
    if (this._hasChildren && childNodes && this._isExpanded) {
      childNodes.forEach((child) => {
        flatChildProxies.push(child.getProxy());
        flatChildProxies = flatChildProxies.concat(child.getFlatChildProxies());
      });
    }

    this._flatChildProxies = flatChildProxies;
    return flatChildProxies;
  }

  /**
   * 子ノードの取得
   * @returns
   */
  getChildNodes(): CN[] {
    if (!this._childNodes) {
      this._createChildren();
    }
    return this._childNodes;
  }

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: N) {
    return node.isChildOf(this as unknown as N);
  }

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: N) {
    return false;
  }

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: N) {
    return node.isDescendantOf(this as unknown as N);
  }

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: N) {
    return false;
  }

  /**
   * 子要素の有無
   */
  hasChildren() {
    return this._hasChildren;
  }

  /**
   * 子要素の開閉状態
   */
  isExpanded() {
    return this._isExpanded;
  }

  /**
   * 行自体の表示／非表示、並び順などに影響する状態変更をした際に実行するメソッド
   */
  handleStateChange() {
    if (this._flatChildProxies) {
      this._flatChildProxies = null;
      return true;
    }
    return false;
  }
}
