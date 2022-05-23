import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Modal from '@components/molecules/modal';
import MajorModal from '@components/molecules/modal/majorModal';
import SignUpForm from '@components/organisms/signUpForm';
import { MAJOR_TYPE } from '@constants/index';
import { Container, Title } from '@styles/signUp';
import Api from '@utils/api/core';

const Modify = () => {
  const { id } = useRouter().query;
  const [userData, setUserData] = useState<any>();
  const [major, setMajor] = useState<keyof typeof MAJOR_TYPE>('sw');
  const [modalOnOff, setModalOnOff] = useState(false);

  const handleModalOnOff = () => setModalOnOff(!modalOnOff);

  // useEffect(() => {
  //   setUserData(Api.get('/user/?' + id));
  // }, []);

  return (
    <>
      <Container>
        <Title>정보 수정</Title>
        <SignUpForm handleModalOnOff={handleModalOnOff} major={major} />
      </Container>
      {modalOnOff && (
        <Modal onClick={handleModalOnOff}>
          <MajorModal major={major} setMajor={setMajor} setModalOnOff={setModalOnOff} />
        </Modal>
      )}
    </>
  );
};
export default Modify;
