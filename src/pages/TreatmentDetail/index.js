import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { URLSERVER } from "../../Helpers/Constants";
import Information from "./Information";

export default function TreatmentDetail() {
  const [load, setLoad] = useState(false);
  const [service, setService] = useState({});
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    fetch(`${URLSERVER}api/treatments/getOneService/${params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "ok") {
          alert(data.status);
          navigate("/services");
        } else {
          setService(data.data);
          setLoad(true);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="flex flex-col items-center max-w-[1520px] min-w-[320px]">
      {load ? (
        <Information
          title={service.title}
          price={service.price}
          description={service.description}
          image={service.image}
        />
      ) : (
        <Loading />
      )}
    </div>
  );
}
