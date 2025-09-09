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

    // tạo state như class với useState
    const [email, setmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8686/api/user")
            .then((response) => {
                console.log("==>>>>>>>>>> check data", response);
            })
            .catch((error) => {
                console.error("Lỗi gọi API:", error);
            });
    }, []);

    const isValidInputs = () => {
        let valueCheck = { email, phone, username, password, confirmPassword };

        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!regex.test(email)) {
            toast.error("Email không hợp lệ");
            return false;
        };
        for (let key in valueCheck) {
            if (!valueCheck[key]) {
                toast.error("Vui lòng điền đầy đủ thông tin");
                return false;
            }
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu không khớp");
            return false;
        };
        return true;
    }

    const handleRegister = async () => {
        let validate = isValidInputs();
        if (validate) {

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
                                type="email" className="form-control" placeholder="Email address"
                                value={email} onChange={(event) => setmail(event.target.value)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input
                                type="text" className="form-control" placeholder="Phone number"
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Usersname:</label>
                            <input
                                type="text" className="form-control" placeholder="Usersname"
                                value={username} onChange={(event) => setUsername(event.target.value)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input
                                type="password" className="form-control" placeholder="Password"
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            ></input>
                        </div>
                        <div className='form-group'>
                            <label>Re-enter Password:</label>
                            <input
                                type="password" className="form-control" placeholder="Re-enter Password"
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
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