import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => [
    //post to 3000/login
    login(password, password),
  ];
  return (
    <main className="flex flex-col justify-center items-center">
      <input type="email" value={email} onChange={handleEmailChange}></input>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <button onClick={handleSubmit}>Submit</button>
    </main>
  );
};
