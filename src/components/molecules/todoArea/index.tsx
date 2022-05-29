import { useRef, useState, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Container, Wrapper, FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@assets/icon/folder_primary.svg';
import DraggableTodo from '@components/atoms/todoCheckBox/draggable';
import TodoCheckBox from '@components/atoms/todoCheckBox/index';
import { todoEditMode, todoModalContent } from '@store/todo';
import TodoApi, { IFolder, ITodo } from '@utils/api/Todo';
import { ITodoFolder, todoListState, todoState } from 'src/store';

export interface ITodoAreaProps {
  date: string;
  area: string;
  areaId: number;
  idx: number;
  // toDos: string[];
  todoItems: ITodo[];
  dragMode?: boolean;
  deleteMode: boolean;
  checkDelete: (todoAre: number, todoId: number) => void;
  children: any;
}
interface Props {
  [key: string]: string[];
}

const TodoArea = ({
  date,
  todoItems,
  area,
  areaId,
  idx,
  dragMode = false,
  deleteMode,
  checkDelete,
  children,
}: ITodoAreaProps) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const [focus, setFocus] = useState(false);
  // const [todo, setTodoList] = useState<Props>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useRecoilState(todoEditMode);
  const [editValue, setEditValue] = useRecoilState(todoModalContent);

  const handleClick = (key: number) => {
    console.log('handleClick', key, todoList);
    const newToDo: ITodo = {
      id: Date.now(),
      content: '',
      status: 'todo',
    };
    setTodoList((currentFolders) => {
      console.log('currentFolders, key', currentFolders, key);
      const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
      console.log('currentFolderIndex', currentFolderIndex);
      const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
      currentFolder.todos.push(newToDo);

      const newFolders: ITodoFolder[] = [...currentFolders];
      newFolders[currentFolderIndex] = currentFolder;

      return newFolders;
    });
    setFocus(true);
  };
  const handleFocus = async (key: number, value: string, todoId?: number) => {
    setFocus(false);
    console.log('handleFocus', key, value, todoId);
    if (editValue.id) {
      // 수정 모드
      const modified: ITodo = {
        id: Date.now(),
        content: value + '',
        status: 'todo',
      };

      setTodoList((currentFolders) => {
        const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
        const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
        currentFolder.todos = [...currentFolder.todos.slice(0, -1), modified];

        const newFolders = [...currentFolders];
        newFolders.splice(currentFolderIndex, 1, currentFolder);
        return newFolders;
      });
      setEditValue({
        id: null,
        content: null,
      });
      (async function () {
        await TodoApi.saveTodoList(date, todoList);
      })();
    } else {
      if (!value)
        setTodoList((currentFolders) => {
          const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
          const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;

          currentFolder.todos.splice(-1, 1);

          const newFolders: ITodoFolder[] = [...currentFolders];
          newFolders[currentFolderIndex] = currentFolder;

          return newFolders;
        });
      else {
        const newToDo: ITodo = {
          id: Date.now(),
          content: value + '',
          status: 'todo',
        };
        setTodoList((currentFolders) => {
          const currentFolderIndex = currentFolders.findIndex((v) => v.folder_id === key);
          const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
          currentFolder.todos = [...currentFolder.todos.slice(0, -1), newToDo];

          const newFolders = [...currentFolders];
          newFolders.splice(currentFolderIndex, 1, currentFolder);
          return newFolders;
        });
        (async function () {
          await TodoApi.saveTodoList(date, todoList);
        })();
      }
    }
  };

  return (
    <Container>
      <FolderTitleWrapper>
        <div>
          <span>
            <FolderIcon />
          </span>
          <span>{area}</span>
        </div>
        <BtnAddTodo onClick={() => !focus && handleClick(areaId)}>+</BtnAddTodo>
      </FolderTitleWrapper>
      <Wrapper>
        {
          // dragMode에 따라 드래그 가능한 컴포넌트 or 일반 컴포넌트 렌더링

          todoItems?.map(({ id, content }, index) =>
            dragMode ? (
              <DraggableTodo
                key={id}
                toDoId={id}
                toDoContent={content}
                target={area}
                targetId={areaId}
                handleFocus={handleFocus}
                inputRef={inputRef}
                index={index}
                deleteMode={deleteMode}
                checkDelete={checkDelete}
              />
            ) : (
              <TodoCheckBox
                key={id}
                toDoId={id}
                toDoContent={content}
                target={area}
                targetId={areaId}
                handleFocus={handleFocus}
                inputRef={inputRef}
                index={index}
                deleteMode={deleteMode}
                checkDelete={checkDelete}
              />
            ),
          )
        }
        {dragMode && children}
      </Wrapper>
    </Container>
  );
};
export default TodoArea;
