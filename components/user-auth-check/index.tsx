"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const REDIRECT_AUTH_ROUTS: Array<string> = ["/auth", "/auth/sign-up"];
const REDIRECT_UNAUTH_ROUTS: Array<string> = ["/vehicles"];

const UserAuthChecker = (): null => {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();

  const isUserAuth = status === "authenticated";

  useEffect(() => {
    if (isUserAuth && REDIRECT_AUTH_ROUTS.includes(pathname)) {
      router.push("/");
    } else if (!isUserAuth && REDIRECT_UNAUTH_ROUTS.includes(pathname)) {
      router.push("/auth");
    }
  }, [pathname, isUserAuth, router]);

  return null;
};

export default UserAuthChecker;
