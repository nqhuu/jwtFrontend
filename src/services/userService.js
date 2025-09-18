import axios from '../setup/axios';

const LoginUser = async (formData) => {
    return await axios.post("/api/v1/login", { ...formData });
}

const RegisterUser = async (formData) => {
    return await axios.post("/api/v1/register", { ...formData });
}

const createUser = async (formData, action) => {
    return await axios.post(`/api/v1/user/create?action=${action}`, { ...formData });
}

const updateUser = async (dataUpdate, action) => {
    return await axios.put(`/api/v1/user/update?action=${action}`, { ...dataUpdate });
}

const fetchAllUsers = async (limit, page) => {
    return await axios.get(`/api/v1/user/read/?limit=${limit}&page=${page}`);
}

const deleteUser = async (id, userLoginId) => {
    return await axios.delete(`/api/v1/user/delete/${id}?userId=${userLoginId}`);
}

const fetchAllGroups = async () => {
    return await axios.get(`/api/v1/group/read`);
}



export default {
    LoginUser,
    RegisterUser,
    fetchAllUsers,
    deleteUser,
    createUser,
    updateUser,
    fetchAllGroups
}