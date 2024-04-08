import React from "react";
import HeaderView from "./header-view";

const HeaderContainer = () => {
  return (
    <header className="w-full h-14 flex justify-between border-b-white border-b-2">
      <HeaderView />
    </header>
  );
};

export default HeaderContainer;
