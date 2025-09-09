import { useHistory } from 'react-router-dom';
import './Register.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login")
    };

    // ==============tạo state đơn lẻ với useState====================
    // const [email, setmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    // ==============tạo state với useState obj=======================
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const defaultValidInput = {
        email: true,
        phone: true,
        username: true,
        password: true,
        confirmPassword: true,
    }
    const [objCheckInput, setobjCheckInput] = useState(defaultValidInput)


    useEffect(() => {
        // axios.get("http://localhost:8686/api/v1/user")
        //     .then((response) => {
        //         console.log("==>>>>>>>>>> check data", response);
        //     })
        //     .catch((error) => {
        //         console.error("Lỗi gọi API:", error);
        //     });
    }, []);

    const isValidInputs = () => {
        let valueCheck = { ...formData };
        setobjCheckInput(defaultValidInput)

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!regex.test(valueCheck.email)) {
            setobjCheckInput({ ...defaultValidInput, email: false })
            toast.error("Email không hợp lệ");
            return false;
        };
        for (let key in valueCheck) {
            console.log()
            if (!valueCheck[key]) {
                setobjCheckInput({ ...defaultValidInput, [key]: false })
                toast.error("Vui lòng điền đầy đủ thông tin");
                return false;
            }
        }
        if (valueCheck.password.length < 6) {
            setobjCheckInput({ ...defaultValidInput, password: false, confirmPassword: false })
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return false;
        }
        if (valueCheck.password !== valueCheck.confirmPassword) {
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

    const handleRegister = async () => {
        let validate = isValidInputs();
        if (validate) {
            await axios.post("http://localhost:8686/api/v1/register", { ...formData })
                .then((response) => {
                    console.log("==>>>>>>>>>> check data", response.data);
                    if (response && response.data.EC != 0) {
                        toast.error(response.data.EM);
                    }
                    if (response && response.data.EC == 0) {
                        toast.success(response.data.EM);
                        setFormData({
                            ...formData,
                            email: "",
                            phone: "",
                            username: "",
                            password: "",
                            confirmPassword: ""
                        })
                        history.push("/login")
                    }
                })
                .catch((error) => {
                    console.error("Lỗi gọi API:", error);
                });
        }
    }
    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className="brand">
                            Giao diẹn login left
                        </div>
                        <div className="detail">
                            Giao diẹn login left ...
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            displays login
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input
                                type="email" name='email'
                                className={objCheckInput.email ? "form-control" : "form-control is-invalid"} placeholder="Email address"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input
                                type="text" name='phone'
                                className={objCheckInput.phone ? "form-control" : "form-control is-invalid"} placeholder="Phone number"
                                value={formData.phone}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Usersname:</label>
                            <input
                                type="text" name='username'
                                className={objCheckInput.username ? "form-control" : "form-control is-invalid"} placeholder="Usersname"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input
                                type="password" name='password'
                                className={objCheckInput.password ? "form-control" : "form-control is-invalid"} placeholder="Password"
                                value={formData.password}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input
                                type="password" name='confirmPassword'
                                className={objCheckInput.confirmPassword ? "form-control" : "form-control is-invalid"} placeholder="Re-enter Password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange(e)}
                            ></input>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleLogin()}>
                                Đã có tài khoản
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;