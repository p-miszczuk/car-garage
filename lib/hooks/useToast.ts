import { toast } from "react-toastify";

export const useToast = () => {
  const toastSuccess = (message: string) => {
    toast.success(message, {
      autoClose: 3000,
    });
  };

  const toastError = (message: string) => {
    toast.error(message, {
      hideProgressBar: true,
    });
  };

  const toastInfo = (message: string) => {
    toast.info(message, {
      autoClose: 3000,
    });
  };

  return { toastSuccess, toastError, toastInfo };
};
