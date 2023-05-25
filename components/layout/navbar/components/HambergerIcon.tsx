import React from "react";

const HamburgerIcon = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div
      className={`w-6 h-1 rounded-full before:content-[''] before:absolute before:w-5 before:h-1 before:rounded-lg before:bg-[#000] before:transition-all before:duration-[400] before:delay-150 before:-translate-y-[8px] after:content-[''] after:absolute after:w-5 after:h-1 after:rounded-lg after:bg-[#000] after:delay-150 after:transition-all after:duration-[400] after:translate-y-[8px] }`}
      style={{ transition: "all 0.4s ease-in-out" }}
    >
      {children}
    </div>
  );
};

export default HamburgerIcon;
