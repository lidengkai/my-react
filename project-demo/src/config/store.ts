import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import componentTable from '@/flow/ComponentTable/reducer';
import componentInfo from '@/flow/ComponentInfo/reducer';

const store = configureStore({
  reducer: {
    [componentTable.name]: componentTable.reducer,
    [componentInfo.name]: componentInfo.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger as any);
  },
});

export default store;
