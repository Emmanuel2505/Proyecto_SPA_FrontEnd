import React from "react";
import NoElements from "../NoElements";
import "./styles.css";

export default function List({ title, products }) {
  return (
    <div className="px-4 my-8">
      <h2 className="text-center text-[56px] mb-8 font-semibold">{title}</h2>
      <div className="listItems z-10">
        {products.length === 0 ? <NoElements text={title} /> : products}
      </div>
    </div>
  );
}
