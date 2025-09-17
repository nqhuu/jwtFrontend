import './Login.scss'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../../services/userService';



const Login = (props) => {

    let history = useHistory()

    const [formData, setFormData] = useState({
        valueInput: "",
        password: ""
    });

    useEffect(() => {
        let session = JSON.parse(sessionStorage.getItem("account"));
        if (session) {
            history.push("/")
        }
    }, []);

    const handleCreateUser = () => {
        history.push("/register")
    }

    const handleLogin = async () => {
        try {
            let inputCheck = isValidInputs();
            if (inputCheck) {
                // call api
                let response = await userService.LoginUser(formData)
                if (response && response.data && response.data.EC === 0) {
                    toast.success(response.data.EM)
                    let data = {
                        Authenticated: true,
                        token: "fake token",
                        userLoginId: response.data.DT.id,
                    }
                    //lưu dữ liệu user xuống sessionStorage
                    sessionStorage.setItem("account", JSON.stringify(data))
                    history.push("/users")
                    window.location.reload()
                }
                if (response && response.data && response.data.EC !== 0) {
                    toast.error(response.data.EM)
                }
            }
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }

    }

    const handleEnter = async (e) => {
        console.log(e)
        if (e.keyCode === 13 && e.key === "Enter") {
            handleLogin()
        }
    }


    const defaultValidInput = {
        valueInput: true,
        password: true
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [objCheckInput, setobjCheckInput] = useState(defaultValidInput)

    const isValidInputs = () => {
        let valueCheck = { ...formData };
        setobjCheckInput(defaultValidInput) // reset lai input ve true
        if (!valueCheck.valueInput) {
            setobjCheckInput({ ...defaultValidInput, valueInput: false })
            toast.error("Bạn cần nhập Email hoặc Số điện thoại");
            return false;
        }
        if (!valueCheck.password) {
            setobjCheckInput({ ...defaultValidInput, password: false })
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