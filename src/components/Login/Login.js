import './Login.scss'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    let history = useHistory()
    const handleCreateUser = () => {
        history.push("/registor")
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
                        <input type="text" className="form-control" placeholder="email address or phone number"></input>
                        <input type="password" className="form-control" placeholder="Password"></input>
                        <button className="btn btn-primary">Login</button>
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