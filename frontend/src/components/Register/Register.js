import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useState } from "react";



const Register = ({ onRegister }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target; 
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit =(e) => {
    e.preventDefault();
    onRegister(data);
  };

  return(
    <div className="register" >
      <Header>
        <button className="header__button">
          <Link to="/signin" className="header__link">
              Inicia sesion
            </Link>
        </button>
      </Header>
      <div className="register__content">
        <h1 className="register__title">
          Regístrate
        </h1>
        <form className="popup__form register__form" onSubmit={handleSubmit}>
          <input
          className="popup__input register__input"
            type="email"
            name="email"
            required
            value={data.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />

          <input
            className="popup__input register__input"
            type="password"
            name="password"
            required
            value={data.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />

          <button type="submit" className="register__submit">
            Registrate
          </button>

          <div className="register__signin">
            <p>¿ya eres miembro?</p>
            <Link to="/signin" className="register__login-link">
              Inicia sesion aquí
            </Link>
          </div>       
        </form>
      </div>

    </div>
  )
}

export default Register;