"use client";

type Props = {
  message: string;
};

const Message = ({ message }: Props) => {
  return <p className="text-red-600 pb-3 text-[13px]">{message}</p>;
};

export default Message;
