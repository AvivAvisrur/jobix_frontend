import React from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import Button from "../../components/Button";
import GoogleIcon from "../../assets/Google.svg";
import AppleIcon from "../../assets/apple-icon.svg";
import { sharedButtonStyles } from "./CreateAccount.ts";
import "./CreateAccount.css";
interface CreateAccountProps {}

const CreateAccount: React.FC<CreateAccountProps> = () => {
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
          onClick={() => {}}
          fullWidth
          variant="outlined"
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
        <Button
          onClick={() => {}}
          fullWidth
          variant="outlined"
          sx={sharedButtonStyles}
        >
          Register
        </Button>
      </Grid>
      <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
        <Typography
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          Already have an account?
          <Button
            onClick={() => {}}
            sx={{
              textTransform: "none",
              textDecoration: "underline",
              color: "#000",
              fontWeight: "bold",
            }}
            variant="text"
          >
            Log in
          </Button>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
