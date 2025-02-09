export default function logChildren(items: any[]) {
  if (!items) {
    return;
  }
  for (const item of items) {
    for (const key in item) {
      if (key === 'children') {
        logChildren(item[key]);
      } else {
        console.log(`---------- ${key}`);
        console.log(item[key]);
      }
    }
  }
}
