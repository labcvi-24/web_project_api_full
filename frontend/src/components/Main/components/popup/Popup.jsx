
import iconClose from "../../../../images/iconclose.png";
import { useEffect } from "react";

export default function Popup({ isOpen, onClose, title, children}) {
    useEffect(() => {
        if (!isOpen) return;
        
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        
        document.addEventListener("keydown", handleEsc);
        
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}
        onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}
        >
            <div className={`popup__container ${
                !title ? "popup__container_content_image" : ""
                }`}>
                <button
                    aria-label="Close modal"
                    className="popup__button-close"
                    type="button"
                    onClick={onClose} // llama a onClose al hacer clic en el botón
                    >
                        <img src={iconClose} alt="icono de cierre" />
                </button>
                {title && <h3 className="popup__title">{title}</h3>}
                {children}
            </div>
        </div>
    );
}