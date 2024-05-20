import React from "react";
import BoxesMenuView from "./boxes-menu-view";

type Props = {
  image: string;
  title: string;
  path: string;
};

type ContainerProps = Readonly<Props>;

const BoxesMenuContainer = ({ image, title, path }: ContainerProps) => {
  return (
    <div className="w-64 h-64 rounded-lg border border-black p-2 bg-opacity-25">
      <BoxesMenuView key={image} image={image} title={title} path={path} />
    </div>
  );
};

export default BoxesMenuContainer;
