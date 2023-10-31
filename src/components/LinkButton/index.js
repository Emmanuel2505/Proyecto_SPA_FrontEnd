import { Link } from "react-router-dom";
import useNavbar from "../../hooks/useNavbar";
import {
  classButtonNavbar,
  classButtonNavbarHover,
  classButtonNavbarSelect,
} from "../../Helpers/Constants";

export default function LinkButton({
  to = "/",
  className = "",
  details = false,
  enableStyles = true,
  children,
}) {
  const { url, setUrl } = useNavbar();
  const styles =
    details === false
      ? `${
          enableStyles && classButtonNavbar
        } ${classButtonNavbarHover} ${className} ${
          url === to ? classButtonNavbarSelect : ""
        }`
      : "block mt-4 lg:inline-block lg:mt-0 text-black/75 font-medium mr-4 px-8 py-4 rounded-full drop-shadow-lg  hover:bg-white hover:text-[#2D6BA2] duration-300 inline-block text-sm bg-[#2D6BA2] leading-none border rounded-full text-white border-[#2D6BA2] hover:border-[#2D6BA2] mt-4 mt-0 hover:text-[#2D6BA2] hover:bg-white hover:bg-white hover:text-[#2D6BA2] duration-300 mb-4 ";
  return (
    <Link
      to={to}
      className={styles}
      onClick={() => {
        setUrl(to);
      }}
    >
      {children}
    </Link>
  );
}
