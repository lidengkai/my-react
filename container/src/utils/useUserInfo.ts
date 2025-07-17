import { useContext } from 'react';
import context from '@/config/context';

const useUserInfo = () => {
  return useContext(context);
};

export default useUserInfo;
