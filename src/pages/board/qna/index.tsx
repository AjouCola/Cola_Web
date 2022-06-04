import { NextPage } from 'next';

import QnaBoard from '@components/organisms/boardPageTemplate';
import Seo from '@components/Seo';

const QnaBoardPage: NextPage = () => {
  return (
    <>
      <Seo title="질문게시판" />
      <QnaBoard boardCategory="qna" />;
    </>
  );
};
export default QnaBoardPage;
