import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./Users.scss"
import userService from '../../services/userService'

const Users = (props) => {

    let history = useHistory();

    useEffect(() => {
        //gọi dữ liệu dưới sessionStorage lên để validate đăng nhập
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (!session) {
            history.push("/login");
        };
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    let [listusers, setListUsers] = useState([]);

    let fetchUsers = async () => {
        let response = await userService.fetchAllUsers();
        if (response && response.data && response.data.EC === 0 && response.data.DT) {
            // console.log('check response: ', response.data.DT);
            setListUsers(response.data.DT);
        };
    };



    return (
        <div className="container">
            < div className="manage-users-container " >
                <div className="user-header">
                    <div className="title">
                        <h1>List Users</h1>
                    </div>
                    <div className="actions d-flex justify-content-end ">
                        <button className="btn btn-primary">Add new user</button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-hover table-bordered mt-3">
                        <thead>
                            <tr>
                                <th className="col1" scope="col">STT</th>
                                <th className="col2" scope="col">Email</th>
                                <th className="col3" scope="col">Phone</th>
                                <th className="col4" scope="col">Username</th>
                                <th className="col5" scope="col">Group</th>
                                <th className="col6" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listusers && listusers.length > 0 ?
                                <>
                                    {listusers.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.username}</td>
                                                <td>{item.groupData && item.groupData.description ? item.groupData.description : ""}</td>
                                                <td >
                                                    <button className="btn btn-warning me-2" >Edit</button>
                                                    <button className="btn btn-danger" >Delete</button>
                                                </td>
                                            </tr>

                                        )
                                    })
                                    }
                                </>
                                :
                                <>
                                    <span>Not found data</span>
                                </>
                            }
                        </tbody>
                    </table>
                </div >
            </div >
        </div>
    )
};

export default Users;