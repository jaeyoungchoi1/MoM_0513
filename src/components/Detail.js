import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ImageIcon,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// firebase
import { firestore } from "../firebase";

function Todo(props) {
  // hooks & Modal 창을 사용해서 수정기능 추가하기
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  // 수정 함수
  const updateTodo = () => {
    // 새로운 입력 값으로 업데이트
    firestore.collection("places").doc(props.data.id).set(
      {
        name: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div>
          <h1>fix it!</h1>
          <Input
            // 기존 값도 나타내주자
            placeholder={props.data.name}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button onClick={(e) => updateTodo()}>update</Button>
        </div>
      </Modal>

      <List className="todolist-entry">
        <ListItem className="todo-inputbox">
          <ListItemAvatar>
            {/* <Avatar>
            <ImageIcon />
          </Avatar> */}
          </ListItemAvatar>

          <ListItemText
            primary={props.data.name}
            secondary="마감 기한"
          ></ListItemText>
        </ListItem>
        <Button className="update-button" onClick={(e) => setOpen(true)}>
          수정
        </Button>
        <div className="delete-button">
          <DeleteForeverIcon
            onClick={(event) =>
              firestore.collection("todos").doc(props.data.id).delete()
            }
          />
        </div>
      </List>
    </>
  );
}

export default Todo;
