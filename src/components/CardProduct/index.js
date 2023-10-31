import React, { useCallback, useState } from "react";
import "./style.css";

import {
  classButtonNavbarHover,
  classButtonNavbarLogin,
} from "../../Helpers/Constants";
import LinkButton from "../LinkButton";

export default function CardProduct({ product, price, name }) {
  const [show, setShow] = useState(true);
  return (
    <div
      className="h-[464px] w-[289px] my-4 isolate relative overflow-hidden"
      onMouseOver={useCallback(() => {
        setShow(false);
      }, [])}
      onMouseOut={useCallback(() => {
        setShow(true);
      }, [])}
    >
      <img className="h-[352px] w-full object-cover" src={product} alt={name} />

      <div className="h-[32px] w-full flex justify-center items-center">
        <p className="font-bold">$ {price}</p>
        <br />
      </div>
      <div className=" h1">
        <h1>{name}</h1>
      </div>
      <div
        className={`absolute bg-white/50 h-full w-full ${
          show ? "top-full" : "top-0"
        } duration-300 ease-in-out flex flex-col justify-evenly items-center`}
      >
        <div className="flex flex-col justify-center items-center">
          <LinkButton
            details={true}
            className={`${classButtonNavbarLogin} ${classButtonNavbarHover} mb-4`}
            to={`/detail-product/${name}`}
          >
            Ver Detalles
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
