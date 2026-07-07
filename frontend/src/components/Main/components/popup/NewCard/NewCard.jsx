import { useState } from "react";

export default function NewCard({onAddPlaceSubmit, onClose}) {
const [name, setName] = useState('');
const [link, setLink] = useState('');

const [nameError, setNameError] = useState("");
const [linkError, setLinkError] = useState("");

const isValid = name && link && !nameError && !linkError;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValid) {
            return;
        }

        onAddPlaceSubmit({
            name: name,
            link: link
        });

        setName('');
        setLink('');

        setNameError('');
        setLinkError('');
    }
    

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (!e.target.validity.valid) {
            setNameError(e.target.validationMessage);
        } else {
            setNameError("");
        }
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    

        if (!e.target.validity.valid) {
            setLinkError(e.target.validationMessage);
        } else {
            setLinkError("");
        }
    };

    return (
        <form
            className="popup__form"
            name="card-form"
            id="new-card-form"
            noValidate
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                value={name}
                onChange= {handleNameChange}
                className={`popup__input popup__input_type_card-name ${
                    nameError ? "popup__input_type_error" : ""
                    }`}
                id="card-name"
                maxLength="30"
                minLength="2"
                name="card-name"
                placeholder="Titulo"
                required
                type="text"
                />
                <span
                id="card-name-error" 
                className={`popup__error ${
                    nameError ? "popup__error_visible" : ""
                }`}
                >
                    {nameError}
                </span>
            </label>
            <label className="popup__field">
                <input
                value={link}
                onChange= {handleLinkChange}
                className={`popup__input popup__input_type_url ${
                    linkError ? "popup__input_type_error" : ""
                }`}
                id="card-link"
                name="link"
                placeholder="Enlace"
                required
                type="url"
                />
                <span
                id="card-link-error" 
                className= {`popup__error ${
                    linkError ? "popup__error_visible" : "" 
                    }`} 
                    >
                    {linkError}
                </span>
            </label>
            <button 
            className={`popup__button-submit ${
                !isValid ? "popup__button_disabled" : ""
            }`}
            type="submit" 
            disabled={!isValid}
            >
                Agregar
            </button>
        </form>
    );
}