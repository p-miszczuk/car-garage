"use client";

type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return <div className="text-red-600 pb-3">{message}</div>;
};

export default Message;
