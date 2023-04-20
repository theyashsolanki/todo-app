import { FC, useContext } from 'react'
import './styles.css'
import { Todo } from '../modal';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';
import { AppContext } from '../context/AppContext';



const TodoList: FC = () => {
  const {todos, setTodos, setCompletedTodos, CompletedTodos} = useContext(AppContext)
 

  return (
    <div className='Container'>
      <Droppable droppableId='TodosList'>
        {
          (provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver? 'dragactive': ''}`} 
          ref={provided.innerRef} 
          {...provided.droppableProps}
          >
            <span className='todos__heading'>
              Active Tasks
            </span>
            { 
              todos?.map((todo:Todo,index:number) => 
                <SingleTodo index={index} todo={todo} key={todo.id} setTodos={setTodos}/>)
            }
            {provided.placeholder}
          </div>
          )
        }
      </Droppable>
      <Droppable droppableId='TodosRemove'>
        {
          (provided, snapshot) => (
            <div className={`todos remove ${snapshot.isDraggingOver ? 'dragcomplete': ''}`} 
            ref={provided.innerRef} 
            {...provided.droppableProps}
            >
              <span className='todos__heading'>
                  Completed Tasks
                </span>
                { 
                  CompletedTodos?.map((todo:Todo, index:number) => 
                    <SingleTodo index={index} todo={todo} key={todo.id} setTodos={setCompletedTodos}/>)
                }
                {provided.placeholder}
            </div>
          )
        }
      </Droppable>
       
    </div>
  )
}

export default TodoList