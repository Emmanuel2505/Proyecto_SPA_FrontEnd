import imgFacebook from "../../assets/images/facebook.png";
import imgInstagram from "../../assets/images/instagram.png";
import useNavbar from "../../hooks/useNavbar";

export default function Contacts() {
  const { data } = useNavbar();
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-around m-auto p-[80px] w-max-[1520px] min-w-[320px] border-t-2 border-t-solid border-t-[#2D6BA2]">
      <div className="w-[100px] pb-2">
        <h6 className="text-[32px] lg:text-[62px] font-light mb-[20px]">
          Contáctanos
        </h6>
        <p className="text-[24px] mb-[10px]">{data.email}</p>
        <p className="text-[24px] mb-[10px] italic w-[200px]">{data.phone}</p>
        <div className="flex w-[200px] h-[70px]">
          <i className="text-[20px] p-4 w-[90px] h-[70px] text-center cursor-pointer">
            <img
              className="w-[60px] h-[60px]"
              src={imgFacebook}
              alt="Facebook"
              onClick={() => {
                window.location.href = data.facebook;
              }}
            />
          </i>
          <i className="text-[20px] p-4 w-[90px] h-[70px] text-center cursor-pointer">
            <img
              className="w-[60px] h-[60px]"
              src={imgInstagram}
              alt="Instagram"
              onClick={() => {
                window.location.href = data.instagram;
              }}
            />
          </i>
        </div>
      </div>
      <div className="max-w-[400px] pb-2">
        <img
          className="w-full object-cover "
          src={data.logo}
          alt="Logo del SPA"
        />
      </div>
    </div>
  );
}
