import React from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "../../utils/Firebase";
import "firebase/auth";
export default function UserName(props) {
  const { user } = props;
  const onEdit = () => {
    console.log("its time to edit");
  };
  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
}
