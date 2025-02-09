import isEqual from 'lodash/isEqual';
import { TreeNode } from 'src/tree/Tree';

const DEFAULT_MATCHER = (item: any, node: TreeNode<any>) => {
  return item.id === node.getValue('id') && isEqual(item, node.getItem()) && isEqual(item, node.getProxy());
};

type Options = {
  matcher?: typeof DEFAULT_MATCHER;
  childrenProp?: string;
};

export default function toEqualNodesWith(items: any[], nodes: TreeNode<any>[], options: Options = {}) {
  const { matcher = DEFAULT_MATCHER, childrenProp = 'children' } = options;
  if (!items) {
    return items === nodes;
  } else if (items.length !== nodes?.length) {
    return false;
  }
  return items.every((item, index) => {
    const node = nodes[index];
    const result = matcher(item, node);
    if (result) {
      return toEqualNodesWith(item[childrenProp], node.getChildNodes());
    } else {
      return false;
    }
  });
}
