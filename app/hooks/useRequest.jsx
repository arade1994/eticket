import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FormErrors from "../components/FormErrors/FormErrors";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const sendRequest = useCallback(async (props) => {
    try {
      setIsLoading(true);
      setErrors(null);

      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) onSuccess(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      toast.error(error.message);
      setErrors(<FormErrors errors={error.response.data.errors} />);
    }
  }, []);

  return { sendRequest, errors, isLoading };
};
