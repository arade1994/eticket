import { useState } from "react";
import axios from "axios";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const sendRequest = async (props) => {
    try {
      setIsLoading(true);
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) onSuccess(response.data);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Form validation error!</h4>
          <ul className="my-0">
            {error.response.data.errors?.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { sendRequest, errors, isLoading };
};
