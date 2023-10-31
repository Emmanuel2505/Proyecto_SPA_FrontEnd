import loader from "../../assets/images/loading.gif";

export default function Loading() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <img className="min-h-32" src={loader} alt="cargando" />
    </div>
  );
}
