import './Login.scss'
import { useHistory } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import userService from '../../services/userService';
import { UserContext } from '../../context/UserContext';



const Login = (props) => {
    const { loginContext } = useContext(UserContext);

    let history = useHistory();

    const [formData, setFormData] = useState({
        valueInput: "",
        password: ""
    });

    useEffect(() => {

    }, []);

    const handleCreateUser = () => {
        history.push("/register");
    };

    const handleLogin = async () => {
        try {
            let inputCheck = isValidInputs();
            if (inputCheck) {
                // call api
                let response = await userService.LoginUser(formData);
                if (response && response.EC === 0) {
                    let role = response.DT.role;
                    let email = response.DT.email;
                    let username = response.DT.username;
                    let token = response.DT.access_token;
                    let userId = response.DT.userId;
                    toast.success(response.EM)
                    let data = {
                        Authenticated: true,
                        token: token,
                        account: { email, username, role, userId }
                    }
                    loginContext(data);
                    history.push("/users");
                }
                if (response && response.EC !== 0) {
                    toast.error(response.EM)
                }
            }
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }

    }

    const handleEnter = async (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            handleLogin()
        };
    };


    const defaultValidInput = {
        valueInput: true,
        password: true
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const [objCheckInput, setobjCheckInput] = useState(defaultValidInput);

    const isValidInputs = () => {
        let valueCheck = { ...formData };
        setobjCheckInput(defaultValidInput); // reset lai input ve true
        if (!valueCheck.valueInput) {
            setobjCheckInput({ ...defaultValidInput, valueInput: false });
            toast.error("Bạn cần nhập Email hoặc Số điện thoại");
            return false;
        }
        if (!valueCheck.password) {
            setobjCheckInput({ ...defaultValidInput, password: false });
            toast.error("Password không được để trống");
            return false;
        }
        return true;
    }

    return (
        <div className="login-container">
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
                        <input
                            type="text"
                            name='valueInput'
                            className={objCheckInput.valueInput ? "form-control" : "form-control is-invalid"}
                            placeholder="email address or phone number"
                            value={formData.valueInput}
                            onChange={(e) => handleChange(e)}
                        ></input>
                        <input
                            type="password"
                            name='password'
                            className={objCheckInput.password ? "form-control" : "form-control is-invalid"}
                            placeholder="Password"
                            value={formData.password}
                            onKeyDown={(e) => handleEnter(e)}
                            onChange={(e) => handleChange(e)}></input>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleLogin()}
                        >Login</button>
                        <span className="text-center">
                            <a className="forgot-password" href="#">Forgotten your password?</a>
                        </span>
                        <hr />
                        <div className="text-center">
                            <button className="btn btn-success" onClick={() => handleCreateUser()}>Create new account</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;