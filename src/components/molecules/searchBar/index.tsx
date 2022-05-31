import { DetailedHTMLProps, InputHTMLAttributes, useEffect, useRef, useState } from 'react';

import {
  Container,
  InputWrapper,
  HeaderBtn,
  InputModal,
  HashtagWrapper,
  HistoryItem,
  HistoryWrapper,
  HistoryControlWrapper,
  MSearchIconWrapper,
  Divider,
} from './styles';

import SearchIcon from '@assets/icon/search.svg';
import HashtagChip from '@components/atoms/hashtagChip';
import Input from '@components/atoms/input';
import MobileSearchModal from '@components/molecules/modal/mobileSearchModal';
import { dateFormatYYYYmmDD } from '@utils/libs/formatDate';

interface ISearch {
  id: number;
  keyword: string;
  date: string;
}
const searchHistory: ISearch[] = [
  {
    id: 1,
    keyword: '리액트 구조',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 2,
    keyword: 'NextJS 배포',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 3,
    keyword: '이벤트 버블링',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 4,
    keyword: '자소서',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 5,
    keyword: '삼성 코테',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 6,
    keyword: 'react-query',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 7,
    keyword: 'asdlfkj',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 8,
    keyword: '삼성 코테',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 9,
    keyword: 'react-query',
    date: dateFormatYYYYmmDD(new Date()),
  },
  {
    id: 10,
    keyword: 'asdlfkj',
    date: dateFormatYYYYmmDD(new Date()),
  },
];

interface ISearchDropdown {
  hashtags: string[];
  deleteChip: (idx: number) => void;
}

const SearchDropdown = ({ hashtags, deleteChip }: ISearchDropdown) => {
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
          <HistoryItem key={history.id}>
            <div className="icon"></div>
            <span>{history.keyword}</span>
            <button>X</button>
          </HistoryItem>
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
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>();
  const divRef = useRef<HTMLDivElement>();
  const [chipList, setChipList] = useState<string[]>([]);

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

  const handleClick = (e: any) => {
    if (!(divRef.current && !divRef.current.contains(e.target))) return;
    setFocus((v) => (v ? false : v));
  };

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [divRef]);

  const [mSearchModal, setMSearchModal] = useState(false);
  const onClickMSearch = () => {
    // open searchModal
    setMSearchModal((prev) => !prev);
  };
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
          />
          {focus && <SearchDropdown hashtags={chipList} deleteChip={deleteChip} />}
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
