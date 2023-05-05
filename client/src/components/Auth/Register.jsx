import React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  CustomBtn,
  CustomTextField,
  FormContainer,
} from "../../styledComponents/styledForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, InputAdornment, Typography, Fab, Alert } from "@mui/material";

export const Register = ({
  handleChange,
  handleVisibility,
  setIsLoginPage,
  registerFormData,
  visibility,
  isMobile,
  profilePicture,
  changeProfilePicture,
  handleSignUpSubmit,
  loading,
  registerError,
}) => {
  return (
    <FormContainer register={true} onSubmit={handleSignUpSubmit}>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        component={isMobile ? "h6" : "h5"}
        color="primary"
        textAlign="center"
        textTransform="uppercase"
      >
        Create your account
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        height="100%"
      >
        <Box>
          <Typography variant="body2" color="primary" gutterBottom={2}>
            Choose Username
          </Typography>
          <CustomTextField
            required
            register={true}
            id="user-id"
            name="username"
            value={registerFormData.username}
            onChange={handleChange}
          />
        </Box>

        <Box>
          <Typography variant="body2" color="primary" gutterBottom={2}>
            Email Address
          </Typography>
          <CustomTextField
            required
            register={true}
            type="email"
            id="user-email"
            name="email"
            value={registerFormData.email}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Typography variant="body2" color="primary" gutterBottom={2}>
            Password
          </Typography>
          <CustomTextField
            required
            register={true}
            type={visibility ? "text" : "password"}
            id="user-pwd"
            name="password"
            value={registerFormData.password}
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
        <Box>
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="profile"
              type="file"
              accept="image/*"
              disabled={loading}
              onChange={(e) => {
                changeProfilePicture(e.target.files[0]);
              }}
            />

            {profilePicture ? (
              <Fab
                color="grey"
                size="small"
                component="span"
                aria-label="uploaded"
                sx={{ fontSize: 14, textTransform: "none" }}
                variant="extended"
              >
                <AddIcon sx={{ fontSize: 14 }} />
                &nbsp;{profilePicture.split("/").pop()}
              </Fab>
            ) : (
              <Fab
                color="primary"
                size="small"
                component="span"
                aria-label="add"
                sx={{ fontSize: 14, textTransform: "none" }}
                variant="extended"
              >
                <AddIcon sx={{ fontSize: 14 }} />
                &nbsp;Upload profile
              </Fab>
            )}
          </label>
          <br />
        </Box>
        <Box
          display="flex"
          justifyContent="space=evenly"
          flexDirection="column"
          mb={2}
        >
          <CustomBtn type="submit" disabled={loading}>
            Sign Up
          </CustomBtn>
          {registerError && (
            <Alert
              severity="error"
              color="warning"
              variant="filled"
              sx={{ fontSize: 12, marginY: 2 }}
            >
              {registerError}
            </Alert>
          )}
          <Typography variant="caption">
            Already have an account?
            <span className="link" onClick={() => setIsLoginPage(true)}>
              &nbsp;Login here
            </span>
          </Typography>
        </Box>
      </Box>
    </FormContainer>
  );
};
