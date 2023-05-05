import React from "react";
import {
  CustomBtn,
  CustomTextField,
  FormContainer,
} from "../../styledComponents/styledForm";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Box, InputAdornment, Typography } from "@mui/material";

export const Login = ({
  handleChange,
  handleVisibility,
  setIsLoginPage,
  loginFormData,
  visibility,
  handleLogin,
  loading,
  loginError,
}) => {
  return (
    <FormContainer register={false} onSubmit={handleLogin}>
      <Typography
        variant="h5"
        component="h5"
        color="primary"
        textAlign="center"
        textTransform="uppercase"
      >
        Welcome Back!
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        height="100%"
      >
        <Box>
          <Typography variant="body2" color="primary" gutterBottom={2}>
            Username
          </Typography>
          <CustomTextField
            required
            register={false}
            id="identifier"
            name="username"
            value={loginFormData.username}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="primary" gutterBottom={2}>
            Password
          </Typography>
          <CustomTextField
            required
            register={false}
            type={visibility ? "text" : "password"}
            id="user-pwd"
            name="password"
            value={loginFormData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {visibility ? (
                    <VisibilityIcon onClick={handleVisibility} />
                  ) : (
                    <VisibilityOffIcon onClick={handleVisibility} />
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space=evenly"
          flexDirection="column"
        >
          <CustomBtn type="submit" disabled={loading}>
            Log In
          </CustomBtn>
          {loginError && (
            <Alert
              severity="error"
              color="warning"
              variant="filled"
              sx={{ fontSize: 12, marginY: 2 }}
            >
              {loginError}
            </Alert>
          )}
          <Typography variant="caption">
            Don't have account yet?
            <span
              className="link"
              onClick={() => {
                setIsLoginPage(false);
              }}
            >
              &nbsp;Register here
            </span>
          </Typography>
        </Box>
      </Box>
    </FormContainer>
  );
};
