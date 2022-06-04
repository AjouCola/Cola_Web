import { NextPage } from 'next';

import InfoBoard from '@components/organisms/boardPageTemplate';
import Seo from '@components/Seo';

const InfoBoardPage: NextPage = () => {
  return (
    <>
      <Seo title="정보게시판" />
      <InfoBoard boardCategory="info" />;
    </>
  );
};
export default InfoBoardPage;
