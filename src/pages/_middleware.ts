import User from '@utils/api/User';
import { useRecoilState } from 'recoil';
import { NextResponse, NextRequest } from 'next/server';
import { userState, IUserInfo } from '@store/user';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const [user, setUser] = useRecoilState(userState);
  const cookie = req.cookies;
  const session = cookie.SESSION;
  const notLoginUrlList = ['/signIn', '/signUp', '/signUp/policy'];

  if (!session && !notLoginUrlList.some((path) => pathname.includes(path))) {
    const url = req.nextUrl.clone();
    url.pathname = '/signIn';
    return NextResponse.rewrite(url);
  } else {
    if (user?.id === undefined) return;
    const data = (await User.getUserInfo()) as unknown as IUserInfo;
    setUser(data);
  }
};
