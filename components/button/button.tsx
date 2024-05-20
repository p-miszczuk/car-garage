"use client";

import classnames from "classnames";

type Props = {
  bold?: boolean;
  onClick: () => void;
  title: string;
  type?: "button" | "submit" | "reset" | undefined;
};

type ButtonProps = Readonly<Props>;

const Button = ({
  bold = false,
  onClick,
  title,
  type = "button",
}: ButtonProps) => {
  const classNames = classnames("");

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames({ "font-bold": bold })}
    >
      {title}
    </button>
  );
};

export default Button;
