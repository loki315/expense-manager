import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// styles
import { Button, Input } from "@material-tailwind/react";

function Signup() {
  const { signup } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password, passwordConfirm });
  };

  return (
    <div className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h2 className="mb-4 text-center text-3xl font-bold">Signup</h2>
      <form>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="name"
        />
        <br />
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
        <Input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          label="password"
        />
        <br />
        <Button onClick={handleSubmit} fullWidth className="mb-4">
          Signup
        </Button>
      </form>
      <h6 className="text-center ml-auto flex justify-center">
        <span className=" text-gray-600 mr-2">Not registered?</span>
        <Link to="/login" className="text-md text-light-blue-600">
          Login
        </Link>
      </h6>
    </div>
  );
}

export default Signup;
