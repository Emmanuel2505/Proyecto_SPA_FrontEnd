import React, { useEffect, useState } from "react";
import CardService from "../../components/CardService";
import List from "../../components/List";
import { URLSERVER } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";

export default function Services({ to }) {
  const [services, setServices] = useState([]);
  const { setUrl } = useNavbar();
  setUrl(to);
  useEffect(() => {
    fetch(`${URLSERVER}api/treatments/all-services`, {
      method: "GET",
      headers: {
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
  return (
    <List
      title={"Servicios"}
      products={services.map((item, i) => (
        <CardService
          key={i}
          title={item.title}
          image={item.image}
          id={item._id}
        />
      ))}
    />
  );
}
