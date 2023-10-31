import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import InputImage from "../../components/InputImage";
import LinkButton from "../../components/LinkButton";
import swal from "sweetalert";
import useNavbar from "../../hooks/useNavbar";
import { TIMEALERT, URLSERVER } from "../../Helpers/Constants";
import LoadingText from "../../components/LoadingText";

export default function AdminImages() {
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [file, setFile] = useState(null);

  const { getAhutorization } = useNavbar();

  const endFetch = () => {
    setIsFetching(false);
    setData({});
  };

  const updateInfo = (formData) => {
    setIsFetching(true);
    fetch(`${URLSERVER}api/administer/editLogo/62d5d15a603857828dfcf2b7`, {
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
    try {
      const formData = new FormData();
      formData.append("image", file);
      updateInfo(formData);
    } catch (error) {
      console.log(error);
    }
  };

  if (isFetching) {
    return <LoadingText text="Subiendo Cambios, por favor espere." />;
  }

  return (
    <main className="flex flex-col items-center bg-slate-700 text-white p-4 gap-4">
      <div className="text-2xl">Administrar</div>
      <span>
        <LinkButton to="/admin-info" className="bg-white mr-0">
          Administrar Información de la página de Landing
        </LinkButton>
      </span>
      <div className="text-2xl">Imagen De Logo</div>
      <span>
        <div className={`w-[288px] h-[448px] flex flex-col`}>
          <div className={`w-full h-full`}>
            {data.mainImage ? (
              <div
                className={`h-full w-full overflow-hidden isolate relative border border-dashed border-black rounded-[33px]`}
              >
                <img
                  className="object-cover h-full"
                  src={data.mainImage}
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
              Actualizar Logo
            </button>
          </div>
        </div>
      </span>
    </main>
  );
}
