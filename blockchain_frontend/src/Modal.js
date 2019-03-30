import React from 'react';
import './Form.css'

const Modal = ({ closeModal, show, message }) => {
    const hideModal = show ? "modal display-block" : "modal display-none"

    return (
        <div className={hideModal}>
            <section className="modal-window">
                <center><p>{message}</p></center>
                <button onClick={closeModal}>Close</button>
            </section>
        </div>
    )
}

export default Modal;