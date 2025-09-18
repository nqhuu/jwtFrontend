import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import groupService from "../../services/groupService"
import { GENDER, GROUPS } from "../../Constants"



function ModalUser(props) {
    const [show, setShow] = useState(false);
    // const [gender, setGender] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const gender = [...GENDER];

    useEffect(() => {
        getGroups()
    }, []);


    const getGroups = async () => {
        let allGroups = await groupService.fetchAllGroups()
        if (allGroups && allGroups.EC === 0 && allGroups.DT) {
            setUserGroups(allGroups.DT)
        }

    }

    useEffect(() => {
        setShow(props.isOpen);
    }, [props.isOpen]);

    const handleEnter = async (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            props.handleRegisterOrEdit()
        }
    }

    return (
        <>
            <Modal size="lg" backdrop="static" keyboard={false} show={show} onHide={() => props.handleClose("modaluser")}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalType === "edit" ? "Update User" : "Create User"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    disabled={props.modalType === "edit"}
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    autoFocus
                                    value={props.formData.email}
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>User name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="username"
                                    value={props.formData.username}
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Phone number:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    value={props.formData.phone}
                                    onChange={(e) => props.handleChange(e)}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} >
                                <Form.Label>Gender:</Form.Label>
                                <Form.Select
                                    type="text"
                                    name="sex"
                                    placeholder="Giới tính"
                                    value={props.formData.sex}
                                    onChange={(e) => props.handleChange(e)}
                                >
                                    {gender && gender.length > 0 ?
                                        gender.map(item => <option key={item.value} value={item.value}>{item.label}</option>)
                                        : null
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label>Group:</Form.Label>
                                <Form.Select
                                    type="text"
                                    name="groupId"
                                    placeholder="Nhóm"
                                    value={props.formData.groupId}
                                    onChange={(e) => props.handleChange(e)}
                                >
                                    {userGroups && userGroups.length > 0 ?
                                        userGroups.map(item => <option key={item.id} value={item.id}>{item.description}</option>)
                                        : null
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                placeholder="Địa chỉ"
                                value={props.formData.address}
                                onChange={(e) => props.handleChange(e)}

                            />
                        </Form.Group>

                        {props.modalType === "create" &&
                            <>
                                <Row className="mb-3">
                                    <Form.Group as={Col} >
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="Password"
                                            name="password"
                                            placeholder="Mật khẩu"
                                            value={props.formData.password}
                                            onChange={(e) => props.handleChange(e)}
                                            onKeyDown={(e) => handleEnter(e)}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Label>Re-enter Password:</Form.Label>
                                        <Form.Control
                                            type="Password"
                                            name="confirmPassword"
                                            placeholder="Password"
                                            value={props.formData.confirmPassword}
                                            onChange={(e) => props.handleChange(e)}
                                            onKeyDown={(e) => handleEnter(e)}
                                        />
                                    </Form.Group>
                                </Row>
                            </>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        name="modaluser"
                        onClick={() => props.handleClose("modaluser")}
                    >
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleRegisterOrEdit}>
                        {props.modalType === "create" ? "Created" : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUser;