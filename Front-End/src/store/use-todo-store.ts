import type { Todo } from "@/types/todos-types"
import { create } from "zustand"
import { persist } from "zustand/middleware"
export type storeType = {
  Todos: Todo[]
}

export const useTodoStore = create<storeType>()(
  persist(
    (set) => ({
      Todos: [],
    }),
    {
      name: "todo-store",
    }
  )
)

export const createTodo = (data: Todo) =>
  useTodoStore.setState((state) => ({
    Todos: [...state.Todos, data],
  }))

export const removeCompletedTodos = () =>
  useTodoStore.setState((state) => ({
    Todos: state.Todos.filter((todo) => todo.completed == false),
  }))

export const removeTodo = (id: string) =>
  useTodoStore.setState((state) => ({
    Todos: state.Todos.filter((todo) => todo.id != id),
  }))

export const setCompletedTodo = (id: string) =>
  useTodoStore.setState((state) => ({
    Todos: state.Todos.map((todo) =>
      todo.id == id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    ),
  }))

export const updateTodo = (id: string, text: string) =>
  useTodoStore.setState((state) => ({
    Todos: state.Todos.map((todo) =>
      todo.id == id
        ? {
            ...todo,
            text,
          }
        : todo
    ),
  }))

export const clearTodo = () =>
  useTodoStore.setState(useTodoStore.getInitialState())
