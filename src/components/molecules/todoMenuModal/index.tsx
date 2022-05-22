import { useRecoilState, useSetRecoilState } from 'recoil';

import { ModalBg, ModalContent, MenuItem, TodoTitle } from './styles';

import { todoEditMode, todoModal, todoModalContent } from '@store/todo';

const TodoMenuModal = () => {
  const setTodoMenuModal = useSetRecoilState(todoModal);
  const [todo, setTodoModalContent] = useRecoilState(todoModalContent);
  const setTodoEditMode = useSetRecoilState(todoEditMode);

  const onClickEditTodo = () => {
    setTodoMenuModal(false);
    setTodoEditMode(todo.id);
  };
  const onClickClose = () => {
    setTodoMenuModal(false);
    setTodoEditMode(null);
  };

  return (
    <ModalBg>
      <ModalContent>
        <TodoTitle>
          <span>{todo.content}</span>
        </TodoTitle>
        <MenuItem>
          <span onClick={onClickEditTodo}>수정</span>
        </MenuItem>
        <MenuItem>
          <span onClick={onClickClose}>닫기</span>
        </MenuItem>
      </ModalContent>
    </ModalBg>
  );
};
export default TodoMenuModal;
