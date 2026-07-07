

export default function ImagePopup({card}){
    
    return (
        <div className="popup__modal-container">    
            <img src={card.link} alt={card.name} className="popup__photo"/>
            <p className="popup__caption">{card.name}</p>
        </div>
        
            
    );

}