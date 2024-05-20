"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/button";

type Props = {
  auth: boolean;
  path: string;
  title: string;
  type?: string;
};

const HeaderMenuView = ({ auth, path, title, type }: Props) => {
  const { status } = useSession();

  const handleClickButton = () => {
    signOut({ callbackUrl: "/" });
  };

  const isAuth = status === "authenticated";

  return (
    <li className="flex">
      {isAuth === auth ? (
        type === "button" ? (
          <Button onClick={handleClickButton} title={title} bold />
        ) : (
          <Link href={path} className="font-bold">
            {title}{" "}
          </Link>
        )
      ) : null}
    </li>
  );
};

export default HeaderMenuView;
