import iconDelete from "../../../../images/basura.png";
const { currentUser } = useContext(CurrentUserContext);

export default function Card({ card, onCardLike, onCardClick, onCardDelete, onOpenPopup}) {

    function handleClick() {
        onCardClick(card);
    }

    const isLiked = card.likes.some((like) => like === currentUser._id);
    
    
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
                <h2 className="card__name">{card.name}</h2>
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