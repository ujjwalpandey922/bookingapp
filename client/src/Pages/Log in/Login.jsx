import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import axios from "axios";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const { user, loading, error, dispatch } = useAuthContext();

  const navTo = useNavigate();
  const response = useLocation();
  useEffect(() => {
    if (response.state !== null) {
      toast.success(response.state.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  }, [response.state]);

  const handleChange = (e) => {
    setCredentials((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    dispatch({ type: "LOGIN_START" });
    let count = 0;
    for (let key in credentials) {
      if (credentials[key] === "") {
        count = count + 1;
      }
      console.log(count, key, credentials[key]);
    }
    try {
      if (count === 0) {
        const res = await axios.post("/api/auth/login", credentials, {
          withCredentials: true,
        });
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navTo("/");
      } else {
        toast.error("Enter all Fields First", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      dispatch({ type: "LOGIN_ERROR", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="context loginContainer">
        <label>Name</label>
        <input
          type="text"
          placeholder="ENTER USERNAME...."
          name="userName"
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="ENTER PASSWORD...."
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleLogin} className="loginButton">
          LOG IN
        </button>
        <Link to="/registration">
          <span className="register">Register Frist</span>{" "}
        </Link>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
