const AuthContainer = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div
      className="w-screen min-h-screen px-2 py-8 flex items-center justify-center"
      style={{ backgroundImage: `url('/bg-auth.jpg')` }}
    >
      {children}
    </div>
  );
};

export default AuthContainer;
