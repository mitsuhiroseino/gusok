export type ToOptionItemOptions = {
  /**
   * 変換前がオブジェクトまたは配列形式だった場合の値のキー
   * デフォルトはオブジェクトの場合は`value`、配列の場合は0
   */
  valueFrom?: string;

  /**
   * 変換前がオブジェクトまたは配列形式だった場合のラベルのキー
   * デフォルトはオブジェクトの場合は`label`、配列の場合は1
   */
  labelFrom?: string;

  /**
   * 変換後の値のキー
   * デフォルトは`value`
   */
  valueTo?: string;

  /**
   * 変換後のラベルのキー
   * デフォルトは`label`
   */
  labelTo?: string;
};
