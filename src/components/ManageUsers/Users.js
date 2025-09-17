import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import "./Users.scss"
import userService from '../../services/userService'
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalConfirm from "../Modal/ModalConfirm";
import ModalUser from "../Modal/ModalUser";


const Users = (props) => {

    let history = useHistory();
    const [pageCount, setPageCount] = useState(0); // Tổng số trang
    const [currentPage, setCurrentPage] = useState(1);  // Vị trí mục hiện tại
    const [count, setCount] = useState(0); // Tổng số mục
    const [limit, setLimit] = useState(4); // Số mục hiển thị trên mỗi trang
    const [listusers, setListUsers] = useState([]);
    const [userLoginId, setUserLoginId] = useState("");
    const [isOpenModal, setIsOpenModalDelete] = useState(false);
    const [isOpenModalUser, setIsOpenModaUser] = useState(false);
    const [dataUserSelect, setDataUserSelect] = useState({});
    const [modalType, setModalType] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        username: "",
        address: "",
        groupId: 3,
        sex: "O",
        password: "",
        confirmPassword: ""
    });

    const defaultValidInput = {
        email: true,
        phone: true,
        username: true,
        address: true,
        groupId: true,
        sex: true,
        password: true,
        confirmPassword: true,
    }

    useEffect(() => {
        //gọi dữ liệu dưới sessionStorage lên để validate đăng nhập
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (!session) {
            history.push("/login");
        } else {
            setUserLoginId(session.userLoginId);
        }
    }, []);

    useEffect(() => {
        fetchUsers(limit, currentPage);
        if (count === limit) {
            setCurrentPage(1);
        }
    }, [currentPage, count]);


    let fetchUsers = async (limit, page) => {
        let response = await userService.fetchAllUsers(limit, page);
        if (response && response.data && response.data.EC === 0 && response.data.DT && response.data.DT.users) {
            setListUsers(response.data.DT.users);
            setPageCount(response.data.DT.totalPages);
            setCount(response.data.DT.totalRows);
        };
    };

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected + 1; // Xác định vị trí mới
        setCurrentPage(newOffset);
    };

    const openModal = (e, user, userLoginId) => {
        let name = e.target.name;
        if (name === "delete") {
            setDataUserSelect({ user: user, userLoginId: userLoginId });
            setIsOpenModalDelete(true);
        };

        if (name === "create") {
            setIsOpenModaUser(true)
            setModalType("create")
        }
        if (name === "edit") {
            console.log("user", user)
            setFormData({
                ...formData,
                email: user.email,
                phone: user.phone,
                username: user.username,
                address: user.address,
                groupId: user.groupData.id,
                sex: user.sex,
            })
            setIsOpenModaUser(true)
            setModalType("edit")
        }
    }
    const handleClose = (id) => {
        setIsOpenModalDelete(false);
        if (id === "modaluser") {
            setIsOpenModaUser(false);
            setFormData({
                ...formData,
                email: "",
                phone: "",
                username: "",
                address: "",
                groupId: 3,
                sex: "O",
                password: "",
                confirmPassword: ""
            })
        }
    };

    const handleLogic = async (type) => {
        let response = await userService.deleteUser(dataUserSelect.user.id, dataUserSelect.userLoginId);
        if (response && response.data && response.data.EC === 0) {
            setIsOpenModalDelete(false);
            setDataUserSelect({});
            toast.success(response.data.EM);
            fetchUsers(limit, currentPage);
        } else {
            toast.error(response.data.EM);
        }
    }

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    const isValidInputs = (type) => {
        let { password, confirmPassword, ...valueCheckEdit } = formData;
        let valueCheck = type === "create" ? { ...formData } : { ...valueCheckEdit }

        setObjCheckInput(defaultValidInput)

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!regex.test(valueCheck.email)) {
            setObjCheckInput({ ...defaultValidInput, email: false })
            toast.error("Email không hợp lệ");
            return false;
        };
        for (let key in valueCheck) {
            if (!valueCheck[key]) {
                setObjCheckInput({ ...defaultValidInput, [key]: false })
                toast.error("Vui lòng điền đầy đủ thông tin");
                return false;
            }
        }
        if (type === "create" && valueCheck && valueCheck.password && valueCheck.password.length < 6) {
            setObjCheckInput({ ...defaultValidInput, password: false, confirmPassword: false })
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return false;
        }
        if (type === "create" && valueCheck && valueCheck.password && valueCheck.confirmPassword && valueCheck.password !== valueCheck.confirmPassword) {
            toast.error("Mật khẩu không khớp");
            return false;
        };
        return true;
    }

    const handleChange = (e) => {
        let { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleRegisterOrEdit = async () => {
        try {
            let validate = isValidInputs(modalType);
            if (validate) {
                let response = {};
                if (modalType === "create") {
                    response = await userService.createUser(formData);
                }
                if (modalType === "edit") {
                    let { password, confirmPassword, ...dataUpdate } = formData;
                    response = await userService.updateUser(dataUpdate, modalType);
                }
                if (response && response.data.EC !== 0) {
                    toast.error(response.data.EM);
                }
                if (response && response.data.EC === 0) {
                    toast.success(response.data.EM);
                    setFormData({
                        ...formData,
                        email: "",
                        phone: "",
                        username: "",
                        address: "",
                        groupId: 3,
                        sex: "O",
                        password: "",
                        confirmPassword: ""
                    });
                    setIsOpenModaUser(false);
                    fetchUsers(limit, currentPage);
                    // history.push("/login")
                }
            }
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    }


    return (
        <div className="container">
            < div className="manage-users-container " >
                <div className="user-header">
                    <div className="title">
                        <h1>List Users</h1>
                    </div>
                    <div className="actions d-flex justify-content-end ">
                        <button
                            className="btn btn-primary"
                            name="create"
                            onClick={(e) => openModal(e, '', userLoginId)}
                        >Add new user</button>
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
                                                <td >{currentPage > 1 ? ((currentPage - 1) * limit + index + 1) : index + 1}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.username}</td>
                                                <td>{item.groupData && item.groupData.description ? item.groupData.description : ""}</td>
                                                <td >
                                                    <button
                                                        className="btn btn-warning me-2"
                                                        name="edit"
                                                        onClick={(e) => openModal(e, item, userLoginId)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger"
                                                        name="delete"
                                                        onClick={(e) => openModal(e, item, userLoginId)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    }
                                </>
                                :
                                <>
                                    <tr>
                                        <td>
                                            Not found data
                                        </td>
                                    </tr>
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
            <ModalConfirm
                isOpen={isOpenModal}
                handleClose={handleClose}
                handleLogic={handleLogic}
            // handleLogic={() => handleLogic(dataUserSelect.id, dataUserSelect.userLoginId)}
            />
            <ModalUser
                isOpen={isOpenModalUser}
                handleClose={handleClose}
                modalType={modalType}
                handleRegisterOrEdit={handleRegisterOrEdit}
                handleChange={handleChange}
                formData={formData}
            />
        </div>
    )
};

export default Users;