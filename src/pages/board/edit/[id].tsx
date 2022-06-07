import EditPostTemplate from '@components/organisms/boardPageTemplate/CreatePost';
import Seo from '@components/Seo';

const EditPost = () => {
  return (
    <>
      <Seo title="글수정" />
      <EditPostTemplate boardCategory="info" postEditMode={true} />;
    </>
  );
};
export default EditPost;
