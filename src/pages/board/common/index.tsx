import { NextPage } from 'next';

import CommonBoard from '@components/organisms/boardPageTemplate';
import Seo from '@components/Seo';

const CommonBoardPage: NextPage = () => {
  return (
    <>
      <Seo title="자유게시판" />
      <CommonBoard boardCategory="common" />;
    </>
  );
};
export default CommonBoardPage;
