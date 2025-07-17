import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constant';
import { getTestListApi, deleteTestApi, modifyTestApi } from '@/api/test';

export const fetchList = createAsyncThunk(
  `${name}/fetch/list`,
  async (refresh: boolean, { getState }) => {
    const { current, pageSize, sort, order, name, status } =
      getState().componentTable;
    return await getTestListApi(current, pageSize, {
      name,
      status,
      sort,
      order: order === 'ascend' ? 'asc' : order === 'descend' ? 'desc' : '',
    });
  }
);

export const fetchDelete = createAsyncThunk(
  `${name}/fetch/delete`,
  async (id: number) => {
    return await deleteTestApi(id);
  }
);

export const fetchSetStatus = createAsyncThunk(
  `${name}/fetch/setStatus`,
  async (options: { id: number; status: number }) => {
    return await modifyTestApi(options.id, { status: options.status });
  }
);
