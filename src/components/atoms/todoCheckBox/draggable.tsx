/* eslint-disable no-use-before-define */
import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import TodoCheckBox, { Props } from './index';

const DraggableTodoCheckBox = ({
  toDoId,
  toDoContent,
  target,
  targetId,
  handleFocus,
  inputRef,
  index,
  deleteMode,
  checkDelete,
}: Props) => {
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <TodoCheckBox
            {...{ toDoId, toDoContent, target, targetId, handleFocus, inputRef, index, deleteMode, checkDelete }}
          ></TodoCheckBox>
        </div>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableTodoCheckBox);
