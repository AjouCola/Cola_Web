import styled from '@emotion/styled';

import UserSmallIcon from '@assets/icon/user_default_small.svg';
import UserIcon from '@assets/icon/userDefault.svg';

interface IIconWrapperProps {
  width?: string;
  height?: string;
}
const IconWrapper = styled.div<IIconWrapperProps>`
  background-color: ${(props) => props.theme.colors.blue[500]};
  width: ${({ width }) => width || '53px'};
  height: ${({ height }) => height || '53px'};
  border-radius: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
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

const UserDefault = ({ width, height }: IIconWrapperProps) => {
  return (
    <IconWrapper width={width} height={height}>
      <UserIcon className="desktop_icon" />
      <UserSmallIcon className="mobile_icon" />
    </IconWrapper>
  );
};
export default UserDefault;
