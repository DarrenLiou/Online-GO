import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:6273'})

const userLogin = async (userData) => {
    const {data} = await instance.post('/login', { data: userData });
    // data is like {status: "Failed", msg: "User does not exist"}
    return data;
}

const userRegister = async (userData) => {
    const {
        data
    } = await instance.post('/register', { data: userData });

    return data;
}

const sendUserId = async (userId, webSocketId) =>{
    const {data} = await instance.post(`/user/set/${userId}/${webSocketId}`);
    console.log(data);
}

const findOpponent = async (userId) => {
    const {
        data
    } = await instance.get(`/user/find/${userId}`);
    console.log(data)
    return data;
}

const makeMove = async (boardId, userId, moveData) => {
    console.log('------make move by:', userId)
    const {data} = await instance.post(`/user/game/move/${boardId}/${userId}`, 
                {data: moveData});
    console.log(data); // return if move has been made
}

export {userLogin, userRegister, sendUserId, findOpponent, makeMove};
