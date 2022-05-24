import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import Button from '@components/atoms/button';
import SubmitBtn from '@components/atoms/button/submit';
import HashtagChip from '@components/atoms/hashtagChip';
import MarkdownEditor from '@components/organisms/markdownEditor';
import { MODE, WRITE_REF } from '@constants/index';
import { FlexWrapper } from '@styles/global';
import { Container, HashtagBar, Wrapper, TitleInput } from '@styles/write';
import { Board } from '@utils/api/Board';
import All from 'public/all.svg';
import AllCheck from 'public/all_check.svg';
import Edit from 'public/edit.svg';
import EditCheck from 'public/edit_check.svg';
import Preview from 'public/preview.svg';
import PreviewCheck from 'public/preview_check.svg';
import { InputProps } from '~/types/write';

const WritePost = ({ boardCategory }: { boardCategory: 'common' | 'info' | 'qna' }) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState<typeof MODE[number]>('all');
  const [chipList, setChipList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const selectRef = (el: HTMLInputElement | null) => (value: WRITE_REF) =>
    (inputRef.current[value] = el as HTMLInputElement);

  const handleChangeMode = (v: typeof MODE[number]) => setEditMode(v);

  const addChipList = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    setChipList([...chipList, inputRef.current[WRITE_REF.hashtag].value]);
    inputRef.current[WRITE_REF.hashtag].value = '';
  };

  const deleteChip = (index: number) => setChipList(chipList.filter((v, i) => i !== index));

  // const
  const onSubmit = async () => {
    // console.log(inputRef.current[WRITE_REF.title]?.value, editorContent);
    const res = await Board.create({
      content: editorContent,
      title: inputRef.current[WRITE_REF.title]?.value,
      boardCategory,
    }).catch((err) => {
      console.log(err);
    });
    if (!res) router.push('/board');
  };
  return (
    <Container>
      <TitleInput {...InputProps.title} ref={(el) => selectRef(el)(WRITE_REF.title)} autoFocus />
      <Wrapper style={{ gridArea: 'mode' }}>
        <div onClick={() => handleChangeMode('edit')}>{editMode === 'edit' ? <EditCheck /> : <Edit />}</div>
        <div onClick={() => handleChangeMode('all')}>{editMode === 'all' ? <AllCheck /> : <All />}</div>
        <div onClick={() => handleChangeMode('view')}>{editMode === 'view' ? <PreviewCheck /> : <Preview />}</div>
      </Wrapper>
      <MarkdownEditor
        {...{
          editMode,
          title: inputRef.current[WRITE_REF.title]?.value,
          chipList,
          content: editorContent,
          setContent: setEditorContent,
        }}
      />
      <HashtagBar>
        {chipList.map((chip, i) => (
          <HashtagChip key={chip} title={chip} onRemoveChip={() => deleteChip(i)} size="small" />
        ))}
        <input {...InputProps.hashtag} ref={(el) => selectRef(el)(WRITE_REF.hashtag)} onKeyPress={addChipList} />
      </HashtagBar>
      <FlexWrapper style={{ gridArea: 'btn', justifyContent: 'flex-end' }}>
        <SubmitBtn size="small" onClick={onSubmit}>
          완료
        </SubmitBtn>
      </FlexWrapper>
    </Container>
  );
};
export default WritePost;
