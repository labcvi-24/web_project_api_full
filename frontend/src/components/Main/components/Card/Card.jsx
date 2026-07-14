import iconDelete from "../../../../images/basura.png";
import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardLike, onCardClick, onCardDelete, onOpenPopup}) {
    
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser);
    console.log("currentUser:", currentUser);
    console.log("card.likes:", card.likes);

    function handleClick() {
        onCardClick(card);
    }

    const isLiked = card.likes.some((like) => like === currentUser._id);

    console.log("isLiked:", isLiked);

    const cardLikeButtonClassName = `card__like-button ${
        isLiked ? 'card__like-button_is-active' : ''}`;

    function handleLikeClick(){
        onCardLike(card);
    }

    function handleCardDeleteClick(){
        onCardDelete(card);
    }
    

    return (
        <li className="card">
            <button 
            aria-label="delete card" 
            className="card__button-trash"
            type = "button"
            onClick= {handleCardDeleteClick}>
                <img className="card__remove" src={iconDelete} alt="remove"/>
            </button>
            <img 
            className="card__photo" 
            src={card.link}
            alt={card.name} 
            onClick={handleClick}/>
            <div className="card__description">
                <h2 className="card__name">PRUEBA{card.name}</h2>
                <button
                type="button" 
                aria-label="like card" 
                onClick={handleLikeClick} 
                className={cardLikeButtonClassName}
                >

                </button>
            </div>
        </li>


    );
}