import styles from "./Modal.module.css";
import { useEffect, useState } from "react";

export default function Modal({children, className = "", open = false, setOpen = () => {}, onClose = () => {}}) {
    const modal = (
        <div
            className = {`${styles.modal__body} ${open && styles.active} ${className}`}
            onClick = {() => setOpen(false)}
        >
            <div onClick = {e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );

    useEffect(() => {
        if (!open) onClose();
    }, [open]);
    
    return (
        <>
            {modal}
        </>
    )
};
