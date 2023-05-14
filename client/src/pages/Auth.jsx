import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Login } from "../components/Auth/Login";
import { Register } from "../components/Auth/Register";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Auth = ({ isMobile }) => {
  const [isLoginPage, setIsLoginPage] = React.useState(true);
  const [profilePicture, setProfilePicture] = React.useState("");
  const [loginFormData, setLoginFormData] = React.useState({
    username: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    profile: "",
  });
  const [visibility, setVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState(null);
  const [registerError, setRegisterError] = React.useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (isLoginPage) {
      setLoginFormData((prevFormData) => {
        return {
          ...prevFormData,
          [e.target.name]: e.target.value,
        };
      });
    } else {
      setRegisterFormData((prevFormData) => {
        return {
          ...prevFormData,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const changeProfilePicture = (file) => {
    setLoading(true);
    if (file === undefined) {
      setLoading(false);
      //Show Toast
    }
    if (file.type === "image/jpeg" || file.type === "image/png") {
      setLoading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "noah-chat-app");
      data.append("cloud_name", "dek6ihfme");

      fetch("https://api.cloudinary.com/v1_1/dek6ihfme/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setProfilePicture(data.url.toString());
          setLoading(false);
          console.log(data.url.toString());
          //Show Toast
        })
        .catch((err) => {
          setLoading(false);
          //Show Toast
        });
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://chat-app-beast.onrender.com/api/user/register",
        registerFormData,
        config
      );
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      //Show Toast

      navigate("/chat");
    } catch (err) {
      setLoading(false);
      setRegisterError(err.response.data.message);
      //Show Toast
      //toast.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://chat-app-beast.onrender.com/api/user/login",
        loginFormData,
        config
      );
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      navigate("/chat");
    } catch (err) {
      setLoading(false);
      setLoginError(err.response.data.message);
      //Show Toast
      //toast.error(error);
    }
  };

  React.useEffect(() => {
    setRegisterFormData((prevFormData) => {
      return {
        ...prevFormData,
        profile: profilePicture,
      };
    });
  }, [[profilePicture]]);

  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      navigate("/chat");
    }
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Typography
        variant={isMobile ? "h5" : "h3"}
        color="#fff"
        fontFamily="Bruno Ace"
      >
        BEAST
      </Typography>
      {loading && (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="text" />
        </Box>
      )}
      {isLoginPage ? (
        <Login
          visibility={visibility}
          handleChange={handleChange}
          handleVisibility={handleVisibility}
          loginFormData={loginFormData}
          setIsLoginPage={setIsLoginPage}
          handleLogin={handleLogin}
          loading={loading}
          loginError={loginError}
        />
      ) : (
        <Register
          isMobile={isMobile}
          visibility={visibility}
          handleChange={handleChange}
          handleVisibility={handleVisibility}
          registerFormData={registerFormData}
          setIsLoginPage={setIsLoginPage}
          profilePicture={profilePicture}
          changeProfilePicture={changeProfilePicture}
          handleSignUpSubmit={handleSignUpSubmit}
          loading={loading}
          registerError={registerError}
        />
      )}
    </Box>
  );
};
