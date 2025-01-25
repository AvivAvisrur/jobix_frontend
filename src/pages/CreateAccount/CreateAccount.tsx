import React, { useState } from "react";
import {
  Button,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { signUpUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  mobileNum: string;
};
const CreateAccount: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const resultAction = await dispatch(signUpUser(data)); // Dispatch the thunk

    if (signUpUser.fulfilled.match(resultAction)) {
      navigate("/login"); // Navigate to dashboard on success
    } else if (signUpUser.rejected.match(resultAction)) {
      const error = resultAction.payload;

      if (error && "field" in error) {
        // Field-specific error
        setError(error.field as keyof FormValues, {
          type: "server",
          message: error.message,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid
      component={"form"}
      id="sign_up_form"
      container
      rowSpacing={3}
      size={8}
      direction={"column"}
      sx={{ justifyContent: "center", alignItems: "center" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      {!loading ? (
        <>
          <Grid size={{ xs: 12, md: 12, lg: 6, xl: 6 }}>
            <Typography
              fontFamily={"Poppins"}
              fontWeight={"bold"}
              fontSize={"1.3em"}
              textAlign={"center"}
            >
              {t("createAccount.mainTitle")}
            </Typography>
          </Grid>
          <Grid container spacing={3} size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
            <Grid size={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputLabel htmlFor={"firstName"} shrink={false}>
                      <Typography>{t("generalFields.firstName")}</Typography>
                    </InputLabel>
                    <TextField
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      size="small"
                      fullWidth
                    />
                  </>
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field, fieldState }) => (
                  <>
                    <InputLabel {...field} shrink={false}>
                      <Typography>{t("generalFields.lastName")}</Typography>
                    </InputLabel>
                    <TextField
                      {...field}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      size="small"
                      fullWidth
                    />
                  </>
                )}
              />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field, fieldState }) => (
                <>
                  <InputLabel {...field} shrink={false}>
                    <Typography>{t("generalFields.email")}</Typography>
                  </InputLabel>
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    size="small"
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
            <Controller
              name="mobileNum"
              control={control}
              rules={{ required: "Mobile number is required" }}
              render={({ field, fieldState }) => (
                <>
                  <InputLabel {...field} shrink={false}>
                    <Typography>{t("generalFields.mobileNumber")}</Typography>
                  </InputLabel>
                  <TextField
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    size="small"
                    placeholder={t("generalFields.mobileFormat")} // Example placeholder
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
            <Controller
              name="password"
              rules={{
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, // Regex for uppercase and special character
                  message:
                    "Password must include at least one uppercase and one special character",
                },
              }}
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <InputLabel {...field} shrink={false}>
                    <Typography>{t("generalFields.password")}</Typography>
                  </InputLabel>
                  <TextField
                    {...field}
                    type={showPassword ? "text" : "password"}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 8, xl: 8 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isSubmitting} // Disable if invalid or submitting
              fullWidth
              style={{
                color: "white",
                backgroundColor: "#000000",
                borderRadius: "14px",
                textDecoration: "capitalize",
                textTransform: "none",
              }}
            >
              {isSubmitting
                ? `${t("generalFields.submitting")}...`
                : t("generalFields.submitButton")}
            </Button>
          </Grid>
        </>
      ) : (
        <h1> creating account ....</h1>
      )}
    </Grid>
  );
};

export default CreateAccount;
