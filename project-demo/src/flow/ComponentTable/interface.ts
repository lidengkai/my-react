import { TestItem } from '@/types/test';

export interface StateInterface {
  /** 加载中 */
  loading: boolean;
  current: number;
  pageSize: number;
  total: number;
  list: TestItem[];
  /** 搜索名称 */
  name: string;
  /** 搜索状态 */
  status: number[];
  /** 排序字段 */
  sort: string | undefined;
  /** 排序 */
  order: 'ascend' | 'descend' | undefined;
}
