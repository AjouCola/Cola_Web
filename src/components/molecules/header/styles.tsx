import styled from '@emotion/styled';

const Container = styled.div<{ isTransparent: boolean }>`
  position: relative;
  width: 100vw;
  height: 5rem;
  // padding: 50px 20px 50px 53px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: all 200ms linear;
  // background: ${({ isTransparent }) => (isTransparent ? '' : 'white')};
  background: #ffffff;
  // box-shadow: ${({ isTransparent }) => (isTransparent ? 'none' : 'rgb(0 0 0 / 8%) 0px 0px 8px')};
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 8px;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    height: 4rem;
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding-right: 0;
  }
`;
const SideBar = styled.div`
  width: 2.5rem;
  height: 2.5rem;

  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  cursor: pointer;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    width: 2rem;
    height: 2rem;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0 1rem;
  padding-left: 0.5rem;
  justify-content: space-between;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1rem;
  gap: 2rem;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding: 0 0.5rem;
  }
`;
const MenuWrapper = styled.div`
  display: flex;
`;

const Title = styled.span`
  cursor: pointer;
  padding: 0px 10px;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: 0 20px 0 0;
    svg {
      width: 100px;
      height: 40px;
    }
  }
`;
const SubTitle = styled.span`
  font-size: 14px;
  padding: 0px 10px;
`;

const HeaderSection = styled.div`
  display: flex;
  margin: 0 2rem;
  justify-content: space-around;
  align-items: center;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    margin: 0 1rem;
  }
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    margin: 0 0.5rem;
    top: 0.3rem;
  }
`;
const HeaderBtn = styled.button`
  background: none;
  border: none;
  padding: 5px;
  font-size: 14px;
  color: whitesmoke;
  cursor: pointer;
`;

export interface IDropdownMenu {
  isOpen: boolean;
}
const DropDownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;
const ContentWrapper = styled.div`
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  box-shadow: 0px 0px 6px #00000029;
  span {
    white-space: nowrap;
  }
`;
const DropDownContent = styled.div<IDropdownMenu>`
  z-index: 100;
  position: absolute;
  top: 4.5rem;
  right: 0rem;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  height: fit-content;
  transition: all 300ms linear;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    position: fixed;
    right: 0;
    top: 5rem;
  }
`;
const DropDownItem = styled.span`
  width: 100%;
  text-align: center;
  border-bottom: 2px solid ${({ theme: { colors } }) => colors.blue[500]};
  color: ${({ theme: { colors } }) => colors.blue[500]};
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:nth-last-of-type(1) {
    border-bottom: 0px;
  }
  &:hover {
    opacity: 0.8;
  }
`;
export {
  Container,
  SideBar,
  HeaderWrapper,
  TitleWrapper,
  MenuWrapper,
  Title,
  SubTitle,
  HeaderSection,
  HeaderBtn,
  DropDownWrapper,
  DropDownContent,
  DropDownItem,
  ContentWrapper,
};
