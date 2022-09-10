import { createContext, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "AUTH_IS_READY":
      return {
        ...state,
        isAuthReady: true,
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    isAuthReady: false,
    user: null,
    error: {
      err: null,
      color: "red",
    },
  });

  async function setError(err) {
    dispatch({ type: "ERROR", payload: err });
    setTimeout(() => {
      dispatch({
        type: "ERROR",
        payload: {
          err: null,
          color: "red",
        },
      });
    }, 2000);
  }

  async function login(data) {
    let res = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    res = await res.json();
    if (res.success) {
      setError({
        err: new Error("Login Successful"),
        color: "green",
      });
      dispatch({ type: "LOGIN", payload: res.data.user });
      localStorage.setItem("jwt", res.token);
      navigate("/");
    } else {
      setError({
        err: res,
        color: "red",
      });
    }
  }

  async function signup(data) {
    const res = await fetch("http://localhost:5000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => result.json());

    if (res.success) {
      setError({
        err: new Error("Signup Successful"),
        color: "green",
      });
      dispatch({ type: "LOGIN", payload: res.data.user });
      localStorage.setItem("jwt", res.token);
      navigate("/");
    } else {
      setError({
        err: res,
        color: "red",
      });
    }
  }

  async function logout() {
    const res = await fetch("http://localhost:5000/api/users/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => result.json());
    if (res.success) {
      setError({
        err: new Error("Logged Out Successfully"),
        color: "green",
      });
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("jwt");
      navigate("/");
    } else {
      setError({
        err: res,
        color: "red",
      });
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const fn = async () => {
      if (jwt) {
        let res = await fetch("http://localhost:5000/api/users/protect", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jwt }),
        });
        await res.json().then((res) => {
          if (res.success) {
            dispatch({ type: "LOGIN", payload: res.data.user });
          } else {
            dispatch({ type: "LOGOUT" });
          }
        });
      }
      dispatch({ type: "AUTH_IS_READY" });
    };
    fn();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
