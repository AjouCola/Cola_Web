import { useState } from 'react';

import { FolderPropertyContainer, ColorContainer, ColorBtn, Line, Wrapper } from './styles';

import FolderItem from '@atoms/folderItem';

const ColorList = [
  '#EF7373',
  '#F99595',
  '#FCC0C0',
  '#8461C9',
  '#9779D3',
  '#BEB3E0',
  '#5451CE',
  '#6C6CD8',
  '#8D8DCC',
  '#6C7BFA',
  '#94ABF2',
  '#C4D2F7',
  '#4DC4C4',
  '#91DBD8',
  '#C3EDE6',
  '#3CBA78',
  '#74D19D',
  '#A8E5C0',
  '#F7D546',
  '#FFE576',
  '#FFF0B0',
  '#FFA161',
  '#FFC4A4',
  '#FFDCCA',
  '#000000',
  '#4F4F52',
  '#AAAAAA',
];

const FolderProperty = ({ data: { id, color } }: { data: any }) => {
  const [defaultColor, setDefaultColor] = useState(color);
  return (
    <FolderPropertyContainer>
      <FolderItem id={id} color={defaultColor} />
      <p>폴더 색상</p>
      <ColorContainer>
        {ColorList.map((c) => (
          <ColorBtn key={c} color={c} status={defaultColor === c} onClick={() => setDefaultColor(c)} />
        ))}
      </ColorContainer>
      <Line />
      <Wrapper>
        <button>폴더 재개하기</button>
        <button>폴더 삭제하기</button>
      </Wrapper>
    </FolderPropertyContainer>
  );
};
export default FolderProperty;
