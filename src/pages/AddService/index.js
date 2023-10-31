import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import InputImage from "../../components/InputImage";
import LoadingText from "../../components/LoadingText";
import TableServices from "../../components/TableServices";
import { TIMEALERT, URLSERVER } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";
import swal from "sweetalert";

export default function AddService() {
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { getAhutorization, isSessionAdmin } = useNavbar();
  const navigate = useNavigate();

  const editService = (_id, title, price, description, image) => {
    setData({
      _id,
      title,
      price,
      description,
      image,
    });
    setFile(null);
    window.scroll({
      top: 200,
      left: 0,
      behavior: "smooth",
    });
  };

  const endFetch = () => {
    setIsFetching(false);
    setData({});
  };

  const newService = (formData) => {
    setIsFetching(true);
    fetch(`${URLSERVER}api/treatments/new-treatment`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: getAhutorization(),
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          swal({
            title: "Carga Exitosa",
            text: "El servicio se ha cargado exitosamente en el servidor",
            icon: "success",
            buttons: "Aceptar",
            timer: TIMEALERT,
          });
        } else {
          alert(data.status);
        }
      })
      .catch((err) => {
        alert("Ocurrió un error");
        console.log(err);
      })
      .finally(() => endFetch());
  };

  const updateService = (formData) => {
    setIsFetching(true);
    fetch(`${URLSERVER}api/treatments/updateOneService`, {
      method: "POST",
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

  const uploadService = (e) => {
    const { _id, title, price, description } = data;
    if (title) {
      if (price) {
        if (description) {
          if (file || data._id) {
            try {
              const formData = new FormData();
              formData.append("title", title);
              formData.append("description", description);
              formData.append("price", price);
              if (file !== null) {
                formData.append("image", file);
                formData.append("nameImage", file.name);
              }
              if (data._id) {
                formData.append("_id", _id);
                updateService(formData);
              } else {
                newService(formData);
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("Debe selecionar la imagen del servicio");
          }
        } else {
          alert("Debe escribir la descripción del servicio");
        }
      } else {
        alert("Debe escribir el precio del servicio");
      }
    } else {
      alert("Debe escribir el nombre del servicio");
    }
  };

  const handleData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const resetValues = () => {
    setData({});
    setFile(null);
  };

  useEffect(() => {
    if (!isSessionAdmin()) {
      console.log("si ingresas esta cosa");
      navigate("/login");
    }
  });

  if (isFetching) {
    return <LoadingText text="Subiendo Servicio, por favor espere." />;
  }

  return (
    <main className="mb-20">
      {/* <LoadingText text="Testing... con bastante texto xdxdxd asdfasfasdfasdfasdfasdfasdfasdf" /> */}
      <h2 className="text-center text-[56px] mb-8 font-semibold">
        Agregar Servicio
      </h2>
      <div className="lg:flex justify-evenly px-4 lg:px-[111px]">
        <div className="w-full lg:w-[480px] border rounded-[33px] border-black mb-4 p-4 lg:p-8">
          <Input
            title="Nombre del Tratamiento"
            placeholder="Limpieza Facial"
            name="title"
            onChange={handleData}
            value={data.title}
          />
          <Input
            title="Precio del Tratamiento"
            type="number"
            placeholder="12.41"
            name="price"
            onChange={handleData}
            value={data.price}
          />
          <Input
            title="Descripción del Tratamiento"
            placeholder="Descripción"
            input={false}
            name="description"
            onChange={handleData}
            value={data.description}
          />
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
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                        facebook: data.facebook,
                        instagram: data.instagram,
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
              onClick={uploadService}
            >
              {data._id ? "Actualizar" : "Guardar"} Servicio
            </button>
            {data._id && (
              <button
                className="py-2 px-5 bg-red-500 border rounded-full text-white hover:bg-red-400"
                onClick={() => {
                  resetValues();
                }}
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        className={`w-full flex flex-col justify-center items-center mt-[100px] lg:mt-[80px]`}
      >
        <h2 className="text-center text-[56px] mb-8 font-semibold">
          Todos los Servicios
        </h2>
        <div className="max-w-[800px] min-w-[320px] w-full overflow-hidden isolate relative border rounded-[33px] mx-4">
          <TableServices edit={editService} />
        </div>
      </div>
    </main>
  );
}
