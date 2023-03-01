import '../styles/globals.css'
import * as React from "react";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { url } from "../config";

export default function App({ Component, pageProps }) {
  const { logout, isAuthorized, token } = useAuth();
  const [userData, setUserData] = React.useState([])
  const [email, setEmail] = React.useState("");

  const getUserData =() =>{
    fetch(`${url}/users/behaviour`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('response : ',res ,res.length);
        setUserData(res)
        setEmail(res.email);
      });
  }


  


  useEffect(() => {
    try {
      if (isAuthorized) {
        getUserData()
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  }, [isAuthorized]);

  return <Component getUserData={getUserData} userData={userData} {...pageProps} />
}
