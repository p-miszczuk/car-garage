import Form from "@/components/form";
import Link from "next/link";

const SignUp = () => {
  return (
    <section className="flex flex-col items-center justify-center h-full">
      <Form title="Sign up" type="signup" />
      <p className="pt-4">
        Do you have an account?&nbsp;
        <Link href="/auth" className="text-green-400 hover:text-green-300">
          Log in
        </Link>
      </p>
    </section>
  );
};

export default SignUp;
