import { useState } from "react";


const UserForm = ({ userToUpdate = {}, updateCallBack}) => {
    const [name, setName] = useState(userToUpdate.name || "")
    const [userName, setUserName] = useState(userToUpdate.userName || "")
    

    const isUpdating = Object.entries(userToUpdate).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name,
            userName
        }

        const url = 'http://127.0.0.1:5000/' + (isUpdating ? `update-user/${userToUpdate.id}` : 'create-user') 
        const postOptions = {
            method: isUpdating ? "PATCH" : "POST", 
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(userData)
        }
        //console.log(JSON.stringify(userData));
        const response = await fetch(url, postOptions)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            //alert(data.message)
        }else{
            updateCallBack()
        }
    }


    return(
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>

            <div>
                <label htmlFor="userName">User Name:</label>
                <input 
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
            </div>
            <button type="submit">{isUpdating ? "Update User" : "Create User"}</button>
        </form>
    )
}

export default UserForm