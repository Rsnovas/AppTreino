import React, { useEffect } from "react";
import { useState } from "react";
import {fetchUsers, fetchGamesFromUser, addGameToUser} from "./Services";

const GamesList = ({user}) => {
    
    const[users, setUsers] = useState([])
    const[selectedUser, setSelectedUser] = useState([])
    const[gamesList, setGamesList] = useState([])
    const[showForm, setShowForm] = useState(false)

    useEffect(() => {
        
         (async () => {
            const usersData = await fetchUsers()
            setUsers(usersData)
        })();

    }, [])

    
    const onDropDownChanged = (e) => {
        const userId = parseInt(e.target.value);
        const user = users.find(u => u.id === userId);
        setSelectedUser(user)
    }

    const getGames = async () =>{
        const responseData = await fetchGamesFromUser(selectedUser)
        setGamesList(responseData)
    }

    const showAddGameForm = () =>
    {
        setShowForm(!showForm)
    }

    const onFormSubmit = async (e) =>{
        e.preventDefault()
        const form = e.target;
        const formData = {
            userId: form.userId.value,
            gameName: form.gameName.value,
            gameGenre: form.gameGenre.value,
        };

        console.log("Form Data:", formData);

        await addGameToUser(formData)
        await getGames(selectedUser)
    }

    return <div>
        <button onClick={showAddGameForm}>{showForm ? "Close Form" : "Add Game"}</button>
        {
            showForm &&
            <form onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="userId">Select User:</label>
                <select id="userId" name="userId" defaultValue="">
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="gameName">Game Name:</label>
                <input
                    type="text"
                    id="gameName"
                    name="gameName"
                    placeholder="Enter game name"
                />
            </div>

            <div>
                <label htmlFor="gameGenre">Game Genre:</label>
                <input
                    type="text"
                    id="gameGenre"
                    name="gameGenre"
                    placeholder="Enter game genre"
                />
            </div>

            <button type="submit">Add Game</button>
        </form>

        }
        
        <div>
            <h2>Games List</h2>
            <li>
                <select value={selectedUser ? selectedUser.id : ""} onChange={onDropDownChanged}>
                    <option value="">Select a user</option>
                    {
                        users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))
                    }
                </select>
                <button onClick={getGames}>Search Games</button>
            </li>

        </div>
        
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Purchase Date</th>
                </tr>
            </thead>
            <tbody>
                {
                gamesList.map((game) => (
                    <tr key={game.gameId}> 
                        <td>{game.gameName}</td>
                        <td>{game.gameGenre}</td>
                        <td>{game.purchaseDate}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default GamesList

