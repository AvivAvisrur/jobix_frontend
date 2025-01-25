import React from "react";
import {
  Button,
  Divider,
  Grid2 as Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import GoogleIcon from "../../assets/Google.svg";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";
import { useTranslation } from "react-i18next";
const SignIn: React.FC = () => {
  type FormValues = {
    email: string;
    password: string;
  };

  const SERVER_URL = import.meta.env.VITE_SERVER_HOST;
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const resultAction = await dispatch(login(data)); // Dispatch the thunk

    if (login.fulfilled.match(resultAction)) {
      navigate("/verify_code"); // Navigate to dashboard on success
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
      }}
    >
      <Grid
        component={"form"}
        id="login_form"
        onSubmit={handleSubmit(onSubmit)}
        rowSpacing={5} // Add spacing between rows
        container
        size={{ xs: 10, md: 8, lg: 6, xl: 4 }}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        // spacing={3}
        sx={{
          backgroundColor: "#fff", // White background
          padding: 4, // Inner padding
          borderRadius: 2, // Rounded corners
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", // Paper-like shadow
          border: "1px solid #ddd", // Optional: Light border for definition
        }}
      >
        {/* Title */}
        <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Typography
            textAlign="start"
            fontSize="2rem"
            fontFamily="Poppins"
            component="h1"
            fontWeight="bold"
          >
            {t("loginPage.mainTitle")}
          </Typography>
        </Grid>

        {/* Email Field */}
        <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <InputLabel htmlFor="email" shrink={false}>
                  <Typography>{t("generalFields.email")}</Typography>
                </InputLabel>
                <TextField
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  //   size="small"
                  fullWidth
                />
              </>
            )}
          />
        </Grid>

        {/* Password Field (optional, add if needed) */}
        <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <InputLabel htmlFor="password" shrink={false}>
                  <Typography>{t("generalFields.password")}</Typography>
                </InputLabel>
                <TextField
                  {...field}
                  type="password"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  //   size="small"
                  fullWidth
                />
              </>
            )}
          />
        </Grid>
        <Grid textAlign={"end"} size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              fontFamily: "Inter",
              fontSize: "1rem",
            }}
            to={"/reset_password"}
          >
            {t("loginPage.forgotPass")}
          </Link>
        </Grid>
        <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Button
            fullWidth
            type="submit"
            disabled={!isValid || isSubmitting} // Disable if invalid or submitting
            style={{
              color: "white",
              backgroundColor: "#000000",
              borderRadius: "14px",
              textDecoration: "capitalize",
              textTransform: "none",
              marginTop: "0.8em",
            }}
          >
            {isSubmitting
              ? ` ${t("loginPage.loggingIn")}...`
              : t("loginPage.loginButton")}
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Divider
            sx={{
              "&::before, &::after": {
                borderColor: "#ccc", // Line color
              },
            }}
          >
            <Typography
              sx={{
                color: "#777", // Text color
                fontSize: "0.9rem",
              }}
            >
              {t("loginPage.dividerText")}
            </Typography>
          </Divider>
        </Grid>
        <Grid
          size={{ xs: 12, md: 10, lg: 8, xl: 6 }}
          container
          justifyContent={"end"}
        >
          <Grid size={4}>
            <Button
              component={"a"}
              fullWidth
              variant="outlined"
              href={`${SERVER_URL}/auth/google`}
              sx={{
                borderRadius: "10px",
                border: "1px solid #D8DADC",
                padding: "20px",
              }}
            >
              <img
                src={GoogleIcon}
                alt="Google"
                // style={{ width: 20, marginRight: 8 }}
              />
            </Button>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 12, md: 10, lg: 8, xl: 6 }}
          sx={{
            marginTop: "3rem", // Adds space above the link
          }}
        >
          <Typography fontFamily={"Inter"}>
            {t("loginPage.noAccount")}
            <Link
              to="/?createAccount=true"
              style={{
                color: "#000000",
                fontWeight: "bold",
                marginLeft: "10px",
                textDecoration: "underline",
                fontFamily: "Inter",
              }}
            >
              {t("loginPage.signUp")}
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
