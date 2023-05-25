import { ReactNode } from "react";

const NavLinkWrapper = ({
  additionalStyle,
  children,
  open,
}: {
  additionalStyle?: string;
  children: ReactNode;
  open: boolean;
}) => {
  return (
    <div
      className={`flex flex-col absolute top-[56px] pt-6 gap-4 items-start z-[100] opacity-0 -right-full w-full h-screen bg-[#fff] px-6 lg:flex-row lg:items-center lg:gap-12 lg:static lg:h-fit lg:top-0 lg:pt-0 lg:flex-row opacity-100 lg:w-fit lg:px-0 ${
        open && "!right-0 opacity-100"
      } ${additionalStyle}`}
      style={{ transition: "right 500ms ease-in-out" }}
    >
      {children}
    </div>
  );
};

export default NavLinkWrapper;
