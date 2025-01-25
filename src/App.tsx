import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./redux/store";
import { SignIn } from "./pages/SignIn/";
import { Box } from "@mui/material";
import LandingPageWithQuery from "./pages/Landing/LandingPageWithQuery";
// import ThemeToggleButton from "./components/ThemeToggleButton";
import TwoFactAuth from "./pages/TwoFactAuth/TwoFactAuth";
import PartialProtectedRoute from "./components/PartialProtectedRoute";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // right now removed it i dont need it .
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     dispatch(validateSession());
  //   }
  // }, [dispatch]);

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column", // Allows easy stacking for vertical layouts
      }}
    >
      <Routes>
        <Route
          index
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <LandingPageWithQuery />
            )
          }
        />
        <Route path="/login" element={<SignIn />} />
        <Route element={<PartialProtectedRoute />}>
          <Route path="/verify_code" element={<TwoFactAuth />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
        </Route>
      </Routes>
      {/* <ThemeToggleButton /> */}
    </Box>
  );
}

export default App;
