import { createTheme, Theme } from "@mui/material/styles";

// export const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#1976d2", // Customize primary color
//     },
//     background: {
//       default: "#ffffff",
//       paper: "#f5f5f5",
//     },
//   },
// });

// export const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#90caf9", // Customize primary color
//     },
//     background: {
//       default: "#121212",
//       paper: "#1e1e1e",
//     },
//   },
// });

export function getTheme(direction: "ltr" | "rtl"): Theme {
  return createTheme({
    direction,
    // ... other theme options
  });
}
