import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import editButton from "../../images/editButton.png";
import addButton from "../../images/vectormas.png";
import Popup from "./components/popup/Popup";
import Card from "./components/Card/Card";


import EditAvatar from "./components/popup/EditAvatar/EditAvatar";
import NewCard from "./components/popup/NewCard/NewCard";
import EditProfile from "./components/popup/EditProfile/EditProfile";

import ImagenPopup from "./components/popup/ImagePopup/ImagePopup";
import Header from "../Header/Header";


export default function Main({userData, isLoggedIn, signOut, cards, onCardLike, onCardDelete, onOpenPopup, onClosePopup, popup, onAddPlaceSubmit}) {
    const { currentUser } = useContext(CurrentUserContext);

    function handleCardClick(card){
        const imagePopup = {
            title: "",
            children: <ImagenPopup card={card}/>
        };
        onOpenPopup(imagePopup);
    }
    

    const newCardPopup = { title: "Nuevo lugar", children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} onClose={onClosePopup}/> };
    const editProfilePopup= { title: "Editar Perfil", children: <EditProfile />};
    const editAvatarPopup = { title: "Cambiar foto de perfil", children:<EditAvatar />};


    return (
        
        <main className="main">
            <Header>
                <>
                <span className="header__data-email">{userData.email}</span>
                <button className="header__button-signout" onClick={signOut}>Cerrar sesión</button>
                </>
            </Header>
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar-container" onClick={() => onOpenPopup(editAvatarPopup)}>
                        <img className="profile__avatar" src={currentUser.avatar} alt="Avatar" />
                        <div className="profile__avatar-overlay"></div>
                    </div>
                    <div className="profile__content">
                        <div className="profile__data">
                            <p className="profile__name">{currentUser.name}</p>
                            <button
                            aria-label=""
                            className="profile__button-edit"
                            id=""
                            onClick={()=> onOpenPopup(editProfilePopup)} 
                            >
                                <img className="profile__button-edit" src={editButton} alt="Edit button" />

                            </button>
                            
                            
                        </div>
                        
                        
                        <p className="profile__data-about">{currentUser.about}</p>
                    </div>
                </div>
                <button 
                aria-label="Add card" 
                className="profile__button-add" 
                id="button-add" type="button"
                
                onClick={()=> onOpenPopup(newCardPopup)}
                >
                    <img className="profile__button"  src={addButton} alt="Add button" />
                </button>
            </section>
            <ul className="cards__list">
                {cards.map((card) => (
                    <Card 
                    key={card._id} 
                    card={card} 
                    onCardLike={onCardLike}
                    onCardClick={handleCardClick}
                    onCardDelete={onCardDelete}
                    onOpenPopup={onOpenPopup}/>
                ))}
            </ul>


            {popup && (
                <Popup 
                isOpen={true} 
                onClose={onClosePopup} 
                title={popup.title}>
                    <div >
                        {popup.children}
                    </div>
                    
                </Popup>
        
            )}

            
    
        </main>
    );
}
