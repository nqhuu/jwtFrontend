import { useHistory } from 'react-router-dom';
import './Register.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';



const Register = (props) => {
    let history = useHistory();
    const handleLogin = () => {
        history.push("/login")
    };

    const [email, setmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        // axios.get("http://localhost:8686/api/user")
        //     .then((response) => {
        //         console.log("==>>>>>>>>>> check data", response);
        //     })
        //     .catch((error) => {
        //         console.error("Lỗi gọi API:", error);
        //     });
    }, []);

    const validate = () => {

        if (email.includes('@') === false) {
            alert("Email không hợp lệ");
            return;
        };
        if (!email || !phone || !username || !password || !confirmPassword) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        };
        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        };
    }

    const handleRegister = async () => {
        validate();

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