import Input from "../input";

type Inputs<T> = {
  inputs: T[];
};

type Login = {
  id: string;
  label: string;
  type: string;
};

const FormView = <T extends Login>({ inputs }: Inputs<T>): JSX.Element => {
  return (
    <>
      {inputs?.map(({ id, label, type }) => {
        return <Input key={id} id={id} label={label} type={type} />;
      })}
    </>
  );
};

export default FormView;
