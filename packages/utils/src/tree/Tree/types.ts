import { TREE_NODE } from './constants';

/**
 * Treeのオプション
 */
export type TreeOptions<I extends object> = NodeOptionsBase<I> & {};

/**
 * TreeNodeのオプション
 */
export type TreeNodeOptions<I extends object, N extends Node<I, N> = any> = NodeOptionsBase<I> & {
  /**
   * 親ノード
   */
  parent?: N;

  /**
   * プロキシのハンドラー
   */
  proxyHandlers?: any;
};

/**
 * 機能共通のオプション
 */
export type NodeOptionsBase<I extends object> = {
  /**
   * 子要素の配列が設定されている配列要素のプロパティの名称
   * デフォルトはchildren
   */
  childrenProp?: string;

  /**
   * 子要素が開かれているか判断をするプロパティの名称
   * デフォルトはisExpanded
   */
  isExpandedProp?: string;

  /**
   * 子要素のロード処理
   * itemのchildrenにnullが設定されいてる場合に実行される
   * @param item
   */
  loadChildren?: (item: I) => Promise<I[]>;

  /**
   * 子要素を開いたときのイベントハンドラー
   * @param item
   * @returns
   */
  onExpand?: (item: I) => void;

  /**
   * 子要素を閉じたときのイベントハンドラー
   * @param item
   * @returns
   */
  onCollapse?: (item: I) => void;
};

/**
 * 子ノード
 */
export interface ChildNode<I extends object, N extends Node<I, N> = any, CN extends ChildNode<I, N, CN> = any>
  extends Node<I, N, CN> {
  /**
   * 子要素を開く
   */
  expand(): Promise<CN[]>;

  /**
   * 子要素を閉じる
   */
  collapse(): Promise<CN[]>;

  /**
   * 子要素を全て開く
   */
  expandAll(): Promise<void>;

  /**
   * 子要素を全て閉じる
   */
  collapseAll(): Promise<void>;

  /**
   * 自身を親から削除する
   */
  remove(): void;

  /**
   * 要素を取得
   * @returns
   */
  getItem(): I;

  /**
   * プロキシを取得
   * @returns
   */
  getProxy(): ProxiedItem<I>;
}

/**
 * ノード
 */
export interface Node<I extends object, N extends Node<I, N> = any, CN extends ChildNode<I, N, CN> = any> {
  /**
   * 子要素を追加する
   * @param item
   */
  addChild(item: I): CN;

  /**
   * 子要素を纏めて追加する
   * @param items
   */
  addChildAll(items: I[]): CN[];

  /**
   * 子要素を設定する
   * @param items
   */
  setChildren(items: I[]): CN[];

  /**
   * 子要素を削除する
   * @param item プロキシされた子要素
   */
  removeChild(item: I): CN | undefined;

  /**
   * ネストレベル
   */
  getLevel(): number;

  /**
   * 子要素の取得
   * @returns
   */
  getChildren(): I[];

  /**
   * プロキシされた子要素の取得
   * @returns
   */
  getChildProxies(): ProxiedItem<I, N, CN>[];

  /**
   * 開いている子要素のプロキシをフラットな配列として取得
   * @returns
   */
  getFlatChildProxies(): ProxiedItem<I, N, CN>[];

  /**
   * 子ノードの取得
   * @returns
   */
  getChildNodes(): CN[];

  /**
   * nodeの親であるか
   * @param node
   */
  isParentOf(node: N): boolean;

  /**
   * nodeの子であるか
   * @param node
   * @returns
   */
  isChildOf(node: N): boolean;

  /**
   * nodeの先祖であるか
   * @param node
   * @returns
   */
  isAncestorOf(node: N): boolean;

  /**
   * nodeの子孫であるか
   * @param node
   * @returns
   */
  isDescendantOf(node: N): boolean;

  /**
   * 子要素の有無
   */
  hasChildren(): boolean;

  /**
   * 子要素の開閉状態
   */
  isExpanded(): boolean;

  /**
   * 行自体の表示／非表示、並び順などに影響する状態変更をした際に実行するメソッド
   */
  handleStateChange(): boolean;
}

/**
 * プロキシで処理を行うハンドラー
 */
export type ProxyHandlers<I extends object, N extends Node<I, N> = any, CN extends ChildNode<I, N, CN> = any> = {
  get: {
    [key: string | symbol]: (node: CN, prop: string | symbol) => unknown;
  };
  set: {
    [key: string | symbol]: (node: CN, prop: string | symbol, newValue: unknown) => boolean;
  };
};

export type ProxiedItem<I extends object, N extends Node<I, N> = any, CN extends ChildNode<I, N, CN> = any> = I & {
  /**
   * ツリーノード
   */
  [TREE_NODE]: CN;
};
