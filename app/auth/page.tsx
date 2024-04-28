import Form from "@/components/form";
import Link from "next/link";

export const Auth = () => {
  //TODO after sign up get login and display in form input
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <Form title="Log in" type="login" />
      <p className="pt-4">
        Don’t have an account?&nbsp;
        <Link
          href="/auth/sign-up"
          className="text-green-400 hover:text-green-300"
        >
          Sign up
        </Link>
      </p>
    </section>
  );
};

export default Auth;
