/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';

import { useRecoilValue, useRecoilState, useRecoilValueLoadable, useRecoilStateLoadable } from 'recoil';

import {
  TodoContainer,
  TodoInfoWrapper,
  Title,
  TodoUtils,
  DeleteBtn,
  DeleteBlock,
  TodoWrapper,
  TodoDate,
} from './styles';

import { DragDropContext, DropResult, Droppable, resetServerContext } from 'react-beautiful-dnd'; // eslint-disable-line
import TodoMenuModal from '@components/molecules/todoMenuModal';
import TodoArea from '@molecules/todoArea';
import { todoModal } from '@store/todo';
import TodoApi, { IFolder, IFolders } from '@utils/api/Todo';
import { ITodoFolder, todoListState } from 'src/store';

const useDragableTodo = (date: Date) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) return;
    // console.log(destFolder, srcFolder);

    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setTodoList((prev: any) => {
        const newTodoList = JSON.parse(JSON.stringify(prev));
        // droppableId === folderId
        const srcFolderIndex = prev.findIndex((f: any) => f.items_id == source.droppableId);
        const destFolderIndex = prev.findIndex((f: any) => f.items_id == destination.droppableId);

        // source.index에서 1개 잘라서 destination.index에 1개 넣기
        const newSrcTodos = Array.from(newTodoList[srcFolderIndex].todos);
        const newDestTodos = Array.from(newTodoList[destFolderIndex].todos);
        const item = newSrcTodos.splice(source.index, 1)[0];
        newDestTodos.splice(destination.index, 0, item);
        newTodoList[srcFolderIndex].todos = newSrcTodos;
        newTodoList[destFolderIndex].todos = newDestTodos;

        return newTodoList;
      });
    }
  };

  return onDragEnd;
};
const useDeleteTodo = (date: Date): [boolean, () => void, (todoArea: string, todoId: number) => void] => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const [deleteMode, setDeleteMode] = useState(false);
  const [toDeleteItems, setToDeleteItems] = useState<{
    [key: string]: number[];
  }>({});

  useEffect(() => {
    setToDeleteItems({});
  }, [deleteMode]);

  const onClickDelete = () => {
    deleteTodo();
    setDeleteMode((value) => !value);
  };
  const onCheckDeleteItem = (todoArea: string, todoId: number) => {
    const currentBoard = toDeleteItems[todoArea] ? [...toDeleteItems[todoArea]] : [];

    if (!currentBoard.find((v) => v === todoId)) {
      currentBoard.push(todoId);
    }
    setToDeleteItems((current) => {
      return {
        ...current,
        [todoArea]: currentBoard,
      };
    });
  };

  const deleteTodo = () => {
    for (const folder in toDeleteItems) {
      setTodoList((allFolder: any) => {
        const items = [...allFolder[folder]];
        for (const item of toDeleteItems[folder]) {
          const itemIdx = items.findIndex((v) => v.id === item);
          items.splice(itemIdx, 1);
        }
        return { ...allFolder, [folder]: items };
      });
    }
  };

  return [deleteMode, onClickDelete, onCheckDeleteItem];
};

const TodoContent = ({ today }: { today: Date }) => {
  const onDragEnd = useDragableTodo(today);
  const [deleteMode, onClickDelete, onCheckDeleteItem] = useDeleteTodo(today);

  const todoMenuModal = useRecoilValue(todoModal);

  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    (async function () {
      const contents = await TodoApi.getTodoList(today.toISOString().slice(0, 10));
      const { folders } = contents;

      const todoList: ITodoFolder[] = folders.map(
        (folder: IFolder) =>
          ({
            name: folder.name,
            color: folder.color,
            items_id: folder.items.items_id,
            todos: folder.items.todos,
          } as ITodoFolder),
      );
      setTodoList(todoList);
      setIsLoading(false);
    })();
  }, [today]);

  // useEffect(() => {}, [todoList]);
  return (
    <TodoContainer>
      <TodoInfoWrapper>
        <Title>{today.getDate()}</Title>
        <TodoUtils>
          <span>{today.toDateString().split(' ')[0].toUpperCase()}</span>
          <DeleteBtn deleteMode={deleteMode} onClick={onClickDelete}>
            <DeleteBlock deleteMode={deleteMode}>
              <img src="/trash.svg" />
            </DeleteBlock>
            삭제
          </DeleteBtn>
        </TodoUtils>
      </TodoInfoWrapper>
      {isLoading && 'Loading...'}
      {!isLoading && (
        <TodoWrapper>
          <DragDropContext onDragEnd={onDragEnd}>
            {todoList.map((folder: ITodoFolder, idx: number) => (
              <Droppable key={folder.items_id + (idx + '')} droppableId={folder.items_id + ''}>
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TodoArea
                      todoItems={folder.todos}
                      area={folder.name}
                      idx={idx}
                      dragMode={true}
                      deleteMode={deleteMode}
                      checkDelete={onCheckDeleteItem}
                    >
                      {provided.placeholder}
                    </TodoArea>
                  </div>
                )}
              </Droppable>
            ))}
          </DragDropContext>
        </TodoWrapper>
      )}
      {todoMenuModal && <TodoMenuModal></TodoMenuModal>}
    </TodoContainer>
  );
};

export default TodoContent;
