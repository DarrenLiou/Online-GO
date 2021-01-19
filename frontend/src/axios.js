import axios from 'axios'

const instance = axios.create({ baseURL: 'http://localhost:4000'})

const userLogin = async (userData) => {
    const {data} = await instance.post('/login', { data: userData });
    // data is like {status: "Failed", msg: "User does not exist"}
    // console.log(data);
    return data;
}

const userRegister = async (userData) => {
    const {
        data
    } = await instance.post('/register', { data: userData });

    console.log(data.status, data.msg);
    return data;
}

const findOpponent = async (userId) => {
    const {
        data
    } = await instance.get(`/user/find/${userId}`);
}

export {userLogin, userRegister, findOpponent};