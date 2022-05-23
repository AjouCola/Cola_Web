import { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/router';

import SearchBar from '../searchBar';

import {
  Container,
  TitleWrapper,
  Title,
  HeaderSection,
  HeaderBtn,
  DropDownWrapper,
  DropDownContent,
  DropDownItem,
  ContentWrapper,
} from './styles';

import Heart from '@assets/icon/heart.svg';
import Logo from '@assets/icon/logo.svg';
import UserDefault from '@components/atoms/icon/userDefault';
import NotifyDropdown from '@components/organisms/notifyDropdown';
import { NAV_MENU } from '@constants/index';
import SideBar from '@molecules/sidebar';
import { setCookies, getCookies } from '@utils/cookie';

const Header = () => {
  const router = useRouter();

  const [loginState, setLoginState] = useState(getCookies('SESSION'));
  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const notifyRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [profileMenu, setProfileMenu] = useState(false);
  const [notifyMenu, setNotifyMenu] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setProfileMenu(false);
      setNotifyMenu(false);
    };
    const handleOutsideClick = (event: MouseEvent | React.BaseSyntheticEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileMenu(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(event.target)) {
        setNotifyMenu(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const openMenu = () => {
    // setProfileMenu((prev) => !prev)
    console.log(loginState, getCookies('SESSION'));
    if (loginState) {
      setProfileMenu(true);
    } else {
      router.push('/signIn');
    }
  };

  const openNotifyMenu = () => setNotifyMenu((prev) => !prev);

  const authMenu = () =>
    NAV_MENU.filter((v) => v.division === 'AUTH').map((menu) => (
      <DropDownItem
        key={menu.id}
        onClick={() => {
          if (menu.link === 'logout') {
            setCookies('SESSION', '');
            setLoginState('');
            router.push('/');
          } else {
            router.push(menu.link);
          }
        }}
      >
        {menu.content}
      </DropDownItem>
    ));

  const notAuthMenu = () =>
    NAV_MENU.filter((v) => v.division === 'NOT_AUTH').map((menu) => (
      <DropDownItem key={menu.id} onClick={() => router.push(menu.link)}>
        {menu.content}
      </DropDownItem>
    ));

  return (
    <Container>
      <SideBar />
      <TitleWrapper>
        <Title onClick={() => router.push('/')}>
          <Logo width="120px" height="50px" />
        </Title>
      </TitleWrapper>
      <HeaderSection>
        <SearchBar />
        <DropDownWrapper>
          <HeaderBtn onClick={openNotifyMenu}>
            <Heart />
          </HeaderBtn>
          <DropDownContent isOpen={notifyMenu} ref={notifyRef}>
            <NotifyDropdown />
          </DropDownContent>
          <HeaderBtn onClick={openMenu}>
            <UserDefault />
          </HeaderBtn>
          <DropDownContent isOpen={profileMenu} ref={dropdownRef}>
            <ContentWrapper>{authMenu()}</ContentWrapper>
          </DropDownContent>
        </DropDownWrapper>
      </HeaderSection>
    </Container>
  );
};
export default Header;
