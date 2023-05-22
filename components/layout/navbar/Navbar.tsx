import LandingNavbar from "./landingNavbar/LandingNavbar";
import MerchantNavbar from "./merhcantNavbar/MerchantNavbar";

type Navbar = {
  type: "merchant" | "landing";
};

const Navbar = ({ type }: Navbar) => {
  return (
    <>
      {type === "merchant" && <MerchantNavbar />}{" "}
      {type === "landing" && <LandingNavbar />}
    </>
  );
};

export default Navbar;
