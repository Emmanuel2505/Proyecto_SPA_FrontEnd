import React from "react";

export default function NoElements({ text = "Servicios o Productos" }) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <p>No existen {text}</p>
    </div>
  );
}
