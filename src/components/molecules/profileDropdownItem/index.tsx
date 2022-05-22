import {
  ItemContainer,
  TextWrapper,
  ContentWrapper,
  ActiveIcon,
  FlexBox,
  DateText,
  TitleWrapper,
  TitleCategory,
} from './styles';

import NotifyIcon from '@assets/icon/notify.svg';

const DropdownItem = () => {
  return (
    <ItemContainer>
      <div>
        <NotifyIcon />
      </div>
      <TextWrapper>
        <ContentWrapper>
          <TitleWrapper>
            <TitleCategory>질문</TitleCategory>
            <span>제목제목제목</span>
          </TitleWrapper>
          <FlexBox>
            <DateText>05.16 00:00</DateText>
            <ActiveIcon isActive={true} />
          </FlexBox>
        </ContentWrapper>

        <ContentWrapper>
          <p>댓글내용댓글내용</p>
        </ContentWrapper>
      </TextWrapper>
    </ItemContainer>
  );
};
export default DropdownItem;
