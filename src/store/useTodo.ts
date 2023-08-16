import { create } from "zustand"
import ITodo from "../types/ITodo"

interface State {
  todos: ITodo[]
}

interface Action {
  setTodos: (newTodos: ITodo[]) => void
  addTodo: (newTodo: ITodo) => void
  updateText: (newText: string, todoId: string) => void
  toggleTodoStatus: (todoId: string) => void
  deleteCompleted: () => void
}

export const useTodo = create<State & Action>((set) => ({
  todos: [],
  setTodos: (newTodos: ITodo[]) => set(() => ({ todos: newTodos })),
  addTodo: (newTodo: ITodo) =>
    set((state) => ({ todos: [...state.todos, newTodo] })),
  toggleTodoStatus: (todoId: string) =>
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
      return { todos: updatedTodos }
    }),
  updateText: (newText: string, todoId: string) =>
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, title: newText } : todo
      )
      return { todos: updatedTodos }
    }),
  deleteCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.completed === false),
    })),
}))
