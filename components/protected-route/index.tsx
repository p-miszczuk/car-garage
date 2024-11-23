import { useSession } from "next-auth/react";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loader from "../tools/loader";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
