import { Outlet } from "react-router";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="bg-neutral-100 min-w-screen min-h-screen ">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
