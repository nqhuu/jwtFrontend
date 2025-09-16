import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import userService from "../../services/userService";


function ModalUser(props) {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        username: "",
        address: "",
        group: "",
        gender: "",
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
        setShow(props.isOpen);
    }, [props.isOpen]);

    const handleEnter = async (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            handleRegister()
        }
    }

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
        try {
            let validate = isValidInputs();
            if (validate) {
                let response = await userService.RegisterUser(formData);
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
                        password: "",
                        confirmPassword: ""
                    })
                    // history.push("/login")
                }
            }
        } catch (error) {
            console.error("Lỗi gọi API:", error);
        }
    }

    return (
        <>
            <Modal backdrop="static" keyboard={false} show={show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                autoFocus
                                value={formData.email}
                                onChange={(e) => handleChange(e)}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Phone number:</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={(e) => handleChange(e)}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>User name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="username"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={formData.address}
                                onChange={(e) => handleChange(e)}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Group:</Form.Label>
                            <Form.Control
                                type="text"
                                name="group"
                                placeholder="Nhóm"
                                value={formData.group}
                                onChange={(e) => handleChange(e)}

                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Gender:</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                placeholder="Giới tính"
                                value={formData.gender}
                                onChange={(e) => handleChange(e)}

                            />
                        </Form.Group>
                        {props.modalType === "create" &&
                            <>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="Password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        value={formData.password}
                                        onChange={(e) => handleChange(e)}
                                        onKeyDown={(e) => handleEnter(e)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Re-enter Password:</Form.Label>
                                    <Form.Control
                                        type="Password"
                                        name="confirmPassword"
                                        placeholder="Password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange(e)}
                                        onKeyDown={(e) => handleEnter(e)}
                                    />
                                </Form.Group>
                            </>
                        }

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        {props.modalType === "create" ? "Created" : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;