import { TodoContainer, TodoInfoWrapper, Title, TodoUtils, DeleteBtn, DeleteBlock, TodoWrapper } from './styles';
import { DragDropContext, DropResult, Droppable, resetServerContext } from 'react-beautiful-dnd'; // eslint-disable-line
import { useRecoilValue, useRecoilState } from 'recoil';
import TodoArea from '@molecules/todoArea';
import { todoModal } from '@store/todo';
import TodoMenuModal from '@components/molecules/todoMenuModal';
import { todoState, IToDo, ITodoState } from 'src/store';
import { useEffect, useState } from 'react';

const useDragableTodo = () => {
  const [toDos, setToDos] = useRecoilState(todoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const toMoveTodo = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination?.index, 0, toMoveTodo);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const toMoveTodo = sourceBoard.splice(source.index, 1)[0];
        destinationBoard.splice(destination?.index, 0, toMoveTodo);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return onDragEnd;
};
const useDeleteTodo = (): [boolean, () => void, (todoArea: string, todoId: number) => void] => {
  const [toDos, setToDos] = useRecoilState(todoState);

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
      setToDos((allFolder) => {
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
  const toDos = useRecoilValue(todoState);
  const onDragEnd = useDragableTodo();
  const [deleteMode, onClickDelete, onCheckDeleteItem] = useDeleteTodo();

  const todoMenuModal = useRecoilValue(todoModal);

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
      <TodoWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(toDos).map((board: string, idx) => (
            <Droppable key={board + (idx + '')} droppableId={board}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TodoArea
                    area={board}
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
