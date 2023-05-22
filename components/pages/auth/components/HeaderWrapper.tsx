const HeaderWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="text-center flex flex-col gap-2 mb-4">{children}</div>;
};

export default HeaderWrapper;
