import { FORM_TYPES } from "./constants";
// import { handleFormAction, StateStatus } from "@/lib/form-actions";
import { signIn } from "next-auth/react";
import { useFormState } from "react-dom";
import FormView from "./form-view";
import SubmitButton from "./form-button";
import classnames from "classnames";
import Message from "./form-message";
import { useRouter } from "next/navigation";

type FormProps = {
  readonly title: string;
  readonly type: string;
};

const INITIAL_STATE = {
  type: "",
  message: "",
} as const;

const FormContainer = ({ title, type = "" }: FormProps) => {
  // const router = useRouter();
  // // const [state, formAction] = useFormState<Promise<StateStatus>, FormData>(
  // //   handleFormAction,
  // //   { ...INITIAL_STATE }
  // // );

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();
  //   const formData: FormData = new FormData(event.target as HTMLFormElement);

  //   const login = formData.get("login");
  //   const password = formData.get("password");

  //   try {
  //     const result = await signIn("credentials", {
  //       redirect: false,
  //       username: login,
  //       password: password,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   router.push("/");
  // };

  return (
    <div
      className={classnames("w-4/5 sm:w-96 border border-gray-100 rounded-md", {
        "translate-y-[-3rem]": FORM_TYPES.some((value) => value === type),
      })}
    >
      <h3 className="text-center py-2">{title}</h3>
      <FormView type={type} />
    </div>
  );
};

export default FormContainer;
