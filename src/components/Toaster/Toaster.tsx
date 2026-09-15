import { useEffect } from "react";
import styles from "./Toaster.module.scss";
import { IoCloseSharp } from "react-icons/io5";

type ToasterProps = {
    message: string;
    type: "success" | "error";
    onClose: () => void;
};

function Toaster({ message, type, onClose }: ToasterProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <div
            className={`${styles.toaster} ${styles[type]}`}
            role={type === "error" ? "alert" : "status"}
        >
            <p>{message}</p>

            <button type="button" onClick={onClose}>
                <IoCloseSharp />
            </button>
        </div>
    );
}

export default Toaster;