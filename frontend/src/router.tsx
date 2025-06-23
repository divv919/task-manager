import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import App from "./App";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Navigate to={"/login"} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
