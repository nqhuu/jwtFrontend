import axios from '../setup/axios';


const fetchAllGroups = async () => {
    return await axios.get(`/api/v1/group/read`);
}


export default {
    fetchAllGroups,
}