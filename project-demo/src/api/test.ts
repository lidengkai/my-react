import request from '@/utils/request';
import { TestItem } from '@/types/test';

/** 创建 */
export const createTestApi = async (data: { name: string; value: number }) => {
  await request({
    url: 'test',
    method: 'post',
    data,
  });
  return true;
};

/** 删除 */
export const deleteTestApi = async (testId: number) => {
  await request({
    url: `test/${testId}`,
    method: 'delete',
  });
  return true;
};

/** 修改 */
export const modifyTestApi = async (
  testId: number,
  data: {
    name?: string;
    status?: number;
    value?: number;
  }
) => {
  await request({
    url: `test/${testId}`,
    method: 'put',
    data,
  });
  return true;
};

/** 详情 */
export const getTestInfoApi = async (testId: number) => {
  const res = await request<TestItem>({
    url: `test/${testId}`,
    method: 'get',
  });
  const { id, name, status, value } = res || {};
  return {
    id: id ?? 0,
    name: name ?? '',
    status: status ?? null,
    value: value ?? null,
  };
};

/** 列表 */
export const getTestListApi = async (
  current: number,
  pageSize: number,
  opts: {
    sort?: string;
    order?: string;
    name?: string;
    status?: number[];
    value?: number[];
  }
) => {
  const { sort, order, ...data } = opts;
  const res = await request<{
    total?: number;
    list?: TestItem[];
    page?: number;
    size?: number;
  }>({
    url: `test/${current}/${pageSize}`,
    method: 'post',
    params: { sort, order },
    data,
  });
  const { total, list, page = current, size = pageSize } = res || {};
  return {
    total: total ?? 0,
    list: list ?? [],
    page,
    size,
  };
};
