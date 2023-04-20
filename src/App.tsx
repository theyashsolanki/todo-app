import { FC, useContext, useEffect } from 'react'
import './App.css'
import { AppContext } from './context/AppContext'
import Login from './pages/Login'
import { auth, db } from './config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'
import Home from './pages/Home'


const App: FC = () => {

 const { setAuth, todos, CompletedTodos, Auth, setTodos, setCompletedTodos} = useContext(AppContext)

 useEffect(() => {
    const unsub = auth.onAuthStateChanged(user => {
      if(user) {
        setAuth(true)
        console.log('auth',Auth)
        
      } else {
        setAuth(false)
        console.log('false')
      }
    })
    return () => {
      unsub()
    }
 }, [])


 useEffect(() => {
   const initialize = async () => {
     await setDoc(doc(db, "todos", `${auth?.currentUser?.uid}`),{});
     const docRef = await getDoc(doc(db, 'todos', `${auth.currentUser?.uid}`))
     setTodos(docRef.data()?.Active || [])
     setCompletedTodos(docRef.data()?.Completed || [])
    }
    initialize()
 }, [])


 useEffect(() => {
   const updateDocument = async () => {
      if(Auth) {
        await setDoc(
          doc(db, "todos", `${auth?.currentUser?.uid}`),
          {
            Active: todos,
            Completed: CompletedTodos,
            username: auth.currentUser?.displayName
          }
        );
      }
  }
  updateDocument()
 },[todos, CompletedTodos])

 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App 
