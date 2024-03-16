import React, { useEffect, useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, clearError } from "../store/user.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newError, setNewError] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [type, setType] = useState("password");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userData, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { fullname, email, password } = userData;
  const { isLoading, error, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/user/${user?._id}`);
    }
  }, [navigate, isAuthenticated]);
  const registerDataChange = (e) => {
    setUser({ ...userData, [e.target.name]: e.target.value });
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: loginEmail, password: loginPassword }));
  };
  const handleToggleShow = () => {
    setIsToggle(false);
    setType("text");
  };
  const handleToggleHide = () => {
    setIsToggle(true);
    setType("password");
  };
  const handleForm = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNewError(error?.message);
    }, 5000);
    dispatch(clearError());
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-around h-screen bg-slate-800 text-gray-200">
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{newError}</span>
          </div>
        )}
        <div className="flex justify-center items-center w-full">
          <h1 className="text-3xl md:font-bold md:text-5xl md:leading-relaxed m-10 font-serif ">
            Make Your Url Short! <br />
            We need just a click
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full   ">
          {isLogin ? (
            <>
              <div className=" m-[24px] p-8 rounded-md bg-gray-400  text-gray-800 shadow-2xl">
                <h1 className="text-2xl md:text-3xl font-medium m-4 text-gray-800 text-center">
                  Register Your Self
                </h1>
                <form
                  className="flex flex-col justify-center items-center"
                  onSubmit={handleRegisterSubmit}
                >
                  <input
                    className="p-3 m-3 w-full border border-gray-500 bg-transparent rounded-sm outline-none placeholder-zinc-700"
                    type="text"
                    placeholder="Full Name"
                    name="fullname"
                    value={fullname}
                    onChange={registerDataChange}
                  />

                  <input
                    className="p-3 m-3 w-full border border-gray-500 bg-transparent rounded-sm outline-none placeholder-zinc-700"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                  <input
                    className="p-3 m-3 w-full border border-gray-500 bg-transparent rounded-sm outline-none placeholder-zinc-700"
                    type={type}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  {isToggle ? (
                    <FaEyeSlash
                      className="fixed translate-x-28 md:translate-x-32  translate-y-3 cursor-pointer"
                      onClick={handleToggleShow}
                    />
                  ) : (
                    <FaRegEye
                      className="fixed translate-x-28 md:translate-x-32 translate-y-3 cursor-pointer "
                      onClick={handleToggleHide}
                    />
                  )}

                  <button
                    type="submit"
                    className="p-3 m-3 bg-gray-900 text-stone-300 w-full text-2xl rounded-sm hover:bg-gray-950 "
                  >
                    Register
                  </button>
                  <span>or</span>
                  <button onClick={handleForm}>login</button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className=" m-[24px] p-8 rounded-md bg-gray-400  text-gray-800 shadow-2xl">
                <h1 className="text-2xl md:text-3xl font-medium m-4 text-gray-800 text-center">
                  Log In
                </h1>
                <form
                  className="flex flex-col justify-center items-center"
                  onSubmit={handleLoginSubmit}
                >
                  <input
                    className="p-3 m-3 w-full border border-gray-500 bg-transparent rounded-sm outline-none placeholder-zinc-700"
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                  <input
                    className="p-3 m-3 w-full border border-gray-500 bg-transparent rounded-sm outline-none placeholder-zinc-700"
                    type={type}
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  {isToggle ? (
                    <FaEyeSlash
                      className="fixed -translate-y-6 translate-x-28 md:translate-x-32  cursor-pointer"
                      onClick={handleToggleShow}
                    />
                  ) : (
                    <FaRegEye
                      className="fixed -translate-y-6 translate-x-28 md:translate-x-32 cursor-pointer "
                      onClick={handleToggleHide}
                    />
                  )}
                  <button
                    type="submit"
                    className="p-3 m-3 bg-gray-900 text-stone-300 w-full text-2xl rounded-sm hover:bg-gray-950 "
                  >
                    Login
                  </button>
                  <span>or</span>
                  <button onClick={handleForm}>register</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
