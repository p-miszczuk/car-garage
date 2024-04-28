import { FORM_TYPES } from "./constants";
import FormView from "./form-view";
import classnames from "classnames";

type FormProps = {
  readonly title: string;
  readonly type: string;
};

const INITIAL_STATE = {
  type: "",
  message: "",
} as const;

const FormContainer = ({ title, type = "" }: FormProps) => {
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
