import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


// const ModalConfirm = (props) => {

//     const [isOpen, setIsOpen] = useState(true);

//     // useEffect(() => {
//     //     setIsOpen(props.isOpen);
//     // }, [props.isOpen]);

//     return (
//         <>
//             {isOpen &&

//                 <Modal show={show} onHide={handleClose}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Modal heading</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={handleClose}>
//                             Close
//                         </Button>
//                         <Button variant="primary" onClick={handleClose}>
//                             Save Changes
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             }
//         </>

//     );
// }

function ModalConfirm(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.isOpen);
    }, [props.isOpen]);

    return (
        <>
            <Modal backdrop="static" keyboard={false} show={show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn thực hiện hành động này!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleLogic}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;