const AuthForm = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="flex flex-col gap-4 px-6">{children}</div>;
};

export default AuthForm;
