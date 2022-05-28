import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import SubmitBtn from '@components/atoms/button/submit';
import HashtagChip from '@components/atoms/hashtagChip';
import { MODE, WRITE_REF } from '@constants/index';
import { FlexWrapper } from '@styles/global';
import { Container, HashtagBar, Wrapper, TitleInput, EditorWrapper } from '@styles/write';
import { Board } from '@utils/api/Board';
import All from 'public/all.svg';
import AllCheck from 'public/all_check.svg';
import Edit from 'public/edit.svg';
import EditCheck from 'public/edit_check.svg';
import { InputProps } from '~/types/write';

const PostEditor = dynamic(import('@components/molecules/editor/PostEditor'), { ssr: false });

const WritePost = ({
  boardCategory,
  postEditMode = false,
}: {
  boardCategory: 'common' | 'info' | 'qna';
  postEditMode?: boolean;
}) => {
  const router = useRouter();
  const [editMode, setEditMode] = useState<typeof MODE[number]>('all');
  const [chipList, setChipList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const selectRef = (el: HTMLInputElement | null) => (value: WRITE_REF) =>
    (inputRef.current[value] = el as HTMLInputElement);

  useEffect(() => {
    if (postEditMode) {
      const { title, content, hashtags } = router.query;
      setChipList(hashtags as string[]);
      if (inputRef.current[WRITE_REF.title]) {
        inputRef.current[WRITE_REF.title].value = title as string;
      }
      setEditorContent(content as string);
    }
  }, [postEditMode]);

  const handleChangeMode = (v: typeof MODE[number]) => setEditMode(v);

  const addChipList = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (inputRef.current[WRITE_REF.hashtag].value.trim() === '') return;

    setChipList([...chipList, inputRef.current[WRITE_REF.hashtag].value.trim()]);
    inputRef.current[WRITE_REF.hashtag].value = '';
  };

  const deleteChip = (index: number) => setChipList(chipList.filter((v, i) => i !== index));

  const onSubmit = async () => {
    if (editorContent.trim().length > 0) {
      const res = await Board.create({
        content: editorContent,
        title: inputRef.current[WRITE_REF.title]?.value,
        tags: chipList,
        boardCategory,
      }).catch((err) => {
        console.log(err);
      });
      if (res) router.push('/board/' + res);
    } else {
      alert('게시글 내용을 입력해주세요');
    }
  };

  const onEditSubmit = async () => {
    await Board.edit({
      content: editorContent,
      title: inputRef.current[WRITE_REF.hashtag].value,
      postId: Number(router.query?.id),
      tags: chipList,
    });

    router.push('/board/' + router.query?.id);
  };

  const handleSubmit = () => {
    postEditMode ? onEditSubmit() : onSubmit();
  };
  return (
    <Container>
      <TitleInput {...InputProps.title} ref={(el) => selectRef(el)(WRITE_REF.title)} autoFocus />
      <Wrapper style={{ gridArea: 'mode' }}>
        <div onClick={() => handleChangeMode('all')}>{editMode === 'all' ? <AllCheck /> : <All />}</div>
        <div onClick={() => handleChangeMode('edit')}>{editMode === 'edit' ? <EditCheck /> : <Edit />}</div>
      </Wrapper>
      <EditorWrapper>
        <PostEditor
          previewStyle={editMode === 'all' ? 'vertical' : 'tab'}
          {...{ content: editorContent, setContent: setEditorContent }}
        />
      </EditorWrapper>
      <HashtagBar>
        {chipList.map((chip, i) => (
          <HashtagChip key={chip} title={chip} onRemoveChip={() => deleteChip(i)} size="small" />
        ))}
        <input {...InputProps.hashtag} ref={(el) => selectRef(el)(WRITE_REF.hashtag)} onKeyPress={addChipList} />
      </HashtagBar>
      <FlexWrapper style={{ gridArea: 'btn', justifyContent: 'flex-end' }}>
        <SubmitBtn size="small" onClick={handleSubmit}>
          완료
        </SubmitBtn>
      </FlexWrapper>
    </Container>
  );
};
export default WritePost;
