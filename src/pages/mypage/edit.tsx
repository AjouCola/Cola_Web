import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import Modal from '@components/molecules/modal';
import MajorModal from '@components/molecules/modal/majorModal';
import SignUpForm from '@components/organisms/signUpForm';
import { MAJOR_TYPE } from '@constants/index';
import { userState } from '@store/user';
import { ContentContainer, Title, EditProfileContainer } from '@styles/mypage';
import Auth from '@utils/api/Auth';

const Modify = () => {
  const userInfo = useRecoilValue(userState);
  const router = useRouter();
  const [major, setMajor] = useState<keyof typeof MAJOR_TYPE>(userInfo?.department as keyof typeof MAJOR_TYPE);
  const [modalOnOff, setModalOnOff] = useState(false);

  const handleModalOnOff = () => setModalOnOff(!modalOnOff);

  const onSubmitForm = async (name: string, department: string, gitEmail: string, ajouEmail: string) => {
    console.log(major, department);
    const result = await Auth.edit({ name, department, gitEmail });
    if (result) {
      router.push('/mypage');
    } else {
      alert('유저 정보 수정 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요');
    }
  };
  return (
    <>
      <EditProfileContainer>
        <Title>정보 수정</Title>
        <ContentContainer>
          <SignUpForm handleModalOnOff={handleModalOnOff} major={major} onSubmitForm={onSubmitForm} />
        </ContentContainer>
      </EditProfileContainer>

      {modalOnOff && (
        <Modal onClick={handleModalOnOff}>
          <MajorModal major={major} setMajor={setMajor} setModalOnOff={setModalOnOff} />
        </Modal>
      )}
    </>
  );
};
export default Modify;
