import axios from '../setup/axios';


const fetchAllGroups = async () => {
    return await axios.get(`/group/read`);
}


export default {
    fetchAllGroups,
}