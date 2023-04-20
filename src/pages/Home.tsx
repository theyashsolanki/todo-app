import { FC, useContext, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppContext } from '../context/AppContext'
import { auth, db } from '../config/firebase'
import InputFeild from '../components/InputFeild'
import TodoList from '../components/TodoList'
import {Navigate} from'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'




const Home: FC = () => {
    const {onDragEnd, Auth, setCompletedTodos, setTodos} = useContext(AppContext)

    useEffect(() => {
      const updateData = async () => {
        const docRef = await getDoc(doc(db, 'todos', `${auth.currentUser?.uid}`))
        setTodos(docRef.data()?.Active || [])
        setCompletedTodos(docRef.data()?.Completed || [])
      }
      Auth && updateData()
    },[])

    if(!Auth) {
        return <Navigate to='/login'/>
    }

    
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='App relative' >
        <div className='flex items-center w-full justify-center'>
          <span className='heading'>Notes</span>
          <div className='absolute right-20 flex gap-3 h-fit items-center bottom-5 md:top-10'>
            <img width={35} className='rounded-full' src={`${auth.currentUser?.photoURL}`} alt="" />
            <span className='text-white'>{auth.currentUser?.displayName}</span>
            <button className='border  p-2 bg-red-500 text-white rounded-lg active:scale-90' 
            onClick={() => auth.signOut()}>
                logout
            </button>
          </div>
        </div>
        <InputFeild />
        <TodoList />
      </div>
    </DragDropContext>
  )
}

export default Home