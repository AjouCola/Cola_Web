import { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Container,
  InputWrapper,
  HeaderBtn,
  InputModal,
  HashtagWrapper,
  HistoryWrapper,
  HistoryControlWrapper,
  MSearchIconWrapper,
  Divider,
} from './styles';

import SearchIcon from '@assets/icon/search.svg';
import HashtagChip from '@components/atoms/hashtagChip';
import Input from '@components/atoms/input';
import SearchHistoryItem from '@components/atoms/searchHistoryItem';
import MobileSearchModal from '@components/molecules/modal/mobileSearchModal';
import { dateFormatYYYYmmDD } from '@utils/libs/formatDate';
import useSearchHistory from '@utils/libs/useSearchHistory';

export interface ISearch {
  id: number;
  keyword: string;
  date: string;
}

interface ISearchDropdown {
  searchHistory: ISearch[];
  setSearchHistory: Dispatch<SetStateAction<ISearch[]>>;
  hashtags: string[];
  deleteChip: (idx: number) => void;
}

const SearchDropdown = ({ searchHistory, setSearchHistory, hashtags, deleteChip }: ISearchDropdown) => {
  const onClickDelete = (id: number) => {
    setSearchHistory((prev) => {
      const newHistory = [...prev];
      const historyIndex = newHistory.findIndex((v) => v.id === id);

      newHistory.splice(historyIndex, 1);

      localStorage.setItem('cola-search-history', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <InputModal>
      <Divider />
      {hashtags.length > 0 && (
        <HashtagWrapper>
          {hashtags.map((hashtag, i) => (
            <HashtagChip key={hashtag + i} title={hashtag} size="small" onRemoveChip={() => deleteChip(i)} />
          ))}
        </HashtagWrapper>
      )}
      <HistoryWrapper>
        {searchHistory.map((history) => (
          <SearchHistoryItem key={history.id} history={history} onClickDelete={onClickDelete} />
        ))}
      </HistoryWrapper>
      <HistoryControlWrapper>
        <span>검색어 전체 삭제</span>
        <div>
          <span>토글</span>
          <span>검색어 저장</span>
        </div>
      </HistoryControlWrapper>
    </InputModal>
  );
};

const SearchBar = () => {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useSearchHistory();
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();
  const divRef = useRef<HTMLDivElement>();
  const [chipList, setChipList] = useState<string[]>([]);
  const [mSearchModal, setMSearchModal] = useState(false);
  const onClickMSearch = () => setMSearchModal((prev) => !prev);

  const inputStyle = {
    zIndex: 10,
    borderRadius: '28px',
    borderBottomLeftRadius: focus ? '0px' : '28px',
    borderBottomRightRadius: focus ? '0px' : '28px',
    boxShadow: 'none',
    paddingLeft: '1rem',
    outline: 'none',
  };

  const addChipList = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (event.key !== ',' || inputRef.current === undefined) return;
    setChipList([...chipList, inputRef.current.value.split(',')[0]]);
    inputRef.current.value = '';
  };

  const deleteChip = (index: number) => setChipList(chipList.filter((v, i) => i !== index));

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
      setFocus(false);
      router.push({
        pathname: '/board/search',
        query: {
          keyword: searchKeywordItem.keyword,
        },
      });
    }
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!(divRef.current && !divRef.current.contains(e.target))) return;
      setFocus((v) => (v ? false : v));
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [divRef]);

  useEffect(() => {
    if (router.query?.keyword) {
      setFocus(false);
      setMSearchModal(false);
    }
  }, [router.query.keyword]);

  return (
    <>
      <Container focus={focus}>
        <InputWrapper
          focus={focus}
          ref={(el) => (divRef.current = el as HTMLInputElement)}
          onFocus={(e) => setFocus(true)}
        >
          <Input
            type="medium"
            width="calc(100% - 54px)"
            height="100%"
            style={inputStyle}
            ref={(el) => (inputRef.current = el as HTMLInputElement)}
            onKeyUp={addChipList}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          {focus && (
            <SearchDropdown
              searchHistory={searchHistory}
              setSearchHistory={setSearchHistory}
              hashtags={chipList}
              deleteChip={deleteChip}
            />
          )}
          <HeaderBtn type="button" onClick={handleSubmit}>
            <SearchIcon />
          </HeaderBtn>
        </InputWrapper>
      </Container>
      <MSearchIconWrapper>
        <HeaderBtn type="button" onClick={onClickMSearch}>
          <SearchIcon />
        </HeaderBtn>
      </MSearchIconWrapper>
      {mSearchModal && <MobileSearchModal onClickMSearch={onClickMSearch}></MobileSearchModal>}
    </>
  );
};

export default SearchBar;
