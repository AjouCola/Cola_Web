import styled from '@emotion/styled';

export const ModalBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgb(44, 44, 44, 0.33);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalContent = styled.div`
  width: 50%;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  box-shadow: 0px 0px 10px #00000029;
  gap: 1rem;
`;
export const TodoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color:${({ theme: { colors } }) => colors.gray[900]}
    display: block;
    padding: 1rem;
    border-bottom: 2px solid #707070; 
    font-size:1.2rem;
    font-weight:600;
  }
`;
export const MenuItem = styled.div`
  width: 50%;
  margin: 0 auto;
  text-align: center;

  span {
    display: inline-block;
    width: 100%;
    padding: 0.3rem 0;
    cursor: pointer;
    border-radius: 1.1rem;
    color: ${({ theme: { colors } }) => colors.blue[500]};
    font-weight: 700;
    font-size: 1.2rem;
  }
  span:hover {
    background: ${({ theme: { colors } }) => colors.blue[300]};
  }
`;
