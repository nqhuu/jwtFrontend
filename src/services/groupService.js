import axios from 'axios';


const fetchAllGroups = async () => {
    return await axios.get(`http://localhost:8686/api/v1/group/read`);
}


export default {
    fetchAllGroups,
}