import { ReactNode } from "react";

const LogoWrapper = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      className="flex items-end justify-center w-fit cursor-pointer px-0"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default LogoWrapper;
