import React from "react";

const NavbarWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div
      className="h-[56px] lg:h-[78px] w-full bg-[#fff] flex items-center justify-between px-6 lg:px-12 fixed top-0 right-0"
      style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.15) 0px 0px 5px)" }}
    >
      {children}
    </div>
  );
};

export default NavbarWrapper;
