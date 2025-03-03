import classes from "./ProfileIcon.module.scss";

interface Props {
  firstName: string;
  lastName: string;
}

const ProfileIcon = ({ firstName, lastName }: Props) => {
  return (
    <div className={classes.profileIcon}>
      <p style={{ margin: "auto" }}>{`${firstName[0]}${lastName[0]}`}</p>
    </div>
  );
};

export default ProfileIcon;
