import React, { createContext, useState } from 'react';
import { Todo } from '../modal'; 

export const AppContext = createContext<any>(null)

export const TodoContext = ({children}: {children : React.ReactNode}) => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([])
  const [Auth, setAuth] = useState(false)

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if(todo) {
      setTodos([...todos, {id:Date.now(), todo, isDone: false}])
      setTodo('')
    }
  }
  const onDragEnd = (result: any) => {
    const {source, destination} = result;
    if(!destination) return

    if(destination.droppableId===source.droppableId && destination.index === source.index) return

    let add, active = [...todos], complete = [...CompletedTodos]
    console.log('active',active)
    console.log('complete',complete)
    if(source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }
    
    setCompletedTodos(complete)
    setTodos(active)
  }

  const value = {
    todo,
    setTodo,
    todos,
    setTodos,
    CompletedTodos,
    setCompletedTodos,
    onDragEnd,
    handleAdd,
    Auth,
    setAuth,
    
  }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}