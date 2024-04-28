"use client";

type Props = {
  readonly onClick: () => void;
  readonly title: string;
  readonly type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({ onClick, title, type = "button" }: Props) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
