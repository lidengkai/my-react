import { createSlice } from '@reduxjs/toolkit';
import { name, initialState } from './constant';
import { fetchList } from './actions';
import { StateInterface } from './interface';

export const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    destroy: () => {
      return initialState;
    },
    /** 表格筛选 */
    changeTable: (
      state,
      action: {
        payload: {
          current: number;
          pageSize: number;
          sort: StateInterface['sort'];
          order: StateInterface['order'];
        };
      }
    ) => {
      const { current, pageSize, sort, order } = action.payload;
      Object.assign(state, {
        current,
        pageSize,
        sort,
        order,
      });
    },
    /** 搜索名称 */
    changeName: (state, action: { payload: string }) => {
      state.name = action.payload;
    },
    /** 搜索名称 */
    changeStatus: (state, action: { payload: number[] }) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 数据查询
    builder
      .addCase(fetchList.pending, (state, { meta }) => {
        if (meta.arg) {
          state.current = 1;
        }
        state.loading = true;
      })
      .addCase(fetchList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.total = payload.total;
        state.list = payload.list;
      })
      .addCase(fetchList.rejected, (state) => {
        state.loading = false;
        state.total = 0;
        state.list = [];
        state.current = 1;
      });
  },
});

export default appSlice;

export const { actions } = appSlice;
