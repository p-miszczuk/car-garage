import classNames from "classnames";

interface Props {
  type?: string;
  text?: string;
}

type ErrorMessageProps = Readonly<Props>;

const EmptyMessage = ({ type = "error", text }: ErrorMessageProps) => {
  return (
    <p
      className={classNames({
        "text-red-700": type === "error",
        "text-yellow-400": type === "warning",
      })}
      data-testid="empty-message"
    >
      {text}
    </p>
  );
};

EmptyMessage.defaultProps = {
  type: "error",
  text: "Something went wrong. Please try again.",
};

export default EmptyMessage;
