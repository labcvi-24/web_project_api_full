import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile(){
    const [nameError, setNameError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    
    const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
    const { currentUser, handleUpdateUser } = userContext;

    const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
    const [description, setDescription] = useState(currentUser.about); // agrega la variable de estadp para descripcion

    const isValid = name.length > 0 && description.length > 0 && nameError === "" && descriptionError === "";

    const handleNameChange = (event) =>{
        setName(event.target.value); // actualiza name cuando cambie la entrada
        
        if (!event.target.validity.valid) {
            setNameError(event.target.validationMessage);
        } else {
            setNameError("");
        }   
    };

    const handleDescriptionChange = (event) =>{
        setDescription(event.target.value);  //actualiza description cuando cambie la entrada
        
        if (!event.target.validity.valid) {
           setDescriptionError(event.target.validationMessage);
        } else {
          setDescriptionError("");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios
        
        if (!isValid) {
            return;
        }
        
        handleUpdateUser({ name, about: description }); // Actualiza la información del usuario
    };

    
    return(
        <form className="popup__form"
        id="form-edit" 
        noValidate
        onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input 
                    type="text"
                    name="name"
                    className={`popup__input popup__input_name ${
                        nameError ? "popup__input_type_error" : ""
                    }`}
                    id="name-input"
                    placeholder="Nombre"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name} // vincula name con la entrada
                    onChange={handleNameChange} // Agrega el controlador onChange
                    />
                    <span
                        className={`popup__error ${
                            nameError ? "popup__error_visible" : ""
                        }`}
                    >
                        {nameError}
                    </span>
                <input 
                    type="text"
                    name="about"
                    className={`popup__input popup__input_job ${
                        descriptionError ? "popup__input_type_error" : ""
                    }`}
                    id="acerca-input"
                    placeholder="Acerca de mí"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description} // Vincula description con la entrada
                    onChange={handleDescriptionChange} // Agrega el controlador onChange
                    />
                    <span
                        className={`popup__error ${
                            descriptionError ? "popup__error_visible" : ""
                        }`}
                    >
                        {descriptionError}
                    </span>
                
            </label>
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
