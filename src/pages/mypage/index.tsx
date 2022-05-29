import { useState } from 'react';

import type { NextPage } from 'next';
import Link from 'next/link';
import { useRecoilValueLoadable } from 'recoil';

import Card from '@components/atoms/card';
import Modal from '@components/molecules/modal';
import PostContent from '@components/molecules/postContent';
import { useUserSelector } from '@store/selector/user';
import { Container, Title, CardContainer, ContentContainer, BackgroundImage, ModalContainer } from '@styles/mypage';

const Mypage: NextPage = () => {
  const { contents: userInfo } = useRecoilValueLoadable(useUserSelector({}));
  const [modalOnOff, setModalOnOff] = useState(false);

  const handleModalOnOff = () => setModalOnOff(!modalOnOff);
  return (
    <>
      <Container>
        <Title>마이페이지</Title>
        <CardContainer>
          <BackgroundImage>
            <pre>{`캐릭터가\n명함을 쥐고\n매달려 있는 느낌`}</pre>
          </BackgroundImage>
          <Card
            name={userInfo?.name ?? '이름'}
            profilePath={userInfo?.profilePath}
            department={userInfo?.department ?? '학과'}
            ajouEmail={userInfo?.ajouEmail ?? '아주이메일'}
            githubEmail={userInfo?.gitEmail ?? '깃메일'}
            handleModalOnOff={handleModalOnOff}
          />
        </CardContainer>
        <ContentContainer>
          <PostContent
            title="내가 쓴 게시글"
            postData={[
              { title: '제목', kind: '00게시판', date: new Date() },
              { title: '제목', kind: '00게시판', date: new Date() },
              { title: '제목', kind: '00게시판', date: new Date() },
            ]}
          />
          <PostContent
            title="내가 쓴 댓글"
            postData={[
              { title: '제목', kind: '00게시판', date: new Date() },
              { title: '제목', kind: '00게시판', date: new Date() },
              { title: '제목', kind: '00게시판', date: new Date() },
            ]}
          />
          <PostContent
            title="좋아요한 게시글"
            postData={[
              { title: '제목', kind: '00게시판', date: new Date() },
              { title: '제목', kind: '00게시판', date: new Date() },
              { title: '제목', kind: '00게시판', date: new Date() },
            ]}
          />
        </ContentContainer>
      </Container>
      {modalOnOff && (
        <Modal onClick={handleModalOnOff}>
          <ModalContainer>
            <h3>계정 설정</h3>
            <button>
              <Link href={`/mypage/edit`}>정보수정</Link>
            </button>
            <button>회원탈퇴</button>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};
export default Mypage;
