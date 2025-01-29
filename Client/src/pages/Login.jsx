import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authThunk";
import google from "../assets/google.svg";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/";  // Get the redirect path from location state
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(login({ email, password})).unwrap();
      navigate(from, { replace: true });  // Navigate to the stored path
    } catch (error) {
      setError("Login failed. Please try again.", error);
    }
  };
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <div className="bg-gray-900 h-screen w-full ">
      <h2 className="text-white text-center text-xl font-bold font-serif py-4 mt-4">
        Login
      </h2>
      <form
        className="grid-cols-1 grid mx-auto max-w-[80%] w-[590px] gap-y-3 my-auto  max-h-[70%] h-1/3 mt-4  shadow-lg py-1"
        onSubmit={handleLogin}
      >

          <input
            className="outline-none   bg-gray-800 p-2 rounded-lg   hover:border-b-2 hover:border-pink-200 focus:border-b-2 focus:border-pink-200 text-pink-100 h-14"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="outline-none  bg-gray-800 p-2 rounded-lg  hover:border-b-2 hover:border-pink-200 focus:border-b-2 focus:border-pink-200 text-pink-100 h-14"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        <button
          className="text-white text-xl mx-auto hover:bg-blue-800 bg-blue-700 w-full px-3 py-1 rounded-lg"
          type="submit"
        >
          Login
        </button>
        <button
          className="text-white flex items-center  justify-center hover:bg-red-700 bg-red-600 gap-2 rounded-lg h-10"
          onClick={handleGoogleLogin}
        >
          <img src={google} className="h-10" alt="" />
          <span>SignIn with Google</span>
        </button>
        <div className="text-white text-center flex justify-center">
        <p>Do not have an account : &nbsp;</p>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "text-red-400 hover:underline " : " text-white inactive hover:underline "
          }
        >
           signin
        </NavLink>
      </div>
      </form>
      
      <div className="text-red-600 text-center">
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
