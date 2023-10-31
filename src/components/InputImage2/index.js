import React, { useTransition, useState } from "react";

export default function InputImage({ file, setFile }) {
  const [isPending, startTransition] = useTransition();
  const [src, setSrc] = useState("");
  const [drop, setDrop] = useState(false);
  // const [file, setFile] = useState(null);

  const processFile = (fileL) => {
    const docType = fileL.type;
    const validExtensions = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
    ];
    if (validExtensions.includes(docType)) {
      const url = URL.createObjectURL(fileL);
      startTransition(() => {
        setFile(fileL);
        setSrc(url);
      });
    } else {
      alert("Es archivo no es una imagen");
    }
  };

  return (
    <div
      className={`flex flex-col h-full w-full overflow-hidden isolate relative border ${
        drop
          ? "border-dotted border-4 bg-[#2D6BA2]"
          : "border-dashed border-black"
      } rounded-[33px]`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        processFile(f);
        setDrop(false);
      }}
    >
      <div
        className={` h-full w-full flex flex-col justify-center items-center `}
      >
        <span className="h-8 font-medium text-lg mb-2">
          Imagen del Servicio
        </span>
        <p className="h-12 text-center mb-4">
          {!drop ? "Arrastra una Imagen" : "Suelta la Imagen"}
          <br />ó
        </p>
        <button
          className="h-[48px] px-2 inline-block text-sm bg-[#2D6BA2] leading-none border rounded-full text-white border-[#2D6BA2] mt-2 lg:mt-0 lg:hover:text-[#2D6BA2] hover:bg-white"
          onClick={() => {
            const inputFile = document.getElementById("input-file");
            inputFile.click();
          }}
        >
          Selecciona una Imagen
        </button>
        <input
          type="file"
          name=""
          id="input-file"
          onChange={() => {
            const input = document.getElementById("input-file");
            processFile(input.files[0]);
          }}
          hidden
        />
      </div>
      <div
        className={` h-full w-full flex justify-center items-center ${
          src === "" ? "invisible" : "visible"
        }`}
      >
        {file !== null && !isPending && (
          <img className="object-cover h-52 w-52" src={src} alt={file.name} />
        )}
      </div>
    </div>
  );
}
