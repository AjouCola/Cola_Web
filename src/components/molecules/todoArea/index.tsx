import { useRef, useState, useEffect } from 'react';

import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { Container, Wrapper, FolderTitleWrapper, BtnAddTodo } from './styles';

import FolderIcon from '@assets/icon/folder_primary.svg';
import DraggableTodo from '@components/atoms/todoCheckBox/draggable';
import TodoCheckBox from '@components/atoms/todoCheckBox/index';
import { todoEditMode, todoModalContent } from '@store/todo';
import { todoState, IToDo } from 'src/store';

export interface ITodoAreaProps {
  area: string;
  idx: number;
  // toDos: string[];
  dragMode?: boolean;
  deleteMode: boolean;
  checkDelete: (todoAre: string, todoId: number) => void;
  children: any;
}
interface Props {
  [key: string]: string[];
}

const TodoArea = ({ area, idx, dragMode = false, deleteMode, checkDelete, children }: ITodoAreaProps) => {
  const [todo, setTodoList] = useRecoilState(todoState);

  const [focus, setFocus] = useState(false);
  // const [todo, setTodoList] = useState<Props>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useRecoilState(todoEditMode);
  const [editValue, setEditValue] = useRecoilState(todoModalContent);

  const handleClick = (key: string) => {
    console.log(key);
    setTodoList({ ...todo, [key]: [...todo[key], { id: Date.now(), content: '' }] });
    setFocus(true);
  };
  const handleFocus = (key: string, value: string, todoId?: number) => {
    setFocus(false);
    if (editValue.id) {
      // 수정 모드
      setTodoList((todoList) => {
        const todoIdx = todoList[key].findIndex((todo) => todo.id === editValue.id);
        const modified = {
          id: Date.now(),
          content: value + '',
        };
        return {
          ...todoList,
          [key]: [...todoList[key].slice(0, todoIdx), modified, ...todoList[key].slice(todoIdx + 1)],
        };
      });
      setEditValue({
        id: null,
        content: null,
      });
    } else {
      if (!value) setTodoList({ ...todo, [key]: todo[key].slice(0, -1) });
      else {
        const newToDo = {
          id: Date.now(),
          content: value + '',
        };
        setTodoList((prev) => ({
          ...prev,
          [key]: [...prev[key].slice(0, -1), newToDo],
        }));
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
        <BtnAddTodo onClick={() => !focus && handleClick(area)}>+</BtnAddTodo>
      </FolderTitleWrapper>
      <Wrapper>
        {
          // dragMode에 따라 드래그 가능한 컴포넌트 or 일반 컴포넌트 렌더링
          todo[area]?.map(({ id, content }, index) =>
            dragMode ? (
              <DraggableTodo
                key={id}
                toDoId={id}
                toDoContent={content}
                target={area}
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
