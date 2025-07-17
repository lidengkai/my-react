import { StateInterface } from './interface';

export const name = 'componentTable';

export const initialState: StateInterface = {
  loading: false,
  current: 1,
  pageSize: 20,
  total: 0,
  list: [],
  name: '',
  status: [],
  sort: undefined,
  order: undefined,
};
