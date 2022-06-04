import { useEffect, useRef } from 'react';

import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import Button from '@components/atoms/button/submit';
import Input from '@components/atoms/input';
import Seo from '@components/Seo';
import socket from '@store/gatherSocket';
import { FlexColumn, Container } from '@styles/gather';

const Gather: NextPage = () => {
  const usernameRef = useRef('');
  const router = useRouter();

  const handleSubmitName = async () => {
    socket.once('connect', () => {
      console.log('소켓 연결됨', socket.id);
    });
    await socket.emit('CREATE_ROOM', ({ status, message, code }: { status: string; message: string; code: string }) => {
      console.log(message);
      router.push('/gather/map' + '/' + code + '?name=' + usernameRef.current);
    });
  };
  return (
    <Container>
      <Seo title="게더타운" />
      <h2>Ajou Mogakco에 오신 것을 환영합니다</h2>
      <FlexColumn>
        <Input
          placeholder="AjouGather에서 사용하실 이름을 입력해주세요."
          onChange={({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => {
            usernameRef.current = value;
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        />
        <Button size="small" onClick={handleSubmitName}>
          확인
        </Button>
      </FlexColumn>
      <FlexColumn>입장해주세요</FlexColumn>
    </Container>
  );
};
export default Gather;
