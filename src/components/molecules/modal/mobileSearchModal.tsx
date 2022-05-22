import styled from '@emotion/styled';

import { HeaderBtn } from '../searchBar/styles';

import SearchIcon from '@assets/icon/search.svg';
import Input from '@components/atoms/input';

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: white;
  padding: 1rem;

  @media (min-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    display: none;
  }
`;
const MSearchModal = ({ onClickMSearch }: { onClickMSearch: () => void }) => {
  const handleSubmit = () => {
    //
  };
  return (
    <Container>
      <div style={{ width: '100%', padding: '0 1rem', height: '2rem' }}>
        <button style={{ float: 'right' }} onClick={onClickMSearch}>
          X
        </button>
      </div>
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Input width="80%" />
        <HeaderBtn type="button" onClick={handleSubmit}>
          <SearchIcon />
        </HeaderBtn>
      </div>
    </Container>
  );
};
export default MSearchModal;
