import './index.css';
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from './pages/Header.jsx';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./redux/actions/authThunk";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const App = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const token =  Cookies.get("accessToken") ||localStorage.getItem("accessToken");
    if (token && !user) {
      dispatch(fetchCurrentUser())
        .then(() => {
          console.log("User fetched successfully");
        })
        .catch((error) => {
          console.error("Failed to fetch user:", error);
        });
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname ||location.pathname ||  "/";
      console.log(location.state?.from?.pathname);
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state, location.pathname]);

  if (isLoading) {
    return <div className='text-white mx-auto py-5 my-auto text-lg'>Loading...</div>;
  }
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default App;
