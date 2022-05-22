import { TabContainer, TabItem } from './styles';

const Tab = ({ currentTab, onClickTab }: { currentTab: string; onClickTab: (tab: string) => void }) => {
  return (
    <TabContainer>
      <TabItem selected={currentTab === '댓글'} onClick={() => onClickTab('댓글')}>
        <span>댓글</span>
      </TabItem>
      <TabItem selected={currentTab === '좋아요'} onClick={() => onClickTab('좋아요')}>
        <span>좋아요</span>
      </TabItem>
    </TabContainer>
  );
};
export default Tab;
