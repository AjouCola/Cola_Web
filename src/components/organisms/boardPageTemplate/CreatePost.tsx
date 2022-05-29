import { DetailedHTMLProps, InputHTMLAttributes, useRef, useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SubmitBtn from '@components/atoms/button/submit';
import HashtagChip from '@components/atoms/hashtagChip';
import Modal from '@components/molecules/modal';
import PostCreateModal from '@components/molecules/modal/PostCreateModal';
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
  const [modal, setModal] = useState(false);
  const [editMode, setEditMode] = useState<typeof MODE[number]>('all');
  const [chipList, setChipList] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [editorContent, setEditorContent] = useState('');
  const selectRef = (el: HTMLInputElement | null) => (value: WRITE_REF) =>
    (inputRef.current[value] = el as HTMLInputElement);

  useEffect(() => {
    if (postEditMode) {
      const { title, content, tags } = router.query;
      if (tags) {
        const parsed = JSON.parse(tags as string);
        if (Array.isArray(parsed)) {
          setChipList(parsed);
        }
      }
      if (inputRef.current[WRITE_REF.title]) {
        inputRef.current[WRITE_REF.title].value = title as string;
      }
      setEditorContent(content as string);
    }
  }, [postEditMode]);

  const handleChangeMode = (v: typeof MODE[number]) => setEditMode(v);

  const addChipList = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    const inputValue = inputRef.current[WRITE_REF.hashtag].value.trim().toLowerCase();
    if (inputValue === '') return;
    if (!chipList.includes(inputValue)) setChipList([...chipList, inputValue]);
    else alert('중복된 태그입니다.');
    inputRef.current[WRITE_REF.hashtag].value = '';
  };

  const deleteChip = (index: number) => setChipList(chipList.filter((v, i) => i !== index));

  const [submitData, setSubmitData] = useState({});

  const onSubmit = async () => {
    if (editorContent.trim().length === 0) {
      alert('게시글 내용을 입력해주세요');
      return;
    }
    if (inputRef.current[WRITE_REF.title].value.trim().length === 0) {
      alert('제목을 입력해주세요');
      return;
    }

    setModal(true);
    setSubmitData({
      content: editorContent,
      title: inputRef.current[WRITE_REF.title]?.value,
      tags: chipList,
      boardCategory,
    });
  };

  const onEditSubmit = async () => {
    // await Board.edit({
    //   content: editorContent,
    //   title: inputRef.current[WRITE_REF.hashtag].value,
    //   postId: Number(router.query?.id),
    //   tags: chipList,
    // });

    // router.push('/board/' + router.query?.id);
    setModal(true);
  };

  const handleSubmit = () => {
    // postEditMode ? onEditSubmit() : onSubmit();
    onSubmit();
  };

  const onSubmitModal = async (thumbnailPath: string, preview: string) => {
    if (!postEditMode) {
      const res = await Board.create({
        content: editorContent,
        title: inputRef.current[WRITE_REF.title]?.value,
        tags: chipList,
        boardCategory,
        thumbnailPath,
        preview,
      }).catch((err) => {
        console.log(err);
      });
      if (res) router.push('/board/' + res);
    } else {
      await Board.edit({
        content: editorContent,
        title: inputRef.current[WRITE_REF.hashtag].value,
        postId: Number(router.query?.id),
        tags: chipList,
        thumbnailPath,
        preview,
      });

      router.push('/board/' + router.query?.id);
    }
  };
  return (
    <>
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
      {modal && (
        <Modal onClick={() => setModal(!modal)}>
          <PostCreateModal
            title={inputRef.current[WRITE_REF.title]?.value}
            content={editorContent}
            onSubmit={onSubmitModal}
            onClose={() => setModal(false)}
          />
        </Modal>
      )}
    </>
  );
};
export default WritePost;
