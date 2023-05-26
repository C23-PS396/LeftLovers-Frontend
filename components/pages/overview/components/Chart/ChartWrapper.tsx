import { ReactNode } from "react";

const CartWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`w-full bg-[#fff] rounded-lg px-2 lg:px-8 py-8 flex flex-col gap-8 lg:gap-0 lg:flex-row justify-center lg:justify-start ${className}`}
    >
      {children}
    </div>
  );
};

export default CartWrapper;
