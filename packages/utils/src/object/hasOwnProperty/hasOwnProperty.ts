export default function hasOwnProperty(object: unknown, key: PropertyKey): boolean {
  return object != null && Object.prototype.hasOwnProperty.call(object, key);
}
