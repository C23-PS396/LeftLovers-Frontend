const LogoWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="flex items-end justify-center w-fit px-3 cursor-pointer px-0">
      {children}
    </div>
  );
};

export default LogoWrapper;
