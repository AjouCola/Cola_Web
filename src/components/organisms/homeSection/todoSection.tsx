import { useEffect, useMemo, useState } from 'react';

import styled from '@emotion/styled';

import { Type } from '@components/atoms/todoCheckBox';
import Calender from '@components/molecules/calender';
import ProgressBar from '@components/molecules/todoProgress/index';
import { progressDummy } from '@constants/homeDummy';
import { useCalendar } from '@pages/todolist';
import { ITodoFolder } from '@store/index';
import { theme } from '@styles/theme';
import TodoApi, { IFolder } from '@utils/api/Todo';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 6px #00000029;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  * {
    margin: 0px;
  }
  h2 {
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
  }
  h3 {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }
`;

const ProgressWrapper = styled.div`
  height: 100%;
  box-shadow: 0px 0px 6px #00000029;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30rem;
`;
const ProgressDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  div {
    display: flex;
    flex-direction: column;
  }
  span {
    font-size: 1.5rem;
  }
`;
const ProgressItemWrapper = styled.div`
  background: #c3cdf9;
  width: 100%;
  height: 85%;
  padding: 1.5rem 2rem;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;
const ProgressText = styled.span`
  min-width: 15%;
  flex-basis: 15%;
  color: #6c7bfa;
  font-size: 1.2rem;
`;

const TodoWrapper = styled.div`
  box-shadow: 0px 0px 6px #00000029;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  display: grid;
  max-height: 65vh;
  grid-template:
    'date content' 1fr
    '. content' 4fr
    'title content' 1fr
    /1fr 2fr;
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
    grid-template:
      'date . title' 1fr
      'content content content' 4fr
      /1fr 4fr 1fr;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
    grid-template:
      'date . title' 1fr
      'content content content' 4fr
      /1fr 4fr 1fr;
  }
`;
const DateTitle = styled.div`
  grid-area: date;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0px;
  color: white;
  h2 {
    margin: 0;
    font-size: 2.4rem;
  }
  h3 {
    margin: 0;
    font-size: 1.8rem;
  }
`;

const Title = styled.div`
  grid-area: title;
  padding: 2rem 0px;
  white-space: nowrap;
  justify-self: center;
  color: white;
`;
const RightSection = styled.div`
  grid-area: content;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

const TodoItemWrapper = styled.div`
  display: flex;
  gap: 1rem;
  height: 2rem;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
`;
const TodoCheckbox = styled.div<{ statusColor: string }>`
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 6px;
  border: 1px solid gray;
  background: ${({ statusColor }) => statusColor};
  cursor: pointer;
`;
const TodoText = styled.p`
  text-align: left;
  line-height: 2rem;
  flex: 1;
  border-radius: 14px;
  background: #6c7bfa10;
  padding: 0 0.8rem;
`;
const TodoFolderInfo = styled.div<{ folderColor: string }>`
  background: ${({ folderColor }) => folderColor};
  width: 0.4rem;
  height: 100%;
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  &:hover p {
    opacity: 1;
  }
  p {
    position: absolute;
    bottom: 2.5rem;
    left: 0;
    white-space: nowrap;
    text-overflow: ellipse;
    background: #00000070;
    padding: 0.1rem 0.5rem;
    color: #eeeeee;
    transition: all 200ms linear;
    opacity: 0;
    &::after {
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      content: '';
      border-bottom: 8px solid #00000070;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      width: 0;
      height: 0;
      transform: rotate(180deg);
      // background: #00000070;
    }
  }
`;

const DAY = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const useTodayTodo = (today: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useState<ITodoFolder[]>([]);

  useEffect(() => {
    async function getTodoList() {
      const { date, folders } = await TodoApi.getTodoList(today);

      const todoList: ITodoFolder[] =
        folders?.map(
          (folder: IFolder) =>
            ({
              name: folder.name,
              color: folder.color,
              folder_id: folder.folder_id,
              items_id: folder.item?.items_id ?? null,
              todos: folder.item?.todos ? JSON.parse(folder.item.todos as string) : [],
              progress: folder.item?.progress,
            } as ITodoFolder),
        ) ?? ([] as ITodoFolder[]);
      setTodoList(todoList);
      setIsLoading(false);
      console.log('Todo List', todoList);
      console.log('fetch todo list done');
    }
    if (today) {
      getTodoList();
    }
  }, [today]);

  const handleTodoCheck = (todo: any) => {
    /**
     * todo :{
      id: number;
      content:string;
      status:string;
      name: string;
      color: string;
      items_id: number;
      folder_id: number;
      progress: number;
      todos: ITodo[];
     * }
     */
    setTodoList((allFolders) => {
      const newFolders = JSON.parse(JSON.stringify(allFolders)) as ITodoFolder[];
      const folderIndex = allFolders.findIndex((folder) => folder.folder_id === todo.folder_id);
      const newFolder = newFolders[folderIndex];

      const currentTodo = newFolder.todos.find((v) => v.id === todo.id);
      if (currentTodo?.status) {
        currentTodo.status =
          currentTodo.status === 'todo' ? 'inProgress' : currentTodo.status === 'inProgress' ? 'done' : 'todo';
      }

      (async function () {
        await TodoApi.saveTodoList(today, newFolders);
      })();
      return newFolders;
    });
  };

  return { isLoading, todoList, handleTodoCheck };
};

const TodoSection = () => {
  const [today, date, setDate, handleChangeMonth] = useCalendar();
  const { isLoading, todoList, handleTodoCheck } = useTodayTodo(date.toISOString().slice(0, 10));

  const flattenTodoList = useMemo(() => {
    return todoList.map((folder) => folder?.todos.map((todo) => ({ ...todo, ...folder }))).flat();
  }, [todoList]);

  return (
    <>
      <CalendarWrapper>
        <Calender date={date} setDate={setDate} handleChangeMonth={handleChangeMonth} />
      </CalendarWrapper>
      <TodoWrapper>
        <DateTitle>
          <h2>{date.getDate()}</h2>
          <h3>{DAY[date.getDay()]}</h3>
        </DateTitle>
        <Title>
          <p>오늘의 할 일</p>
          <span>
            {flattenTodoList.filter((v) => v.status === 'done').length} / {flattenTodoList.length}
          </span>
        </Title>
        <RightSection>
          {!isLoading &&
            flattenTodoList.map((todo, idx) => (
              <TodoItemWrapper key={todo.id}>
                <TodoFolderInfo folderColor={todo.color}>
                  <p>{todo.name}</p>
                </TodoFolderInfo>
                <TodoText>{todo.content}</TodoText>
                <TodoCheckbox statusColor={Type[todo.status]} onClick={() => handleTodoCheck(todo)} />
              </TodoItemWrapper>
            ))}
          {(isLoading || flattenTodoList.length === 0) && (
            <p style={{ textAlign: 'center', color: 'gray' }}>오늘의 할 일이 없습니다.</p>
          )}
        </RightSection>
      </TodoWrapper>
      <ProgressWrapper>
        <ProgressDateWrapper>
          <div>
            <span>JULY</span>
            <span>WEEK</span>
          </div>
          <div>
            <span>1</span>
          </div>
        </ProgressDateWrapper>
        <ProgressItemWrapper>
          {progressDummy.map((data, index) => (
            <ProgressItem key={index}>
              <ProgressText>{data.day}</ProgressText>
              <ProgressBar color={data.color} percent={data.progress} idx={index + 1}></ProgressBar>
              <ProgressText>{Math.round(data.progress / 10)}/10</ProgressText>
            </ProgressItem>
          ))}
        </ProgressItemWrapper>
      </ProgressWrapper>
    </>
  );
};

export default TodoSection;
