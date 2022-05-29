import { useRef, useState, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Container, Wrapper, FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@assets/icon/folder_primary.svg';
import DraggableTodo from '@components/atoms/todoCheckBox/draggable';
import TodoCheckBox from '@components/atoms/todoCheckBox/index';
import { todoEditMode, todoModalContent } from '@store/todo';
import { IFolder, ITodo } from '@utils/api/Todo';
import { ITodoFolder, todoState } from 'src/store';

export interface ITodoAreaProps {
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
  todoItems,
  area,
  areaId,
  idx,
  dragMode = false,
  deleteMode,
  checkDelete,
  children,
}: ITodoAreaProps) => {
  const [todoList, setTodoList] = useRecoilState(todoState);

  const [focus, setFocus] = useState(false);
  // const [todo, setTodoList] = useState<Props>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useRecoilState(todoEditMode);
  const [editValue, setEditValue] = useRecoilState(todoModalContent);

  const handleClick = (key: number) => {
    console.log(key);
    const newToDo: ITodo = {
      id: Date.now(),
      content: '',
      status: 'todo',
    };
    setTodoList((currentFolders) => {
      const currentFolderIndex = currentFolders.findIndex((v) => v.items_id === key);
      const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
      currentFolder.todos.push(newToDo);

      currentFolders[currentFolderIndex] = currentFolder;

      return currentFolders;
    });
    setFocus(true);
  };
  const handleFocus = (key: number, value: string, todoId?: number) => {
    setFocus(false);
    if (editValue.id) {
      // 수정 모드
      const modified: ITodo = {
        id: Date.now(),
        content: value + '',
        status: 'todo',
      };
      // setTodoList((todoList) => {
      //   const todoIdx = todoList[key].findIndex((todo) => todo.id === editValue.id);
      //   return {
      //     ...todoList,
      //     [key]: [...todoList[key].slice(0, todoIdx), modified, ...todoList[key].slice(todoIdx + 1)],
      //   };
      // });
      setTodoList((currentFolders) => {
        const currentFolderIndex = currentFolders.findIndex((v) => v.items_id === key);
        const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;

        const currentTodoIndex = currentFolder.todos.findIndex((v) => v.id === todoId);
        currentFolder.todos[currentTodoIndex] = modified;

        currentFolders[currentFolderIndex] = currentFolder;

        return currentFolders;
      });
      setEditValue({
        id: null,
        content: null,
      });
    } else {
      if (!value)
        setTodoList((currentFolders) => {
          const currentFolderIndex = currentFolders.findIndex((v) => v.items_id === key);
          const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;

          currentFolder.todos.splice(-1, 1);

          currentFolders[currentFolderIndex] = currentFolder;

          return currentFolders;
        });
      else {
        const newToDo: ITodo = {
          id: Date.now(),
          content: value + '',
          status: 'todo',
        };
        setTodoList((currentFolders) => {
          const currentFolderIndex = currentFolders.findIndex((v) => v.items_id === key);
          const currentFolder = JSON.parse(JSON.stringify(currentFolders[currentFolderIndex])) as ITodoFolder;
          currentFolder.todos.push(newToDo);

          currentFolders[currentFolderIndex] = currentFolder;

          return currentFolders;
        });
      }
    }

    // if (inputRef.current === null) return;

    // if (inputRef.current.value) {
    //   const newToDo = {
    //     id: Date.now(),
    //     content: inputRef.current.value + '',
    //   };
    //   setTodoList((prev) => ({
    //     ...prev,
    //     [key]: [...prev[key].slice(0, -1), newToDo],
    //   }));
    // } else {
    //   setTodoList({ ...todo, [key]: todo[key].slice(0, -1) });
    // }
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
