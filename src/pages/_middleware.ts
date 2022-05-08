import { NextResponse, NextRequest } from 'next/server';

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const cookie = req.cookies;
  const token = cookie.token;
  const notLoginUrlList = ['/', '/login', '/enter', '/join'];
  // const notNavigationBarList = ['/signIn', 'signUp'];
  const loginUrlList = ['/lobby'];

  if (token && notLoginUrlList.some((path) => pathname === path)) return NextResponse.redirect('/lobby');
  if (!token && loginUrlList.some((path) => pathname.includes(path))) return NextResponse.redirect('/');
};
