/**
 * uuidのオプション
 */
export type UuidOptions = {
  /**
   * 接頭辞
   */
  prefix?: string;

  /**
   * 接尾辞
   */
  suffix?: string;

  /**
   * 接頭辞、接尾辞を除いた桁数
   */
  digitsNumber?: number;
};
