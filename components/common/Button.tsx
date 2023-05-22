import { ReactNode } from "react";

const STYLE_GUIDE = {
  primary: {
    border: "rounded-lg",
    width: "border-2",
    color: "bg-[#537FE7]",
    hover: "",
    text: "text-white",
    borderColor: "border-[#537FE7]",
  },
  secondary: {
    border: "rounded-lg",
    width: "border-2",
    color: "bg-primaryWhite",
    hover: "bg-primaryAlabaster",
    text: "text-primaryPurple-active",
    borderColor: "border-primaryPurple-active",
  },
  outlined: {
    border: "rounded-lg",
    width: "border-2",
    color: "bg-[#FFF]",
    hover: "",
    text: "text-[#537FE7]",
    borderColor: "border-[#537FE7]",
  },
  warning: {
    border: "rounded-lg",
    width: "border-2",
    color: "bg-primaryWhite",
    hover: "bg-primaryAlabaster",
    text: "text-red-500",
    borderColor: "border-red-500",
  },
  ghost: {
    border: "rounded-lg",
    width: "border-0",
    color: "",
    text: "text-primaryPurple-active",
    hover: "bg-primaryAlabaster",
    borderColor: "",
  },
  cancel: {
    border: "rounded-lg",
    width: "border-2",
    color: "bg-red-200",
    hover: "",
    text: "text-[#EB5757]",
    borderColor: "border-red-200",
  },
  dead: {
    border: "rounded-lg",
    width: "border-2",
    color: "bg-gray-200",
    hover: "",
    text: "text-gray-400",
    borderColor: "border-gray",
  },
};

const Button = ({
  className,
  type,
  onClick,
  children,
}: {
  className?: string;
  type: "primary" | "outlined" | "dead";
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${STYLE_GUIDE[type].text} ${STYLE_GUIDE[type].borderColor} font-semibold ${STYLE_GUIDE[type].border} ${STYLE_GUIDE[type].width} hover:${STYLE_GUIDE[type].hover} ${STYLE_GUIDE[type].color} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
