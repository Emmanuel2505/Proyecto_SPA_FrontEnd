import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { TIMEALERT, URLSERVER } from "../../Helpers/Constants";
import swal from "sweetalert";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const uploadUser = () => {
    const {
      names,
      surnames,
      phone,
      dni,
      birth,
      email,
      password,
      passwordRepeat,
    } = data;

    const params = [
      names,
      surnames,
      phone,
      dni,
      birth,
      email,
      password,
      passwordRepeat,
    ];

    let chis = true;
    params.forEach((el) => {
      if (!el || el.length === 0) {
        chis = false;
      }
    });

    if (chis) {
      fetch(`${URLSERVER}api/users/new-user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            swal({
              title: "Registro Exitoso",
              text: "Usuario Registrado Satisfactoriament",
              icon: "success",
              buttons: "Aceptar",
              timer: TIMEALERT,
            });
            alert("Usuario Registrado Satisfactoriamente");
            navigate("/login");
          } else {
            alert(data.status);
          }
        });
    } else {
      alert("Debe llenar todos los campos");
    }
  };
  return (
    <main className="w-full flex flex-col justify-center items-center mb-8 px-4">
      <h2 className="text-center text-[56px] mb-8 font-semibold">Registro</h2>
      <section className="max-w-[448px] w-full border border-black rounded-[33px] p-4 lg:p-8">
        <Input
          title="Nombre(s)*"
          placeholder="Juan Fernando"
          type="text"
          name="names"
          onChange={handleData}
          value={data.names}
        />
        <Input
          title="Apellido(s)*"
          placeholder="Pérez Ojeda"
          type="text"
          name="surnames"
          onChange={handleData}
          value={data.surnames}
        />
        <Input
          title="Número Celular*"
          placeholder="099XXXXXXX"
          type="text"
          name="phone"
          onChange={handleData}
          value={data.phone}
        />
        <Input
          title="Cédula*"
          placeholder="1103XXXXXX"
          type="text"
          name="dni"
          onChange={handleData}
          value={data.dni}
        />
        <Input
          title="Fecha de Nacimiento*"
          type="date"
          name="birth"
          onChange={handleData}
          value={data.birth}
        />
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
        <Input
          title="Repetir Contraseña*"
          placeholder="************"
          type="password"
          name="passwordRepeat"
          onChange={handleData}
          value={data.passwordRepeat}
        />
        <div className="w-full flex justify-end mt-4">
          <button
            className="py-2 px-5 bg-green-500 border rounded-full text-white hover:bg-green-400"
            onClick={uploadUser}
          >
            Registrarse
          </button>
        </div>
      </section>
    </main>
  );
}
