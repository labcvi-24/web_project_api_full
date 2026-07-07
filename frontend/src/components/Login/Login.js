import { Link } from "react-router-dom";
import { useState } from "react";
import Header from '../Header/Header';

const Login = ({ onLogin }) => {
  const [data, setData] = useState({
    email: "",
    password:"",
  });

  const handleChange= (e) => {
    const {name, value} = e.target;
    setData((preData) => ({
      ...preData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(data);
  }


  return(
    <div className="login">
      <Header>
        <button className="header__button">
          <Link to="/signup" className="header__link">
            Registrate
          </Link>
        </button>
      </Header>
      <main className="login__content">
        <h1 className="login__title">Inicia Sesion</h1>
        <form className="popup__form login__form" onSubmit={handleSubmit}>
          <input
            autoComplete="new-password"
            className="popup__input login__input"
            type="email"
            required
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />

          <input
            className="popup__input login__input"
            required
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />

          <button type="submit" className="login__submit">
            Inicia Sesion
          </button>

          <div className="login__signup">
            <p>¿Aún no eres miembro?</p>
            <Link to="/signup" className="login__signup-link">
              Regístrate aquí
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}


export default Login;