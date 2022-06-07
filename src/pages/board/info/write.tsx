import WritePostTemplate from '@components/organisms/boardPageTemplate/CreatePost';
import Seo from '@components/Seo';

const WritePost = () => {
  return (
    <>
      <Seo title="정보게시판 글쓰기" />
      <WritePostTemplate boardCategory="info" />;
    </>
  );
};
export default WritePost;
