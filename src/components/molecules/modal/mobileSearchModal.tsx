import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { HistoryWrapper } from '../searchBar/styles';

import SearchIcon from '@assets/icon/search.svg';
import Input from '@components/atoms/input';
import SearchHistoryItem from '@components/atoms/searchHistoryItem';
import { dateFormatYYYYmmDD } from '@utils/libs/formatDate';
import useSearchHistory from '@utils/libs/useSearchHistory';

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    display: none;
  }
`;

const CloseBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 3rem;
`;
const CloseBtn = styled.div`
  width: 3rem;
  height: 3rem;
  position: relative;
  span::after,
  span::before {
    position: absolute;
    top: calc(50% - 1px);
    left: calc(50% - 15px);
    content: ' ';
    width: 30px;
    height: 2px;
    background-color: #666;
  }
  span::after {
    transform: rotate(45deg);
  }
  span::before {
    transform: rotate(-45deg);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;
const HeaderBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: whitesmoke;
  cursor: pointer;
`;
const SearchHistoryWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.blue[500]};
  }
`;

const MSearchModal = ({ onClickMSearch }: { onClickMSearch: () => void }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>();
  const [chipList, setChipList] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useSearchHistory();

  const onClickDelete = (id: number) => {
    setSearchHistory((prev) => {
      const newHistory = [...prev];
      const historyIndex = newHistory.findIndex((v) => v.id === id);

      newHistory.splice(historyIndex, 1);

      localStorage.setItem('cola-search-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const addChipList = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (event.key !== ',' || inputRef.current === undefined) return;
    setChipList([...chipList, inputRef.current.value.split(',')[0]]);
    inputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!inputRef.current) return;

    const currentHistory = JSON.parse(localStorage.getItem('cola-search-history') ?? '[]');
    if (Array.isArray(currentHistory)) {
      const searchKeywordItem = {
        id: Date.now(),
        keyword: inputRef.current?.value,
        date: dateFormatYYYYmmDD(new Date()),
      };
      const newHistory = [searchKeywordItem, ...currentHistory];
      localStorage.setItem('cola-search-history', JSON.stringify(newHistory));
      setSearchHistory((prev) => [searchKeywordItem, ...prev]);
      inputRef.current.value = '';

      router.push({
        pathname: '/board/search',
        query: {
          keyword: searchKeywordItem.keyword,
        },
      });
    }
  };
  return (
    <Container>
      <CloseBtnWrapper>
        {/* <button style={{ float: 'right' }} onClick={onClickMSearch}>
          X
        </button> */}
        <CloseBtn onClick={onClickMSearch}>
          <span></span>
        </CloseBtn>
      </CloseBtnWrapper>
      <InputWrapper style={{}}>
        <Input
          width="85%"
          height="3rem"
          ref={(el) => (inputRef.current = el as HTMLInputElement)}
          onKeyUp={addChipList}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <HeaderBtn type="button" onClick={handleSubmit}>
          <SearchIcon />
        </HeaderBtn>
      </InputWrapper>
      <SearchHistoryWrapper>
        <HistoryWrapper>
          {searchHistory.map((history) => (
            <SearchHistoryItem key={history.id} history={history} onClickDelete={onClickDelete} />
          ))}
        </HistoryWrapper>
      </SearchHistoryWrapper>
    </Container>
  );
};
export default MSearchModal;
