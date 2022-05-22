import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { DragDropContext, Droppable, resetServerContext } from 'react-beautiful-dnd'; // eslint-disable-line

import { useRecoilState, useRecoilValue } from 'recoil';

import TodoArea from '@components/molecules/todoArea';
import { DeleteBlock, TodoInfoWrapper, TodoWrapper } from '@components/molecules/todoContent/styles';
import TodoMenuModal from '@components/molecules/todoMenuModal';
import Calender from '@molecules/calender';
import TodoContent from '@molecules/todoContent';
import EditTodoContent from '@molecules/todoContent/edit';
import { todoModal } from '@store/todo';
import {
  BackgroundView,
  BackgroundSecondView,
  Container,
  CalendarContainer,
  TodoContainer,
  MenuBtn,
  TodoDate,
  TodoUtils,
  DeleteBtn,
} from '@styles/todolist';
import { getTodoList, saveTodoList } from '@utils/api/Todo';
import { ITodoState, todoState } from 'src/store';

export const useCalendar = (): [Date, Date, (condition: number) => void] => {
  const [date, setDate] = useState(new Date());

  const today = new Date();
  const handleChangeMonth = (condition: number) => setDate(new Date(date.getFullYear(), date.getMonth() + condition));

  return [today, date, handleChangeMonth];
};

const useTodoList = (date: string | Date): [ITodoState, Dispatch<SetStateAction<ITodoState>>] => {
  const [toDos, setTodos] = useRecoilState<ITodoState>(todoState);

  useEffect(() => {
    async function fetchTodo(date: Date) {
      const toDos = await getTodoList(date);
      setTodos(toDos);
    }
    if (date) {
      fetchTodo(new Date(date));
    }
  }, [date]);
  return [toDos, setTodos];
};

const Todolist: NextPage = () => {
  const [today, date, handleChangeMonth] = useCalendar();
  const [mode, setMode] = useState('default');
  const [toDos, setToDos] = useTodoList(date);

  useEffect(() => {
    saveTodoList(date, toDos);
  }, [toDos]);

  return (
    <Container>
      <CalendarContainer>
        <Calender {...{ date, handleChangeMonth }} />
      </CalendarContainer>
      <TodoContainer>
        {mode === 'default' && <TodoContent today={today} />}
        {mode === 'edit' && <EditTodoContent />}
        <MenuBtn onClick={() => setMode((v) => (v === 'default' ? 'edit' : 'default'))}>메뉴</MenuBtn>
      </TodoContainer>
    </Container>
  );
};

export default Todolist;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext();

  return { props: { data: [] } };
};
