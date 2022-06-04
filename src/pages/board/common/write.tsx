import WritePostTemplate from '@components/organisms/boardPageTemplate/CreatePost';
import Seo from '@components/Seo';

const WritePost = () => {
  return (
    <>
      <Seo title="자유게시판 글쓰기" />
      <WritePostTemplate boardCategory="common" />;
    </>
  );
};
export default WritePost;
