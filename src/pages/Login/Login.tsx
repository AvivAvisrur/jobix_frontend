import React from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import Button from "../../components/Button.tsx";
import GoogleIcon from "../../assets/Google.svg";
import AppleIcon from "../../assets/apple-icon.svg";
import { sharedButtonStyles } from "./consts.ts";
import "./Login.css";
import { CreateAccountProps } from "./Login.types.ts";
import { Link } from "react-router";

const Login: React.FC<CreateAccountProps> = () => {
  return (
    <Grid
      container
      rowSpacing={3}
      size={12}
      direction={"column"}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
        <Button
          component={"a"}
          fullWidth
          variant="outlined"
          href="http://localhost:3001/api/auth/google"
          sx={sharedButtonStyles}
        >
          <img
            src={GoogleIcon}
            alt="Google"
            style={{ width: 20, marginRight: 8 }}
          />
          Continue with Google
        </Button>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
        <Button
          onClick={() => {}}
          fullWidth
          variant="outlined"
          sx={sharedButtonStyles}
        >
          <img
            src={AppleIcon}
            alt="Apple"
            style={{ width: 20, marginRight: 8 }}
          />
          Continue with Apple
        </Button>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
        <Typography fontFamily={"Inter"}>
          Already have an account?
          <Link
            to="/login"
            style={{
              color: "#000000",
              textDecoration: "underline",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          >
            Log in
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
