import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal(props) {
    // Closing modal window on Esc button click
    const handleKeyDown = useCallback(event => {
        if (event.code === 'Escape') {
            props.onModalClose();
        }
    }, [props]);

    // Adding and removing event listener for Esc button click
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    // Closing modal window on backdrop click
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            props.onModalClose();
        }
    }

    const { onModalClose, children } = props;
    
    return createPortal(
        <div className={s.overlay} onClick={handleBackdropClick}>
            <button type='button' className={s.close} onClick={onModalClose}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </button>
            <div className={s.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    );
}

export default Modal;