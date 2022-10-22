import { ChangeEvent, SyntheticEvent, useState } from 'react';

import Image from 'next/image';

import {
  Container,
  ModalContainer,
  UserProfileWarpper,
  CardWrapper,
  TextWrapper,
  UserProfile,
  IconWrapper,
} from './styles';

import Modal from '@components/molecules/modal';
import Api from '@utils/api/core';
import Logo from 'public/logo.svg';
import Setting from 'public/setting.svg';

interface Props {
  name: string;
  profilePath: string | null;
  department: string;
  ajouEmail: string;
  githubEmail: string | null;
  handleModalOnOff: () => void;
}

type ImageType = {
  preview: string;
  raw: File | null;
};
const Card = ({ name, profilePath, department, ajouEmail, githubEmail, handleModalOnOff }: Props) => {
  const [modalOnOff, setModalOnOff] = useState(false);
  const [image, setImage] = useState<ImageType>({ preview: '', raw: null });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e: SyntheticEvent<HTMLButtonElement>) => {
    if (!image.raw) return;

    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', image.raw);
    await Api.put('/api/v1/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setModalOnOff(false);
    window?.location.reload();
  };

  return (
    <>
      <Container>
        <CardWrapper>
          <UserProfileWarpper onClick={() => setModalOnOff(true)}>
            {profilePath === null ? <UserProfile /> : <Image src={profilePath} alt="프로필 사진" />}
          </UserProfileWarpper>
          <TextWrapper>
            <h2>{name}</h2>
            <p>{department}</p>
            <div />
            <label>아주대학교 이메일</label>
            <p>{ajouEmail}</p>
            <label>Github</label>
            <p>{githubEmail}</p>
          </TextWrapper>
        </CardWrapper>
        <IconWrapper>
          <Setting onClick={handleModalOnOff} />
          <Logo />
        </IconWrapper>
      </Container>
      {modalOnOff && (
        <Modal onClick={() => setModalOnOff(false)}>
          <ModalContainer>
            <h2>이미지 변경하기</h2>
            <label htmlFor="upload-button">
              {image.preview ? (
                <Image src={image.preview} alt="새 프로필 미리보기" />
              ) : (
                <h3 className="text-center">눌러주세요</h3>
              )}
            </label>
            <input type="file" id="upload-button" style={{ display: 'none' }} onChange={handleChange} />
            <br />
            <button onClick={handleUpload}>사진 바꾸기</button>
          </ModalContainer>
        </Modal>
      )}
    </>
  );
};

export default Card;
