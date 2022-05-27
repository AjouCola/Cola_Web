import { NextResponse, NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies;
  const session = cookie.SESSION;
  const notLoginUrlList = ['/signIn', '/signUp', '/signUp/policy'];

  // if (!session && !notLoginUrlList.some((path) => pathname.includes(path))) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = '/signIn';
  //   return NextResponse.rewrite(url);
  // }
};
