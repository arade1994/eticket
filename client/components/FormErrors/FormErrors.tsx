import classes from "./FormErrors.module.scss";

interface Props {
  errors: { message: string }[];
}

const FormErrors: React.FC<React.PropsWithChildren<Props>> = ({ errors }) => {
  return (
    <div className={classes.formErrors}>
      <h4>Form validation error!</h4>
      <ul>
        {errors?.map((error) => (
          <li key={error.message}>{error.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default FormErrors;
