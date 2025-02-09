import ensureId from '../ensureId';
import { AssignIdentifierOptions } from './types';

/**
 * 対象に識別可能なプロパティを設定する
 * @param target
 * @param config
 * @param options
 * @returns
 */
export default function assignIdentifier<T extends object>(
  target: T,
  config: object,
  options: AssignIdentifierOptions = {},
): T {
  const {
    idProperty = '$id',
    targetIdProperty = '$id',
    idNameProperty = '$idName',
    targetIdNameProperty = '$idName',
    ...rest
  } = options;
  const $id = ensureId(config, { ...rest, property: idProperty });
  const $idName = config[idNameProperty];

  target[targetIdProperty] = $id;
  if ($idName != null) {
    target[targetIdNameProperty] = $idName;
  }

  return target;
}
