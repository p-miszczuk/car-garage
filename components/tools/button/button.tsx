"use client";

import classnames from "classnames";

type Props = {
  bold?: boolean;
  customClass?: string;
  onClick: (value?: any) => void;
  text: string;
  type?: "button" | "submit" | "reset";
};

type ButtonProps = Readonly<Props>;

const Button = ({
  bold = false,
  customClass = "",
  onClick,
  text,
  type = "button",
}: ButtonProps) => {
  const classNames = classnames("", {
    "font-bold": bold,
    [customClass]: !!customClass,
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames}
      data-testid="button"
    >
      {text}
    </button>
  );
};

export default Button;
