import { useState } from "react";
import axios from "axios";

export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const sendRequest = async (props) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) onSuccess(response.data);

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

  return { sendRequest, errors };
};
