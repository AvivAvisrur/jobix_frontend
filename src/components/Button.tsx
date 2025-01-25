import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface Button extends MuiButtonProps {
  onClick?: () => void; // Optional prop
  style?: object;
}

const Button: React.FC<Button> = ({ onClick, style, children, ...props }) => {
  return (
    <MuiButton style={style} onClick={onClick} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
