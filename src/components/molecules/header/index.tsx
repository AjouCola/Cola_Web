import { useState, useRef, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useRecoilStateLoadable } from 'recoil';

import SearchBar from '../searchBar';

import {
  Container,
  SideBar,
  HeaderWrapper,
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
import SideBarContents from '@molecules/sidebar';
import { IUserInfo, useUserSelector } from '@store/selector/user';
import Auth from '@utils/api/Auth';

const Header = () => {
  const router = useRouter();
  const [{ contents: user }, setUser] = useRecoilStateLoadable(useUserSelector({}));

  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  const dropdownRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const notifyRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [profileMenu, setProfileMenu] = useState(false);
  const [notifyMenu, setNotifyMenu] = useState(false);

  const [isTransparent, setIsTransparent] = useState(false);
  useEffect(() => {
    if (router.route === '/') setIsTransparent(true);
    else setIsTransparent(false);
  }, [router]);

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

  useEffect(() => {
    console.log(user);
  }, [user]);

  const openMenu = () => {
    if (user?.id) {
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
        onClick={async () => {
          if (menu.id === 'logout') {
            await Auth.logout();
            setUser({} as IUserInfo);

            location.href = '/signIn';
          } else {
            router.push(menu.link);
          }
        }}
      >
        {menu.content}
      </DropDownItem>
    ));

  return (
    <Container isTransparent={isTransparent}>
      <SideBar ref={headerRef}>
        <SideBarContents isOpen={isOpen ?? false} setIsOpen={setIsOpen} headerRef={headerRef} />
      </SideBar>
      <HeaderWrapper>
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
      </HeaderWrapper>
    </Container>
  );
};
export default Header;
