import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// styles
import { Button, Input } from "@material-tailwind/react";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="mb-4 text-center text-3xl font-bold">Login</h2>
      <form>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="email"
        />
        <br />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="password"
        />
        <br />
        <Button fullWidth onClick={handleSubmit}>
          Login
        </Button>
      </form>
      <br />
      <h6 className="text-center ml-auto flex justify-center">
        <span className=" text-gray-600 mr-2">Not registered?</span>
        <Link to="/signup" className="text-md text-light-blue-600">
          Signup
        </Link>
      </h6>
    </div>
  );
}

export default Login;
