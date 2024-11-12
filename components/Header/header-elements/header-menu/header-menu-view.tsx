"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/tools/button";

type Props = {
  auth: boolean;
  path: string;
  text: string;
  type?: string;
};

const HeaderMenuView = ({ auth, path, text, type }: Props) => {
  const { status } = useSession();

  const handleClickButton = () => {
    signOut({ callbackUrl: "/" });
  };

  const isAuth = status === "authenticated";

  return (
    <li className="flex">
      {isAuth === auth ? (
        type === "button" ? (
          <Button onClick={handleClickButton} text={text} bold />
        ) : (
          <Link href={path} className="font-bold">
            {text}
          </Link>
        )
      ) : null}
    </li>
  );
};

export default HeaderMenuView;
