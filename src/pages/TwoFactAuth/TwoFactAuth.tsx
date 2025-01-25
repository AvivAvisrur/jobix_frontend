import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/store";
import axiosApi from "../../constants/axiosApi";
import { Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { CodeFormValues } from "./TwoFactAuth.types";
import { useNavigate } from "react-router";

const TwoFactAuth: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  console.log("hi");

  const {
    register,
    handleSubmit,
    // from react-hook-form if we want to programmatically move focus
    formState: { errors },
  } = useForm<CodeFormValues>({
    defaultValues: {
      d1: "",
      d2: "",
      d3: "",
      d4: "",
    },
    mode: "onChange",
  });
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleDigitChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = e.target.value;
    // If user typed exactly 1 character and it's not the last field, move focus
    if (value && value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmit: SubmitHandler<CodeFormValues> = async (values) => {
    const code = values.d1 + values.d2 + values.d3 + values.d4;
    console.log("Full code:", code);
    // Call your verify API endpoint with this code
    // e.g., axios.post('/verify-2fa-code', { code })
    const response = await axiosApi.post("/auth/verify-2fa-code", { code });
    if (response.status === 200) {
      navigate("/dashboard");
    }
  };
  useEffect(() => {
    axiosApi.post("/auth/send-2fa-code", { phoneOrEmail: user?.email });
  }, []);

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
        container
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        rowSpacing={5} // Add spacing between rows
        size={{ xs: 12, md: 8, lg: 8, xl: 8 }}
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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction={"column"}
          size={12}
        >
          <Grid>
            <Typography component={"h1"} fontWeight={"bold"}>
              Please check your email
            </Typography>
          </Grid>
          <Grid>
            <Typography component={"p"}>
              {`We’ve sent a code to:${user?.email}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={4}
          size={3}
          justifyContent="center"
          alignItems="center"
          sx={{ direction: "ltr" }}
        >
          <Grid size={3}>
            <TextField
              inputRef={(el) => (inputRefs.current[0] = el)}
              {...register("d1", {
                required: "Required",
                maxLength: {
                  value: 1,
                  message: "Only one digit",
                },
                pattern: {
                  value: /^[0-9]$/,
                  message: "Only digits allowed",
                },
              })}
              error={!!errors.d1}
              helperText={errors.d1?.message}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "3ch",
                },
              }}
              onChange={(e) => handleDigitChange(e, 0)}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              inputRef={(el) => (inputRefs.current[1] = el)}
              {...register("d2", {
                required: "Required",
                maxLength: {
                  value: 1,
                  message: "Only one digit",
                },
                pattern: {
                  value: /^[0-9]$/,
                  message: "Only digits allowed",
                },
              })}
              error={!!errors.d1}
              helperText={errors.d1?.message}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "3ch",
                },
              }}
              onChange={(e) => handleDigitChange(e, 1)}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              inputRef={(el) => (inputRefs.current[2] = el)}
              {...register("d3", {
                required: "Required",
                maxLength: {
                  value: 1,
                  message: "Only one digit",
                },
                pattern: {
                  value: /^[0-9]$/,
                  message: "Only digits allowed",
                },
              })}
              error={!!errors.d1}
              helperText={errors.d1?.message}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "3ch",
                },
              }}
              onChange={(e) => handleDigitChange(e, 2)}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              inputRef={(el) => (inputRefs.current[3] = el)}
              {...register("d4", {
                required: "Required",
                maxLength: {
                  value: 1,
                  message: "Only one digit",
                },
                pattern: {
                  value: /^[0-9]$/,
                  message: "Only digits allowed",
                },
              })}
              error={!!errors.d1}
              helperText={errors.d1?.message}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "3ch",
                },
              }}
              onChange={(e) => handleDigitChange(e, 3)}
            />
          </Grid>
        </Grid>
        <Grid size={3}>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#000000",
              borderRadius: "14px",
              textDecoration: "capitalize",
              textTransform: "none",
              textAlign: "center",
            }}
            fullWidth
            type="submit"
          >
            Verify
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TwoFactAuth;
