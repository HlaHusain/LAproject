import { url } from "../../config";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${url}/users/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
   
    return {
      success: response.ok,
      data,
    };
  } catch (e) {
    console.log("ERROR", await e);
    // create error object and reject if not a 2xx response code
    // let err = new Error("HTTP status code: " + response.status);
    // err.data = data;
    // err.status = response.status;
    // console.log("ERROR 1111", err);
    // return err;
  }
};
