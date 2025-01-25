import React from "react";
import { Button, Box } from "@mui/material";
import { useThemeContext } from "../theme";

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeContext();

  return (
    <Box sx={{ position: "fixed", top: 16, right: 16 }}>
      <Button variant="contained" onClick={toggleTheme}>
        {mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </Button>
    </Box>
  );
};

export default ThemeToggleButton;
