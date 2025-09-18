import React from "react"
    
export const fetchUsers = async () => {
    const response = await fetch("http://127.0.0.1:5000/users");
    const responseData = await response.json();
    return Array.isArray(responseData.users) && responseData.users.length > 0 ? responseData.users : [] 
}



export const fetchGamesFromUser = async (user) => {
    const response = await fetch(`http://127.0.0.1:5000/get-games-by-user-id/${user.id}`);
    const responseData = await response.json()
    //console.log(responseData)
    return Array.isArray(responseData.games) && responseData.games.length > 0 ? responseData.games : [] 
}


export const addGameToUser = async (game) => {
    const url = `http://127.0.0.1:5000/add-game-to-user`
    const postOptions = {
        method: "POST", 
        headers:{
            "Content-Type":"application/json"
        },
        body: game
    }
    const response = await fetch(url, postOptions)
    if (response.status !== 201 && response.status !== 200){
        const data = await response.json()
        alert(data.message)
    }
}


