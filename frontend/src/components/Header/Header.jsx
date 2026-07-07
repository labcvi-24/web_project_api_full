import logo from "../../images/logo.png";

export default function Header({children}) {
    return (
        <header className="header">
            <div className="header__content">
                <img
                className="header__logo" 
                src={logo} alt="Around the U.S. Logo" 
                />
                <div className="header__auth">
                    {children}
                </div>
            </div>
            
            <div className="header__line"></div>
            
        </header>
    );
}

