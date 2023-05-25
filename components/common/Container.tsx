import React, { ReactNode } from "react";

const Container = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={`mt-[56px] min-h-screen lg:mt-[78px] px-6 lg:px-12 py-8 lg:py-12 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
