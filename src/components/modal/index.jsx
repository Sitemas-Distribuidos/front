/* ⚛ REACT */
import React, { useContext } from 'react';

/* 📁 ASSETS */
import { close } from "../../assets/icons";

/* 🎨 STYLES */
import { Container, CloseIcon } from "./styles";

import { ModalContext } from '../../context/ModalContext';

const Modal = ({ children }) => {

    const { isModalOpen, closeModal } = useContext(ModalContext);

    if (!isModalOpen) return null;
    
    return(
        <Container>
            <div className="modal-content">
                <CloseIcon src={close} fill={'#403D39'} onClick={() => closeModal()}/>
                {children}
            </div>
        </Container>
    );
}

export default Modal;