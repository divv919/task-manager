import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [inputError, setInputError] = useState<{
    name: string | null;
    email: string | null;
    password: string | null;
  }>({
    name: null,
    email: null,
    password: null,
  });
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  console.log("Base URL:", import.meta.env.VITE_BACKEND_BASE);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let nameError = null;
    let emailError = null;
    let passwordError = null;

    if (!name.trim()) nameError = "Name is required";
    if (!email.trim()) {
      emailError = "Email is required";
    } else if (!emailRegex.test(email)) {
      emailError = "Please enter a valid email";
    }
    if (!password.trim()) passwordError = "Password is required";

    if (nameError || emailError || passwordError) {
      setInputError({
        name: nameError,
        email: emailError,
        password: passwordError,
      });
      return;
    }

    setInputError({ name: null, email: null, password: null });

    const success = await signup(email, password, name);
    if (success) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="min-w-[336px] border border-neutral-300 justify-center items-center rounded-md p-[24px] flex flex-col gap-[24px]">
        <Input
          label="Name"
          placeholder="Enter Your name"
          type="text"
          value={name}
          onChange={handleNameChange}
          error={inputError.name}
        />
        <Input
          label="Email"
          placeholder="Enter Your Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={inputError.email}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={inputError.password}
        ></Input>
        <div>
          Already have an account?
          <div
            onClick={() => navigate("/login")}
            className="text-center text-amber-600 hover:text-amber-700 cursor-pointer"
          >
            Login
          </div>
        </div>
        <Button varient="primary" text="Signup" onClick={handleSubmit}></Button>
      </div>
    </main>
  );
};
