import React from "react";

const UsersList = ({users, updateUser, onUpdateCallBack}) =>{

    const onDelete = async (id) => {

        const url = `http://127.0.0.1:5000/delete-user/${id}`
        console.log(url)
        const deleteOptions = {
            method: "DELETE", 
        }
        const response = await fetch(url, deleteOptions)
        if (response.status === 200){
            onUpdateCallBack()
        }else{
            alert("error on delete")
        }
    }
    return <div>
        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>User Name</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) =>(
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.userName}</td>
                        <td>
                            <button onClick={() => updateUser(user)}>Update</button>
                            <button onClick={() => onDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default UsersList