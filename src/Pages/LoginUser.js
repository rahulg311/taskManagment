import {
  Form,
  Button,
  Navbar,
  nav,
  Container,
  Carousel,
  Table,
  card,
} from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";

import { Input } from "antd";

function LoginUser({ setToken }) {
  const navigate = useNavigate();
  const GetUserDetails = sessionStorage.getItem("token");

  console.log("GetUserDetails", GetUserDetails);

  const [UserLogin, setUserLogin] = useState({
    UserName: "",
    Password: "",
  });
  //----------- handle change data ---------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...UserLogin, [name]: value });
  };

  //----------- user login  ---------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(UserLogin.UserLogin,UserLogin.Password,UserLogin)
      if (UserLogin?.UserName === "Rahulkumar" && UserLogin?.Password === "123" ) {
        toast.success(" Login to Successfully");
        sessionStorage.setItem("token", UserLogin.UserName);
        // sessionStorage.setItem('UserDetails', JSON.stringify((res?.UserLogin)))
        const GetUserDetailss = sessionStorage.getItem("token");
        await setToken(UserLogin.UserName);
        console.log("GetUserDetailss", GetUserDetailss);
        setTimeout(() => {
          navigate("/TaskManager");
        }, 2000);
        setUserLogin({
          UserName: "",
          Password: "",
        });
      } else {
        toast.error(" User ID does not match");
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      <div className="App backgoundloginss  vh-100">
        <ToastContainer />

        <div className="flex flex-col items-center justify-center   p-3  h-lvh">
          <div></div>
          <div className="bg-white cardContainer p-6 max-w-sm w-full ">
            <h3 className="mb-1 text-2xl font-bold text-center">
              User Sign in
            </h3>

            <Form onSubmit={handleSubmit}>
              <div className="mb-3 px-2 mt-8">
                <div className="flex items-center border- border-gray-300 py-2">
                  <input
                    class="w-full px-2 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    type="text"
                    name="UserName"
                    value={UserLogin.UserName}
                    onChange={(e) => handleChange(e)}
                    placeholder="User Id"
                    required
                  />
                </div>
                <div className="flex items-center border- border-gray-300 py-2">
                  <Input.Password
                    size="large"
                    type="password"
                    name="Password"
                    value={UserLogin.Password}
                    onChange={(e) => handleChange(e)}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <button className="bg-blue-500 btn_l text-white px-4 py-2 rounded-md  w-full">
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
