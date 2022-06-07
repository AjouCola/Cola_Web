import WritePostTemplate from '@components/organisms/boardPageTemplate/CreatePost';
import Seo from '@components/Seo';

const WritePost = () => {
  return (
    <>
      <Seo title="질문게시판 글쓰기" />
      <WritePostTemplate boardCategory="qna" />;
    </>
  );
};
export default WritePost;
