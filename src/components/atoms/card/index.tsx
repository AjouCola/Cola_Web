import { useState } from 'react';

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

const Card = ({ name, profilePath, department, ajouEmail, githubEmail, handleModalOnOff }: Props) => {
  const [modalOnOff, setModalOnOff] = useState(false);
  const [image, setImage] = useState({ preview: '', raw: '' });

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', image.raw);
    await Api.put('/api/v1/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setModalOnOff(false);
  };

  return (
    <>
      <Container>
        <CardWrapper>
          <UserProfileWarpper onClick={() => setModalOnOff(true)}>
            {profilePath === null ? <UserProfile /> : <img src={profilePath} />}
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
              {image.preview ? <img src={image.preview} alt="img" /> : <h3 className="text-center">눌러주세요</h3>}
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
