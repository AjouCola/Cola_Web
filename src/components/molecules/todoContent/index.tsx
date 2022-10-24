/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';

import { TodoContainer, TodoInfoWrapper, Title, TodoUtils, DeleteBtn, DeleteBlock, TodoWrapper } from './styles';

import TodoMenuModal from '@components/molecules/todoMenuModal';
import TodoArea from '@molecules/todoArea';
import { todoModal } from '@store/todo';
import TodoApi, { IFolder } from '@utils/api/Todo';
import { dateFormatYYYYmmDD } from '@utils/libs/formatDate';
import { ITodoFolder, todoListState } from 'src/store';

const useDraggableTodo = (date: Date) => {
  const setTodoList = useSetRecoilState(todoListState);

  const onDragEnd = (info: any) => {
    const { destination, source } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setTodoList((allFolders) => {
        const currentAllFolders = JSON.parse(JSON.stringify(allFolders));
        const currentFolderIndex = currentAllFolders.findIndex(
          (folder: ITodoFolder) => folder.folder_id === +source.droppableId,
        );

        const todos = [...currentAllFolders[currentFolderIndex].todos];

        const toMoveItem = todos[source.index];
        const swappedItem = todos.splice(destination.index, 1, toMoveItem)[0];
        todos.splice(source.index, 1, swappedItem);

        currentAllFolders[currentFolderIndex].todos = todos;
        (async function () {
          await TodoApi.saveTodoList(dateFormatYYYYmmDD(date), currentAllFolders);
        })();
        return currentAllFolders;
      });
    }

    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setTodoList((prev) => {
        const newTodoList = JSON.parse(JSON.stringify(prev));
        const srcFolderIndex = prev.findIndex((f) => f.folder_id === +source.droppableId);
        const destFolderIndex = prev.findIndex((f) => f.folder_id === +destination.droppableId);

        const newSrcTodos = Array.from(newTodoList[srcFolderIndex].todos);
        const newDestTodos = Array.from(newTodoList[destFolderIndex].todos);
        const item = newSrcTodos.splice(source.index, 1)[0];
        newDestTodos.splice(destination.index, 0, item);
        newTodoList[srcFolderIndex].todos = newSrcTodos;
        newTodoList[destFolderIndex].todos = newDestTodos;
        (async function () {
          await TodoApi.saveTodoList(dateFormatYYYYmmDD(date), newTodoList);
        })();
        return newTodoList;
      });
    }
  };

  return onDragEnd;
};
const useDeleteTodo = (date: Date): [boolean, () => void, (todoArea: number, todoId: number) => void] => {
  const setTodoList = useSetRecoilState(todoListState);

  const [deleteMode, setDeleteMode] = useState(false);
  const [toDeleteItems, setToDeleteItems] = useState<{
    [key: number]: number[];
  }>({});

  useEffect(() => {
    setToDeleteItems({});
  }, [deleteMode]);

  const onClickDelete = () => {
    deleteTodo();
    setDeleteMode((value) => !value);
  };
  const onCheckDeleteItem = (todoArea: number, todoId: number) => {
    console.log('click delete', todoArea, todoId);
    const currentBoard = toDeleteItems[todoArea] ? [...toDeleteItems[todoArea]] : [];
    console.log(currentBoard);
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
      setTodoList((allFolders: ITodoFolder[]) => {
        const currentFolders = JSON.parse(JSON.stringify(allFolders));

        const currentFolderIndex = currentFolders.findIndex((v: ITodoFolder) => v.folder_id === +folder);

        const currentTodos = [...currentFolders[currentFolderIndex].todos];
        for (const item of toDeleteItems[folder]) {
          const itemIdx = currentTodos.findIndex((v) => v.id === item);
          currentTodos.splice(itemIdx, 1);
        }
        currentFolders[+currentFolderIndex].todos = currentTodos;
        (async function () {
          await TodoApi.saveTodoList(dateFormatYYYYmmDD(date), currentFolders);
        })();
        return currentFolders;
      });
    }
  };

  return [deleteMode, onClickDelete, onCheckDeleteItem];
};

const TodoContent = ({ today }: { today: Date }) => {
  const onDragEnd = useDraggableTodo(today);
  const [deleteMode, onClickDelete, onCheckDeleteItem] = useDeleteTodo(today);

  const todoMenuModal = useRecoilValue(todoModal);

  const [isLoading, setIsLoading] = useState(true);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  useEffect(() => {
    async function getTodoList() {
      const { folders } = await TodoApi.getTodoList(dateFormatYYYYmmDD(today));

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
    }
    if (today) {
      getTodoList();
    }
  }, [today]);

  return (
    <TodoContainer>
      <TodoInfoWrapper>
        <Title>{today.getDate()}</Title>
        <TodoUtils>
          <span>{today.toDateString().split(' ')[0].toUpperCase()}</span>
          <DeleteBtn deleteMode={deleteMode} onClick={onClickDelete}>
            <DeleteBlock deleteMode={deleteMode}>
              <Image src="/trash.svg" alt="삭제 버튼 이미지" width={18} height={36} placeholder="blur" />
            </DeleteBlock>
            삭제
          </DeleteBtn>
        </TodoUtils>
      </TodoInfoWrapper>

      <TodoWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {!isLoading &&
            todoList.map((folder: ITodoFolder, idx: number) => (
              <Droppable key={folder?.folder_id ?? Date.now()} droppableId={folder.folder_id + ''}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <TodoArea
                      date={dateFormatYYYYmmDD(today)}
                      todoItems={folder.todos}
                      area={folder.name}
                      areaId={folder.folder_id}
                      folderColor={folder.color}
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

      {todoMenuModal && <TodoMenuModal></TodoMenuModal>}
    </TodoContainer>
  );
};

export default TodoContent;
