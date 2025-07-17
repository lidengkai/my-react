import { createSlice } from '@reduxjs/toolkit';
import { name, initialState } from './constant';
import { fetchGet, fetchSet } from './actions';

export const appSlice = createSlice({
  name,
  initialState,
  reducers: {
    destroy: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // 数据查询
    builder
      .addCase(fetchGet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGet.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchGet.rejected, (state) => {
        state.loading = false;
      });
    // 数据修改
    builder
      .addCase(fetchSet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSet.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchSet.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default appSlice;

export const { actions } = appSlice;
