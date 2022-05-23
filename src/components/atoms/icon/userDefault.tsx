import styled from '@emotion/styled';

import UserSmallIcon from '@assets/icon/user_default_small.svg';
import UserIcon from '@assets/icon/userDefault.svg';

const IconWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.blue[500]};
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    width: 36px;
    height: 36px;
  }
  .mobile_icon {
    display: none;
    @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
      display: block;
    }
  }
  .desktop_icon {
    @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
      display: none;
    }
  }
`;

const UserDefault = () => {
  return (
    <IconWrapper>
      <UserIcon className="desktop_icon" />
      <UserSmallIcon className="mobile_icon" />
    </IconWrapper>
  );
};
export default UserDefault;
