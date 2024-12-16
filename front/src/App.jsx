import { Home } from "./views/Home";
import { MisTurnos } from "./views/MisTurnos";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "./App.css";
import ScrollToTopButton from "./components/ScrollToUpBtn";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Importa useDispatch y useSelector
import SolicitarTurno from "./views/SolicitarTurno/SolicitarTurno";
import Contact from "./views/Contact/Contact";
import { logout } from "./redux/reducer";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn); // Usa useSelector para obtener el estado
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Si necesitas hacer un dispatch en el futuro

  const handleLogout = () => {
    dispatch(logout()); // Puedes crear una acción de logout si lo necesitas
    navigate("/");  
  };

  return (
    <div className="app">
      <Navbar isLogged={isLoggedIn} logout={handleLogout}/>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/appointments/schedule/" element={<SolicitarTurno />} />
            <Route path="/" element={<Home />} />
            <Route path="/appointments/userAppointments/:id" element={<MisTurnos />} />
            <Route path="/contacto" element={<Contact />} />
          </>
        )}
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
