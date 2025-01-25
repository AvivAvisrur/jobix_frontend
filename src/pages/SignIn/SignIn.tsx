import React from "react";
import {
  Button,
  Divider,
  Grid2 as Grid,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import GoogleIcon from "../../assets/Google.svg";
import { useAppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";
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
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const resultAction = await dispatch(login(data)); // Dispatch the thunk

    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard"); // Navigate to dashboard on success
    }
  };
  //   const onSubmit: SubmitHandler<FormValues> = async (data) => {
  //     const resultAction = await dispatch(signUpUser(data)); // Dispatch the thunk

  //     if (signUpUser.fulfilled.match(resultAction)) {
  //       navigate("/login"); // Navigate to dashboard on success
  //     } else if (signUpUser.rejected.match(resultAction)) {
  //       const error = resultAction.payload;

  //       if (error && "field" in error) {
  //         // Field-specific error
  //         setError(error.field as keyof FormValues, {
  //           type: "server",
  //           message: error.message,
  //         });
  //       }
  //     }
  //   };
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
            Log in
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
                  <Typography>Email</Typography>
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
                  <Typography>Password</Typography>
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
            Forgot password?
          </Link>
        </Grid>
        <Grid size={{ xs: 12, md: 10, lg: 8, xl: 6 }}>
          <Button
            fullWidth
            type="submit"
            // disabled={!isValid || isSubmitting} // Disable if invalid or submitting
            style={{
              color: "white",
              backgroundColor: "#000000",
              borderRadius: "14px",
              textDecoration: "capitalize",
              textTransform: "none",
              marginTop: "0.8em",
            }}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
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
              Or Login with
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
            Don't have an account?
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
              Sign up
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignIn;
