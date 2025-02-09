import cloneDeep from 'lodash/cloneDeep';
import Tree from 'src/tree/Tree';
import { ITEMS, getLoader } from './constants';
import toEqualNodesWith from './toEqualNodesWith';

describe('Tree', () => {
  test('children', () => {
    const items = cloneDeep(ITEMS);
    const tree = new Tree(items, {});
    const result = tree.getChildren();
    expect(result).toEqual(items);
  });

  test('childProxies', () => {
    const items = cloneDeep(ITEMS);
    const tree = new Tree(items, {});
    const result = tree.getChildProxies();
    expect(result).toEqual(items);
  });

  test('childNodes', () => {
    const items = cloneDeep(ITEMS);
    const tree = new Tree(items, {});
    const result = tree.getChildNodes();
    expect(toEqualNodesWith(items, result)).toBe(true);
  });

  describe('getFlatChildProxies', () => {
    describe('expand & collapse', () => {
      const items = cloneDeep(ITEMS);
      const tree = new Tree(items, {});

      test('expand', () => {
        const nodes = tree.getChildNodes();
        return nodes[0].expand().then((childNodes) => {
          const result1 = tree.getFlatChildProxies();
          expect(result1.length).toBe(7);
          return childNodes[0].expand().then(() => {
            const result2 = tree.getFlatChildProxies();
            expect(result2.length).toBe(10);
          });
        });
      });

      test('collapse', () => {
        const nodes = tree.getChildNodes();
        return nodes[0].collapse().then(() => {
          const result1 = tree.getFlatChildProxies();
          expect(result1.length).toBe(4);
        });
      });

      test('expandAll (1)', () => {
        const nodes = tree.getChildNodes();
        return nodes[0].expandAll().then(() => {
          const result1 = tree.getFlatChildProxies();
          expect(result1.length).toBe(10);
        });
      });

      test('expandAll (2)', () => {
        const nodes = tree.getChildNodes();
        return nodes[3].expandAll().then(() => {
          const result1 = tree.getFlatChildProxies();
          expect(result1.length).toBe(16);
        });
      });

      test('collapseAll (1)', () => {
        const nodes = tree.getChildNodes();
        return nodes[0].collapseAll().then(() => {
          const result1 = tree.getFlatChildProxies();
          expect(result1.length).toBe(10);
        });
      });

      test('collapseAll (2)', () => {
        const nodes = tree.getChildNodes();
        return nodes[3].collapseAll().then(() => {
          const result1 = tree.getFlatChildProxies();
          expect(result1.length).toBe(4);
        });
      });
    });

    describe('loadChildren', () => {
      describe('expand & collapse', () => {
        const items = cloneDeep(ITEMS);
        const tree = new Tree(items, { loadChildren: getLoader(2) });

        test('expand', () => {
          const nodes = tree.getChildNodes();
          return nodes[1].expand().then((childNodes) => {
            expect(childNodes.length).toBe(2);
            const result1 = tree.getFlatChildProxies();
            expect(result1.length).toBe(6);
          });
        });

        test('collapse', () => {
          const nodes = tree.getChildNodes();
          return nodes[1].collapse().then(() => {
            const result1 = tree.getFlatChildProxies();
            expect(result1.length).toBe(4);
          });
        });
      });

      describe('expandAll & collapseAll', () => {
        const items = cloneDeep(ITEMS);
        const tree = new Tree(items, { loadChildren: getLoader(2) });

        test('expandAll', () => {
          const nodes = tree.getChildNodes();
          return nodes[3].expandAll().then(() => {
            const result1 = tree.getFlatChildProxies();
            expect(result1.length).toBe(12);
          });
        });

        test('collapseAll', () => {
          const nodes = tree.getChildNodes();
          return nodes[3].collapseAll().then(() => {
            const result1 = tree.getFlatChildProxies();
            expect(result1.length).toBe(4);
          });
        });
      });
    });
  });
});
