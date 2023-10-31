import LinkButton from "../LinkButton";
import "./styles.css";
import { useState } from "react";
import { classButtonNavbarLogin } from "../../Helpers/Constants";
import useNavbar from "../../hooks/useNavbar";

export default function Navbar() {
  const [showbar, setShowbar] = useState(false);
  const { session, logout,data } = useNavbar();
  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={data.logo} alt="Flor María Spa" className="h-16 rounded-sm mr-8" />
        {/* <span class="text-[#7D3CB3] font-bold text-lg tracking-tight">
          Flor María
        </span> */}
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-[#2D6BA2] border-[#2D6BA2] hover:text-[#2D6BA2] hover:border-[#2D6BA2]"
          onClick={() => {
            console.log("tocando boton", showbar);
            setShowbar(!showbar);
          }}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex ${
          session.fullname !== "" && " lg:flex-col lg:items-cente"
        }  lg:w-auto`}
      >
        <div
          className={`text-sm lg:flex-grow lg:mb-4 lg:aling-center ${
            showbar ? "show-options " : ""
          }`}
        >
          <LinkButton to="/" className="lg:mr-4">
            Inicio
          </LinkButton>

          <LinkButton to="/list-products" className="lg:mr-4">
            Productos
          </LinkButton>
          <LinkButton to="/services" className="lg:mr-4">
            Servicios
          </LinkButton>
          {session.rol === "admin" && (
            <>
              <LinkButton to="/add-service" className="lg:mr-4">
                Administrar Servicios
              </LinkButton>
              <LinkButton to="/add-product" className="lg:mr-4">
                Administrar Productos
              </LinkButton>
              <LinkButton to="/admin-images" className="lg:mr-4">
                Administrar Imagenes
              </LinkButton>
            </>
          )}
          {session.fullname === "" ? (
            <LinkButton to="/register" className="lg:mr-4">
              Registrarse
            </LinkButton>
          ) : (
            <>
              <LinkButton to="/cart" className="lg:mr-4">
                Carrito de Compras
              </LinkButton>
              <button
                className="block mt-4 lg:inline-block lg:mt-0 text-black/75 font-medium lg:mr-4 lg:px-8 lg:py-4 lg:rounded-full lg:drop-shadow-lg  hover:bg-white hover:text-[#2D6BA2] duration-300"
                onClick={() => {
                  if (
                    window.confirm("¿Está seguro que desea cerrar su sesión?")
                  ) {
                    logout();
                  }
                }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
        <div
          className={`${
            session.fullname !== "" &&
            "mt-4 mr-8 lg:mt-0 w-full flex justify-start"
          }`}
        >
          {session.fullname === "" ? (
            <LinkButton
              to="/login"
              className={`lg:mr-4 ${classButtonNavbarLogin} ${
                showbar && "show-options"
              }`}
            >
              Iniciar Sesión
            </LinkButton>
          ) : (
            <span>Bienvenido, {session.fullname}</span>
          )}
        </div>
      </div>
    </nav>
  );
}
