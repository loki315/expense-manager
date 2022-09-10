import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// styles
import { Button } from "@material-tailwind/react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className=" w-full bg-gray-300 px-24 py-5">
      <ul className="flex items-center mx-auto">
        <li
          className=" mr-auto text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          myMoney
        </li>
        {user && (
          <li>
            <Button onClick={logout}>Logout</Button>
          </li>
        )}
        {!user && (
          <>
            <li>
              <Button ripple={false} onClick={() => navigate("/login")}>
                Login
              </Button>
            </li>
            <li className=" ml-4">
              <Button ripple={false} onClick={() => navigate("/signup")}>
                Signup
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
