const LogoWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex items-end justify-center w-fit cursor-pointer px-0">
      {children}
    </div>
  );
};

export default LogoWrapper;
