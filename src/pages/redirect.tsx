import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

import { IUserInfo, userState } from '@store/user';
import Auth from '@utils/api/Auth';

const Redirect = () => {
  const setUserState = useSetRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const userData = (await Auth.getUser()) as unknown as IUserInfo;
      setUserState(userData);
      console.log('check redirect, get user data', userData);
      router.push('/');
    })();
  }, []);
  return <div>Redirect...</div>;
};
export default Redirect;
