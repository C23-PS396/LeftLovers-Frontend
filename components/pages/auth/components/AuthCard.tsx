import { ReactNode } from "react";

type AuthCardProps = {
  additionalStyle?: string;
  children: ReactNode;
};

const AuthCard = ({ additionalStyle, children }: AuthCardProps) => {
  return (
    <div
      className={`rounded-md px-6 py-12 bg-white max-w-[500px] w-full ${additionalStyle}`}
      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
    >
      {children}
    </div>
  );
};

export default AuthCard;
