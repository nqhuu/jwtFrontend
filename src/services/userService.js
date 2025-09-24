import axios from '../setup/axios';

const LoginUser = async (formData) => {
    return await axios.post("/login", { ...formData });
}

const RegisterUser = async (formData) => {
    return await axios.post("/register", { ...formData });
}

const createUser = async (formData, action) => {
    return await axios.post(`/user/create?action=${action}`, { ...formData });
}

const updateUser = async (dataUpdate, action) => {
    return await axios.put(`/user/update?action=${action}`, { ...dataUpdate });
}

const fetchAllUsers = async (limit, page) => {
    return await axios.get(`/user/read?limit=${limit}&page=${page}`);
}

const deleteUser = async (id, userLoginId) => {
    return await axios.delete(`/user/delete/${id}?userId=${userLoginId}`);
}

const fetchAllGroups = async () => {
    return await axios.get(`/group/read`);
}

const getUserAccount = async () => {
    return await axios.get(`/account`);
}


export default {
    LoginUser,
    RegisterUser,
    fetchAllUsers,
    deleteUser,
    createUser,
    updateUser,
    fetchAllGroups,
    getUserAccount,
}