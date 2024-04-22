"use client";

import { nav } from "../constants";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HeaderMenu = () => {
  const isAuth = false;

  return (
    <nav data-testid="header-nav">
      <ul className="flex gap-2 items-center h-full">
        {nav.map(({ auth, id, path, title }) => (
          <li key={id} className="flex">
            {isAuth === auth ? <Link href={path}>{title}</Link> : null}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderMenu;
