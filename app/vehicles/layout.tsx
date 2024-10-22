"use client";

import { useSession } from "next-auth/react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  //TODO lang description
  const { status } = useSession();
  const isLoading = status === "loading";

  return (
    <main className="w-md-100 min-h-[calc(100%-8rem)] p-10">
      {isLoading ? null : children}
    </main>
  );
};

export default AuthLayout;
