import React, { useContext, useRef } from 'react'
import './styles.css'
import { AppContext } from '../context/AppContext';
// u idiot

const InputFeild: React.FC = () => {
  const {handleAdd, setTodo, todo} = useContext(AppContext)

  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input ' onSubmit={(e) => {
      handleAdd(e)
      inputRef.current?.blur();
    }}>
        <input type="text" placeholder='Enter a task' className='input__box'
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}/>
        <button className='absolute active:scale-90 right-3 border-4 p-3 rounded-xl bg-blue-500 text-white'>
            Submit
        </button>
    </form>
 )
}
export default InputFeild