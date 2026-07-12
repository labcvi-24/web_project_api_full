import {Routes, Route, useNavigate, useLocation,} from "react-router-dom";
import { useEffect, useState } from 'react';
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as auth from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';

import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import InfoToolTip from "./InfoTooltip/InfoTooltip";
import api from '../utils/api';


function App() {
  const [userData, setUserData] = useState({email:"", _id:"" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate()
  
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectAfterClose, setRedirectAfterClose] = useState(null);

  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);

  const [token, setToken] = useState('');

  const onRegister = ({ email, password, }) =>{
    
    auth  //se hace la peticion HTTP
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setRedirectAfterClose("/signin");
        setIsInfoOpen(true);

      })
      .catch(() =>{
        setIsSuccess(false); 
        setRedirectAfterClose(null);
        setIsInfoOpen(true);
      });
    }; 

  const handleCloseInfoTooltip = () => {

    setIsInfoOpen(false);
    if  (redirectAfterClose) {
      navigate(redirectAfterClose);
    }

    setRedirectAfterClose(null);
  };

  const onLogin = ({ email, password }) =>{
    
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
        .then((data) =>{
          if (data.token) {
            setToken(data.token);
            localStorage.setItem("jwt", data.token);//guardando un JSON Web Token
            return auth.getContent(data.token);
          }  
        })    
        .then((res) => { 
          setUserData({
            email: res.email,
            _id: res._id,
          });
          setIsLoggedIn(true);

          const redirectPath = 
            location.state?.from?.pathname || "/";

            navigate(redirectPath);
          
        })
        .catch(()=> {
          setIsSuccess(false);
          setRedirectAfterClose(null);
          setIsInfoOpen(true);
        });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    
    if (!token) {
      return;
    }
    setToken(token);//actualiza el estado

    auth
      .getContent(token)// //verificacion de token con el servidor, se obtiene los datos del usuario
      .then((res)  =>{
        setIsLoggedIn(true);
        setUserData({
          email: res.email,
          _id: res._id,
        });

        navigate("/");

      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");

        setIsLoggedIn(false);
        setUserData(null);

        navigate('/signin');
      });

  }, [navigate]);

  
  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/signin");
    setIsLoggedIn(false);
  }

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya les has dado like
    const isLiked = card.likes.some(
        (like) => like === currentUser._id
    );
    
    // Envía una solicitud a la API y obtiene los datos actualizados de la tarjeta
    await api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
        setCards((state) => 
          state.map((currentCard) => 
            currentCard._id === card._id 
              ? newCard 
              : currentCard));
    }).catch((error) => console.error(error));
}

  async function handleCardDelete(card){
        //envia solicitud a la API para eliminar la tarjeta
        await api.deleteCard(card._id)
        .then(()=> {
            //actualiza el estado local : crea una copia del array exclueyendo la trajeta eliminada
            setCards((state) => state.filter((currentCard) => currentCard._id !== card._id));
        })
        .catch((error) => console.error((error)));
        
    }

  function handleOpenPopup(popup){
    
    setPopup(popup);
  }

  function handleClosePopup(){
    setPopup(null);
  }
  useEffect(() => {
  if (!isLoggedIn) return;

  api.getAppInfo()
    .then(([userData, cards]) => {
      
      setCurrentUser(userData);
      setCards(cards);
    })
    .catch((error) => console.error(error));

}, [isLoggedIn]);

  function handleUpdateUser(data) {
    api.updateUserInfo(data) 
        .then((updateUser) => {
        setCurrentUser(updateUser);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
    
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.updateAvatar(data.avatar).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
    })();
  };

  const handleAddPlaceSubmit = async(placeData) => {
    try{
      //envia los datos a la api para crear una nueva tarjeta
      const newCard = await api.addCard(placeData);

      //actualiza el estado local con la nueva tarjeta
      setCards((state) => [newCard, ...state]); // aqui usa el operador spread
      handleClosePopup();
    } catch(error) {
      console.error(error);
    } 
  };



  return  (
    <CurrentUserContext.Provider value={{currentUser, isLoggedIn, setIsLoggedIn, handleUpdateUser, handleUpdateAvatar, handleAddPlaceSubmit}}>
      <div className='page'>
        <Routes>
          <Route
            path="/signin"
            element={<Login onLogin={onLogin}/>}
          />
          <Route
            path="/signup" 
            element={<Register onRegister={onRegister} />}
          />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main
                  userData={userData}
                  signOut={signOut}
                  onLogin={onLogin} 
                  onRegister={onRegister}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />
                <Footer />  
              </ProtectedRoute>
            }
          />
        </Routes>
        <InfoToolTip
          isOpen={isInfoOpen}
          onClose={handleCloseInfoTooltip}
          isSuccess={isSuccess}
        /> 
      </div>
    </CurrentUserContext.Provider>
  
  );
}


export default App;