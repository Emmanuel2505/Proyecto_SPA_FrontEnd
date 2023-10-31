import useNavbar from "../../hooks/useNavbar";

export default function AboutUs() {
  const {data} = useNavbar();
  return (
    <section>
      <div className="w-[90%] w-max-[1520px] min-w-[320px] m-auto overflow-hidden p-[52px_0]">
        <h2 className="text-center text-[56px] mb-[10px] font-semibold">
          Sobre nosotros
        </h2>
        <h3 className="text-center text-[24px] mb-[24px] font-semibold">
          {data.name}
        </h3>
        <p className="text-justify mb-[13px] font-light leading-6 text-[#181010]">
          El vídeo proporciona una manera eficaz para ayudarle a demostrar el
          punto. Cuando haga clic en Vídeo en línea, puede pegar el código para
          insertar del vídeo que desea agregar. También puede escribir una
          palabra clave para buscar en línea el vídeo que mejor se adapte a su
          documento.Para otorgar a su documento un aspecto profesional, Word
          proporciona encabezados, pies de página, páginas de portada y diseños
          de cuadro de texto que se complementan entre sí. Por ejemplo, puede
          agregar una portada coincidente, el encabezado y la barra lateral.
          Haga clic en Insertar y elija los elementos que desee de las distintas
          galerías.Los temas y estilos también ayudan a mantener su documento
          coordinado. Cuando haga clic en Diseño y seleccione un tema nuevo,
          cambiarán las imágenes, gráficos y gráficos SmartArt para que
          coincidan con el nuevo tema. Al aplicar los estilos, los títulos
          cambian para coincidir con el nuevo tema. Ahorre tiempo en Word con
          nuevos botones que se muestran donde se necesiten.
        </p>
      </div>
    </section>
  );
}
