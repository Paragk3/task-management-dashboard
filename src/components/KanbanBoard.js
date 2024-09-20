// components/KanbanBoard.js

import React from 'react';
import useTaskStore from '../store/useTaskStore';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const KanbanBoard = () => {
  const { tasks, updateTask } = useTaskStore();

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    const updatedTasks = tasks.map(task => {
      if (task.id === draggableId) {
        return { ...task, status: destination.droppableId };
      }
      return task;
    });
    updatedTasks.forEach(task => updateTask(task.id, task));
  };

  const statuses = ['ToDo', 'InProgress', 'Completed'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {statuses.map(status => (
          <Droppable key={status} droppableId={status}>
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-2">
                <h2>{status}</h2>
                {tasks.filter(task => task.status === status).map(task => (
                  <Draggable key={task.id} draggableId={task.id} index={tasks.indexOf(task)}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-2 shadow-md"
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;