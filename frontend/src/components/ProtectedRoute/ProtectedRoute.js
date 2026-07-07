import { useContext } from "react";
import { Navigate,  useLocation } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext"


function ProtectedRoute({children, anonymous= false,}) {
  const location = useLocation();
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to= "/" replace />;
  }
  if (!anonymous && !isLoggedIn) {
      
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  
  return children;
  
}

export default ProtectedRoute;