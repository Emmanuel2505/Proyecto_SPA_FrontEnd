import { useState } from "react";
import {
  classButtonNavbarHover,
  classButtonNavbarLogin,
} from "../../Helpers/Constants";
import LinkButton from "../LinkButton";
import "./styles.css";
export default function CardService({ title, image, id }) {
  const [show, setShow] = useState(true);
  return (
    <div
      className="w-[288px] h-[448px] border rounded-lg overflow-hidden isolate relative border-transparent"
      onMouseOver={() => {
        setShow(false);
      }}
      onMouseOut={() => {
        setShow(true);
      }}
    >
      <img
        className="w-full h-full object-cover absolute"
        src={image}
        alt={title}
      />
      <div
        className={`absolute duration-300 bottom-0 flex justify-center ${
          show ? "h-16 items-center" : "h-full"
        } w-full bg-white/50 text-black`}
      >
        <p
          className={`font-medium duration-300 text-center text-xl ${
            !show && "mt-4"
          }`}
        >
          {title}
        </p>
      </div>
      <div
        className={`absolute h-full w-full duration-300 ease-in-out flex flex-col justify-center items-center ${
          show ? "top-full" : "top-0"
        }`}
      >
        <LinkButton
          to={`/detail-treatment/${id}/`}
          details={true}
          className={`${classButtonNavbarLogin} ${classButtonNavbarHover}`}
        >
          Ver Detalles
        </LinkButton>
      </div>
    </div>
  );
}
