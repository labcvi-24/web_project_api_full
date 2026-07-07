import Popup from "../Main/components/popup/Popup";
import errorImage from "../../images/fail.png";
import successImage from "../../images/success.png";


const InfoTooltip = ({isOpen, onClose, isSuccess,}) => {
    
    return (
        <Popup
        isOpen={isOpen}
        onClose={onClose}
        >
            <div className="infotooltip__modal-container">
                <img
                className="infotooltip__imagen"
                src={isSuccess ? successImage : errorImage}
                alt={isSuccess ? "Éxito" : "Error"}
                />
                
                <p className="infotooltip__massage">
                    {
                    isSuccess
                    ? "¡Correcto! Ya estás registrado."
                    : "Uy, algo salió mal. Por favor inténtalo de nuevo."
                    }
                </p>

            </div>
        </Popup>

    )
    
    
}

export default InfoTooltip;
