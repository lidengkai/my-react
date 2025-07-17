export interface StateInterface {
  /** 加载中 */
  loading: boolean;
}

export interface InfoForm {
  /** ID */
  id?: number;
  /** 名称 */
  name: string;
  /** 值 */
  value: number | null;
}
