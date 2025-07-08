interface Props {
  errors: { message: string }[];
}

const FormErrors: React.FC<React.PropsWithChildren<Props>> = ({ errors }) => {
  return (
    <div>
      <h4>Form validation error!</h4>
      <ul>
        {errors?.map((error, index) => (
          <li key={index}>{error.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrors;
