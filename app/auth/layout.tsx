type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  //TODO lang description
  return (
    <main className="w-md-100 h-[calc(100%-7rem)]">
      <header>
        <h1 className="text-center text-2xl py-4">
          Welcome to the login process
        </h1>
      </header>
      {children}
    </main>
  );
};

export default AuthLayout;
