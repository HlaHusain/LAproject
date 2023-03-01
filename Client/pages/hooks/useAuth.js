import { useEffect, useState } from "react";
import { url } from "../../config";
import { useRouter } from "next/router";

export default function useAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    setIsAuthorized(Boolean(token));
  }, []);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push({ pathname: "/login" });

    // fetch(`${url}/users/logout/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //     Authorization: token,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     localStorage.removeItem("token");
    //     router.push({ pathname: "/login" });
    //   });
  };

  return {
    isAuthorized,
    logout,
    token,
  };
}
