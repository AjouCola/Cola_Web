import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { ISearch } from '@components/molecules/searchBar';

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  cursor: pointer;

  transition: background 80ms linear;
  &:hover {
    background: ${({ theme: { colors } }) => colors.blue[100]};
    button {
      display: block;
    }
  }
  .icon {
    width: 1.2rem;
    height: 1.2em;
    border-radius: 100%;
    margin-right: 1rem;
    background: ${({ theme: { colors } }) => colors.blue[200]};
  }
  span {
    flex: 1;
  }
  button {
    display: none;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 0.9rem;
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.blue[500]};
    transition: color 100ms linear;
    &:hover {
      color: white;
    }
  }
`;

interface IHistoryItem {
  history: ISearch;
  onClickDelete: (historyId: number) => void;
}

const SearchHistoryItem = ({ history, onClickDelete }: IHistoryItem) => {
  const router = useRouter();
  const onClickItem = (keyword: string) => {
    router.push({
      pathname: '/board/search',
      query: {
        keyword,
      },
    });
  };
  return (
    <HistoryItem key={history.id}>
      <div className="icon"></div>
      <span onClick={() => onClickItem(history.keyword)}>{history.keyword}</span>
      <button onClick={() => onClickDelete(history.id)}>X</button>
    </HistoryItem>
  );
};
export default SearchHistoryItem;
