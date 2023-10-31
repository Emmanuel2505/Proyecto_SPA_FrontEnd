import React from "react";
import BeforeAfterTreatment from "../../components/BeforeAfterTreatment";

export default function Information({ title, price, image, description }) {
  return (
    <>
      <BeforeAfterTreatment title={title} image={image} />
      <div className="h-[150px] w-full max-w-[1520px] min-w-[320px] overflow-hidden">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M-5.07,80.44 C154.62,186.03 222.90,2.48 525.96,124.84 L500.00,150.00 L0.00,150.00 Z"
            className="stroke-none fill-[#2D6BA2]"
          ></path>
        </svg>
      </div>
      <div className="p-4 flex flex-col items-center max-w-[1520px] min-w-[320px] w-full bg-[#2D6BA2]">
        <div className="flex flex-row items-center">
          <h1 className="pb-4 text-4xl italic pr-3">Precio: </h1>
          <h1 className="pb-4 text-4xl italic text-orange-400">${price}</h1>
        </div>

        <h1 className="pb-4  text-4xl italic ">Descripción</h1>
        <p className="text-justify max-w-[448px] text-white text-2xl mb-[13px] font-light leading-6 ">
          {description}
        </p>
      </div>
    </>
  );
}
