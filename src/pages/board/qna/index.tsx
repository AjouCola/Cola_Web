import { NextPage } from 'next';

import QnaBoard from '@components/organisms/boardPageTemplate';

const QnaBoardPage: NextPage = () => {
  return <QnaBoard boardCategory="qna" />;
};
export default QnaBoardPage;
