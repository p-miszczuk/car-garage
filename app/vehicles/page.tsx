import boxesMenu from "../../shares/boxes-menu/index.json";
import BoxesMenu from "@/components/boxes-menu";

const Vehicles = () => {
  return (
    <>
      <header>
        <h1 className="text-center text-2xl py-4">Vehicles</h1>
      </header>
      <section className="flex flex-wrap justify-center h-full gap-10">
        {boxesMenu?.boxes?.map(({ id, path, title, image }) => (
          <BoxesMenu key={id} path={path} title={title} image={image} />
        ))}
      </section>
    </>
  );
};

export default Vehicles;
