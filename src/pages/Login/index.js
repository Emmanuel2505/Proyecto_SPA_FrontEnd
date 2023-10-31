import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { URLSERVER } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";

export default function Login() {
  const [data, setData] = useState({});
  const { login } = useNavbar();
  const navigate = useNavigate();
  const { isSessionActive } = useNavbar();

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const loginFetch = () => {
    let msg = "";
    if (data.email) {
      if (data.password) {
        fetch(`${URLSERVER}api/users/login`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        })
          .then((res) => res.json())
          .then((obj) => {
            if (obj.status === "ok") {
              if (login(obj)) {
                navigate("/");
              } else {
                alert("Faltan datos");
              }
            } else {
              alert(obj.status);
            }
          })
          .catch((err) => alert(`Error -> ${err}`));
      } else {
        msg = "Debe ingresar la contraseña";
        alert(msg);
      }
    } else {
      msg = "Debe ingresar el email";
      alert(msg);
    }
  };

  useEffect(() => {
    // console.log("Se ejecuta el use eject y la session es ", isSessionActive());
    if (isSessionActive()) {
      navigate("/");
    }
  });

  return (
    <main className="w-full flex flex-col items-center mb-8 px-4">
      <h2 className="text-center text-[56px] mb-8 font-semibold">
        Iniciar Sesión
      </h2>
      <section className="max-w-[448px] w-full border border-black rounded-[33px] p-4 lg:p-8">
        <Input
          title="Email*"
          placeholder="juan.perez@gmail.com"
          type="text"
          name="email"
          onChange={handleData}
          value={data.email}
        />
        <Input
          title="Contraseña*"
          placeholder="************"
          type="password"
          name="password"
          onChange={handleData}
          value={data.password}
        />
        <div className="w-full flex justify-end mt-4">
          <button
            className="py-2 px-5 bg-green-500 border rounded-full text-white hover:bg-green-400"
            onClick={loginFetch}
          >
            Ingresar
          </button>
        </div>
      </section>
    </main>
  );
}
