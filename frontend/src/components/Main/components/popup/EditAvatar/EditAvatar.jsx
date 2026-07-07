import {useRef, useState, useContext} from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";


export default function EditAvatar(){

    const avatarRef = useRef();
    const { handleUpdateAvatar } = useContext(CurrentUserContext); //obtener la funcion del contexto 
    
    const [avatar, setAvatar] = useState("");
    const [avatarError, setAvatarError] = useState("");
    const isValid = avatar.length > 0 && avatarError === "";

    const handleChange = (e) => {
        setAvatar(e.target.value);

        if (!e.target.validity.valid) {
            setAvatarError(e.target.validationMessage);
        } else {
            setAvatarError("");
        }
    };

    function handleSubmit(e) {
        e.preventDefault();

        const value = avatarRef.current.value;

        if (!value || avatarError) return;
        
        handleUpdateAvatar({
            avatar: avatarRef.current.value //obtiene el valor usando la ref
        });
        e.target.reset();
        setAvatarError("");
    }

    return(
        <form 
        className="popup__form" 
        name="form-avatar"
        id="form-add"
        onSubmit={handleSubmit} //conectar handleSubmit al formulario
        noValidate
        >
            <input
            ref={avatarRef} //conectar la ref al input
            type="url"
            name="link"
            className={`popup__input popup__input-avatar ${
                avatarError ? "popup__input_type_error" : ""
            }`}
            placeholder="Enlace"
            required
            onChange={handleChange}
            />
            <span
            className={`popup__error ${
                avatarError ? "popup__error_visible" : ""
            }`}
            >
                {avatarError}
            </span>
            <button 
            type="submit" 
            className={`popup__button-submit ${
                !isValid ? "popup__button_disabled" : ""
            }`} 
            disabled={!isValid}
            >
                Guardar
            </button>
        </form>
    );
}