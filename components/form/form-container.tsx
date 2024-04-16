import FormView from "./form-view";
import { elements } from "./constants";
import SubmitButton from "./form-button";
import { validateFormField } from "@/utils";

type FormProps = {
  readonly title: string;
  readonly type: string;
};

type Data = {
  [key: string]: string;
};

const FORM_TYPES = {
  LOGIN: "login",
} as const;

const FormContainer = ({ title, type = "" }: FormProps) => {
  const inputs = [...elements[type as keyof typeof elements]];

  const handleFormAction = async (formData: any) => {
    "use server";

    let data: Data = {};

    if (type === FORM_TYPES.LOGIN) {
      data = Object.assign(data, {
        email: formData.get("email"),
        password: formData.get("password"),
      });

      //email & password validation
      const isLoginData =
        "email" in data && "password" in data && data.email && data.password;

      if (!isLoginData) return;

      const isFormValid = elements.login.every(({ id }) =>
        validateFormField({ field: id, value: data[id] })
      );

      if (!isFormValid) return;
      //TODO auth
    }
  };

  return inputs ? (
    <div className="w-96 border-2 border-gray-100">
      <h3 className="text-center py-2">{title}</h3>
      <form
        className="p-3 min-h-60 flex flex-col  items-center"
        action={handleFormAction}
      >
        <FormView inputs={inputs} />
        <SubmitButton />
      </form>
    </div>
  ) : null;
};

export default FormContainer;
