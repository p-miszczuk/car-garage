import ProtectedRoute from "@/components/protected-route";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  //TODO lang description

  return (
    <main className="w-md-100 min-h-[calc(100%-8rem)] p-10">
      <ProtectedRoute>{children}</ProtectedRoute>
    </main>
  );
};

export default AuthLayout;
