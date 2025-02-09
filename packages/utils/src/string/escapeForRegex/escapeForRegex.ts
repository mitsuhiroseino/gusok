const ESCAPE_REGEXP_FROM = /[-.*+?^${}()|\[\]\\]/g,
  ESCAPE_REGEXP_TO = '\\$&';

/**
 * 正規表現のリテラル部分を文字列で記述する際に必要なエスケープ。RegExpのコンストラクターに渡せる形式
 */
const escapeForRegex = (target: string) => {
  return target.replace(ESCAPE_REGEXP_FROM, ESCAPE_REGEXP_TO);
};
export default escapeForRegex;
