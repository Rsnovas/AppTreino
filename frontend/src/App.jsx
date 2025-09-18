import { useState, useEffect, use } from 'react'
import UsersList from './UsersList'
import GamesList from './GamesList'
import './App.css'
import UserForm from './UserForm'

function App() {
  const [users, setUsers] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(false)
  const [game , setGame] = useState({user:1, name:"unknown", genre:"action"})

  useEffect( () => { fetchUsers() },[] )

  const fetchUsers = async () => {
        const response = await fetch("http://127.0.0.1:5000/users")
        const responseData = await response.json()
        setUsers(responseData.users)
  }

  const showModal = () => {
    if (isFormOpen === true) return
    setIsFormOpen(true)
    setSelectedUser({})
  }

  const closeModal = () => {
    if (isFormOpen === false) return
    setIsFormOpen(false)
  }

  const openModalInEditMode = (user) => {
    if(isFormOpen) return
    setSelectedUser(user)
    setIsFormOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchUsers()
  }
  
  return (
    <div>
      <h2>Users List</h2>
        <UsersList users={users} updateUser={openModalInEditMode} onUpdateCallBack={onUpdate}/>
        <button onClick={showModal}>Add User</button>
        {
          isFormOpen && <div className="popup">
            <div className="popup-content">
              <span className='close' onClick={closeModal}>&times;</span>
              <UserForm userToUpdate={selectedUser} updateCallBack={onUpdate}/>
            </div>
          </div>
        }
      <GamesList/>
    </div>
  )

}

export default App
