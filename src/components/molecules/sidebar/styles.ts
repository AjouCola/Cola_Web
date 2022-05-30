import styled from '@emotion/styled';

const Container = styled.nav<{ isOpen: boolean }>`
  padding-top: 3.5rem;
  border-radius: 0px 30px 30px 0px;
  background: ${(props) => props.theme.colors.blue[500]};
  color: #222;
  user-select: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  transition: all 150ms ease-in;
  width: 250px;
  height: calc(100vh - 3rem);
  overflow: hidden;
  z-index: 2000;

  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-250px)')};
  @media screen and (max-width: 426px) {
    gap: 1.5rem;
  }
`;

const SidebarContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media screen and (max-width: 426px) {
    overflow-y: scroll;
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 141px;
  height: 38px;
  border-radius: 19px;
  background-color: ${(props) => props.theme.colors.white};
  h3 {
    color: ${(props) => props.theme.colors.blue['500']};
  }
`;
const ListWrapper = styled.ul`
  outline: 0;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.blue['200']};
    height: 24px;
    width: 6px;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    padding: 1px 0;
  }
  @media screen and (max-width: 426px) {
    gap: 0.5rem;
  }
`;
const ListItem = styled.li`
  list-style: none;
  outline: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease-in-out;
  position: relative;

  &:hover > .cross-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background: ${(props) => props.theme.colors.blue['400']};
    left: 0;
    .circle-wrapper {
      background-color: ${(props) => props.theme.colors.blue['500']};
      width: 22px;
      height: 22px;
      z-index: 1001;
    }
    .half-circle {
      position: absolute;
      left: -11px;
      top: -11px;
      width: 22px;
      height: 22px;
      padding: 0 10px;
      border-radius: 100%;
      background: ${(props) => props.theme.colors.blue['400']};
    }
  }

  a {
    z-index: 1001;
    position: relative;
    background-color: ${(props) => props.theme.colors.blue['500']};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    padding: 0 10px;
    width: 164px;
    span {
      color: ${(props) => props.theme.colors.white};
      letter-spacing: 0px;
      font-size: 20px;
      font-weight: 500;
    }
  }
`;

export { Container, SidebarContent, Section, ListWrapper, ListItem, MenuWrapper };
