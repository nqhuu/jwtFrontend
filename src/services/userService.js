import axios from 'axios';

const LoginUser = async (formData) => {
    return await axios.post("http://localhost:8686/api/v1/login", { ...formData });
}

const RegisterUser = async (formData) => {
    return await axios.post("http://localhost:8686/api/v1/register", { ...formData });
}

const fetchAllUsers = async (limit, page) => {
    return await axios.get(`http://localhost:8686/api/v1/user/read/?limit=${limit}&page=${page}`);
}

const deleteUser = async (id, userId) => {
    return await axios.delete(`http://localhost:8686/api/v1/user/delete/${id}?userId=${userId}`);
}
export default {
    LoginUser,
    RegisterUser,
    fetchAllUsers,
    deleteUser
}