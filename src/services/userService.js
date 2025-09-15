import axios from 'axios';

const LoginUser = async (formData) => {
    return await axios.post("http://localhost:8686/api/v1/login", { ...formData });
}

const RegisterUser = async (formData) => {
    return await axios.post("http://localhost:8686/api/v1/register", { ...formData });
}

const fetchAllUsers = async () => {
    return await axios.get("http://localhost:8686/api/v1/user/read");
}
export default {
    LoginUser,
    RegisterUser,
    fetchAllUsers
}