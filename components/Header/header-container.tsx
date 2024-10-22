"use client";

import { useSession } from "next-auth/react";
import React from "react";
import HeaderView from "./header-view";

const HeaderContainer = () => {
  const { status } = useSession();
  const isLoading = status === "loading";

  return isLoading ? null : (
    <header
      className="w-full h-14 flex justify-between border-b-2"
      data-testid="main-header"
    >
      <HeaderView />
    </header>
  );
};

export default HeaderContainer;
