import {
  createTodo,
  removeCompletedTodos,
  removeTodo,
  setCompletedTodo,
  updateTodo,
  useTodoStore,
} from "@/store/use-todo-store"
import type { Todo } from "@/types/todos-types"
import { useState } from "react"
import { toast } from "sonner"

interface TodosReturn {
  todos: Todo[]
  addTodo: ({
    inputRef,
    input,
    setInput,
    setTransitioningItem,
    listRef,
  }: {
    listRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
    input: string
    setTransitioningItem: React.Dispatch<
      React.SetStateAction<{
        text: string
        id: string
        startY: number
      } | null>
    >
    setInput: React.Dispatch<React.SetStateAction<string>>
  }) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  saveEdit: ({
    editingText,
    editingId,
    editingTextInitial,
    setEditingId,
    setEditingText,
  }: {
    editingText: string
    editingId: string | null
    editingTextInitial: string
    setEditingText: React.Dispatch<React.SetStateAction<string>>
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>
  }) => void
  clearCompleted: () => void
}

export function useTodos(): TodosReturn {
  const initialTodos = useTodoStore.getState().Todos
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const addTodo = ({
    inputRef,
    input,
    setInput,
    setTransitioningItem,
    listRef,
  }: {
    listRef: React.RefObject<HTMLDivElement | null>
    inputRef: React.RefObject<HTMLInputElement | null>
    input: string
    setTransitioningItem: React.Dispatch<
      React.SetStateAction<{
        text: string
        id: string
        startY: number
      } | null>
    >
    setInput: React.Dispatch<React.SetStateAction<string>>
  }) => {
    if (input.trim()) {
      const inputRect = inputRef.current?.getBoundingClientRect()
      const listRect = listRef.current?.getBoundingClientRect()

      if (inputRect && listRect) {
        const newId = Date.now().toString()
        const startY = inputRect.top - listRect.top
        const payload = {
          id: newId,
          text: input.trim(),
          completed: false,
        }
        // Add the task immediately to the list
        setTodos([payload, ...todos])
        createTodo(payload)
        // Set transitioning state to show the flying element
        setTransitioningItem({
          text: input.trim(),
          id: newId,
          startY,
        })

        setInput("")

        // Clear transitioning state after animation completes
        setTimeout(() => {
          setTransitioningItem(null)
        }, 400)
        toast.success(`${payload.text} has been added!`)
      }
    } else {
      toast.error("Pls fill a value")
      inputRef.current?.focus()
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
    setCompletedTodo(id)
  }

  const deleteTodo = (id: string) => {
    const payload = todos.filter((todo) => todo.id != id)
    setTodos(payload)
    removeTodo(id)
    toast.success("Todo has been deleted!")
  }
  const saveEdit = ({
    editingText,
    editingId,
    editingTextInitial,
    setEditingId,
    setEditingText,
  }: {
    editingText: string
    editingId: string | null
    editingTextInitial: string
    setEditingText: React.Dispatch<React.SetStateAction<string>>
    setEditingId: React.Dispatch<React.SetStateAction<string | null>>
  }) => {
    const isShouldUpdate = editingText.trim() != editingTextInitial.trim()
    if (editingText.trim() && editingId && isShouldUpdate) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
        )
      )
      updateTodo(editingId, editingText)
      toast.success("Todo has been updated!")
    }
    setEditingId(null)
    setEditingText("")
  }
  const clearCompleted = () => {
    removeCompletedTodos()
    const payload = todos.filter((todo) => todo.completed == false)
    setTodos(payload)
  }
  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    saveEdit,
    clearCompleted,
  }
}
