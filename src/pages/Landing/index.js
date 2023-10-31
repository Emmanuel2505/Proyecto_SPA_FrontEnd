import { useState } from "react";
import LinkButton from "../../components/LinkButton";
import { classButtonLanding, URLSERVER } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";
import Main from "../Main";
import Loading from "../../components/Loading";
import "./styles.css";
import { useEffect } from "react";

export default function Landing({ to }) {
  // va en todas las pages principales del navbar para que permita seleccionarce
  const [info, setinfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { setUrl, session,data } = useNavbar();
  setUrl(to);

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
      .then((info) => {
        setinfo(info);
        setIsLoading(false);
        console.log(info);
        //console.log(listProduct)
      });
  }

  useEffect(() => {
    uploadProduct();
  }, [])
  

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <>
      <div className={`contain ${data.color}`}>
        <img src={info[0].mainImage} className="image" alt="imagen landing" />
        <section className={`section ml-4 mr-4 lg:ml-16 max-w-[348px] ${data.colorLetter}`}>
          <span className="title lg:tracking-[0.3em] mb-4">
            Relajarse es volver a nacer
          </span>
          <p className="sub-title mb-4">
            Disfruta de todos nuestros productos y servicios
          </p>
          {!session.email && (
            <>
              <LinkButton to="/register" className={classButtonLanding}>
                Regístrate
              </LinkButton>
              <LinkButton to="/login" className={classButtonLanding}>
                Inicia Sesión
              </LinkButton>
            </>
          )}
        </section>
      </div>
      <Main />
    </>
  );
}
