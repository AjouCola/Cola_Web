import { Dispatch, SetStateAction, useState } from 'react';

import { Title, MajorWrapper, MajorContainer, FooterWrapper, CheckBox, Span } from './styles';

import { MAJOR_TYPE } from '@constants/index';
import { theme } from '@styles/theme';

interface Props {
  major: keyof typeof MAJOR_TYPE;
  setMajor: Dispatch<SetStateAction<keyof typeof MAJOR_TYPE>>;
  setModalOnOff: Dispatch<SetStateAction<boolean>>;
}

const MajorModal = ({ major, setMajor, setModalOnOff }: Props) => {
  const [tempMajor, setTempMajor] = useState<keyof typeof MAJOR_TYPE>(major);
  return (
    <MajorContainer>
      <Title>학과</Title>
      <MajorWrapper>
        {Object.entries(MAJOR_TYPE).map(([key, value]) => (
          <label key={key} onClick={() => setTempMajor(key as keyof typeof MAJOR_TYPE)}>
            <CheckBox selected={tempMajor === key} />
            <Span selected={tempMajor === key}>{value}</Span>
          </label>
        ))}
      </MajorWrapper>
      <FooterWrapper>
        <p onClick={() => setModalOnOff(false)}>취소</p>
        <p
          style={{ color: theme.colors.blue[500] }}
          onClick={() => {
            setMajor(tempMajor);
            setModalOnOff(false);
          }}
        >
          확인
        </p>
      </FooterWrapper>
    </MajorContainer>
  );
};

export default MajorModal;
