import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/authThunk"; // Adjust path as needed
import google from "../assets/google.svg";
import { NavLink } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/";
  console.log(from);
  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("username", username);
    formData.append("avatar", avatar); // Add the file

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      dispatch(register(formData));
      navigate(from, { replace: true });
    } catch (error) {
      setError("signin failed failed. Please try again.", error);
    }
  };
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:8000/api/v1/auth/google";
  };

  return (
    <div className="bg-gray-900 h-screen w-full ">
      <h2 className="text-white text-center text-xl font-bold font-serif py-4 mt-4">
        Sign up
      </h2>
      <form
        action="/upload"
        className="grid-cols-1 grid mx-auto max-w-[80%] w-[590px] gap-y-3 my-auto  max-h-[70%] h-1/3 mt-4  shadow-lg py-1"
        onSubmit={handleRegister}
      >
        <div className="flex items-center justify-between">
          <input
            className="outline-none w-[48%]  bg-gray-800 p-2 rounded-lg   hover:border-b-2 hover:border-pink-200 focus:border-b-2 focus:border-pink-200 text-pink-100 h-14"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="outline-none w-[48%] bg-gray-800 p-2 rounded-lg  hover:border-b-2 hover:border-pink-200 focus:border-b-2 focus:border-pink-200 text-pink-100 h-14"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <input
            className="outline-none  w-[48%] bg-gray-800 p-2 rounded-lg   hover:border-b-2 hover:border-pink-200 focus:border-b-2 focus:border-pink-200 text-pink-100 h-14"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserName"
          />
          <input
            className="outline-none w-[48%] inset-0   cursor-pointer bg-gray-800 p-2 rounded-lg   hover:border-b-2 hover:border-pink-200 focus:border-b-2 focus:border-pink-200 text-pink-100 h-14"
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            placeholder="Avatar"
          />
        </div>
        <button
          className="text-white text-xl mx-auto hover:bg-blue-800 bg-blue-700 w-full px-3 py-1 rounded-lg"
          type="submit"
        >
          Register
        </button>
        <button
          className="text-white flex items-center  justify-center hover:bg-red-700 bg-red-600 gap-2 rounded-lg h-10"
          onClick={handleGoogleLogin}
        >
          <img src={google} className="h-10" alt="" />
          <span>SignIn with Google</span>
        </button>
        <div className="text-white text-center flex justify-center py-2">
        <p>Already have an account : &nbsp;</p>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "text-red-400 hover:underline "
              : " text-white inactive hover:underline "
          }
        >
          login
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
