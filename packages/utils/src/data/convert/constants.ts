import toLiteral from '../toLiteral';

export const FROM = {
  json: (json: string) => JSON.parse(json),
  js: (objectLiteral: string) => Function(`return ${objectLiteral};`),
};

export const TO = {
  json: (object: any) => JSON.stringify(object),
  js: (object: any) => toLiteral(object),
};
