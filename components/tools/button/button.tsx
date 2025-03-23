"use client";

import classnames from "classnames";

type Props = {
  bold?: boolean;
  customClass?: string;
  onClick: (value?: any) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  testId?: string;
  children?: React.ReactNode;
};

type ButtonProps = Readonly<Props>;

const Button = ({
  children,
  bold = false,
  customClass = "",
  onClick,
  type = "button",
  disabled = false,
  testId = "button",
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
      data-testid={testId}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
