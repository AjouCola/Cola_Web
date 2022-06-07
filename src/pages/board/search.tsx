import BoardTemplate from '@components/organisms/boardPageTemplate';
import Seo from '@components/Seo';
const SearchResult = () => {
  return (
    <>
      <Seo title="검색결과" />
      <BoardTemplate boardCategory="search" />
    </>
  );
};
export default SearchResult;
