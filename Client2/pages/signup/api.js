import { url } from "../../config";

export const signup = async (email, password) => {
  try {
    const response = await fetch(`${url}/users/add`, {
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
  }
};
