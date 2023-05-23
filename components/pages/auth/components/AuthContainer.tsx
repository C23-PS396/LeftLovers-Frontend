const AuthContainer = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div
      className="w-full min-h-screen px-2 py-8 flex flex-col items-center justify-center box-border"
      style={{ backgroundImage: `url('/bg-auth.jpg')` }}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
