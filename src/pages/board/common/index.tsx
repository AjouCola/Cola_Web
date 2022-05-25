import { NextPage } from 'next';

import CommonBoard from '@components/organisms/boardPageTemplate';

const CommonBoardPage: NextPage = () => {
  return <CommonBoard boardCategory="common" />;
};
export default CommonBoardPage;
