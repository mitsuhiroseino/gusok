export const ITEMS = [
  {
    id: '0',
    name: 'item0',
    children: [
      {
        id: '0-0',
        name: 'item0-0',
        children: [
          { id: '0-0-0', name: 'item0-0-0' },
          { id: '0-0-1', name: 'item0-0-1' },
          { id: '0-0-2', name: 'item0-0-2' },
        ],
      },
      { id: '0-1', name: 'item0-1', children: null },
      { id: '0-2', name: 'item0-2' },
    ],
  },
  { id: '1', name: 'item1', children: null },
  { id: '2', name: 'item2' },
  {
    id: '3',
    name: 'item3',
    children: [
      {
        id: '3-0',
        name: 'item3-0',
        children: [
          { id: '3-0-0', name: 'item3-0-0' },
          { id: '3-0-1', name: 'item3-0-1' },
          { id: '3-0-2', name: 'item3-0-2' },
        ],
      },
      { id: '3-1', name: 'item3-1', children: null },
      { id: '3-2', name: 'item3-2' },
    ],
  },
];

export function getLoader(size: number) {
  return async (item: any) => {
    const children = [];
    for (let i = 0; i < size; i++) {
      children.push({ id: `${item.id}-${i}`, name: `${item.name}-${i}` });
    }
    return children;
  };
}
