"use client";

import { SessionProvider } from "next-auth/react";

function AuthProvidersContainer({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* <NextUIProvider>{children}</NextUIProvider>
       */}
      {children}
    </SessionProvider>
  );
}

export default AuthProvidersContainer;
