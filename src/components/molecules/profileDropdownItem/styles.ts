import styled from '@emotion/styled';
export const ItemContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.blue[200]};
  padding: 0.6rem 0;
  width: 100%;
  gap: 0.5rem;
`;
export const TextWrapper = styled.div`
  width: 100%;
  padding: 0 0.4rem;
`;
export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
  font-size: 0.9rem;
  width: 100%;
  gap: 1rem;
`;
export const ActiveIcon = styled.div<{ isActive: boolean }>`
  display: inline-block;
  vertical-align: middle;
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background: ${({ theme: { colors }, isActive }) => (isActive ? colors.blue[500] : colors.blue[300])};
`;
export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
export const DateText = styled.span`
  color: gray;
`;
export const TitleWrapper = styled.div`
  flex: 1;
  padding: 0.2rem 0.6rem;
  background: ${({ theme: { colors } }) => colors.blue[10]};
  border-radius: 14px;
  font-weight: 500;
`;
export const TitleCategory = styled.span`
  color: ${({ theme: { colors } }) => colors.blue[500]};
  margin-right: 0.5rem;
`;
