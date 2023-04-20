import { FC, FormEvent, useEffect, useRef, useState } from 'react'
import { Todo } from '../modal'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

interface SingleTodoProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>> | any
  index: number
}

const SingleTodo: FC<SingleTodoProps> = ({todo, setTodos, index}) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id:number) => {
        if(!edit) {
            setTodos((prev:any) => {
                return prev.map((prev:any) => prev.id === id ? {...prev, isDone:!todo.isDone} : prev)
            })
        }
    }
    
    const handleDelete = (id:any) => {
        setTodos((prev:any) => prev.filter((prev:any) => prev.id !== id))
    }
    const handleEdit = (e: FormEvent, id:any) => {
        e.preventDefault()
        setTodos((prev:any) => {
            return prev.map((prev:any) => prev.id === id ? {...prev, todo:editTodo} : prev)
        })
        setEdit(false)
    }
    const inputRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])
    
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>

        {
            (provided, snapshot) => (
            <form className={`todos__single ${snapshot.isDragging ? 'drag': ''}`} 
                
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {
                    edit ? (
                        <textarea 
                        value={editTodo}
                        onChange={(e) => setEditTodo(e.target.value)}
                        className='todos__single--text'
                        onBlur={() => {
                            setTodos((prev:any) => {
                                return prev.map((prev:any) => prev.id === todo.id ? {...prev, todo:editTodo} : prev)
                            })
                            setEdit(false)
                        }}
                        onFocus={() => {
                            inputRef.current?.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEdit(e, todo.id)
                            }
                        }}
                        ref={inputRef}/>
                    ):( todo.isDone ? (
                        <s className='todos__single--text'>{todo.todo}</s>
                    ):(
                        <span className='todos__single--text'>{todo.todo}</span>
                    ))
                    
                }
                
                <div className='icons'>
                    <span className='icon' onClick={() => {
                        if(!edit && !todo.isDone) {
                            setEdit(true)
                        }
                    }}>
                        <AiFillEdit size={20}/>
                    </span>
                    <span className='icon' onClick={() => handleDelete(todo.id)}>
                        <AiFillDelete size={20} color='red'/>
                    </span>
                    <span className='icon' onClick={() => handleDone(todo.id)}>
                        <MdDone size={20} color='green'/>
                    </span>
                </div>
            </form>
            )
        }
    </Draggable>
  )
}

export default SingleTodo