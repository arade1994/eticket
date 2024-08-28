interface Props {
  firstName: string;
  lastName: string;
}

const ProfileIcon = ({ firstName, lastName }: Props) => {
  return (
    <div
      style={{
        border: "1px solid white",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        background: "black",
        color: "lightsteelblue",
      }}
    >
      <p style={{ margin: "auto" }}>{`${firstName[0]}${lastName[0]}`}</p>
    </div>
  );
};

export default ProfileIcon;
