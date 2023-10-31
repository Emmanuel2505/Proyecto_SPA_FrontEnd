import { useEffect, useState } from "react";
import AboutUs from "../../components/AboutUs";
import CardProduct from "../../components/CardProduct";
import CardService from "../../components/CardService";
import List from "../../components/List";
// import Map from "../../components/Map";
import { URLSERVER } from "../../Helpers/Constants";
import Loading from "../../components/Loading";

var listProduct = [{}];
// let services = [{}];
export default function Main() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${URLSERVER}api/treatments/services-landing`, {
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

    fetch(`${URLSERVER}api/products/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        listProduct = data;
        if (listProduct.length > 3) {
          var tmpListProduct = [];
          for (let i = 0; i < 3; i++) {
            tmpListProduct[i] = listProduct[i];
            console.log("------");
          }
          //console.log(tmpListProduct);
          listProduct = tmpListProduct;
          // alert("hola");
          setIsLoading(false);
        }
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <main>
      <List
        title={"Productos"}
        products={listProduct.map((products, i) => (
          <CardProduct
            key={i}
            product={products.image}
            price={products.price}
            name={products.name}
          />
        ))}
      />
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
      <AboutUs />
      {/* <Map /> */}
    </main>
  );
}
