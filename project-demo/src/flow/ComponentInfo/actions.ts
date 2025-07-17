import { createAsyncThunk } from '@reduxjs/toolkit';
import { name } from './constant';
import { modifyTestApi, getTestInfoApi, createTestApi } from '@/api/test';

export const fetchGet = createAsyncThunk(
  `${name}/fetch/get`,
  async (id: number) => {
    return await getTestInfoApi(id);
  }
);

export const fetchSet = createAsyncThunk(
  `${name}/fetch/set`,
  async (options: { id?: number; name: string; value: number }) => {
    const { id, name, value } = options;
    if (id) {
      return await modifyTestApi(id, {
        name: name,
        value: value,
      });
    }
    return await createTestApi({
      name,
      value,
    });
  }
);
