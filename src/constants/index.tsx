export const MODE = ['edit', 'all', 'view'];
export const WRITE_EXAMPLE = '자유롭게 작성해보세요.';

export enum WRITE_REF {
  title = 0,
  hashtag = 1,
}

export const INPUT_TYPE = {
  small: { width: '350px', height: '60px' },
  medium: { width: '300px', height: '40px' },
};

export const GITHUB_OAUTH_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL +
  '/oauth2/authorization/github?redirect_uri=' +
  process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export const GOOGLE_OAUTH_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL +
  '/oauth2/authorization/google?redirect_uri=' +
  process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export const MAJOR_TYPE = {
  me: '기계공학과',
  env: '환경안전공학과',
  ie: '산업공학과',
  ce: '건설시스템공학과',
  che: '화학공학과',
  tse: '교통시스템공학과',
  mse: '신소재공학과',
  arch: '건축학과',
  chembio: '응용화학생명공학과',
  ise: '융합시스템공학과',
  ece: '전자공학과',
  sw: '소프트웨어학과',
  media: '미디어학과',
  mdc: '국방디지털융합학과',
  security: '사이버보안학과',
  math: '수학과',
  physics: '물리학과',
  chem: '화학과',
  biology: '생명과학과',
  abiz: '경영학과',
  ebiz: 'e-비즈니스학과',
  fe: '금융공학과',
  gb: '글로벌경영학과',
  kor: '국어국문학과',
  ell: '영어영문학과',
  france: '불어불문학과',
  history: '사학과',
  culture: '문화콘텐츠학과',
  economy: '경제학과',
  pba: '행정학과',
  apsy: '심리학과',
  soci: '사회학과',
  pol: '정치외교학과',
  slez: '스포츠레저학과',
  medicine: '의학과',
  nursing: '간호학과',
  pharm: '약학대학',
};

interface INavMenu {
  id: string;
  content: string;
  division: 'NOT_AUTH' | 'AUTH';
  link: string;
}
export const NAV_MENU: INavMenu[] = [
  {
    id: 'signIn',
    content: '로그인',
    division: 'NOT_AUTH',
    link: '/signIn',
  },
  {
    id: 'logout',
    content: '로그아웃',
    division: 'AUTH',
    link: '/logout',
  },
  {
    id: 'myPage',
    content: '마이페이지',
    division: 'AUTH',
    link: '/mypage',
  },
];
