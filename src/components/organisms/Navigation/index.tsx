import styled from '@emotion/styled';

import Header from '@molecules/header';

const Container = styled.div`
  z-index: 100;
  position: fixed;
  height: 5rem;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    height: 4rem;
  }
`;

const Navigation = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};
export default Navigation;
