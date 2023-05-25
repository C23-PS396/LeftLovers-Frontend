import Navbar from "./navbar/Navbar";

const PageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="min-h-screen h-full flex flex-col w-full box-border">
      {children}
    </div>
  );
};

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <PageWrapper>{children}</PageWrapper>
    </>
  );
};

export default Layout;
