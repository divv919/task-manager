import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup } = useAuth();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    signup(email, password, name);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <main className="flex flex-col justify-center items-center">
      <input type="text" value={name} onChange={handleNameChange} />
      <input type="email" value={email} onChange={handleEmailChange}></input>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <button onClick={handleSubmit}>Signup</button>
    </main>
  );
};
