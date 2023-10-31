import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import InputImage from "../../components/InputImage";
import LoadingText from "../../components/LoadingText";
import { TIMEALERT, URLSERVER } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";
import swal from "sweetalert";
import Loading from "../../components/Loading";

export default function AdminInfo() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const { getAhutorization, isSessionAdmin } = useNavbar();
  const [uno, setUno] = useState(false);
  const [dos, setDos] = useState(false);
  const [tres, setTres] = useState(false);
  const [cuatro, setCuatro] = useState(false);
  const [cinco, setCinco] = useState(false);
  const [seis, setSeis] = useState(false);
  const [uno2, setUno2] = useState(false);
  const [dos2, setDos2] = useState(false);
  const [tres2, setTres2] = useState(false);
  const [cuatro2, setCuatro2] = useState(false);
  const [cinco2, setCinco2] = useState(false);
  const [seis2, setSeis2] = useState(false);
  const navigate = useNavigate();

  const endFetch = () => {
    setIsFetching(false);
    setData({});
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
        setIsLoading(false);
        console.log(data);
        //console.log(listProduct)
      });
  }

  useEffect(() => {
    uploadProduct();
  }, []);

  const updateInfo = (formData) => {
    setIsFetching(true);
    fetch(`${URLSERVER}api/administer/editInfo/62d5d15a603857828dfcf2b7`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: getAhutorization(),
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        // endFetch();
        if (data.status === "ok") {
          swal({
            title: "Actualización Exitosa",
            text: "El servicio se ha actualizado exitosamente en el servidor",
            icon: "success",
            buttons: "Aceptar",
            timer: TIMEALERT,
          });
          window.location.reload();
        } else {
          alert(data.status);
        }
      })
      .catch((err) => {
        endFetch();
        alert("Ocurrió un error");
        console.log(err);
      })
      .finally(() => endFetch());
  };

  const uploadInfo = (e) => {
    // alert("si llega aki")
    const { name, phone, email, facebook, instagram, color, colorLetter } = data;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("facebook", facebook);
      formData.append("instagram", instagram);
      formData.append("color", color);
      formData.append("colorLetter", colorLetter);
      // if (file !== null) {
      formData.append("image", file);
      // }
      // formData.append("_id", _id);
      updateInfo(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!isSessionAdmin()) {
      console.log("si ingresas esta cosa");
      navigate("/login");
    }
  });

  useEffect(() => {
    console.log("ejecutando useEffect");
  });

  if (isFetching) {
    return <LoadingText text="Subiendo Cambios, por favor espere." />;
  }

  if (isLoading) {
    return <Loading />;
  }
  console.log("renderizando admin -  info");
  return (
    <main className="mb-20">
      {/* <LoadingText text="Testing... con bastante texto xdxdxd asdfasfasdfasdfasdfasdfasdfasdf" /> */}
      <h2 className="text-center text-[56px] mb-8 font-semibold">
        Administrar Información de Landing Page
      </h2>
      <div className="lg:flex justify-evenly px-4 lg:px-[111px]">
        <div className="w-full lg:w-[480px] border rounded-[33px] border-black mb-4 p-4 lg:p-8">
          <Input
            title="Nombre del Establecimiento"
            placeholder="Oxigen Ceuticals"
            name="name"
            onChange={handleData}
            value={data.name}
          />
          <Input
            title="Email"
            type="email"
            placeholder="xxxxxxxxxxxxx@example.com"
            name="email"
            onChange={handleData}
            value={data.email}
          />
          <Input
            title="Teléfono"
            placeholder="099xxxxxxx"
            type="text"
            name="phone"
            onChange={handleData}
            value={data.phone}
          />
          <Input
            title="Link página de Facebook"
            placeholder="https://www.facebook.com/"
            type="text"
            name="facebook"
            onChange={handleData}
            value={data.facebook}
          />
          <Input
            title="Link página de Instagram"
            placeholder="https://www.instagram.com/"
            type="text"
            name="instagram"
            onChange={handleData}
            value={data.instagram}
          />
          <div className="flex flex-col mb-4">
            <span className="h-8 font-medium text-lg mb-4">Color de Fondo</span>
            <div className="flex flex-wrap flex-row gap-4">
              <div title="Azul"
                className={`h-12 w-12 ${
                  uno && "bg-blue-900"
                } border-8 border-blue-900 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno(true);
                  setDos(false);
                  setTres(false);
                  setCuatro(false);
                  setCinco(false);
                  setSeis(false);
                  setData({ ...data, color: "bg-blue-900" });
                }}
              ></div>
              <div
              title="Negro"
                className={`h-12 w-12 ${
                  dos && "bg-neutral-800"
                } border-8 border-neutral-800 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno(false);
                  setDos(true);
                  setTres(false);
                  setCuatro(false);
                  setCinco(false);
                  setSeis(false);
                  setData({ ...data, color: "bg-neutral-800" });
                }}
              ></div>
              <div
              title="Amarillo"
                className={`h-12 w-12 ${
                  tres && "bg-yellow-400"
                } border-8 border-yellow-400 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno(false);
                  setDos(false);
                  setTres(true);
                  setCuatro(false);
                  setCinco(false);
                  setSeis(false);
                  setData({ ...data, color: "bg-yellow-400" });
                }}
              ></div>
              <div
              title="Verde"
                className={`h-12 w-12 ${
                  cuatro && "bg-green-900"
                } border-8 border-green-900 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno(false);
                  setDos(false);
                  setTres(false);
                  setCuatro(true);
                  setCinco(false);
                  setSeis(false);
                  setData({ ...data, color: "bg-green-900" });
                }}
              ></div>
              <div
              title="Blanco"
                className={`h-12 w-12 ${
                  cinco && "bg-black"
                } border-8 border-black rounded-full cursor-pointer`}
                onClick={() => {
                  setUno(false);
                  setDos(false);
                  setTres(false);
                  setCuatro(false);
                  setCinco(true);
                  setSeis(false);
                  setData({ ...data, color: "bg-white" });
                }}
              ></div>
              <div
              title="Rosado"
                className={`h-12 w-12 ${
                  seis && "bg-fuchsia-900"
                } border-8 border-fuchsia-900 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno(false);
                  setDos(false);
                  setTres(false);
                  setCuatro(false);
                  setCinco(false);
                  setSeis(true);
                  setData({ ...data, color: "bg-fuchsia-900" });
                }}
              ></div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <span className="h-8 font-medium text-lg mb-4">Color de Fondo</span>
            <div className="flex flex-wrap flex-row gap-4">
              <div title="Azul"
                className={`h-12 w-12 ${
                  uno2 && "bg-blue-900"
                } border-8 border-blue-900 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno2(true);
                  setDos2(false);
                  setTres2(false);
                  setCuatro2(false);
                  setCinco2(false);
                  setSeis2(false);
                  setData({ ...data, colorLetter: "text-blue-900" });
                }}
              ></div>
              <div
              title="Negro"
                className={`h-12 w-12 ${
                  dos2 && "bg-neutral-800"
                } border-8 border-neutral-800 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno2(false);
                  setDos2(true);
                  setTres2(false);
                  setCuatro2(false);
                  setCinco2(false);
                  setSeis2(false);
                  setData({ ...data, colorLetter: "text-neutral-800" });
                }}
              ></div>
              <div
              title="Amarillo"
                className={`h-12 w-12 ${
                  tres2 && "bg-yellow-400"
                } border-8 border-yellow-400 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno2(false);
                  setDos2(false);
                  setTres2(true);
                  setCuatro2(false);
                  setCinco2(false);
                  setSeis2(false);
                  setData({ ...data, colorLetter: "text-yellow-400" });
                }}
              ></div>
              <div
              title="Verde"
                className={`h-12 w-12 ${
                  cuatro2 && "bg-green-900"
                } border-8 border-green-900 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno2(false);
                  setDos2(false);
                  setTres2(false);
                  setCuatro2(true);
                  setCinco2(false);
                  setSeis2(false);
                  setData({ ...data, colorLetter: "text-green-900" });
                }}
              ></div>
              <div
              title="Blanco"
                className={`h-12 w-12 ${
                  cinco2 && "bg-black"
                } border-8 border-black rounded-full cursor-pointer`}
                onClick={() => {
                  setUno2(false);
                  setDos2(false);
                  setTres2(false);
                  setCuatro2(false);
                  setCinco2(true);
                  setSeis2(false);
                  setData({ ...data, colorLetter: "text-white" });
                }}
              ></div>
              <div
              title="Rosado"
                className={`h-12 w-12 ${
                  seis2 && "bg-fuchsia-900"
                } border-8 border-fuchsia-900 rounded-full cursor-pointer`}
                onClick={() => {
                  setUno2(false);
                  setDos2(false);
                  setTres2(false);
                  setCuatro2(false);
                  setCinco2(false);
                  setSeis2(true);
                  setData({ ...data, colorLetter: "text-fuchsia-900" });
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className={`w-[288px] h-[448px]`}>
          <div className={`w-full h-full`}>
            {data._id && data.image !== undefined ? (
              <div
                className={`h-full w-full overflow-hidden isolate relative border border-dashed border-black rounded-[33px]`}
              >
                <img
                  className="object-cover h-full"
                  src={data.image}
                  alt="cris"
                />
                <div className="absolute top-4 right-4">
                  <button
                    className="bg-black p-2 border rounded-lg"
                    onClick={() => {
                      setData({
                        _id: data._id,
                        title: data.title,
                        price: data.price,
                        description: data.description,
                      });
                    }}
                  >
                    <FaTrash className="h-8 w-8 text-red-500" />
                  </button>
                </div>
              </div>
            ) : (
              <InputImage file={file} setFile={setFile} />
            )}
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              className="py-2 px-5 bg-green-500 border rounded-full text-white hover:bg-green-400"
              onClick={uploadInfo}
            >
              Guardar Servicio
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
