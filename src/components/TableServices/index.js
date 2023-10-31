// import { useAddProduct } from 'hooks'
import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { URLSERVER } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";
import NoElements from "../NoElements";
import styles from "./TableServices.module.css";

export default function TableServices({ edit }) {
  const [services, setServices] = useState([]);
  const { getAhutorization } = useNavbar();
  useEffect(() => {
    fetch(`${URLSERVER}api/treatments/all-services`, {
      method: "GET",
      headers: {
        Authorization: getAhutorization(),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteService = (id) => {
    fetch(
      // `${URLSERVER}api/treatments/updateOneService/${data._id}/${data.title}/${data.price}/${data.description}`,
      `${URLSERVER}api/treatments/deleteOneService/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: getAhutorization(),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Servicio Eliminado Correctamente");
          // navigate("/services");
          // window.location.replace("");
        } else {
          alert(data.status);
        }
      })
      .catch((err) => {
        alert("Ocurrió un error");
        console.log(err);
      });
  };
  return (
    <table className={styles.table} summary="Variantes de productos">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Precio</th>
          <th scope="col">Editar</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {services.length === 0 ? (
          <NoElements text="Servicios" />
        ) : (
          services.map((el) => (
            <tr key={el._id}>
              <th scope="row">{el.title}</th>
              <th>{el.price}</th>
              <th>
                <button
                  onClick={() => {
                    edit(el._id, el.title, el.price, el.description, el.image);
                  }}
                >
                  <FaEdit className="text-orange-500" />
                </button>
              </th>
              <th>
                <button
                  onClick={async () => {
                    let chis = await window.confirm(
                      "¿Está seguro que desea eliminar este servicio?"
                    );
                    if (chis) {
                      deleteService(el._id);
                    }
                  }}
                >
                  <FaTrash className="text-red-600" />
                </button>
              </th>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
