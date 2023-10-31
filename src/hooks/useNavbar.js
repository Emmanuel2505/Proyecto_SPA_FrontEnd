import navbarContext from "../contexts/NavbarContext";

import { useContext, useEffect, useState } from "react";
import { SESSIONSTORAGE, URLSERVER } from "../Helpers/Constants";
const userModel = { token: "", fullname: "", rol: "", email: "" };

function resetStorage() {
  setSessionStorage(userModel);
}

function setSessionStorage(model) {
  localStorage.setItem(SESSIONSTORAGE, JSON.stringify(model));
}

function sessionStorage() {
  try {
    if (!localStorage.getItem(SESSIONSTORAGE)) {
      resetStorage();
    }
    return JSON.parse(localStorage.getItem(SESSIONSTORAGE));
  } catch (error) {
    console.log("Error-->", error);
  }
}

export const useNavbarModel = () => {
  const [url, setUrl] = useState("/");
  const [session, setSession] = useState(sessionStorage());
  const [data, setData] = useState({});

  const logout = () => {
    resetStorage();
    setSession(sessionStorage());
  };

  function uploadProduct() {
    fetch(`${URLSERVER}api/administer/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data[0]);
        console.log(data);
      });
  }

  useEffect(() => {
    uploadProduct();
  }, []);

  const isSessionActive = () => {
    let chis = false;
    if (session.email !== "") {
      chis = true;
    }
    return chis;
  };

  const isSessionAdmin = () => {
    return isSessionActive() & (session.rol === "admin");
  };

  const getAhutorization = () => {
    let ahorization = "Bearer ";
    ahorization += session.token;
    return ahorization;
  };

  const login = (data) => {
    let chis = true;
    if (data.token) {
      if (data.fullname) {
        if (data.email) {
          if (data.rol) {
            setSessionStorage(data);
            setSession(sessionStorage());
          } else {
            chis = false;
          }
        } else {
          chis = false;
        }
      } else {
        chis = false;
      }
    } else {
      chis = false;
    }
    return chis;
  };

  return {
    url,
    session,
    data,
    setData,
    setUrl,
    login,
    logout,
    isSessionActive,
    isSessionAdmin,
    getAhutorization,
  };
};
// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(navbarContext);
