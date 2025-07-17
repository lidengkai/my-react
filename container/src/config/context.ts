import { createContext } from 'react';
import { UserInfo } from '../type/user';

const context = createContext<UserInfo>({});

export default context;
