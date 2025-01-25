import React, { useState } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import "./Landing.css";
import Button from "../../components/Button";
import { Login } from "../Login";
import { CSSTransition } from "react-transition-group";
import CreateAccount from "../CreateAccount/CreateAccount";
interface LandingPageProps {
  defaultShowCreateAccount?: boolean; // Optional prop to set the initial state
}
const LandingPage: React.FC<LandingPageProps> = ({
  defaultShowCreateAccount = false,
}) => {
  const [showSignUp, setShowSignUp] = useState(defaultShowCreateAccount);
  const [showLoginPage, setShowLoginPage] = useState(false);

  const handleCreateAccountClick = () => {
    setShowSignUp(true);
  };
  const handleSignInClick = () => {
    setShowLoginPage(true);
  };

  const handleContentRender = () => {
    return showLoginPage ? (
      <Login user="hi" />
    ) : showSignUp ? (
      <CreateAccount />
    ) : null;
  };
  return (
    <Grid
      container
      size={12}
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      {/*
        Left Section: Could hold an image or brand panel
      */}
      <Grid
        container
        rowSpacing={5}
        direction={"column"}
        sx={{ justifyContent: "center", alignItems: "center" }}
        size={6}
      >
        {/* <Grid item xs={4}>
          <img src="src\logo.svg" />
        </Grid> */}
        <Grid size={12} textAlign={"center"}>
          <Typography
            fontWeight={"bold"}
            fontSize={"2rem"}
            fontFamily={"Poppins"}
            whiteSpace={"nowrap"}
          >
            Welcome to Jobix
          </Typography>
          <Typography>Now your finances are in one place</Typography>
          <Typography>and always under control</Typography>
        </Grid>
        <Grid
          container
          size={12}
          direction={"column"}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <>
            {showLoginPage || showSignUp ? (
              <CSSTransition
                in={true}
                appear={true}
                timeout={500}
                classNames="fade-slide"
              >
                {handleContentRender()}
              </CSSTransition>
            ) : (
              <>
                <Grid size={{ xs: 6, md: 4, lg: 4, xl: 4 }}>
                  <Button
                    fullWidth
                    sx={{ p: 1.5 }}
                    onClick={handleSignInClick}
                    style={{
                      color: "white",
                      backgroundColor: "#000000",
                      borderRadius: "14px",
                      textDecoration: "capitalize",
                      textTransform: "none",
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid size={{ xs: 6, md: 4, lg: 4, xl: 4 }}>
                  <Button
                    fullWidth
                    sx={{ p: 1.5 }}
                    onClick={handleCreateAccountClick}
                    style={{
                      color: "#000000",
                      backgroundColor: "#FFF",
                      borderRadius: "14px",
                      border: "1px solid #747474",
                      textDecoration: "capitalize",
                      textTransform: "none",
                    }}
                  >
                    Create account
                  </Button>
                </Grid>
              </>
            )}
          </>
        </Grid>
      </Grid>
      {/*
        Right Section: Holds the login form
      */}
      <Grid
        size={6}
        container
        direction="column"
        sx={{
          backgroundColor: "#FFA600",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid>
          <Typography fontFamily={"Wittgenstein"} fontSize={"2.5rem"}>
            You are what you do,
          </Typography>
          <Typography fontFamily={"Wittgenstein"} fontSize={"2.5rem"}>
            not what you’ll do
          </Typography>
        </Grid>
        {/* Or place a logo, branding, or any custom content here */}
      </Grid>
    </Grid>
  );
};

export default LandingPage;
