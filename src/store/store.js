import { create } from 'zustand'

const store = set => ({
  addTask: (title, status) =>
    set(prevStore => ({
      tasks: [
        ...prevStore.tasks,
        {
          id: crypto.randomUUID(),
          title,
          status,
        },
      ],
    })),
  deleteTask: id =>
    set(prevStore => ({
      tasks: prevStore.tasks.filter(task => task.id !== id),
    })),
  draggedTask: null,
  moveTask: (id, status) =>
    set(prevStore => ({
      tasks: prevStore.tasks.map(task =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task
      ),
    })),
  setDraggedTask: id =>
    set({
      draggedTask: id,
    }),
  tasks: [],
})

export const useStore = create(store)
