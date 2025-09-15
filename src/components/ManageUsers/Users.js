import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./Users.scss"
import userService from '../../services/userService'
import ReactPaginate from 'react-paginate';

const Users = (props) => {

    let history = useHistory();
    const limit = 2;
    const [pageCount, setPageCount] = useState(0); // Tổng số trang
    const [currentPage, setCurrentPage] = useState(1);  // Vị trí mục hiện tại
    // const [itemsPerPage, setItemsPerPage] = useState(2); // Số mục hiển thị trên mỗi trang
    // const [items, setItems] = useState([]);
    let [listusers, setListUsers] = useState([]);


    useEffect(() => {
        //gọi dữ liệu dưới sessionStorage lên để validate đăng nhập
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (!session) {
            history.push("/login");
        };
    }, []);

    useEffect(() => {
        fetchUsers(limit, currentPage);
    }, [currentPage]);

    let fetchUsers = async (limit, page) => {
        let response = await userService.fetchAllUsers(limit, page);
        if (response && response.data && response.data.EC === 0 && response.data.DT && response.data.DT.users) {
            setListUsers(response.data.DT.users);
            setPageCount(response.data.DT.totalPages);
        };
    };

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected + 1; // Xác định vị trí mới
        setCurrentPage(newOffset);
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
                <div className="uer-footer">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div >
        </div>
    )
};

export default Users;