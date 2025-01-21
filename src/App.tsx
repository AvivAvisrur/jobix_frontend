import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login/Login";
import { Container } from "@mui/material";

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  );
}

export default App;
