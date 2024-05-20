import TabbedNavigation from "@/app/vehicles/add-new-vehicle/TabbedNavigation";
import FormNewCarView from "./form-new-car-view";

const FormNewCarContainer = () => {
  return (
    <div className="rounded border border-solid p-4">
      <TabbedNavigation />

      {/* <form>
        <FormNewCarView />
      </form> */}
    </div>
  );
};

export default FormNewCarContainer;
