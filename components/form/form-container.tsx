import { elements } from "./constants";
import { validateFormField } from "@/utils";
import FormView from "./form-view";
import SubmitButton from "./form-button";
import classnames from "classnames";

type FormProps = {
  readonly title: string;
  readonly type: string;
};

type Data = {
  [key: string]: string;
};

const FORM_TYPES = ["login", "signup"] as const;

const FormContainer = ({ title, type = "" }: FormProps) => {
  const inputs = [...elements[type as keyof typeof elements]];

  const handleFormAction = async <T extends FormData>(
    formData: T
  ): Promise<void> => {
    "use server";

    let data: Data = {};

    if (FORM_TYPES.some((formType) => formType === type)) {
      const isSignUp = type === FORM_TYPES[1];

      data = Object.assign(data, {
        email: formData.get("email"),
        password: formData.get("password"),
        ...(isSignUp && { confirm: formData.get("confirm") }),
      });

      //email & password validation
      const isLoginData =
        "email" in data && "password" in data && data.email && data.password;

      if (!isLoginData || (isSignUp && data.confirm !== data.password)) return;

      const isFormValid = elements.login.every(({ id }) =>
        validateFormField({ field: id, value: data[id] })
      );

      if (!isFormValid) return;

      //TODO auth
    }
  };

  return inputs ? (
    <div
      className={classnames("w-4/5 sm:w-96 border border-gray-100 rounded-md", {
        "translate-y-[-3rem]": FORM_TYPES.some((value) => value === type),
      })}
    >
      <h3 className="text-center py-2">{title}</h3>
      <form
        className="p-3 min-h-60 flex flex-col items-center"
        action={handleFormAction}
      >
        <FormView inputs={inputs} />
        <SubmitButton />
      </form>
    </div>
  ) : null;
};

export default FormContainer;
