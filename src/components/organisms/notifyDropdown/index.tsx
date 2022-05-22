import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { Container, DropdownWrapper } from './styles';

import DropdownItem from '@components/molecules/profileDropdownItem';
import Tab from '@components/molecules/profileDropdownTab';

const NotifyDropdown = () => {
  const dropdownRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('댓글');
  const onClickTab = (tab: string) => setCurrentTab(tab);

  const reply = [1, 1, 1, 1, 1];
  const likes = [1, 1, 1, 1, 1, 1, 1];
  const [notifications, setNotifications] = useState(reply);

  useEffect(() => {
    if (currentTab) {
      setNotifications(currentTab === '댓글' ? reply : likes);
    }
  }, [currentTab]);

  return (
    <Container>
      <Tab currentTab={currentTab} onClickTab={onClickTab} />
      {notifications.length === 0 && (
        <DropdownWrapper>
          <p>알림이 없습니다.</p>
        </DropdownWrapper>
      )}
      {notifications.length !== 0 && (
        <DropdownWrapper ref={dropdownRef}>
          {notifications.map((_, idx) => (
            <DropdownItem key={idx} />
          ))}
        </DropdownWrapper>
      )}
    </Container>
  );
};
export default NotifyDropdown;
