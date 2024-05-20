import TabbedNavigation from "./TabbedNavigation";

type NewVehicleLayoutProps = {
  children: React.ReactNode;
};

const NewVehicleLayout = ({ children }: NewVehicleLayoutProps) => {
  return (
    <section className="flex flex-col items-center content-center">
      <h3 className="text-2xl font-bold pb-5">Add a new vehicle</h3>
      <TabbedNavigation />
      {children}
    </section>
  );
};

export default NewVehicleLayout;
