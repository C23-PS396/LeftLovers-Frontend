const AuthCard = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="rounded-md px-6 py-12 bg-white max-w-[500px] w-full">
      {children}
    </div>
  );
};

export default AuthCard;
