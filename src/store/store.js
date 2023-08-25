import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

/*
 * The set function has a second argument, false by default.
 * Instead of merging, it will replace the state model.
 *
 * You can log a specific action type for each set function
 * by passing a label as the third parameter.
 */

const store = set => ({
  addTask: (title, status) =>
    set(
      prevStore => ({
        tasks: [
          ...prevStore.tasks,
          {
            id: crypto.randomUUID(),
            title,
            status,
          },
        ],
      }),
      false,
      'addTask'
    ),
  deleteTask: id =>
    set(
      prevStore => ({
        tasks: prevStore.tasks.filter(task => task.id !== id),
      }),
      false,
      'deleteTask'
    ),
  draggedTask: null,
  moveTask: (id, status) =>
    set(
      prevStore => ({
        tasks: prevStore.tasks.map(task =>
          task.id === id
            ? {
                ...task,
                status,
              }
            : task
        ),
      }),
      false,
      'moveTask'
    ),
  setDraggedTask: id =>
    set(
      {
        draggedTask: id,
      },
      false,
      'setDraggedTask'
    ),
  tasks: [],
})

// custom logger middleware
const log = config => (set, get, api) =>
  config(
    (...args) => {
      console.log('🚀 -> logger:', args)
      set(...args)
    },
    get,
    api
  )

export const useStore = create(
  log(
    persist(devtools(store), {
      name: 'my-kanban-store',
    })
  )
)
