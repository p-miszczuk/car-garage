import Button from "@/components/tools/button";
import { useModalView } from "./useModalView";
import { FormProvider } from "react-hook-form";
export interface ModalViewData {
  readonly formFields: any;
  readonly selectedOption: string;
  readonly shouldUpdateHistory: () => void;
}

const ModalView = (data: ModalViewData) => {
  const { fields, methods, onSubmit } = useModalView({ ...data });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} key={data.selectedOption}>
        <div className="form-fields-wrapper mb-5 flex flex-col gap-4">
          {fields}
        </div>
        {!!fields ? (
          <Button
            type="submit"
            text="Add"
            customClass="bg-green-600 p-1 border rounded text-white min-w-[200px]"
            onClick={() => {}}
            disabled={methods.formState.isSubmitting}
          />
        ) : null}
      </form>
    </FormProvider>
  );
};

export default ModalView;
