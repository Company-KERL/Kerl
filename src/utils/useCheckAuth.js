import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const useCheckAuth = () => {
  const { logIn, logOut, loading, setLoading, setUser } =
    useContext(UserContext);

  const checkAuth = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URI}/check-auth`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        if (data.isLoggedIn) {
          logIn(data.user);
        } else {
          logOut();
        }
      })
      .catch(() => logOut())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { checkAuth, loading };
};

export default useCheckAuth;
