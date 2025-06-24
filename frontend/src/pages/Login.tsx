import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const [inputError, setInputError] = useState<{
    email: string | null;
    password: string | null;
  }>({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log("email : ", email);
  }, [email]);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let emailError = null;
    let passwordError = null;

    if (!email.trim()) {
      emailError = "Email is required";
    } else if (!emailRegex.test(email)) {
      emailError = "Please enter a valid email";
    }

    if (!password.trim()) {
      passwordError = "Password is required";
    }

    if (emailError || passwordError) {
      setInputError({ email: emailError, password: passwordError });
      return;
    }

    setInputError({ email: null, password: null });
    const success = await login(email, password);
    console.log("is success ", success);
    if (success) {
      return navigate("/dashboard");
    } else {
      alert("User does not exist");
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className=" rounded w-full h-screen gap-[24px] flex flex-col justify-center items-center">
      <div className="min-w-[336px] border border-neutral-300 rounded p-[24px] flex flex-col justify-center items-center gap-[24px]">
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={inputError.email}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          error={inputError.password}
        />
        <div>
          Don't have an account?{" "}
          <div
            onClick={() => navigate("/signup")}
            className="text-center text-amber-600 hover:text-amber-700 cursor-pointer"
          >
            Sign up
          </div>
        </div>
        <Button text="Login" varient="primary" onClick={handleSubmit}></Button>
      </div>
    </main>
  );
};
