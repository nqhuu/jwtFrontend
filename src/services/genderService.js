
import axios from 'axios';


const fetchAllGender = async () => {
    return await axios.get(`http://localhost:8686/api/v1/group/read`);
}


export default {
    fetchAllGender,
}